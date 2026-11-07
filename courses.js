(() => {
"use strict";
const root=document.getElementById("sealAcademyRoot");
if(!root)return;
const KEY="seal-x1-academy-progress-v1";
const courses=[
{id:"js",name:"JavaScript",tag:"منطق وتفكير برمجي",level:"مبتدئ إلى متوسط",description:"اتعلم الأوامر والمتغيرات والشروط والتكرار والدوال والمصفوفات.",lessons:[
{id:"js1",title:"المتغيرات والطباعة وأنواع البيانات",time:"15 دقيقة",goals:["تفهم معنى المتغير","تميّز بين let و const","تطبع نصاً أو قيمة"],explain:["المتغير صندوق له اسم تحفظ فيه قيمة وتستخدمها لاحقاً. بدلاً من تكرار الرقم في كل مكان، خزّنه مرة واستدعِه باسمه.","استخدم let إذا كنت ستغير القيمة لاحقاً، وconst إذا لن تعيد إسناد قيمة جديدة. النص بين علامات اقتباس، والرقم يكتب دونها."],code:'const student = "Mahmoud";\nlet score = 10;\nscore = 15;\nconsole.log(student);\nconsole.log(score);',output:"Mahmoud\n15",task:"أنشئ متغيراً اسمه age بقيمة 16، ومتغيراً اسمه city يحمل اسم مدينتك، ثم اطبع الاثنين.",hint:"استخدم let أو const، واكتب اسم المتغير داخل console.log().",solution:'const age = 16;\nconst city = "My city";\nconsole.log(age);\nconsole.log(city);',quiz:{q:"أي سطر مناسب لقيمة لن نعيد إسنادها؟",choices:['let school = "Seal";','const school = "Seal";','school == "Seal";'],correct:1,why:"const مناسب عندما لا تنوي إسناد قيمة جديدة للمتغير."}},
{id:"js2",title:"الشروط: if و else والعوامل المنطقية",time:"18 دقيقة",goals:["تكتب شرط if صحيحاً","تستخدم else للحالة البديلة","تفهم && و || والفرق بين = و ==="],explain:["البرنامج ينفذ القرار الذي تكتبه أنت. إذا كان الشرط صحيحاً ينفذ ما داخل if، وإذا لم يكن صحيحاً ينتقل إلى else إن وجدت.","يمكن وضع أكثر من أمر داخل نفس الأقواس المعقوفة. لا تحتاج إلى كتابة if جديدة لكل console.log(). العامل && يتطلب تحقق الشرطين، بينما || يكتفي بتحقق واحد على الأقل.","انتبه: = للإسناد، و=== للمقارنة."],code:'const score = 17;\nif (score >= 10) {\n  console.log("ناجح");\n  console.log("أحسنت");\n} else {\n  console.log("حاول مرة أخرى");\n}',output:"ناجح\nأحسنت",task:'اكتب شرطاً: إذا كانت درجة الطالب 50 أو أكثر اطبع "ناجح"، وإلا اطبع "يحتاج إلى مراجعة".',hint:"ابدأ بـ if (score >= 50)، ثم اكتب else بعد إغلاق قوس if.",solution:'const score = 65;\nif (score >= 50) {\n  console.log("ناجح");\n} else {\n  console.log("يحتاج إلى مراجعة");\n}',quiz:{q:"متى تكون نتيجة A && B صحيحة؟",choices:["عندما يكون A فقط صحيحاً","عندما يكون B فقط صحيحاً","عندما يكون A و B صحيحين معاً"],correct:2,why:"&& تعني AND؛ يجب أن يتحقق الشرطان معاً."}},
{id:"js3",title:"الحلقات: for و while",time:"20 دقيقة",goals:["تفهم لماذا نستخدم الحلقات","تقرأ أجزاء for الثلاثة","تتجنب الحلقة التي لا تنتهي"],explain:["الحلقة توفر عليك تكرار نفس السطر يدوياً. for مناسبة عندما يكون عدد التكرارات معروفاً أو يمكن التحكم فيه بعدّاد.","في for: قيمة البداية، ثم شرط الاستمرار، ثم تحديث العداد. المثال يبدأ من 1 ويستمر حتى 3.","while تكرر الأوامر ما دام الشرط صحيحاً. غيّر شيئاً يؤثر في الشرط حتى تتوقف الحلقة."],code:'for (let i = 1; i <= 3; i++) {\n  console.log("المحاولة رقم " + i);\n}',output:"المحاولة رقم 1\nالمحاولة رقم 2\nالمحاولة رقم 3",task:"اكتب حلقة for تطبع الأرقام من 1 إلى 5.",hint:"ابدأ i من 1، واستمر طالما i <= 5، ثم زد i بمقدار 1 باستخدام i++.",solution:'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',quiz:{q:"ما وظيفة i++ في حلقة for؟",choices:["إنقاص i","زيادة i بمقدار واحد","إيقاف الحلقة"],correct:1,why:"i++ تزيد قيمة العداد بمقدار واحد في كل دورة."}},
{id:"js4",title:"الدوال والمصفوفات",time:"22 دقيقة",goals:["تنشئ function وتستدعيها","تفهم parameters و return","تصل إلى عناصر array بالفهرس"],explain:["الدالة تجمع خطوات تحت اسم واحد لتعيد استخدامها. تعريفها لا يشغلها؛ يجب استدعاؤها باسمها مع الأقواس.","المعاملات parameters تسمح بإرسال بيانات للدالة. return تعيد نتيجة يمكن تخزينها أو استخدامها.","المصفوفة array تخزن أكثر من قيمة في متغير واحد. الفهرس يبدأ من صفر، لذلك أول عنصر هو items[0]."],code:'function add(a, b) {\n  return a + b;\n}\nconst result = add(4, 3);\nconsole.log(result);\n\nconst subjects = ["Arabic", "English", "Math"];\nconsole.log(subjects[0]);',output:"7\nArabic",task:"أنشئ دالة اسمها double تستقبل رقماً وتعيد ضعفه، ثم اطبع نتيجة double(6).",hint:"اكتب function double(number)، ثم return number * 2، وبعدها استدع الدالة.",solution:'function double(number) {\n  return number * 2;\n}\nconsole.log(double(6));',quiz:{q:"ما الفهرس الذي نستخدمه للوصول إلى أول عنصر في المصفوفة؟",choices:["0","1","-1"],correct:0,why:"فهرسة المصفوفات في JavaScript تبدأ من الصفر."}}
]},
{id:"html",name:"HTML",tag:"بناء هيكل صفحات الويب",level:"مبتدئ",description:"ابنِ صفحة منظمة بالعناوين والفقرات والروابط والصور والنماذج.",lessons:[
{id:"html1",title:"بنية صفحة HTML",time:"14 دقيقة",goals:["تفهم وظيفة HTML","تتعرف على html و head و body","تكتب عنواناً وفقرة"],explain:["HTML لغة توصيف تحدد معنى أجزاء الصفحة وبنيتها. المتصفح يقرأ العناصر ويعرضها.","معلومات الصفحة العامة توضع في head، أما المحتوى الظاهر للزائر فيوضع داخل body. أغلب العناصر لها وسم فتح ووسم إغلاق."],code:'<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="UTF-8">\n  <title>صفحتي الأولى</title>\n</head>\n<body>\n  <h1>أهلاً بك</h1>\n  <p>هذه أول صفحة لي.</p>\n</body>\n</html>',output:"عنوان كبير «أهلاً بك» وأسفله فقرة قصيرة.",task:"أنشئ صفحة بها عنوان h1 باسم مدرستك وفقرة p تقول فيها إنك تتعلم تطوير الويب.",hint:"ضع h1 و p داخل body، ولا تنس إغلاق كل وسم.",solution:"<h1>مدرستي</h1>\n<p>أنا أتعلم تطوير الويب.</p>",quiz:{q:"أين نضع المحتوى الذي يظهر داخل الصفحة؟",choices:["داخل head","داخل body","داخل title فقط"],correct:1,why:"العناصر المرئية للمستخدم توضع عادة داخل body."}},
{id:"html2",title:"العناوين والروابط والصور والقوائم",time:"17 دقيقة",goals:["تختار مستوى العنوان المناسب","تنشئ رابطاً","تضيف صورة بنص بديل"],explain:["استخدم h1 للعنوان الرئيسي ثم h2 للعناوين الفرعية. اختر الوسم حسب معنى المحتوى وليس حجمه فقط.","a ينشئ رابطاً وhref يحدد وجهته. img يعرض صورة وalt يصفها لمن لا يستطيع رؤيتها أو عندما لا تُحمّل.","القوائم المرتبة ol وغير المرتبة ul، وكل عنصر بداخلها يكتب باستخدام li."],code:'<h1>موارد التعلم</h1>\n<h2>مصادر مفيدة</h2>\n<a href="https://example.com">افتح المصدر</a>\n<img src="book.jpg" alt="كتاب دراسي">\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>',output:"عنوان رئيسي وفرعي، رابط، صورة موصوفة، وقائمة بعنصرين.",task:"أنشئ قائمة غير مرتبة بها HTML وCSS وJavaScript، وأضف رابطاً لمصدر تتعلم منه.",hint:"استخدم ul ثم li لكل عنصر، وa مع href للرابط.",solution:'<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>\n<a href="https://developer.mozilla.org/">مرجع تعليمي</a>',quiz:{q:"لماذا نكتب alt داخل img؟",choices:["لتكبير الصورة","لوصف الصورة نصياً","لتغيير لون الصفحة"],correct:1,why:"alt يوفر وصفاً بديلاً للصورة ويدعم سهولة الوصول."}},
{id:"html3",title:"النماذج وحقول الإدخال",time:"19 دقيقة",goals:["تفهم form و label و input","تختار نوع الحقل المناسب","تستخدم required للتحقق الأساسي"],explain:["النموذج form يجمع بيانات يدخلها المستخدم. label يوضح معنى الحقل، وinput ينشئ خانة إدخال.","type يحدد نوع البيانات مثل text أو email أو password. الخاصية required تطلب ملء الحقل قبل إرسال النموذج، لكنها ليست بديلاً عن التحقق الآمن في الخادم."],code:'<form>\n  <label for="studentName">اسم الطالب</label>\n  <input id="studentName" name="name" type="text" required>\n  <label for="studentEmail">البريد الإلكتروني</label>\n  <input id="studentEmail" name="email" type="email">\n  <button type="submit">إرسال</button>\n</form>',output:"نموذج يحتوي على حقل اسم وحقل بريد وزر إرسال.",task:"أنشئ نموذجاً به حقل لاسم الطالب وحقل لرسالة قصيرة وزر إرسال.",hint:"استخدم label مع for يطابق id، وtextarea للرسالة.",solution:'<form>\n  <label for="name">الاسم</label>\n  <input id="name" name="name" required>\n  <label for="message">الرسالة</label>\n  <textarea id="message" name="message"></textarea>\n  <button type="submit">إرسال</button>\n</form>',quiz:{q:"ما فائدة ربط label بـ input باستخدام for و id؟",choices:["تحسين وضوح الحقل وإمكانية الوصول","تغيير خلفية الحقل","إرسال البيانات تلقائياً"],correct:0,why:"الربط يجعل اسم الحقل مرتبطاً بعنصر الإدخال ويساعد مستخدمي التقنيات المساعدة."}}
]},
{id:"css",name:"CSS",tag:"التنسيق والتصميم المتجاوب",level:"مبتدئ",description:"تحكم في الألوان والخطوط والمسافات وتوزيع العناصر وصمم للموبايل.",lessons:[
{id:"css1",title:"المحددات والألوان والخطوط",time:"16 دقيقة",goals:["تربط ملف CSS بصفحة HTML","تفهم selector و property و value","تنسيق النص والخلفية"],explain:["CSS مسؤولة عن شكل الصفحة. القاعدة تتكون من محدد selector يختار العنصر، ثم خصائص وقيم داخل الأقواس المعقوفة.","يمكن ربط ملف خارجي باستخدام link داخل head. افصل المحتوى ومعناه في HTML عن مظهره في CSS قدر الإمكان."],code:'body {\n  font-family: Arial, sans-serif;\n  background: #f3f6fb;\n  color: #172033;\n}\nh1 {\n  color: #2457a6;\n  text-align: center;\n}',output:"خلفية فاتحة ونص داكن وعنوان أزرق في المنتصف.",task:"نسّق كل عناصر p لتكون بحجم 18px واجعل لونها داكناً.",hint:"اكتب p كمحدد، ثم font-size و color.",solution:'p {\n  font-size: 18px;\n  color: #263247;\n}',quiz:{q:"في color: red; ما اسم red؟",choices:["المحدد","الخاصية","القيمة"],correct:2,why:"color هي الخاصية وred هي القيمة التي تحدد لون النص."}},
{id:"css2",title:"نموذج الصندوق والمسافات والحدود",time:"18 دقيقة",goals:["تفهم content و padding و border و margin","تتحكم في عرض العنصر","تستخدم box-sizing"],explain:["كل عنصر في CSS يمكن فهمه كصندوق: المحتوى content، ثم الحشو الداخلي padding، ثم الحد border، ثم المسافة الخارجية margin.","padding يضيف مساحة داخل العنصر، بينما margin يضيف مسافة خارجه. استخدام box-sizing: border-box يجعل العرض المحدد يشمل الحشو والحدود."],code:'.card {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ccd3df;\n  margin: 16px;\n  border-radius: 12px;\n}',output:"بطاقة بعرض محدد وحشو داخلي وحد رفيع ومسافة خارجية وزوايا دائرية.",task:"أنشئ class باسم .note بعرض 100% وحشو 16px وحد 1px ومسافة خارجية 10px.",hint:"اكتب كل خاصية داخل .note { }.",solution:'.note {\n  width: 100%;\n  padding: 16px;\n  border: 1px solid #ccc;\n  margin: 10px;\n}',quiz:{q:"أي خاصية تضيف مساحة خارج حدود العنصر؟",choices:["padding","margin","font-size"],correct:1,why:"margin هي المسافة الخارجية حول العنصر."}},
{id:"css3",title:"Flexbox والتصميم المتجاوب",time:"21 دقيقة",goals:["توزع العناصر باستخدام Flexbox","تفهم justify-content و align-items","تستخدم media query"],explain:["Flexbox أداة لتوزيع العناصر داخل حاوية في صف أو عمود. display: flex يفعّلها، وjustify-content يتحكم في التوزيع على المحور الرئيسي، وalign-items على المحور العرضي.","التصميم المتجاوب يتكيف مع أحجام الشاشات. media query تسمح بتغيير القواعد عند عرض شاشة معين. ابدأ بتصميم واضح للموبايل ثم وسّعه للشاشات الأكبر."],code:'.cards {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n  align-items: stretch;\n}\n@media (max-width: 600px) {\n  .cards { flex-direction: column; }\n}',output:"على الشاشات الواسعة تتوزع البطاقات أفقياً، وعلى الشاشات الصغيرة تصطف رأسياً.",task:"اجعل .menu تستخدم Flexbox مع gap مقداره 12px، ثم اجعلها عمودية تحت عرض 500px.",hint:"استخدم display:flex خارج media query، وflex-direction:column داخلها.",solution:'.menu {\n  display: flex;\n  gap: 12px;\n}\n@media (max-width: 500px) {\n  .menu { flex-direction: column; }\n}',quiz:{q:"ما الذي تفعله media query؟",choices:["تشغّل JavaScript","تطبق CSS حسب شروط مثل عرض الشاشة","تنشئ قاعدة بيانات"],correct:1,why:"media query تغيّر قواعد التنسيق وفق خصائص الجهاز أو الشاشة."}}
]}
];
let progress={},activeUser=null,progressReady=false,progressStatus="جاري تجهيز تقدمك...",saveTimer=null;
try{progress=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(_){progress={};}
let activeCourse="js",activeLesson=null,quizChoice=null,quizChecked=false;
const allLessons=()=>courses.flatMap(c=>c.lessons);
const isDone=id=>Boolean(progress[id]);
const courseDone=c=>c.lessons.filter(l=>isDone(l.id)).length;
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function save(){
 if(!activeUser){try{localStorage.setItem(KEY,JSON.stringify(progress));progressStatus="التقدم كضيف محفوظ على هذا الجهاز فقط.";}catch(_){progressStatus="تعذر الحفظ على هذا الجهاز.";}return;}
 progressStatus="جاري حفظ تقدمك على حسابك...";
 if(saveTimer)clearTimeout(saveTimer);
 saveTimer=setTimeout(async()=>{
  try{
   if(typeof db==="undefined"||!db)throw new Error("خدمة الحساب غير متاحة.");
   const {error}=await db.from("academy_progress").upsert({user_id:activeUser.id,progress,updated_at:new Date().toISOString()},{onConflict:"user_id"});
   if(error)throw error;
   progressStatus="تم حفظ تقدمك على حسابك.";
  }catch(error){progressStatus="تعذر مزامنة التقدم. تحقق من الاتصال ثم حاول مرة أخرى.";console.error("Academy progress sync:",error);}
  const status=root.querySelector(".academy-progress-status");if(status)status.textContent=progressStatus;
 },450);
}
async function loadAccountProgress(user){
 const nextId=user?.id||null;
 if(activeUser?.id===nextId&&progressReady)return;
 activeUser=user||null;progressReady=false;progressStatus=activeUser?"جاري تحميل تقدم حسابك...":"التقدم كضيف محفوظ على هذا الجهاز فقط.";
 if(activeUser){
  progress={};render();
  try{
   if(typeof db==="undefined"||!db)throw new Error("خدمة الحساب غير متاحة.");
   const {data,error}=await db.from("academy_progress").select("progress").eq("user_id",activeUser.id).maybeSingle();
   if(error)throw error;
   progress=data?.progress&&typeof data.progress==="object"?data.progress:{};
   progressStatus="تم تحميل تقدمك من حسابك.";
  }catch(error){progress={};progressStatus="تعذر تحميل تقدم الحساب. لن يتم استيراد تقدم جهاز آخر.";console.error("Academy progress load:",error);}
 }else{
  try{progress=JSON.parse(localStorage.getItem(KEY)||"{}");}catch(_){progress={};}
 }
 progressReady=true;render();
}
function currentCourse(){return courses.find(c=>c.id===activeCourse)||courses[0];}
function currentLesson(){const c=currentCourse();return c.lessons.find(l=>l.id===activeLesson)||c.lessons[0];}
function render(){
 const c=currentCourse(),l=currentLesson();activeLesson=l.id;
 const total=allLessons().length,done=allLessons().filter(x=>isDone(x.id)).length;
 let tabs="",list="",goals="",explain="",choices="";
 courses.forEach(x=>{tabs+='<button type="button" class="academy-course-tab '+(x.id===activeCourse?"active":"")+'" data-course="'+x.id+'" role="tab" aria-selected="'+(x.id===activeCourse)+'"><span class="academy-course-mark '+x.id+'">'+(x.id==="js"?"JS":x.name)+'</span><b>'+x.name+'</b><small>'+courseDone(x)+'/'+x.lessons.length+' دروس</small></button>';});
 c.lessons.forEach((x,i)=>{list+='<button type="button" class="academy-lesson-link '+(x.id===l.id?"active":"")+'" data-lesson="'+x.id+'"><span class="academy-lesson-index">'+(isDone(x.id)?"✓":String(i+1).padStart(2,"0"))+'</span><span><b>'+esc(x.title)+'</b><small>'+esc(x.time)+'</small></span></button>';});
 l.goals.forEach(x=>goals+="<li>"+esc(x)+"</li>");
 l.explain.forEach(x=>explain+="<p>"+esc(x)+"</p>");
 l.quiz.choices.forEach((x,i)=>{choices+='<button type="button" data-choice="'+i+'" class="'+(quizChoice===i?"selected":"")+'" '+(quizChecked?"disabled":"")+'>'+String.fromCharCode(65+i)+". "+esc(x)+"</button>";});
 root.innerHTML=
 '<div class="academy-progress-card"><div><span class="academy-progress-kicker">رحلتك التعليمية</span><strong>'+done+' <small>/ '+total+' درس مكتمل</small></strong></div><div class="academy-progress-track"><span style="width:'+Math.round(done/total*100)+'%"></span></div><p class="academy-progress-status" aria-live="polite">'+esc(progressStatus)+'</p></div>'+
 '<div class="academy-course-tabs" role="tablist" aria-label="المسارات التعليمية">'+tabs+'</div>'+
 '<div class="academy-workspace"><aside class="academy-sidebar"><div class="academy-track-intro"><span class="academy-track-label">'+esc(c.tag)+'</span><h3>'+esc(c.name)+'</h3><p>'+esc(c.description)+'</p><small>'+esc(c.level)+' · '+c.lessons.length+' دروس حالياً</small></div><div class="academy-lesson-list">'+list+'</div><div class="academy-coming-soon"><b>المستوى التالي</b><p>سنضيف DOM و Events و Objects و Grid والحركة ومشروعات تطبيقية تدريجياً.</p></div></aside>'+
 '<article class="academy-lesson-panel"><div class="academy-lesson-topline"><span>'+esc(c.name)+' / الدرس '+(c.lessons.indexOf(l)+1)+'</span><span>'+esc(l.time)+'</span></div><h3>'+esc(l.title)+'</h3>'+
 '<div class="academy-goals"><b>بعد الدرس هتقدر:</b><ul>'+goals+'</ul></div><div class="academy-explanation"><h4>١. افهم الفكرة</h4>'+explain+'</div>'+
 '<div class="academy-code-card"><div class="academy-code-head"><b>مثال عملي</b><span>الكود</span></div><pre><code>'+esc(l.code)+'</code></pre><div class="academy-output"><b>النتيجة المتوقعة</b><pre>'+esc(l.output)+'</pre></div></div>'+
 '<div class="academy-challenge"><div class="academy-challenge-head"><span>٢. دورك تطبق</span><b>تحدي قصير</b></div><p>'+esc(l.task)+'</p><details><summary>تلميح يساعدك</summary><p>'+esc(l.hint)+'</p></details><details class="academy-answer"><summary>شاهد نموذج حل مقترح</summary><pre><code>'+esc(l.solution)+'</code></pre><p>حاول تكتب الحل بنفسك الأول، وبعدها قارن. قد توجد حلول صحيحة أخرى.</p></details></div>'+
 '<div class="academy-quiz"><h4>٣. اختبر فهمك</h4><p>'+esc(l.quiz.q)+'</p><div class="academy-quiz-options">'+choices+'</div><div class="academy-quiz-feedback" aria-live="polite">'+(quizChecked?'<b class="'+(quizChoice===l.quiz.correct?"correct":"incorrect")+'">'+(quizChoice===l.quiz.correct?"إجابة صحيحة!":"مش دي الإجابة الصحيحة.")+'</b><p>'+esc(l.quiz.why)+'</p>':"")+'</div><button type="button" class="academy-check-answer" data-action="check" '+(quizChoice===null||quizChecked?"disabled":"")+'>تحقق من إجابتي</button></div>'+
 '<div class="academy-lesson-actions"><button type="button" class="academy-complete-btn" data-action="complete">'+(isDone(l.id)?"✓ الدرس مكتمل":"أنهيت الدرس ✓")+'</button><button type="button" class="academy-next-btn" data-action="next">الدرس التالي ←</button></div></article></div>';
}
root.addEventListener("click",e=>{
 const courseBtn=e.target.closest("[data-course]");if(courseBtn){activeCourse=courseBtn.dataset.course;activeLesson=null;quizChoice=null;quizChecked=false;render();return;}
 const lessonBtn=e.target.closest("[data-lesson]");if(lessonBtn){activeLesson=lessonBtn.dataset.lesson;quizChoice=null;quizChecked=false;render();return;}
 const choice=e.target.closest("[data-choice]");if(choice&&!quizChecked){quizChoice=Number(choice.dataset.choice);render();return;}
 const action=e.target.closest("[data-action]")?.dataset.action;if(!action)return;
 const l=currentLesson(),c=currentCourse();
 if(action==="check"){if(quizChoice!==null){quizChecked=true;render();}return;}
 if(action==="complete"){progress[l.id]=true;save();render();return;}
 if(action==="next"){const i=c.lessons.findIndex(x=>x.id===l.id);if(i<c.lessons.length-1){activeLesson=c.lessons[i+1].id;}else{const next=courses[(courses.findIndex(x=>x.id===c.id)+1)%courses.length];activeCourse=next.id;activeLesson=next.lessons[0].id;}quizChoice=null;quizChecked=false;render();}
});
render();
if(typeof db!=="undefined"&&db?.auth){
 db.auth.getUser().then(({data})=>loadAccountProgress(data?.user||null)).catch(()=>loadAccountProgress(null));
 db.auth.onAuthStateChange((_event,session)=>{loadAccountProgress(session?.user||null);});
}else{loadAccountProgress(null);}
})();