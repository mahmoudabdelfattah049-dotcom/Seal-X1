const themeToggle=document.getElementById("themeToggle");
const menuToggle=document.getElementById("menuToggle");
const mobileNav=document.getElementById("mobileNav");
const savedTheme=localStorage.getItem("seal-x1-theme");
if(savedTheme==="light")document.body.classList.add("light-mode");
themeToggle.addEventListener("click",()=>{document.body.classList.toggle("light-mode");localStorage.setItem("seal-x1-theme",document.body.classList.contains("light-mode")?"light":"dark");themeToggle.textContent=document.body.classList.contains("light-mode")?"☾":"☼";});
themeToggle.textContent=document.body.classList.contains("light-mode")?"☾":"☼";
menuToggle.addEventListener("click",()=>{mobileNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",mobileNav.classList.contains("open")?"true":"false");});
mobileNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>mobileNav.classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".desktop-nav a")];
if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));}})},{rootMargin:"-35% 0px -55% 0px"});sections.forEach(section=>observer.observe(section));}

// Curated public YouTube links for Egypt's first-secondary curriculum 2026/2027.
// Search links intentionally stay on YouTube so newly uploaded lessons appear without scraping or copying videos.
const ytSearch=q=>"https://www.youtube.com/results?search_query="+encodeURIComponent(q);
const videoSources=[
 {subject:"اللغة العربية",teacher:"الخطة التعليمية — أ/ عبدالرحمن مجدي",title:"شرح اسم الفاعل — أولى ثانوي 2027",url:ytSearch("شرح اسم الفاعل اولى ثانوي 2027 عبدالرحمن مجدي"),kind:"teacher",year:"2027",note:"نتائج المدرس والدروس المرتبطة"},
 {subject:"اللغة العربية",teacher:"أ/ محمد حسني",title:"شرح عربي أولى ثانوي — الترم الأول 2027",url:ytSearch("محمد حسني عربي اولى ثانوي الترم الاول 2027"),kind:"teacher",year:"2027",note:"دروس النحو والبلاغة والنصوص"},
 {subject:"اللغة العربية",teacher:"الخطة التعليمية — قناة الأول الثانوي",title:"فيديوهات العربي أولى ثانوي",url:ytSearch("الخطة التعليمية عربي اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح وتدريبات ومراجعات"},
 {subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"مراجعة Unit 1 — كلمات وجرامر",url:"https://www.youtube.com/watch?v=Z0bztPnmRVw",kind:"video",year:"2027",note:"فيديو مباشر — مراجعة الوحدة الأولى"},
 {subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"شرح الفصل الأول The Old Man and the Sea",url:"https://www.youtube.com/watch?v=LMOXrR1HZBM",kind:"video",year:"2027",note:"فيديو مباشر — قصة المنهج"},
 {subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"كل فيديوهات مستر عمرو رجب لأولى ثانوي",url:ytSearch("مستر عمرو رجب انجليزي اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"ابحث عن شروحات الوحدات والجرامر والقصة"},
 {subject:"اللغة الأجنبية الأولى",teacher:"الخطة التعليمية — قناة الأول الثانوي",title:"فيديوهات الإنجليزي أولى ثانوي",url:ytSearch("الخطة التعليمية انجليزي اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح الوحدات والكلمات والجرامر"},
 {subject:"الرياضيات",teacher:"أ/ أحمد سليمان",title:"رياضيات أولى ثانوي — شرح المنهج",url:ytSearch("احمد سليمان رياضيات اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"جبر وهندسة وتدريبات"},
 {subject:"الرياضيات",teacher:"الخطة التعليمية — قناة الأول الثانوي",title:"رياضيات أولى ثانوي 2027",url:ytSearch("الخطة التعليمية رياضيات اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح الدروس وحل التقييمات"},
 {subject:"العلوم المتكاملة",teacher:"الخطة التعليمية — قناة الأول الثانوي",title:"العلوم المتكاملة أولى ثانوي 2027",url:ytSearch("الخطة التعليمية علوم متكاملة اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح المنهج وحل التقييمات"},
 {subject:"العلوم المتكاملة",teacher:"د. أحمد فايد",title:"شرح العلوم المتكاملة — محتوى مساعد",url:ytSearch("د احمد فايد علوم متكاملة اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"تحقق من توافق الدرس مع ترتيب منهج 2026/2027"},
 {subject:"التاريخ",teacher:"مستر كريم السبكي",title:"ملامح من تاريخ مصر القديمة الفرعونية",url:"https://www.youtube.com/watch?v=O6AfX8nfEpc",kind:"video",year:"2027",note:"فيديو مباشر — شرح الدرس"},
 {subject:"التاريخ",teacher:"صابر عيسى",title:"دروس ومراجعات تاريخ أولى ثانوي",url:ytSearch("صابر عيسى تاريخ اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح الدروس ومراجعة أكتوبر"},
 {subject:"التاريخ",teacher:"الخطة التعليمية — قناة الأول الثانوي",title:"فيديوهات التاريخ أولى ثانوي",url:ytSearch("الخطة التعليمية تاريخ اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح المنهج وحل التقييمات"},
 {subject:"الفلسفة والمنطق",teacher:"الخطة التعليمية — قناة الأول الثانوي",title:"الفلسفة والمنطق أولى ثانوي 2027",url:ytSearch("الخطة التعليمية فلسفة منطق اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"نشأة الفلسفة والقضايا المنطقية والتقييمات"},
 {subject:"البرمجة والذكاء الاصطناعي",teacher:"مستر أحمد السقا",title:"شرح الوحدة الأولى كاملة — المعلومات والوسائط وأخلاقيات المعلومات",url:"https://www.youtube.com/watch?v=1IzF2JG6shQ",kind:"video",year:"2027",note:"فيديو مباشر — شرح الوحدة الأولى"},
 {subject:"البرمجة والذكاء الاصطناعي",teacher:"إسماعيل محمد",title:"شرح الدرس الثاني — أخلاقيات المعلومات",url:"https://www.youtube.com/watch?v=GJeEAZAL46I",kind:"video",year:"2027",note:"فيديو مباشر — الدرس الثاني"},
 {subject:"البرمجة والذكاء الاصطناعي",teacher:"مستر أحمد السقا",title:"كل شروحات البرمجة أولى ثانوي",url:ytSearch("مستر احمد السقا برمجة وذكاء اصطناعي اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"دروس المنهج وتدريباته"},
 {subject:"البرمجة والذكاء الاصطناعي",teacher:"إسماعيل محمد",title:"فيديوهات البرمجة والذكاء الاصطناعي",url:ytSearch("اسماعيل محمد برمجة وذكاء اصطناعي اولى ثانوي 2027"),kind:"teacher",year:"2027",note:"شرح الدروس والمصطلحات"},
 {subject:"اللغة الأجنبية الثانية",teacher:"مدرسون متعددون",title:"اللغة الأجنبية الثانية — اختر لغتك",url:ytSearch("شرح لغة ثانية اولى ثانوي 2027 فرنساوي الماني ايطالي اسباني"),kind:"search",year:"2027",note:"نتائج بحث؛ اختر الفرنسية أو الألمانية أو الإيطالية أو الإسبانية"},
 {subject:"التربية الدينية",teacher:"مدرسون متعددون",title:"التربية الدينية أولى ثانوي",url:ytSearch("شرح التربية الدينية اولى ثانوي 2027"),kind:"search",year:"2027",note:"اختر المحتوى المطابق لنوع كتابك"},
 {subject:"العلوم المتكاملة",teacher:"د. أحمد فايد",title:"التكيفات البيولوجية للكائنات الحية في البيئة المائية",url:"https://www.youtube.com/watch?v=W1B7Eruwqjo",kind:"video",year:"2025",note:"شرح أقدم؛ استخدمه كمراجعة مفاهيم فقط بعد مطابقة الدرس"}
];
const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const subjectFilter=document.getElementById("subjectFilter");
const teacherFilter=document.getElementById("teacherFilter");
const videoSearch=document.getElementById("videoSearch");
const results=document.getElementById("videoLibraryResults");
const count=document.getElementById("libraryResultCount");
const chips=document.getElementById("subjectChips");
const subjects=[...new Set(videoSources.map(x=>x.subject))];
const teachers=[...new Set(videoSources.map(x=>x.teacher))];
subjects.forEach(s=>subjectFilter.add(new Option(s,s)));
teachers.forEach(t=>teacherFilter.add(new Option(t,t)));
function renderLibrary(){
 const q=videoSearch.value.trim().toLocaleLowerCase("ar");
 const subject=subjectFilter.value,teacher=teacherFilter.value;
 const filtered=videoSources.filter(item=>(subject==="all"||item.subject===subject)&&(teacher==="all"||item.teacher===teacher)&&(!q||[item.subject,item.teacher,item.title,item.note].join(" ").toLocaleLowerCase("ar").includes(q)));
 count.textContent=filtered.length;
 if(!filtered.length){results.innerHTML='<div class="library-no-results">مفيش نتائج مطابقة. جرّب كلمة تانية أو اختار مادة مختلفة.</div>';return;}
 results.innerHTML=filtered.map(item=>'<article class="video-source-card"><div class="video-source-icon">'+(item.kind==="video"?"▶":"⌕")+'</div><div class="video-source-copy"><div class="video-source-tags"><span>'+escapeHTML(item.subject)+'</span><span>'+escapeHTML(item.year)+'</span><span>'+(item.kind==="video"?"فيديو مباشر":item.kind==="teacher"?"صفحة المدرس على يوتيوب":"بحث يوتيوب")+'</span></div><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.teacher)+' · '+escapeHTML(item.note)+'</p></div><a class="video-source-link" href="'+escapeHTML(item.url)+'" target="_blank" rel="noopener noreferrer">'+(item.kind==="video"?"شاهد الفيديو":"افتح على يوتيوب")+' ↗</a></article>').join("");
}
subjectFilter.addEventListener("change",renderLibrary);
teacherFilter.addEventListener("change",renderLibrary);
videoSearch.addEventListener("input",renderLibrary);
chips.innerHTML='<button type="button" class="subject-chip active" data-subject="all">الكل</button>'+subjects.map(s=>'<button type="button" class="subject-chip" data-subject="'+escapeHTML(s)+'">'+escapeHTML(s)+'</button>').join("");
chips.addEventListener("click",event=>{const button=event.target.closest("button[data-subject]");if(!button)return;subjectFilter.value=button.dataset.subject;chips.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===button));renderLibrary();});
renderLibrary();

// Public browser client: publishable key only. RLS restricts access to published school content.
const SUPABASE_URL="https://glhsbvgzthsmxxguefxu.supabase.co";
const SUPABASE_KEY="sb_publishable_2BJmBVumRl6RRz1Ag9FLag_aeIFX3p8";
const db=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);
const dateLabel=value=>{if(!value)return "";try{return new Date(value).toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"});}catch{return "";}};
function setPanelState(panel,title,body){if(!panel)return;panel.innerHTML='<div class="empty-symbol">▤</div><h3>'+escapeHTML(title)+'</h3><p>'+escapeHTML(body)+'</p>';}
async function loadAnnouncements(){
 const panel=document.querySelector("#announcements .empty-panel");
 if(!db){setPanelState(panel,"تعذر الاتصال","مكتبة الاتصال بقاعدة البيانات لم يتم تحميلها.");return;}
 const {data,error}=await db.from("announcements").select("id,title,body,pinned,created_at").eq("status","published").order("pinned",{ascending:false}).order("created_at",{ascending:false}).limit(20);
 if(error){setPanelState(panel,"الإعلانات غير متاحة مؤقتاً","تعذر تحميل الإعلانات. حاول تحديث الصفحة لاحقاً.");console.error("Announcements:",error);return;}
 if(!data?.length){setPanelState(panel,"لا توجد إعلانات منشورة حالياً","ستظهر هنا إعلانات المدرسة فور اعتمادها ونشرها.");return;}
 panel.classList.add("live-list");panel.innerHTML=data.map(item=>'<article class="live-item"><div class="live-item-top"><span class="live-tag">'+(item.pinned?"إعلان مهم":"إعلان المدرسة")+'</span><time>'+escapeHTML(dateLabel(item.created_at))+'</time></div><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.body||"")+'</p></article>').join("");
}
async function loadResources(){
 const section=document.querySelector("#library");
 if(!section||!db)return;
 let container=section.querySelector("#liveResources");
 if(!container){container=document.createElement("div");container.id="liveResources";container.className="live-resources";results.after(container);}
 container.innerHTML='<p class="resource-loading">جاري تحميل الملفات المدرسية المنشورة...</p>';
 const {data,error}=await db.from("resources").select("id,title,description,teacher_name,external_url,file_path,created_at,subjects(name),resource_categories(name)").eq("status","published").eq("verified",true).order("created_at",{ascending:false}).limit(60);
 if(error){container.innerHTML='<p class="resource-loading">تعذر تحميل ملفات المدرسة حالياً.</p>';console.error("Resources:",error);return;}
 if(!data?.length){container.innerHTML='';return;}
 const cards=await Promise.all(data.map(async item=>{
  let href=item.external_url||"",label=href?"فتح المصدر":"";
  if(item.file_path){const {data:signed,error:signError}=await db.storage.from("school-files").createSignedUrl(item.file_path,3600);if(!signError&&signed?.signedUrl){href=signed.signedUrl;label="فتح / تحميل الملف";}}
  return '<article class="resource-item"><div class="resource-symbol">▧</div><div class="resource-copy"><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.description||"")+'</p><div class="resource-meta">'+escapeHTML(item.subjects?.name||"مصدر تعليمي")+(item.teacher_name?" · "+escapeHTML(item.teacher_name):"")+'</div></div>'+(href?'<a class="resource-link" href="'+escapeHTML(href)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>':'<span class="resource-pending">الرابط غير متاح</span>')+'</article>';
 }));
 container.innerHTML='<h3 class="school-files-title">ملفات المدرسة المنشورة</h3>'+cards.join("");
}
if(db)Promise.all([loadAnnouncements(),loadResources()]);
else setPanelState(document.querySelector("#announcements .empty-panel"),"تعذر الاتصال","لم يتم تحميل مكتبة الاتصال بقاعدة البيانات.");
