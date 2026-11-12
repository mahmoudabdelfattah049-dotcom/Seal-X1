
create table if not exists public.x1_ai_knowledge (
  id uuid primary key default gen_random_uuid(),
  agent text not null check (agent in ('qureo','general','both')),
  slug text not null,
  category text not null,
  title text not null,
  content text not null,
  keywords text[] not null default '{}',
  source_label text not null default 'Seal X1 curated knowledge',
  source_url text,
  is_published boolean not null default true,
  search_vector tsvector generated always as (
    setweight(to_tsvector('simple'::regconfig, coalesce(title,'')), 'A') ||
    setweight(to_tsvector('simple'::regconfig, coalesce(array_to_string(keywords,' '),'')), 'A') ||
    setweight(to_tsvector('simple'::regconfig, coalesce(content,'')), 'B')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(agent, slug)
);

create index if not exists x1_ai_knowledge_search_idx on public.x1_ai_knowledge using gin(search_vector);
create index if not exists x1_ai_knowledge_agent_category_idx on public.x1_ai_knowledge(agent, category, is_published);

create table if not exists public.x1_platform_catalog (
  id uuid primary key default gen_random_uuid(),
  section_id text not null unique,
  title text not null,
  summary text not null,
  instructions text not null default '',
  keywords text[] not null default '{}',
  allowed_roles text[] not null default array['public','student','teacher','admin'],
  href text,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);
create index if not exists x1_platform_catalog_active_idx on public.x1_platform_catalog(is_active);

create table if not exists public.x1_ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  agent text not null check (agent in ('qureo','general')),
  title text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists x1_ai_conversations_owner_updated_idx on public.x1_ai_conversations(user_id, updated_at desc);

create table if not exists public.x1_ai_messages (
  id bigint generated always as identity primary key,
  conversation_id uuid not null references public.x1_ai_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null check (char_length(content) between 1 and 16000),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists x1_ai_messages_conversation_created_idx on public.x1_ai_messages(conversation_id, created_at desc);
create index if not exists x1_ai_messages_owner_created_idx on public.x1_ai_messages(user_id, created_at desc);

create table if not exists public.x1_ai_usage_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  agent text not null check (agent in ('qureo','general')),
  input_tokens integer not null default 0 check (input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  created_at timestamptz not null default now()
);
create index if not exists x1_ai_usage_user_time_idx on public.x1_ai_usage_events(user_id, created_at desc);

create table if not exists public.x1_ai_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  conversation_id uuid references public.x1_ai_conversations(id) on delete set null,
  agent text not null check (agent in ('qureo','general')),
  rating smallint not null check (rating in (-1,1)),
  note text check (note is null or char_length(note) <= 1000),
  created_at timestamptz not null default now()
);
create index if not exists x1_ai_feedback_created_idx on public.x1_ai_feedback(created_at desc);

alter table public.x1_ai_knowledge enable row level security;
alter table public.x1_platform_catalog enable row level security;
alter table public.x1_ai_conversations enable row level security;
alter table public.x1_ai_messages enable row level security;
alter table public.x1_ai_usage_events enable row level security;
alter table public.x1_ai_feedback enable row level security;

revoke all on table public.x1_ai_knowledge, public.x1_platform_catalog, public.x1_ai_conversations,
  public.x1_ai_messages, public.x1_ai_usage_events, public.x1_ai_feedback from anon, authenticated;
grant all on table public.x1_ai_knowledge, public.x1_platform_catalog, public.x1_ai_conversations,
  public.x1_ai_messages, public.x1_ai_usage_events, public.x1_ai_feedback to service_role;
grant usage, select on all sequences in schema public to service_role;

create or replace function public.x1_search_ai_knowledge(
  p_query text,
  p_agent text default 'qureo',
  p_limit integer default 8
)
returns table (
  id uuid,
  slug text,
  category text,
  title text,
  content text,
  keywords text[],
  source_label text,
  relevance real
)
language sql
stable
security invoker
set search_path = public
as $$
  with q as (
    select websearch_to_tsquery('simple', coalesce(nullif(left(trim(p_query), 300), ''), 'programming')) as tsq
  )
  select k.id, k.slug, k.category, k.title, k.content, k.keywords, k.source_label,
         ts_rank_cd(k.search_vector, q.tsq) as relevance
  from public.x1_ai_knowledge k cross join q
  where k.is_published
    and (k.agent = p_agent or k.agent = 'both')
    and (
      k.search_vector @@ q.tsq
      or k.title ilike '%' || left(coalesce(p_query,''), 80) || '%'
      or k.content ilike '%' || left(coalesce(p_query,''), 80) || '%'
    )
  order by ts_rank_cd(k.search_vector, q.tsq) desc, k.updated_at desc
  limit least(greatest(coalesce(p_limit, 8), 1), 12);
$$;
revoke all on function public.x1_search_ai_knowledge(text,text,integer) from public, anon, authenticated;
grant execute on function public.x1_search_ai_knowledge(text,text,integer) to service_role;

insert into public.x1_ai_knowledge(agent,slug,category,title,content,keywords,source_label) values
('qureo','html-document-structure','HTML','هيكل مستند HTML','يبدأ مستند HTML5 بـ <!doctype html> ثم عنصر html. داخل head توضع معلومات الصفحة مثل title وmeta وروابط CSS، وداخل body يوضع المحتوى المرئي. استخدم lang لتحديد اللغة وdir لاتجاه النص عند الحاجة. HTML يصف البنية والمعنى، ولا يُستخدم لتنسيق الألوان والمسافات.',array['doctype','html','head','body','هيكل الصفحة','document'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','html-semantic-elements','HTML','العناصر الدلالية في HTML','العناصر الدلالية تصف وظيفة المحتوى: header للمقدمة، nav للتنقل، main للمحتوى الرئيسي، section لمجموعة موضوعية، article لمحتوى مستقل، aside لمحتوى جانبي، وfooter للتذييل. اختر العنصر حسب المعنى وليس حسب شكله؛ يمكن تنسيقها جميعاً عبر CSS.',array['semantic','header','nav','main','section','article','aside','footer'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','html-links-images','HTML','الروابط والصور','يُستخدم a لإنشاء رابط ويُحدد الوجهة عبر href. استخدم نص رابط واضحاً يشرح الوجهة. تُعرض الصورة عبر img مع src وalt؛ يجب أن يصف alt محتوى الصورة أو يترك فارغاً للصورة الزخرفية. لا تضع عناصر تفاعلية داخل بعضها بصورة غير صحيحة.',array['a','href','img','src','alt','link','image'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','html-lists-tables','HTML','القوائم والجداول','القائمة غير المرتبة ul تحتوي li، والمرتبة ol تحتوي li. استخدم table للبيانات الجدولية، مع thead وtbody وtr وth وtd، واجعل عناوين الأعمدة واضحة. لا تستخدم الجداول لتخطيط الصفحة؛ استخدم CSS Grid أو Flexbox للتخطيط.',array['ul','ol','li','table','thead','tbody','tr','th','td'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','html-forms','HTML','النماذج وحقول الإدخال','يُستخدم form لجمع بيانات، وlabel لربط وصف بالحقل، وinput لأنواع مختلفة مثل text وemail وnumber وcheckbox، وtextarea للنص الطويل، وbutton للإجراء. اربط label بالحقل عبر for وid. استخدم required وminlength وmaxlength للتحقق الأساسي، لكن تحقق الخادم يظل ضرورياً.',array['form','input','label','textarea','button','required','validation'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','html-accessibility','HTML','إتاحة HTML وإمكانية الوصول','استخدم العناوين h1 إلى h6 بترتيب منطقي، ونصوصاً واضحة للروابط والأزرار، وalt للصور ذات المعنى، وlabel للحقول. لا تعتمد على اللون وحده لتوضيح الحالة. استخدم button للأفعال وa للتنقل، وحافظ على إمكانية استخدام الصفحة بلوحة المفاتيح.',array['accessibility','aria','alt','label','keyboard','semantic'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','html-script-css-loading','HTML','ربط CSS وJavaScript','يرتبط ملف CSS عادة عبر link rel="stylesheet" داخل head. ويرتبط JavaScript عبر script src. استخدام defer يجعل الملف الخارجي ينفذ بعد تحليل HTML، مع الحفاظ على ترتيب ملفات defer. ضع السكربت في المكان المناسب وتأكد أن العناصر التي يستهدفها موجودة قبل تشغيل الكود.',array['link stylesheet','script','src','defer','css','javascript'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-selectors','CSS','المحددات في CSS','المحدد يختار عناصر HTML لتطبيق التنسيق. أمثلة: p يختار كل الفقرات، .card يختار العناصر ذات class card، و#main يختار العنصر ذي id main، وbutton:hover يختار الزر أثناء مرور المؤشر. يمكن دمج المحددات، لكن الإفراط في التعقيد يصعّب الصيانة.',array['selector','class','id','hover','element selector'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-cascade-specificity','CSS','التتابع والأولوية في CSS','عند تعارض القواعد، تؤثر الأهمية ومصدر القاعدة وخصوصية المحدد وترتيب الظهور. غالباً محدد id أعلى خصوصية من class، وclass أعلى من اسم العنصر. تجنب !important كحل افتراضي؛ افحص المحددات والقواعد المتعارضة وأصل المشكلة.',array['cascade','specificity','inheritance','important','priority'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-box-model','CSS','نموذج الصندوق Box Model','كل عنصر مستطيل يتكون من content ثم padding ثم border ثم margin. خاصية box-sizing: border-box تجعل العرض والارتفاع يشملان padding والحدود، مما يسهل حساب المقاسات. استخدم أدوات المطور لفحص المساحة الفعلية والعناصر المتداخلة.',array['box model','margin','padding','border','content','box-sizing'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-display-position','CSS','display وposition','display يحدد طريقة عرض العنصر مثل block وinline وflex وgrid وnone. position يحدد التموضع: static الافتراضي، relative بالنسبة لمكانه، absolute بالنسبة لأقرب ancestor مموضع، fixed بالنسبة لنافذة العرض، وsticky يجمع سلوك التمرير مع حد معين. لا تستخدم absolute لكل عناصر التخطيط.',array['display','position','block','inline','absolute','relative','fixed','sticky'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-flexbox','CSS','Flexbox للتخطيط','Flexbox مناسب لترتيب العناصر في اتجاه واحد. على الحاوية استخدم display:flex، ثم justify-content لمحور الاتجاه الرئيسي، وalign-items للمحور المتقاطع، وgap للمسافات. flex-wrap يسمح بالانتقال إلى سطر جديد، وflex-direction يغير الاتجاه بين row وcolumn.',array['flexbox','display flex','justify-content','align-items','gap','flex-wrap'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-grid','CSS','CSS Grid للتخطيط','Grid مناسب لتخطيط الصفوف والأعمدة معاً. ابدأ بـ display:grid، ثم grid-template-columns لتحديد الأعمدة، وgap للمسافات. repeat وminmax يساعدان في بناء تخطيط متجاوب، مثل repeat(auto-fit,minmax(220px,1fr)). استخدم Grid للشبكات وFlexbox للترتيب أحادي الاتجاه غالباً.',array['grid','grid-template-columns','repeat','minmax','auto-fit','columns'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-responsive','CSS','التصميم المتجاوب وMedia Queries','التصميم المتجاوب يجعل الواجهة مناسبة للشاشات المختلفة. استخدم وحدات مرنة مثل % وrem وvw عند ملاءمتها، وصوراً مرنة، وCSS Grid أو Flexbox. أضف @media لتغيير التخطيط عند نقاط توقف مناسبة للمحتوى، لا لأجهزة بعينها فقط. اختبر العرض الضيق والواسع.',array['responsive','media query','@media','mobile','viewport','breakpoint'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-units-colors-typography','CSS','الوحدات والألوان والخطوط','px وحدة ثابتة نسبياً، rem مرتبط بحجم الخط الأساسي، em مرتبط بحجم الخط للعنصر أو الأب حسب الخاصية، و% تعتمد على سياق الخاصية. اختر ألواناً ذات تباين كافٍ، وحدد font-family مع بدائل، واستخدم line-height لتحسين قراءة النص.',array['px','rem','em','percent','font-family','line-height','color'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-variables-pseudo','CSS','المتغيرات والحالات الوهمية في CSS','تُعرّف متغيرات CSS داخل :root مثل --brand-color ثم تستخدم عبر var(--brand-color). الحالات الوهمية مثل :hover و:focus-visible و:checked تصف حالة العنصر. والعناصر الوهمية مثل ::before و::after تضيف محتوى زخرفياً؛ لا تعتمد عليها للمعلومات الأساسية.',array['custom properties','variables','root','var','hover','focus-visible','before','after'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','css-debugging','CSS','تشخيص مشكلات CSS','إذا لم يظهر التنسيق، تحقق من تحميل ملف CSS ومساره، وصحة المحدد، ووجود class أو id المطلوب، وترتيب القواعد وخصوصيتها. افحص computed styles في أدوات المطور، وابحث عن أخطاء الأقواس والفواصل المنقوطة، وتأكد أن قاعدة أخرى لا تستبدل القيمة.',array['css debugging','devtools','computed styles','specificity','stylesheet'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-variables-types','JavaScript','المتغيرات وأنواع البيانات','استخدم const عندما لا تحتاج إعادة إسناد المتغير، وlet عندما ستتغير قيمته. تجنب var في الأكواد الجديدة غالباً بسبب نطاقه وسلوكه مع الرفع. أنواع أساسية تشمل string وnumber وboolean وundefined وnull وobject وsymbol وbigint. const يمنع إعادة الإسناد ولا يجعل الكائن نفسه غير قابل للتعديل.',array['let','const','var','string','number','boolean','undefined','null','type'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-operators','JavaScript','العوامل الحسابية والمنطقية والمقارنة','العوامل الحسابية تشمل + و- و* و/ و%. المقارنة الصارمة === و!== تقارن القيمة والنوع، بينما == قد تحول الأنواع. && تعني AND، و|| تعني OR، و! تعكس القيمة المنطقية. استخدم الأقواس لتوضيح ترتيب العمليات عند الحاجة.',array['operators','===','!==','==','&&','||','!','comparison'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-conditionals','JavaScript','الشروط if وelse وswitch','تختبر if تعبيراً منطقياً؛ إذا كان truthy ينفذ جسمها، وإلا يمكن تنفيذ else. يمكن ربط حالات متعددة عبر else if. استخدم switch عندما تقارن قيمة واحدة بعدة حالات واضحة، وتذكر break لتجنب الانتقال غير المقصود بين الحالات.',array['if','else','else if','switch','condition','truthy'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-loops','JavaScript','الحلقات for وwhile','تكرر for الأوامر مع تهيئة وشرط وتحديث، بينما while تستمر ما دام الشرط صحيحاً. تأكد أن قيمة الشرط تتغير حتى لا تنشأ حلقة لا نهائية. for...of مناسب للتكرار على قيم iterable، وforEach لاستدعاء دالة لكل عنصر في المصفوفة.',array['for','while','loop','for of','forEach','iteration'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-functions','JavaScript','الدوال والمعاملات وreturn','الدالة كتلة قابلة لإعادة الاستخدام. يمكن تعريفها بصيغة function أو arrow function. المعاملات parameters تستقبل القيم، وreturn تعيد نتيجة وتنهي تنفيذ الدالة. تعريف الدالة لا يعني تشغيلها؛ يجب استدعاؤها. الدوال الصغيرة ذات المسؤولية الواحدة أسهل في الاختبار.',array['function','parameter','argument','return','arrow function','=>'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-scope-hoisting','JavaScript','النطاق Scope والرفع Hoisting','النطاق يحدد أين يمكن الوصول إلى المتغير. let وconst لهما نطاق كتلي، بينما var له نطاق دالة. الرفع يصف معالجة التصريحات قبل التنفيذ، لكن let وconst لا يمكن استخدامهما قبل التهيئة بسبب المنطقة الزمنية الميتة. عرّف المتغيرات قبل استخدامها لتوضيح التدفق.',array['scope','block scope','hoisting','temporal dead zone','var','let','const'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-arrays','JavaScript','المصفوفات وطرق التعامل معها','المصفوفة تخزن عناصر مرتبة ويبدأ الفهرس من صفر. length يعطي عدد العناصر. push يضيف للنهاية، pop يزيل من النهاية، map ينشئ مصفوفة محولة، filter يختار عناصر، find يبحث عن أول عنصر مطابق، وreduce يجمع القيم. انتبه للفرق بين الطرق المعدلة للمصفوفة وغير المعدلة.',array['array','index','length','push','pop','map','filter','find','reduce'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-objects','JavaScript','الكائنات Objects','الكائن يجمع خصائص وقيمًا مرتبطة باسم. يمكن الوصول إلى الخاصية عبر object.name أو object["name"]. استخدم destructuring لاستخراج خصائص، وObject.keys لعرض المفاتيح. انتبه إلى الفرق بين مقارنة مراجع الكائنات ومقارنة القيم البدائية.',array['object','property','key','value','destructuring','Object.keys'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-dom','JavaScript','التعامل مع DOM','DOM هو تمثيل المستند كعناصر يمكن للJavaScript قراءتها وتعديلها. استخدم querySelector لاختيار أول عنصر يطابق CSS selector وquerySelectorAll لاختيار مجموعة. textContent يغير النص بأمان، وclassList لإضافة أو إزالة classes. تجنب innerHTML مع مدخلات المستخدم غير الموثوقة.',array['DOM','document','querySelector','querySelectorAll','textContent','classList'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-events','JavaScript','الأحداث Event Listeners','addEventListener يربط دالة بحدث مثل click أو input أو submit. في حدث submit للنموذج، استخدم event.preventDefault إذا كنت ستعالج الإرسال بنفسك. event.target يشير للعنصر الذي بدأ الحدث، وcurrentTarget للعنصر المرتبط به المستمع. استخدم تفويض الأحداث عند التعامل مع عناصر كثيرة.',array['event','addEventListener','click','submit','preventDefault','target'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-async-promises','JavaScript','البرمجة غير المتزامنة وPromises','Promise تمثل نتيجة قد تكتمل لاحقاً. async تجعل الدالة تعيد Promise، وawait ينتظر اكتمالها داخل async function. استخدم try/catch لمعالجة الأخطاء. لا تنسَ فحص response.ok عند استخدام fetch لأن استجابات HTTP مثل 404 لا ترفض Promise تلقائياً.',array['async','await','promise','fetch','try','catch','then'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-errors-debugging','JavaScript','الأخطاء وتصحيح البرامج','SyntaxError يعني أن تركيب الكود غير صالح، وReferenceError يحدث عند استخدام اسم غير معروف أو قبل إتاحته، وTypeError عند عملية غير مناسبة لنوع القيمة. اقرأ أول رسالة خطأ ومكانها، افحص القيم باستخدام console.log أو debugger، ثم اختبر أصغر جزء يعيد المشكلة.',array['debugging','syntaxerror','referenceerror','typeerror','console.log','debugger'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','js-json-storage','JavaScript','JSON والتخزين المحلي','JSON صيغة نصية لتبادل البيانات. JSON.stringify يحول قيمة مناسبة إلى نص، وJSON.parse يحول نص JSON صالحاً إلى قيمة. localStorage يخزن نصوصاً في المتصفح ويبقى بعد إغلاقه؛ لا تخزن فيه كلمات مرور أو أسراراً أو بيانات حساسة.',array['JSON','stringify','parse','localStorage','sessionStorage'],'Seal X1 · شرح تعليمي أصلي'),
('qureo','qur-challenge-method','QUREO','طريقة تحليل تحديات QUREO','اقرأ وصف التحدي وحدد المطلوب بدقة، ثم حدد المدخلات والنتيجة المتوقعة والقيود. افهم الكود المعطى قبل تعديله، وغيّر أقل جزء ممكن، ثم اختبر الحالات العادية والحدية. إذا لم تظهر النتيجة، راجع نص الخطأ ورسالة التحدي. لا تنسب سؤالاً إلى فصل معين دون دليل من واجهة الطالب أو مادة رسمية.',array['QUREO','challenge','تحدي','فصل','chapter','اختبار الكود'],'Seal X1 · منهجية تعليمية أصلية'),
('qureo','qur-code-reading','QUREO','قراءة الكود خطوة بخطوة','لتتبع البرنامج، ابدأ من أول سطر قابل للتنفيذ، وسجل قيمة المتغيرات بعد كل إسناد، وقيّم الشروط قبل دخول الفروع، وتابع عدد مرات الحلقات. ميّز بين تعريف الدالة واستدعائها، وبين طباعة قيمة وإرجاعها. اكتب جدول تتبع صغيراً عند وجود أكثر من متغير.',array['trace','dry run','تتبع','متغيرات','output','return'],'Seal X1 · منهجية تعليمية أصلية'),
('qureo','qur-question-format','QUREO','كيف يشرح المساعد سؤالاً غير واضح','إذا كان نص السؤال ناقصاً أو به أخطاء إملائية، استخرج الكلمات التقنية والرموز واسم اللغة، ثم اسأل سؤال توضيح واحداً فقط عند نقص معلومة تمنع الحل. لا تفترض أن نص التحدي أو الفصل معروف. اطلب لقطة أو النص الكامل عند غياب السياق، ثم اشرح السبب والخطوات والنتيجة المتوقعة.',array['صياغة السؤال','typo','غموض','توضيح','سؤال غير واضح'],'Seal X1 · منهجية تعليمية أصلية')
on conflict(agent,slug) do update set
  category=excluded.category,title=excluded.title,content=excluded.content,keywords=excluded.keywords,
  source_label=excluded.source_label,is_published=true,updated_at=now();

insert into public.x1_platform_catalog(section_id,title,summary,instructions,keywords,allowed_roles,href) values
('home','الرئيسية','واجهة البداية وبطاقات الوصول السريع إلى أقسام Seal X1.','استخدمها للرجوع لبداية المنصة واستكشاف الأقسام. ',array['الرئيسية','بداية','الصفحة الرئيسية','home'],array['public','student','teacher','admin'],'#home'),
('announcements','إعلانات المدرسة','الإعلانات والقرارات والتنبيهات المنشورة للطلاب.','لعرض الأخبار افتح قسم الإعلانات أعلى الصفحة. ',array['إعلان','إعلانات','قرارات','تنبيهات','أخبار المدرسة'],array['public','student','teacher','admin'],'#announcements'),
('qureo','مركز QUREO','روابط QUREO الرسمية ومساعد البرمجة وحلول وشروحات QUREO.','يمكن فتح بوابة QUREO الرسمية أو مساعد QUREO داخل القسم. ',array['QUREO','كيريو','البرمجة','مساعد QUREO'],array['public','student','teacher','admin'],'#qureo'),
('qureoSmartAssistant','مساعد QUREO الذكي','مساعد متخصص في HTML وCSS وJavaScript ومفاهيم QUREO.','افتح البطاقة داخل مركز QUREO لطرح سؤال أو لصق كود. ',array['مساعد برمجة','HTML','CSS','JavaScript','تحليل كود'],array['public','student','teacher','admin'],'#qureoSmartAssistant'),
('qureoSolutionsCard','حلول وشروحات QUREO','دليل خارجي مستقل للمساعدة التعليمية وليس مصدراً رسمياً للوزارة.','افتح البطاقة داخل مركز QUREO للوصول إلى الدليل المستقل. ',array['حلول QUREO','شروحات QUREO','دليل مستقل'],array['public','student','teacher','admin'],'#qureoSolutionsCard'),
('sealAcademy','أكاديمية Seal X1','مساحة الدروس العملية ومحرر الأكواد التفاعلي.','افتح الأكاديمية لتعلم HTML وCSS وJavaScript بالتطبيق. ',array['أكاديمية','دروس','محرر أكواد','تعلم البرمجة'],array['public','student','teacher','admin'],'#sealAcademy'),
('learnAtYourPace','اتعلم على مهلك','لوحة تقدم الطالب ومشاهدات الفيديو ونتائج الامتحانات والنشاط.','متاحة للطالب المسجل فقط. ',array['تقدم','درجات','نتائج','إنجاز','نشاط'],array['student'],'#learnAtYourPace'),
('library','المكتبة التعليمية','المواد والمدرسون والفيديوهات وقوائم التشغيل التعليمية.','اختر المادة ثم المدرس أو نوع الفيديو، ويمكن للمساعد البحث عن عنوان فيديو. ',array['مكتبة','فيديوهات','دروس','مدرسين','مواد'],array['public','student','teacher','admin'],'#library'),
('downloadLibrary','مكتبة التحميلات والملفات','ملفات PDF والكتب والتقييمات والمصادر التعليمية المنشورة.','افتح المكتبة وابحث باسم الملف أو المادة أو الأسبوع. ',array['PDF','تحميل','ملفات','كتب','تقييمات','مذكرات'],array['public','student','teacher','admin'],'#downloadLibrary'),
('studentSpace','مساحة الطلاب','مساحة الطالب المسجل وتضم الامتحانات والتقدم والمحادثة والدعم.','لا تظهر إلا للطالب بعد تسجيل الدخول. ',array['مساحة الطلاب','طالب','امتحانات','دعم'],array['student'],'#studentSpace'),
('studentExamsList','امتحانات المواد','قائمة امتحانات الطلاب المنشورة حسب المادة.','افتح المادة ثم الامتحان وأجب عن الأسئلة ثم أرسل الإجابات. ',array['امتحان','اختبار','امتحانات المواد'],array['student'],'#studentExamsList'),
('studentLeaderboardList','ترتيب المتفوقين','لوحة ترتيب الطلاب حسب مؤشرات التقدم والنتائج والنشاط.','يمكن تحديث القائمة من زر التحديث داخل البطاقة. ',array['ترتيب','المتفوقين','الأوائل','leaderboard'],array['student'],'#studentLeaderboardList'),
('communityMessages','المحادثة الجماعية للطلاب','مساحة الرسائل الجماعية داخل مساحة الطلاب.','المحادثة الجماعية ليست قناة للرسائل الخاصة؛ استخدم دعم الإدارة للموضوعات الخاصة. ',array['محادثة','رسائل','جروب','زملاء'],array['student'],'#communityMessages'),
('studentSupportMessages','التواصل الخاص مع الإدارة','قناة الطالب الخاصة للتواصل مع الإدارة.','استخدمها للاستفسارات والشكاوى الخاصة بدلاً من المحادثة الجماعية. ',array['شكوى','استفسار','رسالة خاصة','الإدارة'],array['student'],'#studentSupportMessages'),
('teacherSpace','مساحة المعلمين','مساحة المعلم لإدارة الإعلانات والملفات والمحادثة والامتحانات.','تظهر للمعلم المسجل فقط، وبعض الإجراءات تحتاج توثيق الحساب. ',array['المعلم','مساحة المعلمين','مدرس'],array['teacher'],'#teacherSpace'),
('teacherResourceForm','إضافة ملف أو مصدر','نموذج رفع ملف أو إضافة رابط تعليمي للطلاب.','للمعلم الموثق أو الإدارة؛ أدخل العنوان والوصف والمادة والتصنيف ثم أضف الملف أو الرابط. ',array['رفع ملف','مصدر','PDF','إضافة ملف'],array['teacher','admin'],'#teacherResourceForm'),
('teacherResourcesList','مصادري المنشورة','قائمة المصادر التي نشرها المعلم ويمكنه تعديلها أو حذفها.','افتحها لإدارة المصادر التي أضفتها. ',array['مصادري','ملفاتي','تعديل ملف','حذف ملف'],array['teacher'],'#teacherResourcesList'),
('schoolTeacherAnnouncementForm','إضافة إعلان للطلاب','نموذج نشر إعلان مدرسي للطلاب.','اكتب العنوان والتفاصيل ويمكن تحديد الإعلان المهم ثم انشره. ',array['إضافة إعلان','نشر إعلان','تنبيه'],array['teacher'],'#schoolTeacherAnnouncementForm'),
('schoolTeacherAnnouncementsList','إعلاناتي','قائمة إعلانات المعلم مع خيارات التعديل والحذف.','افتحها لإدارة الإعلانات التي نشرتها. ',array['إعلاناتي','تعديل إعلان','حذف إعلان'],array['teacher'],'#schoolTeacherAnnouncementsList'),
('teacherExamForm','إنشاء امتحان','أداة إنشاء امتحان اختيار أو مقالي للمعلم.','إنشاء الامتحان يتطلب حساب معلم موثق ومادة محددة، ويمكن للمعلم معاينة النموذج. ',array['إنشاء امتحان','اختبار','أسئلة','مقالي'],array['teacher','admin'],'#teacherExamForm'),
('teacherCommunityMessages','المحادثة الجماعية للمعلمين','مساحة المحادثة الجماعية داخل مجلد المعلمين.','تُستخدم للتواصل الجماعي بين أعضاء المنصة. ',array['محادثة المعلمين','رسائل المعلمين'],array['teacher'],'#teacherCommunityMessages'),
('about','عن المنصة','تعريف بمبادرة Seal X1 وأهدافها.','افتح القسم لمعرفة نبذة عن المنصة. ',array['عن المنصة','حول','Seal X1'],array['public','student','teacher','admin'],'#about')
on conflict(section_id) do update set
 title=excluded.title,summary=excluded.summary,instructions=excluded.instructions,keywords=excluded.keywords,
 allowed_roles=excluded.allowed_roles,href=excluded.href,is_active=true,updated_at=now();
