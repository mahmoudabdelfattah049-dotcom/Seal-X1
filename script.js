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

// Curated lesson library: each card is a specific public YouTube video.
const academyVideos=[
 {id:"QIJXzY4a2-Y",subject:"العلوم المتكاملة",teacher:"د. أحمد مكرم",title:"الحصة الأولى: تعريف بمنهج العلوم المتكاملة 2027",description:"مدخل للمنهج وأهم الأفكار التي يبدأ بها طالب أولى ثانوي. مناسب كبداية قبل الدخول في تفاصيل الوحدات.",kind:"شرح",duration:"—",date:"2026-09-01",recommended:5},
 {id:"W1B7Eruwqjo",subject:"العلوم المتكاملة",teacher:"د. أحمد فايد",title:"التكيفات البيولوجية للكائنات الحية في البيئة المائية",description:"شرح لمفهوم التكيفات البيولوجية في البيئة المائية. راجع توافق ترتيب الدرس مع كتابك الحالي.",kind:"شرح",duration:"—",date:"2025-01-01",recommended:3,older:true},
 {id:"1IzF2JG6shQ",subject:"البرمجة والذكاء الاصطناعي",teacher:"مستر أحمد السقا",title:"شرح الوحدة الأولى: المعلومات والوسائط وأخلاقيات المعلومات",description:"شرح تمهيدي لموضوعات الوحدة الأولى في البرمجة والذكاء الاصطناعي.",kind:"شرح",duration:"—",date:"2026-01-01",recommended:5},
 {id:"GJeEAZAL46I",subject:"البرمجة والذكاء الاصطناعي",teacher:"إسماعيل محمد",title:"الدرس الثاني: أخلاقيات المعلومات",description:"شرح مستقل لمفهوم أخلاقيات المعلومات ضمن محتوى البرمجة والذكاء الاصطناعي.",kind:"شرح",duration:"—",date:"2026-01-01",recommended:4},
 {id:"Z0bztPnmRVw",subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"مراجعة Unit 1: كلمات وجرامر",description:"مراجعة للوحدة الأولى تجمع المفردات والقواعد في فيديو واحد.",kind:"مراجعة",duration:"—",date:"2026-01-01",recommended:4},
 {id:"LMOXrR1HZBM",subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"The Old Man and the Sea — شرح الفصل الأول",description:"شرح للقصة المقررة باللغة الإنجليزية، مع التركيز على فهم الأحداث والمفردات.",kind:"شرح",duration:"—",date:"2026-01-01",recommended:4},
 {id:"O6AfX8nfEpc",subject:"التاريخ",teacher:"مستر كريم السبكي",title:"ملامح من تاريخ مصر القديمة الفرعونية",description:"شرح لدرس من دروس تاريخ مصر القديمة للصف الأول الثانوي.",kind:"شرح",duration:"—",date:"2026-01-01",recommended:4},
 {id:"xYin-SQjmhI",subject:"اللغة العربية",teacher:"مستر عمر ياقوت",title:"خطة تقفيل العربي: البداية الصحيحة لأولى ثانوي 2027",description:"فيديو إرشادي لتنظيم فروع العربي: النحو والبلاغة والقراءة والنصوص، وكيفية التعامل مع المادة خلال العام.",kind:"مراجعة",duration:"—",date:"2026-08-25",recommended:4},
 {id:"ymkFII6BHIo",subject:"العلوم المتكاملة",teacher:"مدرس علوم — قناة الإبداع في الأحياء",title:"المحاضرة الأولى: علوم متكاملة أولى ثانوي 2027",description:"محاضرة مجانية منشورة للصف الأول الثانوي، مع ملف سبورة مرفق في وصف الناشر الأصلي.",kind:"شرح",duration:"—",date:"2026-09-05",recommended:4}
 ,{id:"AP5HVeh3jTk",subject:"اللغة الأجنبية الأولى",teacher:"مستر محمود عبداللاه",title:"شرح Unit 3: حالات If",description:"شرح قواعد If في الوحدة الثالثة مع أمثلة وتطبيقات للصف الأول الثانوي 2027.",kind:"شرح",duration:"—",date:"2026-10-24",recommended:5,verified:true}
 ,{id:"TuApiiQQzqQ",subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"مراجعة Unit 2: كلمات وقواعد وأسئلة",description:"مراجعة شاملة للوحدة الثانية Hands Help, Hearts Care تشمل المفردات والقواعد والتدريب.",kind:"مراجعة",duration:"—",date:"2026-09-28",recommended:5,verified:true}
 ,{id:"3iVDH71SZtw",subject:"اللغة الأجنبية الأولى",teacher:"مستر عمرو رجب",title:"حل تقييم الأسبوع الأول",description:"حل تقييمات الوزارة للأسبوع الأول مع شرح المفردات والجرامر والكتابة.",kind:"حل وتدريب",duration:"—",date:"2026-09-23",recommended:4,verified:true}
 ,{id:"1kODywKg0tI",subject:"اللغة الأجنبية الأولى",teacher:"عبدالحميد حامد",title:"حل تقييمات الإنجليزي — الترم الأول 2027",description:"تدريب على تقييمات أولى ثانوي ومراجعة شكل الأسئلة والإجابات.",kind:"حل وتدريب",duration:"—",date:"2026-10-17",recommended:4,verified:true}
 ,{id:"ZhF0xMAxBbA",subject:"اللغة الأجنبية الأولى",teacher:"ميس ياسمين إيهاب",title:"شرح Unit 1 بالكامل — Upstream B2",description:"شرح الوحدة الأولى من كتاب Upstream B2 لطلاب أولى ثانوي لغات؛ قد لا يطابق مسار العام.",kind:"شرح",duration:"—",date:"2026-09-20",recommended:3,verified:true,track:"لغات"}
 ,{id:"QJSf0f09xxU",subject:"الرياضيات",teacher:"م. محمد خالد البقري",title:"الدوال المثلثية ومقلوباتها",description:"شرح الدوال المثلثية ومقلوباتها في حساب المثلثات مع تطبيقات على المسائل.",kind:"شرح",duration:"—",date:"2026-10-14",recommended:5,verified:true}
 ,{id:"nPZFThbeaA0",subject:"الرياضيات",teacher:"مستر أحمد سليمان",title:"بداية منهج الرياضيات — أولى ثانوي 2027",description:"فيديو تمهيدي للتعرف على بداية منهج الرياضيات للترم الأول.",kind:"شرح",duration:"—",date:"2026-09-21",recommended:3,verified:true}
 ,{id:"mvbZ2Oaqy8E",subject:"الفلسفة والمنطق",teacher:"مستر زياد أحمد",title:"نشأة الفلسفة وتعريفاتها",description:"شرح نشأة الفلسفة وأهم تعريفاتها ضمن الفصل الأول من منهج الفلسفة.",kind:"شرح",duration:"—",date:"2026-10-27",recommended:5,verified:true}
 ,{id:"qJ234Y56kXs",subject:"الفلسفة والمنطق",teacher:"مستر زياد أحمد",title:"شرح القضايا المنطقية بالكامل",description:"شرح القضايا المنطقية في منهج المنطق للصف الأول الثانوي الترم الأول 2027.",kind:"شرح",duration:"—",date:"2026-10-29",recommended:5,verified:true}
 ,{id:"so4dkksDOZc",subject:"الفلسفة والمنطق",teacher:"الخطة التعليمية",title:"عوامل الوقوع في أخطاء التفكير",description:"شرح درس عوامل الوقوع في أخطاء التفكير ضمن منهج المنطق للترم الأول.",kind:"شرح",duration:"—",date:"2026-09-21",recommended:4,verified:true}
 ,{id:"F0-2fa_-aqI",subject:"العلوم المتكاملة",teacher:"مستر علي للعلوم والكيمياء",title:"حل تدريبات درس الغلاف المائي — كتاب الأضواء",description:"حل تدريبات الدرس الأول من كتاب الأضواء، من صفحة 11 إلى 17، مع توضيح أسباب الاختيارات.",kind:"حل وتدريب",duration:"—",date:"2026-09-11",recommended:5,verified:true}
 ,{id:"xuHtSZpSgpw",subject:"العلوم المتكاملة",teacher:"الخطة التعليمية",title:"شرح الدرس الأول علوم متكاملة 2027",description:"شرح الدرس الأول من منهج العلوم المتكاملة للصف الأول الثانوي عام وبكالوريا.",kind:"شرح",duration:"—",date:"2026-09-23",recommended:5,verified:true}
 ,{id:"kY_3uyZ9VMg",subject:"التاريخ",teacher:"مستر إبراهيم الجوهري",title:"الحضارة والتاريخ — الدرس الأول",description:"شرح مفهوم الحضارة والتاريخ وعناصر الحضارة ضمن بداية منهج التاريخ للترم الأول 2027.",kind:"شرح",duration:"—",date:"2026-09-01",recommended:5,verified:true}
 ,{id:"NPHi-4_3AsA",subject:"العلوم المتكاملة",teacher:"د. محمد أيمن",title:"الغلاف المائي على كوكب الأرض — الدرس الأول",description:"شرح الدرس الأول من منهج العلوم المتكاملة 2027: البيئة والنظام البيئي وأغلفة كوكب الأرض والغلاف المائي.",kind:"شرح",duration:"—",date:"2026-09-12",recommended:5,verified:true}
 ,{id:"vhKFH0tOEeY",subject:"العلوم المتكاملة",teacher:"د. محمد أيمن",title:"الخواص الكيميائية للماء — الدرس الثاني",description:"شرح الخواص الكيميائية للماء وبنية جزيء الماء والروابط والخواص المرتبطة بها.",kind:"شرح",duration:"—",date:"2026-09-19",recommended:5,verified:true}
 ,{id:"3t3ar0hm9ts",subject:"العلوم المتكاملة",teacher:"عمرو سامي",title:"الخواص الكيميائية للماء — المحاضرة الثانية",description:"شرح الدرس الثاني من منهج العلوم المتكاملة مع أمثلة وتطبيقات.",kind:"شرح",duration:"—",date:"2026-09-10",recommended:4,verified:true}
 ,{id:"01uP2A3n780",subject:"العلوم المتكاملة",teacher:"عمرو سامي",title:"المحاليل المائية وخواصها — الدرس الرابع",description:"شرح المحاليل المائية والخواص الجمعية والتركيز وتطبيقات الدرس الرابع.",kind:"شرح",duration:"—",date:"2026-10-09",recommended:5,verified:true}
 ,{id:"O5jdNiMT5uM",subject:"العلوم المتكاملة",teacher:"د. محمد أيمن",title:"الخواص الجمعية للمحاليل — الدرس الرابع",description:"شرح الخواص الجمعية للمحاليل مع أمثلة على الغليان والتجمد والتركيز.",kind:"شرح",duration:"—",date:"2026-10-11",recommended:5,verified:true}
 ,{id:"k6acoTETUTk",subject:"الرياضيات",teacher:"م. محمد خالد البقري",title:"العلاقة بين المعاملات والجذور — جبر",description:"شرح العلاقة بين جذور المعادلة التربيعية ومعاملاتها مع تطبيقات على المسائل.",kind:"شرح",duration:"—",date:"2026-10-12",recommended:5,verified:true}
 ,{id:"8ybeGQwAnVY",subject:"الرياضيات",teacher:"مستر أمير الصياد",title:"حل تقييمات أكتوبر — رياضيات",description:"حل التقييمات الأسبوعية الخمسة الأولى في الجبر وحساب المثلثات والهندسة.",kind:"حل وتدريب",duration:"—",date:"2026-10-14",recommended:4,verified:true}
];
const academySubjects=[
 {name:"اللغة العربية",icon:"ع",desc:"النحو والبلاغة والقراءة والنصوص والأدب."},
 {name:"اللغة الأجنبية الأولى",icon:"EN",desc:"Vocabulary, Grammar, Reading and The Old Man and the Sea."},
 {name:"الرياضيات",icon:"∑",desc:"الجبر والهندسة والتدريبات وحل المسائل."},
 {name:"العلوم المتكاملة",icon:"⚛",desc:"المفاهيم العلمية والبيئة والتطبيقات."},
 {name:"التاريخ",icon:"⌛",desc:"الحضارة المصرية القديمة ومصادر التاريخ."},
 {name:"الفلسفة والمنطق",icon:"◇",desc:"التفكير الإنساني والفلسفة والقضايا المنطقية."},
 {name:"البرمجة والذكاء الاصطناعي",icon:"</>",desc:"أساسيات البرمجة والبيانات والذكاء الاصطناعي."},
 {name:"اللغة الأجنبية الثانية",icon:"文",desc:"الفرنسية أو الألمانية أو الإيطالية أو الإسبانية."},
 {name:"التربية الدينية",icon:"✦",desc:"الدروس والقيم والأنشطة المقررة."}
];
const academyState={subject:"العلوم المتكاملة",teacher:"all",kind:"all",sort:"recommended",activeVideo:null};
const academySubjectsEl=document.getElementById("academySubjects");
const academyTeachersEl=document.getElementById("academyTeachers");
const academyGrid=document.getElementById("academyVideoGrid");
const academyFeatured=document.getElementById("academyFeatured");
const academyPlaylistsEl=document.getElementById("academyPlaylists");
const academyPlaylists=[
 {subject:"اللغة العربية",title:"قائمة تشغيل اللغة العربية",description:"دروس اللغة العربية — قائمة تشغيل كاملة من المصدر على YouTube.",id:"PLBsxNqayvozpH-MCgqjUjcrmaQs3ooXJ0"},
 {subject:"العلوم المتكاملة",title:"قائمة تشغيل العلوم المتكاملة",description:"دروس العلوم المتكاملة — قائمة تشغيل كاملة من المصدر على YouTube.",id:"PL5oLG_oU5VxFH5RY-zITHsgwOrxNvREws"},
 {subject:"التاريخ",title:"قائمة تشغيل التاريخ",description:"دروس التاريخ — قائمة تشغيل كاملة من المصدر على YouTube.",id:"PLaURPeK9A7u"},
 {subject:"الفلسفة والمنطق",title:"قائمة تشغيل الفلسفة والمنطق",description:"دروس الفلسفة والمنطق — قائمة تشغيل كاملة من المصدر على YouTube.",id:"PLtiC5L61P7PqWW-q0fDdOR1BOH3qVFRVj"}
];
const academyEmpty=document.getElementById("academyEmpty");
const academyCount=document.getElementById("academyVideoCount");
const academyEsc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function academyRender(){
 const subject=academySubjects.find(x=>x.name===academyState.subject)||academySubjects[0];
 document.getElementById("academyCurrentSubject").textContent=subject.name;
 document.getElementById("academySubjectDescription").textContent=subject.desc;
 academySubjectsEl.innerHTML=academySubjects.map((s,i)=>{const n=academyVideos.filter(v=>v.subject===s.name).length;return '<button class="academy-subject '+(s.name===academyState.subject?"selected":"")+'" data-subject="'+academyEsc(s.name)+'"><span class="academy-subject-icon">'+s.icon+'</span><span class="academy-subject-name">'+academyEsc(s.name)+'</span><span class="academy-subject-count">'+n+'</span></button>';}).join("");
 const allTeachers=[...new Set(academyVideos.filter(v=>v.subject===academyState.subject).map(v=>v.teacher))];
 if(academyState.teacher!=="all"&&!allTeachers.includes(academyState.teacher))academyState.teacher="all";
 academyTeachersEl.innerHTML='<button class="academy-teacher '+(academyState.teacher==="all"?"selected":"")+'" data-teacher="all">كل المدرسين</button>'+allTeachers.map(t=>'<button class="academy-teacher '+(academyState.teacher===t?"selected":"")+'" data-teacher="'+academyEsc(t)+'">'+academyEsc(t)+'</button>').join("");
 let items=academyVideos.filter(v=>v.subject===academyState.subject&&(academyState.teacher==="all"||v.teacher===academyState.teacher)&&(academyState.kind==="all"||v.kind===academyState.kind));
 if(academyState.sort==="newest")items.sort((x,y)=>y.date.localeCompare(x.date));
 else if(academyState.sort==="duration")items.sort((x,y)=>y.duration.localeCompare(x.duration));
 else items.sort((x,y)=>y.recommended-x.recommended||y.date.localeCompare(x.date));
 const subjectPlaylists=academyPlaylists.filter(p=>p.subject===academyState.subject);
 academyPlaylistsEl.innerHTML=subjectPlaylists.map(p=>
  '<article class="academy-playlist-card"><div class="academy-playlist-copy"><span class="academy-playlist-tag">قائمة تشغيل كاملة</span><h4>'+academyEsc(p.title)+'</h4><p>'+academyEsc(p.description)+'</p><a href="https://www.youtube.com/playlist?list='+p.id+'" target="_blank" rel="noopener noreferrer">فتح القائمة على YouTube ↗</a></div><div class="academy-playlist-player"><iframe src="https://www.youtube-nocookie.com/embed?listType=playlist&amp;list='+p.id+'" title="'+academyEsc(p.title)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div></article>'
 ).join("");
 academyCount.textContent=items.length+" فيديو";
 academyEmpty.hidden=items.length>0;
 if(!items.length){academyGrid.innerHTML="";academyFeatured.innerHTML="";return;}
 if(!academyState.activeVideo||!items.some(v=>v.id===academyState.activeVideo))academyState.activeVideo=items[0].id;
 const active=items.find(v=>v.id===academyState.activeVideo);
 academyFeatured.innerHTML='<div class="academy-player"><iframe src="https://www.youtube-nocookie.com/embed/'+active.id+'?rel=0" title="'+academyEsc(active.title)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="academy-feature-info"><div class="academy-video-badges"><span>'+academyEsc(active.kind)+'</span><span>'+academyEsc(active.teacher)+'</span>'+(active.older?'<span class="older-label">محتوى أقدم</span>':'<span class="fresh-label">محتوى تعليمي</span>')+'</div><h4>'+academyEsc(active.title)+'</h4><p>'+academyEsc(active.description)+'</p><a href="https://www.youtube.com/watch?v='+active.id+'" target="_blank" rel="noopener noreferrer">فتح الفيديو على YouTube ↗</a><button class="mark-watched-btn" data-mark-video="'+active.id+'" '+(window.sealCompletedVideoIds?.has(active.id)?'disabled':'')+'>'+(window.sealCompletedVideoIds?.has(active.id)?'✓ تمت المشاهدة':'✓ سجلت مشاهدة الفيديو')+'</button></div>';
 academyGrid.innerHTML=items.map(v=>'<details class="academy-video-card"><summary class="academy-video-summary"><img src="https://i.ytimg.com/vi/'+v.id+'/mqdefault.jpg" alt="" loading="lazy"><span class="academy-summary-copy"><b>'+academyEsc(v.title)+'</b><small>'+academyEsc(v.teacher)+' · '+academyEsc(v.duration)+' · '+academyEsc(v.kind)+'</small></span><span class="academy-summary-arrow">⌄</span></summary><div class="academy-card-body"><p>'+academyEsc(v.description)+'</p><div class="academy-card-footer"><span>'+(v.id===active.id?'يُعرض الآن':'جاهز للمشاهدة')+'</span><button data-video="'+v.id+'">افتح في المشغل الرئيسي</button></div></div></details>').join("");
}
academySubjectsEl.addEventListener("click",e=>{const b=e.target.closest("[data-subject]");if(!b)return;academyState.subject=b.dataset.subject;academyState.teacher="all";academyState.kind="all";academyState.activeVideo=null;document.querySelectorAll(".academy-type").forEach(x=>x.classList.toggle("active",x.dataset.kind==="all"));academyRender();});
academyTeachersEl.addEventListener("click",e=>{const b=e.target.closest("[data-teacher]");if(!b)return;academyState.teacher=b.dataset.teacher;academyState.activeVideo=null;academyRender();});
document.querySelector(".academy-type-filters").addEventListener("click",e=>{const b=e.target.closest("[data-kind]");if(!b)return;academyState.kind=b.dataset.kind;academyState.activeVideo=null;document.querySelectorAll(".academy-type").forEach(x=>x.classList.toggle("active",x===b));academyRender();});
document.getElementById("academySort").addEventListener("change",e=>{academyState.sort=e.target.value;academyRender();});
academyGrid.addEventListener("click",e=>{const b=e.target.closest("[data-video]");if(!b)return;academyState.activeVideo=b.dataset.video;academyRender();document.getElementById("academyFeatured").scrollIntoView({behavior:"smooth",block:"nearest"});});
document.getElementById("academySubjectCount").textContent=academySubjects.length;
academyRender();

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
 if(!container){container=document.createElement("div");container.id="liveResources";container.className="live-resources";academyGrid.after(container);}
 container.innerHTML='<p class="resource-loading">جاري تحميل الملفات المدرسية المنشورة...</p>';
 const {data,error}=await db.from("resources").select("id,title,description,teacher_name,external_url,file_path,created_at,subjects(name),resource_categories(name)").eq("status","published").eq("verified",true).order("created_at",{ascending:false}).limit(60);
 if(error){container.innerHTML='<p class="resource-loading">تعذر تحميل ملفات المدرسة حالياً.</p>';console.error("Resources:",error);return;}
 if(!data?.length){container.innerHTML='';return;}
 const cards=await Promise.all(data.map(async item=>{
  let href=item.external_url||"",label=href?"فتح المصدر":"";
  if(item.file_path){const {data:signed,error:signError}=await db.storage.from("resources").createSignedUrl(item.file_path,3600);if(!signError&&signed?.signedUrl){href=signed.signedUrl;label="فتح / تحميل الملف";}}
  return '<article class="resource-item"><div class="resource-symbol">▧</div><div class="resource-copy"><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.description||"")+'</p><div class="resource-meta">'+escapeHTML(item.subjects?.name||"مصدر تعليمي")+(item.teacher_name?" · "+escapeHTML(item.teacher_name):"")+'</div></div>'+(href?'<a class="resource-link" href="'+escapeHTML(href)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>':'<span class="resource-pending">الرابط غير متاح</span>')+'</article>';
 }));
 container.innerHTML='<h3 class="school-files-title">ملفات المدرسة المنشورة</h3>'+cards.join("");
}
if(db)Promise.all([loadAnnouncements(),loadResources()]);
else setPanelState(document.querySelector("#announcements .empty-panel"),"تعذر الاتصال","لم يتم تحميل مكتبة الاتصال بقاعدة البيانات.");


// Student accounts: usernames are mapped to an internal auth address.
// No real email address is collected or displayed. Passwords are handled only by Supabase Auth.
const authCard=document.getElementById("authCard");
if(db&&authCard){
 const authForm=document.getElementById("studentAuthForm");
 const authMessage=document.getElementById("authMessage");
 const authSubmit=document.getElementById("authSubmit");
 const authSession=document.getElementById("authSession");
 const authHeading=document.getElementById("authHeading");
 const authSubheading=document.getElementById("authSubheading");
 const usernameInput=document.getElementById("studentUsername");
 const passwordInput=document.getElementById("studentPassword");
 const displayNameInput=document.getElementById("studentDisplayName");
 const nameField=document.getElementById("studentNameField");
 let authMode="login";
 const normalizeUsername=value=>value.normalize("NFC").trim().toLowerCase();
 const validUsername=value=>/^[A-Za-z0-9_ء-ي٠-٩۰-۹]{3,20}$/.test(value);
 const internalEmail=async name=>{
  const bytes=new TextEncoder().encode(name);
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  const hex=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
  return "u"+hex.slice(0,60)+"@accounts.sealx1.com";
 };
 const legacyInternalEmail=name=>name+"@accounts.sealx1.com";
 const setAuthMessage=(message,type="")=>{authMessage.textContent=message;authMessage.className="auth-message "+type;};
 function setAuthMode(mode){
  authMode=mode;
  document.querySelectorAll("[data-auth-mode]").forEach(b=>b.classList.toggle("active",b.dataset.authMode===mode));
  nameField.hidden=mode!=="signup";
  displayNameInput.required=mode==="signup";
  passwordInput.autocomplete=mode==="signup"?"new-password":"current-password";
  authSubmit.textContent=mode==="signup"?"إنشاء حساب الطالب":"دخول إلى حسابي";
  authHeading.textContent=mode==="signup"?"أنشئ حسابك في Seal X1":"أهلاً بك في Seal X1";
  authSubheading.textContent=mode==="signup"?"اسم مستخدم وكلمة مرور فقط":"استخدم بيانات حسابك للدخول";
  setAuthMessage("");
 }
 document.querySelectorAll("[data-auth-mode]").forEach(b=>b.addEventListener("click",()=>setAuthMode(b.dataset.authMode)));
 async function refreshStudentSession(){
  const {data:{user}}=await db.auth.getUser();
  if(!user){
   authSession.hidden=true;authForm.hidden=false;
   document.getElementById("accountOpen").hidden=false;
   window.sealInitPortalSpaces?.(null,null);
   return;
  }
  const {data:profile}=await db.from("profiles").select("username,display_name,role,grade").eq("id",user.id).maybeSingle();
  authForm.hidden=true;authSession.hidden=false;
  document.getElementById("accountOpen").hidden=true;
  document.getElementById("authSessionName").textContent=profile?.display_name||profile?.username||user.user_metadata?.username||"طالب Seal X1";
  authHeading.textContent=profile?.role==="admin"?"أهلاً بك يا مدير المنصة":"تم تسجيل الدخول";
  authSubheading.textContent=profile?.role==="admin"?"صلاحيات الإدارة الكاملة مفعّلة":"حسابك متصل وجاهز لحفظ تقدمك";
  window.sealInitPortalSpaces?.(user,profile);
 }
 authForm.addEventListener("submit",async event=>{
  event.preventDefault();
  const username=normalizeUsername(usernameInput.value);
  usernameInput.value=username;
  const password=passwordInput.value;
  if(!validUsername(username)){setAuthMessage("اسم المستخدم لازم يكون من 3 إلى 20 حرفاً، ويسمح بالعربي أو الإنجليزي أو الأرقام أو _ بدون مسافات.","error");return;}
  if(password.length<8){setAuthMessage("كلمة المرور لازم تكون 8 أحرف على الأقل.","error");return;}
  authSubmit.disabled=true;authSubmit.textContent="لحظة واحدة...";
  setAuthMessage(authMode==="signup"?"جاري إنشاء حسابك...":"جاري تسجيل الدخول...");
  try{
   let result;
   if(authMode==="signup"){
    const displayName=displayNameInput.value.trim();
    if(!displayName){setAuthMessage("اكتب الاسم الظاهر داخل المنصة.","error");return;}
    result=await db.auth.signUp({email:await internalEmail(username),password,options:{data:{username,display_name:displayName}}});
    if(result.error)throw result.error;
    if(!result.data.session){
      setAuthMessage("الحساب اتسجل، لكن إعداد تأكيد البريد في Supabase ما زال مفعّلاً. لازم تعطيله من إعدادات Authentication > Providers > Email حتى يعمل نظام اسم المستخدم بدون بريد.", "error");
      return;
    }
    setAuthMessage("تم إنشاء الحساب بنجاح!","success");
   }else{
    result=await db.auth.signInWithPassword({email:await internalEmail(username),password});
    if(result.error&&/invalid login credentials/i.test(String(result.error.message||""))){
      const legacyResult=await db.auth.signInWithPassword({email:legacyInternalEmail(username),password});
      if(!legacyResult.error)result=legacyResult;
      else throw legacyResult.error;
    }
    if(result.error)throw result.error;
    setAuthMessage("تم تسجيل الدخول بنجاح.","success");
   }
   passwordInput.value="";
   await refreshStudentSession();
  }catch(error){
   const msg=String(error?.message||"");
   if(/already registered|already exists|duplicate key|profiles_username_lower_uidx/i.test(msg))setAuthMessage("اسم المستخدم مستخدم بالفعل. جرّب اسماً آخر.","error");
   else if(/invalid login credentials/i.test(msg))setAuthMessage("اسم المستخدم أو كلمة المرور غير صحيحة.","error");
   else setAuthMessage("تعذر إكمال العملية: "+msg,"error");
  }finally{authSubmit.disabled=false;authSubmit.textContent=authMode==="signup"?"إنشاء حساب الطالب":"دخول إلى حسابي";}
 });
 document.getElementById("authSignOut").addEventListener("click",async()=>{
  await db.auth.signOut();setAuthMode("login");authHeading.textContent="تم تسجيل الخروج";authSubheading.textContent="يمكنك تسجيل الدخول مرة أخرى";await refreshStudentSession();
 });
 document.getElementById("accountOpen").addEventListener("click",()=>document.getElementById("studentAuth").scrollIntoView({behavior:"smooth"}));
 db.auth.onAuthStateChange(()=>{refreshStudentSession();});
 refreshStudentSession();
}


// Authenticated student area, administrator console, learning progress and messaging.
window.sealCurrentUser=null;
window.sealCurrentProfile=null;
window.sealCompletedVideoIds=new Set();
const portalEsc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const portalTime=value=>{try{return new Date(value).toLocaleString("ar-EG",{dateStyle:"short",timeStyle:"short"});}catch{return "";}};
const portalSetVisible=(id,visible)=>{const el=document.getElementById(id);if(el)el.hidden=!visible;};
let portalRealtime=null;
let adminUserCache=[];
let selectedSupportUser="";
async function portalAdminCall(action,payload={}){
 const {data:{session}}=await db.auth.getSession();
 if(!session)throw new Error("انتهت جلسة الدخول. سجل الدخول مرة أخرى.");
 const response=await fetch(SUPABASE_URL+"/functions/v1/seal-admin"+(action==="list_users"?"?action=list_users":""),{
  method:action==="list_users"?"GET":"POST",
  headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+session.access_token,"Content-Type":"application/json"},
  ...(action==="list_users"?{}:{body:JSON.stringify({action,...payload})})
 });
 const result=await response.json();
 if(!response.ok)throw new Error(result.error||"تعذر تنفيذ طلب الإدارة");
 return result;
}
function portalMessageMarkup(rows,currentId,isAdmin=false){
 if(!rows?.length)return '<p class="resource-loading">لا توجد رسائل حتى الآن. ابدأ المحادثة.</p>';
 return rows.map(row=>{
  const mine=row.sender_id===currentId;
  const sender=mine?(isAdmin?"الإدارة":"أنت"):(row.sender_name||"طالب");
  return '<div class="chat-bubble '+(mine?"mine":"")+'"><div class="chat-bubble-meta">'+portalEsc(sender)+' · '+portalEsc(portalTime(row.created_at))+'</div><p>'+portalEsc(row.body)+'</p></div>';
 }).join("");
}
async function portalLoadCommunity(){
 const box=document.getElementById("communityMessages");if(!box||!window.sealCurrentUser)return;
 const [messages,profiles]=await Promise.all([
  db.from("community_messages").select("id,user_id,body,created_at").order("created_at",{ascending:false}).limit(80),
  db.from("community_profiles_public").select("id,display_name,username")
 ]);
 if(messages.error||profiles.error){box.innerHTML='<p class="resource-loading">تعذر تحميل المحادثة حالياً.</p>';return;}
 const names=new Map((profiles.data||[]).map(p=>[p.id,p.display_name||p.username||"طالب"]));
 const rows=(messages.data||[]).reverse().map(x=>({...x,sender_id:x.user_id,sender_name:names.get(x.user_id)||"طالب"}));
 box.innerHTML=rows.length?rows.map(row=>'<div class="chat-bubble"><div class="chat-bubble-meta">'+portalEsc(row.sender_name)+' · '+portalEsc(portalTime(row.created_at))+'</div><p>'+portalEsc(row.body)+'</p></div>').join(""):'<p class="resource-loading">لسه مفيش رسائل. ابدأ أول نقاش.</p>';
 box.scrollTop=box.scrollHeight;
}
async function portalLoadStudentSupport(){
 const box=document.getElementById("studentSupportMessages");if(!box||!window.sealCurrentUser)return;
 const {data,error}=await db.from("admin_messages").select("id,user_id,sender_id,body,created_at").eq("user_id",window.sealCurrentUser.id).order("created_at").limit(100);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل رسائلك.</p>';return;}
 box.innerHTML=portalMessageMarkup(data,window.sealCurrentUser.id,false);box.scrollTop=box.scrollHeight;
}
async function portalLoadStudentStats(){
 const user=window.sealCurrentUser;if(!user)return;
 const [videos,exams]=await Promise.all([
  db.from("student_video_progress").select("video_id,completed,updated_at").eq("user_id",user.id),
  db.from("student_exam_attempts").select("score,total_score,completed_at").eq("user_id",user.id)
 ]);
 if(videos.error||exams.error){console.error(videos.error||exams.error);return;}
 const done=(videos.data||[]).filter(x=>x.completed);
 const examRows=exams.data||[];
 const average=examRows.length?examRows.reduce((a,x)=>a+(Number(x.score)/Number(x.total_score))*100,0)/examRows.length:0;
 const now=Date.now(),days=new Set();
 [...(videos.data||[]).map(x=>x.updated_at),...examRows.map(x=>x.completed_at)].forEach(date=>{
  if(date&&now-new Date(date).getTime()<=7*86400000)days.add(new Date(date).toLocaleDateString("en-CA"));
 });
 const videoPoints=Math.min(done.length/20,1)*40;
 const examPoints=examRows.length?(average/100)*50:0;
 const consistencyPoints=(days.size/7)*10;
 const score=Math.round(videoPoints+examPoints+consistencyPoints);
 document.getElementById("studentVideosDone").textContent=done.length;
 document.getElementById("studentExamsDone").textContent=examRows.length;
 document.getElementById("studentScore").textContent=score;
 document.getElementById("studentActiveDays").textContent=days.size;
 document.getElementById("studentProgressBar").style.width=score+"%";
 document.getElementById("studentProgressLabel").textContent="إنجازك الحالي "+score+" من 100";
 window.sealCompletedVideoIds=new Set(done.map(x=>x.video_id));
 if(typeof academyRender==="function")academyRender();
}
async function portalLoadAdminUsers(){
 const box=document.getElementById("adminUsersList");if(!box)return;
 box.innerHTML='<p class="resource-loading">جاري تحميل الحسابات...</p>';
 try{
  const result=await portalAdminCall("list_users");adminUserCache=result.users||[];
  document.getElementById("adminUsersCount").textContent=result.total||0;
  document.getElementById("adminVideosCount").textContent=adminUserCache.reduce((n,x)=>n+(x.videos_completed||0),0);
  document.getElementById("adminExamsCount").textContent=adminUserCache.reduce((n,x)=>n+(x.exams_completed||0),0);
  const select=document.getElementById("adminSupportStudent");
  select.innerHTML='<option value="">اختر طالباً لفتح المحادثة</option>'+adminUserCache.filter(x=>x.role==="student").map(x=>'<option value="'+portalEsc(x.id)+'">'+portalEsc(x.display_name)+' (@'+portalEsc(x.username)+')</option>').join("");
  box.innerHTML=adminUserCache.length?adminUserCache.map(u=>'<article class="admin-user-row"><div class="admin-user-main"><b>'+portalEsc(u.display_name)+'</b><small>@'+portalEsc(u.username)+' · '+portalEsc(u.role==="teacher"?"معلم":u.role==="student"?"طالب":u.role)+'</small><span>فيديوهات: '+u.videos_completed+' · امتحانات: '+u.exams_completed+' · متوسط الامتحانات: '+(u.exam_average===null?'—':u.exam_average+'%')+' · آخر نشاط: '+portalEsc(portalTime(u.last_sign_in_at))+'</span></div>'+(u.role==="admin"?'<span class="admin-role-tag">ADMIN</span>':u.role==="moderator"?'<span class="admin-role-tag">MODERATOR</span>':'<div class="admin-user-actions"><select data-role-user="'+portalEsc(u.id)+'" aria-label="رتبة الحساب"><option value="student" '+(u.role==="student"?'selected':'')+'>طالب</option><option value="teacher" '+(u.role==="teacher"?'selected':'')+'>معلم</option></select><button data-save-role="'+portalEsc(u.id)+'">حفظ الرتبة</button><button data-edit-user="'+portalEsc(u.id)+'">تعديل</button><button class="danger-action" data-delete-user="'+portalEsc(u.id)+'">حذف</button></div>')+'</article>').join(""):'<p class="resource-loading">لا توجد حسابات بعد.</p>';
 }catch(error){box.innerHTML='<p class="resource-loading">'+portalEsc(error.message)+'</p>';}
}
async function portalLoadReports(){
 const box=document.getElementById("adminReportsList");if(!box)return;
 const {data,error}=await db.from("reports").select("id,user_id,kind,body,status,created_at").order("created_at",{ascending:false}).limit(100);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل التقارير.</p>';return;}
 const open=(data||[]).filter(x=>x.status==="open");
 document.getElementById("adminReportsCount").textContent=open.length;
 box.innerHTML=data?.length?data.map(r=>'<article class="admin-report"><div><b>'+portalEsc(r.kind)+'</b><small>'+portalEsc(portalTime(r.created_at))+' · '+portalEsc(r.status)+'</small></div><p>'+portalEsc(r.body)+'</p>'+(r.status==="open"?'<button data-resolve-report="'+portalEsc(r.id)+'">وضع علامة تم الحل</button>':'')+'</article>').join(""):'<p class="resource-loading">لا توجد شكاوى أو ملاحظات.</p>';
}
async function portalLoadAdminThread(userId){
 selectedSupportUser=userId;
 const box=document.getElementById("adminSupportMessages");if(!userId){box.innerHTML='<p class="resource-loading">اختر طالباً لعرض الرسائل.</p>';return;}
 const {data,error}=await db.from("admin_messages").select("id,user_id,sender_id,body,created_at").eq("user_id",userId).order("created_at").limit(150);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل المحادثة.</p>';return;}
 box.innerHTML=portalMessageMarkup(data,window.sealCurrentUser.id,true);box.scrollTop=box.scrollHeight;
}

async function portalLoadAdminAnnouncements(){
 const box=document.getElementById("adminAnnouncementsList");if(!box)return;
 const {data,error}=await db.from("announcements").select("id,title,body,pinned,status,created_at").order("created_at",{ascending:false}).limit(80);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل الإعلانات.</p>';return;}
 box.innerHTML=data?.length?data.map(a=>'<article class="admin-report"><div><b>'+portalEsc(a.title)+'</b><small>'+portalEsc(a.status)+' · '+portalEsc(portalTime(a.created_at))+'</small></div><p>'+portalEsc(a.body||"")+'</p><div class="admin-inline-actions"><button data-edit-announcement="'+portalEsc(a.id)+'">تعديل</button><button class="danger-action" data-delete-announcement="'+portalEsc(a.id)+'">حذف</button></div></article>').join(""):'<p class="resource-loading">لا توجد إعلانات.</p>';
}
async function portalLoadAdminCommunity(){
 const box=document.getElementById("adminCommunityList");if(!box)return;
 const {data,error}=await db.from("community_messages").select("id,user_id,body,created_at,profiles(display_name,username)").order("created_at",{ascending:false}).limit(60);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل رسائل المجموعة.</p>';return;}
 box.innerHTML=data?.length?data.map(m=>'<article class="admin-report"><div><b>'+portalEsc(m.profiles?.display_name||m.profiles?.username||"طالب")+'</b><small>'+portalEsc(portalTime(m.created_at))+'</small></div><p>'+portalEsc(m.body)+'</p><button class="danger-action" data-delete-community="'+portalEsc(m.id)+'">حذف الرسالة</button></article>').join(""):'<p class="resource-loading">لا توجد رسائل.</p>';
}

async function portalInitSpaces(user,profile){
 window.sealCurrentUser=user;window.sealCurrentProfile=profile;
 const logged=!!user,isAdmin=profile?.role==="admin";
 portalSetVisible("studentSpace",logged);portalSetVisible("studentNav",logged);portalSetVisible("studentNavMobile",logged);
 portalSetVisible("adminPanel",isAdmin);portalSetVisible("adminNav",isAdmin);portalSetVisible("adminNavMobile",isAdmin);
 if(!logged){if(portalRealtime){db.removeChannel(portalRealtime);portalRealtime=null;}return;}
 document.getElementById("studentWelcomeName").textContent=profile?.display_name||profile?.username||"طالب Seal X1";
 await Promise.all([portalLoadStudentStats(),portalLoadCommunity(),portalLoadStudentSupport()]);
 if(isAdmin)await Promise.all([portalLoadAdminUsers(),portalLoadReports(),portalLoadAdminAnnouncements(),portalLoadAdminCommunity()]);
 if(portalRealtime)db.removeChannel(portalRealtime);
 portalRealtime=db.channel("seal-portal-"+user.id)
  .on("postgres_changes",{event:"*",schema:"public",table:"community_messages"},()=>{portalLoadCommunity();portalLoadTeacherCommunity();portalLoadAdminCommunity();})
  .on("postgres_changes",{event:"*",schema:"public",table:"admin_messages",filter:isAdmin?undefined:"user_id=eq."+user.id},async()=>{if(isAdmin&&selectedSupportUser)await portalLoadAdminThread(selectedSupportUser);else await portalLoadStudentSupport();})
  .subscribe();
}
window.sealInitPortalSpaces=portalInitSpaces;

document.getElementById("communityForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const input=document.getElementById("communityInput"),body=input.value.trim();if(!body||!window.sealCurrentUser)return;
 const {error}=await db.from("community_messages").insert({user_id:window.sealCurrentUser.id,body});
 if(error){alert("تعذر إرسال الرسالة: "+error.message);return;}input.value="";await portalLoadCommunity();
});
document.getElementById("studentSupportForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const input=document.getElementById("studentSupportInput"),body=input.value.trim(),user=window.sealCurrentUser;if(!body||!user)return;
 const {error}=await db.from("admin_messages").insert({user_id:user.id,sender_id:user.id,body});
 if(error){alert("تعذر إرسال الرسالة: "+error.message);return;}input.value="";await portalLoadStudentSupport();
});
document.getElementById("adminSupportForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const input=document.getElementById("adminSupportInput"),body=input.value.trim(),admin=window.sealCurrentUser;if(!body||!admin||!selectedSupportUser)return;
 const {error}=await db.from("admin_messages").insert({user_id:selectedSupportUser,sender_id:admin.id,body});
 if(error){alert("تعذر إرسال الرد: "+error.message);return;}input.value="";await portalLoadAdminThread(selectedSupportUser);
});
document.getElementById("adminSupportStudent")?.addEventListener("change",e=>portalLoadAdminThread(e.target.value));
document.getElementById("examLogForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const user=window.sealCurrentUser;if(!user)return;
 const title=document.getElementById("examLogTitle").value.trim(),subject=document.getElementById("examLogSubject").value.trim(),score=Number(document.getElementById("examLogScore").value);
 const {error}=await db.from("student_exam_attempts").insert({user_id:user.id,exam_title:title,subject,score,total_score:100});
 if(error){alert("تعذر حفظ النتيجة: "+error.message);return;}e.target.reset();await portalLoadStudentStats();alert("تم حفظ نتيجة الامتحان في سجلك.");
});
document.getElementById("adminAnnouncementForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const user=window.sealCurrentUser;if(!user||window.sealCurrentProfile?.role!=="admin")return;
 const title=document.getElementById("adminAnnouncementTitle").value.trim(),body=document.getElementById("adminAnnouncementBody").value.trim(),pinned=document.getElementById("adminAnnouncementPinned").checked,status=document.getElementById("adminAnnouncementStatus");
 status.textContent="جاري نشر الإعلان...";
 const {error}=await db.from("announcements").insert({title,body,pinned,status:"published",created_by:user.id});
 if(error){status.textContent="تعذر النشر: "+error.message;return;}e.target.reset();status.textContent="تم نشر الإعلان.";await loadAnnouncements();
});
document.getElementById("refreshAdminUsers")?.addEventListener("click",portalLoadAdminUsers);
document.getElementById("refreshAdminReports")?.addEventListener("click",portalLoadReports);
document.getElementById("refreshAdminAnnouncements")?.addEventListener("click",portalLoadAdminAnnouncements);
document.getElementById("refreshAdminCommunity")?.addEventListener("click",portalLoadAdminCommunity);
document.getElementById("adminUsersList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-user]"),edit=e.target.closest("[data-edit-user]");
 if(del){const id=del.dataset.deleteUser;if(!confirm("تأكيد حذف حساب الطالب نهائياً؟ سيتم حذف سجلاته المرتبطة أيضاً."))return;try{await portalAdminCall("delete_user",{user_id:id});await portalLoadAdminUsers();}catch(err){alert(err.message);}return;}
 if(edit){const u=adminUserCache.find(x=>x.id===edit.dataset.editUser);if(!u)return;const name=prompt("الاسم الظاهر:",u.display_name);if(name===null)return;const grade=prompt("الصف الدراسي:",u.grade||"");if(grade===null)return;try{await portalAdminCall("update_student",{user_id:u.id,display_name:name,grade});await portalLoadAdminUsers();}catch(err){alert(err.message);}}
});

document.getElementById("adminAnnouncementsList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-announcement]"),edit=e.target.closest("[data-edit-announcement]");
 if(del){if(!confirm("تأكيد حذف الإعلان؟"))return;const {error}=await db.from("announcements").delete().eq("id",del.dataset.deleteAnnouncement);if(error)alert("تعذر الحذف: "+error.message);else{await portalLoadAdminAnnouncements();await loadAnnouncements();}return;}
 if(edit){const {data:a}=await db.from("announcements").select("id,title,body").eq("id",edit.dataset.editAnnouncement).maybeSingle();if(!a)return;const title=prompt("عنوان الإعلان:",a.title);if(title===null)return;const body=prompt("تفاصيل الإعلان:",a.body||"");if(body===null)return;const {error}=await db.from("announcements").update({title:title.trim(),body:body.trim()}).eq("id",a.id);if(error)alert("تعذر التعديل: "+error.message);else{await portalLoadAdminAnnouncements();await loadAnnouncements();}}
});
document.getElementById("adminCommunityList")?.addEventListener("click",async e=>{
 const b=e.target.closest("[data-delete-community]");if(!b)return;if(!confirm("حذف الرسالة من المحادثة الجماعية؟"))return;
 const {error}=await db.from("community_messages").delete().eq("id",b.dataset.deleteCommunity);
 if(error)alert("تعذر حذف الرسالة: "+error.message);else await portalLoadAdminCommunity();
});

document.getElementById("adminReportsList")?.addEventListener("click",async e=>{
 const b=e.target.closest("[data-resolve-report]");if(!b)return;
 const {error}=await db.from("reports").update({status:"resolved"}).eq("id",b.dataset.resolveReport);
 if(error)alert("تعذر تحديث البلاغ: "+error.message);else await portalLoadReports();
});
document.addEventListener("click",async e=>{
 const b=e.target.closest("[data-mark-video]");if(!b)return;
 const user=window.sealCurrentUser;if(!user){document.getElementById("accountOpen").click();alert("سجّل الدخول أولاً لحفظ تقدمك.");return;}
 const v=academyVideos.find(x=>x.id===b.dataset.markVideo);if(!v)return;
 const {error}=await db.from("student_video_progress").upsert({user_id:user.id,video_id:v.id,title:v.title,subject:v.subject,completed:true,updated_at:new Date().toISOString()},{onConflict:"user_id,video_id"});
 if(error){alert("تعذر تسجيل المشاهدة: "+error.message);return;}
 b.textContent="✓ تمت إضافته لإنجازاتك";b.disabled=true;await portalLoadStudentStats();
});
if(db){
 db.auth.getUser().then(async({data:{user}})=>{
  if(user){const {data:profile}=await db.from("profiles").select("username,display_name,role,grade").eq("id",user.id).maybeSingle();await portalInitSpaces(user,profile);}
 });
}

/* Teacher-only workspace and contextual platform guide. */
const sealBaseInit=window.sealInitPortalSpaces;
window.sealInitPortalSpaces=async function(user,profile){
 await sealBaseInit?.(user,profile);
 const role=profile?.role||"student";
 const logged=!!user;
 const student=logged&&role==="student";
 const teacher=logged&&role==="teacher";
 const admin=logged&&role==="admin";
 portalSetVisible("studentSpace",student);portalSetVisible("studentNav",student);portalSetVisible("studentNavMobile",student);
 portalSetVisible("teacherSpace",teacher);portalSetVisible("teacherNav",teacher);portalSetVisible("teacherNavMobile",teacher);
 portalSetVisible("learnAtYourPace",student);
 portalSetVisible("studentAssistant",student);portalSetVisible("teacherAssistant",teacher);
 portalSetVisible("adminPanel",admin);portalSetVisible("adminNav",admin);portalSetVisible("adminNavMobile",admin);
 if(student)portalBuildKnowledge("student");if(teacher)portalBuildKnowledge("teacher");
 if(logged)await loadResources();
 if(teacher){
  const name=document.getElementById("teacherWelcomeName");
  if(name)name.textContent="مرحباً، "+(profile?.display_name||profile?.username||"معلم");
  await Promise.all([portalLoadTeacherResources(),portalLoadTeacherAnnouncements(),portalLoadTeacherCommunity()]);
 }
};

async function portalLoadTeacherResources(){
 const box=document.getElementById("teacherResourcesList");if(!box||!window.sealCurrentUser)return;
 const {data,error}=await db.from("resources").select("id,title,description,status,external_url,file_path,created_at").eq("created_by",window.sealCurrentUser.id).order("created_at",{ascending:false}).limit(100);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل المصادر: '+portalEsc(error.message)+'</p>';return;}
 box.innerHTML=data?.length?data.map(r=>'<article class="admin-report"><div><b>'+portalEsc(r.title)+'</b><small>'+portalEsc(r.status)+' · '+portalEsc(portalTime(r.created_at))+'</small></div><p>'+portalEsc(r.description||r.external_url||r.file_path||"")+'</p><div class="admin-inline-actions"><button data-edit-resource="'+portalEsc(r.id)+'">تعديل</button><button class="danger-action" data-delete-resource="'+portalEsc(r.id)+'">حذف</button></div></article>').join(""):'<p class="resource-loading">لم تضف أي مصادر بعد.</p>';
}
async function portalLoadTeacherAnnouncements(){
 const box=document.getElementById("teacherAnnouncementsList");if(!box||!window.sealCurrentUser)return;
 const {data,error}=await db.from("announcements").select("id,title,body,status,pinned,created_at").eq("created_by",window.sealCurrentUser.id).order("created_at",{ascending:false}).limit(80);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل إعلاناتك.</p>';return;}
 box.innerHTML=data?.length?data.map(a=>'<article class="admin-report"><div><b>'+portalEsc(a.title)+'</b><small>'+portalEsc(a.status)+' · '+portalEsc(portalTime(a.created_at))+'</small></div><p>'+portalEsc(a.body||"")+'</p><div class="admin-inline-actions"><button data-edit-teacher-announcement="'+portalEsc(a.id)+'">تعديل</button><button class="danger-action" data-delete-teacher-announcement="'+portalEsc(a.id)+'">حذف</button></div></article>').join(""):'<p class="resource-loading">لم تنشر أي إعلانات بعد.</p>';
}
document.getElementById("teacherAnnouncementForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const user=window.sealCurrentUser;if(!user||window.sealCurrentProfile?.role!=="teacher")return;
 const title=document.getElementById("teacherAnnouncementTitle").value.trim(),body=document.getElementById("teacherAnnouncementBody").value.trim(),pinned=document.getElementById("teacherAnnouncementPinned").checked,status=document.getElementById("teacherAnnouncementStatus");
 status.textContent="جاري نشر الإعلان...";
 const {error}=await db.from("announcements").insert({title,body,pinned,status:"published",created_by:user.id});
 if(error){status.textContent="تعذر النشر: "+error.message;return;}
 e.target.reset();status.textContent="تم نشر الإعلان.";await Promise.all([loadAnnouncements(),portalLoadTeacherAnnouncements()]);
});
document.getElementById("teacherResourceForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const user=window.sealCurrentUser;if(!user||window.sealCurrentProfile?.role!=="teacher")return;
 const title=document.getElementById("teacherResourceTitle").value.trim(),description=document.getElementById("teacherResourceDescription").value.trim(),subject=document.getElementById("teacherResourceSubject").value.trim(),externalUrl=document.getElementById("teacherResourceUrl").value.trim(),file=document.getElementById("teacherResourceFile").files?.[0],status=document.getElementById("teacherResourceStatus");
 if(!file&&!externalUrl){status.textContent="ارفع ملفاً أو أضف رابطاً خارجياً.";return;}
 if(externalUrl && !externalUrl.startsWith("https://") && !externalUrl.startsWith("http://")){status.textContent="الرابط لازم يبدأ بـ https:// أو http://";return;}
 if(file&&file.size>20*1024*1024){status.textContent="الحد الأقصى لحجم الملف 20 ميجابايت.";return;}
 status.textContent="جاري رفع المصدر...";
 let filePath=null;
 try{
  if(file){
   const safeName=file.name.replace(/[^a-zA-Z0-9._-]/g,"_");
   filePath="teachers/"+user.id+"/"+Date.now()+"-"+safeName;
   const {error:uploadError}=await db.storage.from("resources").upload(filePath,file,{upsert:false,contentType:file.type||"application/octet-stream"});
   if(uploadError)throw uploadError;
  }
  const {error}=await db.from("resources").insert({title,description,teacher_name:window.sealCurrentProfile?.display_name||window.sealCurrentProfile?.username||"معلم",file_path:filePath,external_url:externalUrl||null,status:"published",verified:true,keywords:subject?[subject]:[],view_count:0,created_by:user.id});
  if(error){if(filePath)await db.storage.from("resources").remove([filePath]);throw error;}
  e.target.reset();status.textContent="تمت إضافة المصدر ونشره للطلاب.";await Promise.all([portalLoadTeacherResources(),loadResources()]);
 }catch(err){status.textContent="تعذر إضافة المصدر: "+(err.message||"خطأ غير معروف");}
});
document.getElementById("refreshTeacherResources")?.addEventListener("click",portalLoadTeacherResources);
document.getElementById("refreshTeacherAnnouncements")?.addEventListener("click",portalLoadTeacherAnnouncements);
document.getElementById("teacherResourcesList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-resource]"),edit=e.target.closest("[data-edit-resource]");
 if(del){
  if(!confirm("حذف هذا المصدر نهائياً؟"))return;
  const {data:r}=await db.from("resources").select("file_path").eq("id",del.dataset.deleteResource).maybeSingle();
  const {error}=await db.from("resources").delete().eq("id",del.dataset.deleteResource);
  if(error)alert("تعذر الحذف: "+error.message);
  else{if(r?.file_path)await db.storage.from("resources").remove([r.file_path]);await Promise.all([portalLoadTeacherResources(),loadResources()]);}
  return;
 }
 if(edit){
  const {data:r,error}=await db.from("resources").select("id,title,description,external_url").eq("id",edit.dataset.editResource).maybeSingle();if(error||!r)return;
  const title=prompt("عنوان المصدر:",r.title);if(title===null)return;
  const description=prompt("الوصف:",r.description||"");if(description===null)return;
  const external_url=prompt("الرابط الخارجي:",r.external_url||"");if(external_url===null)return;
  const {error:updateError}=await db.from("resources").update({title:title.trim(),description:description.trim(),external_url:external_url.trim()||null}).eq("id",r.id);
  if(updateError)alert("تعذر التعديل: "+updateError.message);else await Promise.all([portalLoadTeacherResources(),loadResources()]);
 }
});
document.getElementById("teacherAnnouncementsList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-teacher-announcement]"),edit=e.target.closest("[data-edit-teacher-announcement]");
 if(del){if(!confirm("حذف الإعلان؟"))return;const {error}=await db.from("announcements").delete().eq("id",del.dataset.deleteTeacherAnnouncement);if(error)alert("تعذر الحذف: "+error.message);else await Promise.all([portalLoadTeacherAnnouncements(),loadAnnouncements()]);return;}
 if(edit){const {data:a,error}=await db.from("announcements").select("id,title,body").eq("id",edit.dataset.editTeacherAnnouncement).maybeSingle();if(error||!a)return;const title=prompt("عنوان الإعلان:",a.title);if(title===null)return;const body=prompt("التفاصيل:",a.body||"");if(body===null)return;const {error:updateError}=await db.from("announcements").update({title:title.trim(),body:body.trim()}).eq("id",a.id);if(updateError)alert("تعذر التعديل: "+updateError.message);else await Promise.all([portalLoadTeacherAnnouncements(),loadAnnouncements()]);}
});

function portalOpenDetails(selector){
 const el=document.querySelector(selector);if(!el)return;
 const d=el.closest("details");if(d)d.open=true;
 el.scrollIntoView({behavior:"smooth",block:"center"});
}
function portalAssistantAnswer(question,role){
 const q=question.toLowerCase();
 if(role==="teacher"){
  if(/اعلان|إعلان|announcement/.test(q)){portalOpenDetails("#teacherAnnouncementForm");return "إضافة الإعلان من مجلد المعلمين: افتح بطاقة «إضافة إعلان للطلاب»، اكتب العنوان والتفاصيل، ثم اضغط «نشر الإعلان». الإعلان سيظهر للطلاب مباشرة.";}
  if(/pdf|بى دى اف|بي دي اف|ملف|مصدر|رفع/.test(q)){portalOpenDetails("#teacherResourceForm");return "رفع ملف: افتح بطاقة «إضافة ملف أو مصدر»، اكتب العنوان والوصف، اختَر PDF من جهازك أو أضف رابطاً خارجياً، ثم اضغط «إضافة إلى المنصة». الحد الأقصى 20 ميجابايت.";}
  if(/تعديل|حذف|مصادري|ملفاتي|مصادر/.test(q)){portalOpenDetails("#teacherResourcesList");return "إدارة المصادر من بطاقة «مصادري المنشورة». ستجد زري التعديل والحذف بجوار كل مصدر.";}
  if(/إعلاناتي|اعلاناتي/.test(q)){portalOpenDetails("#teacherAnnouncementsList");return "إعلاناتك في بطاقة «إعلاناتي»، ويمكنك تعديلها أو حذفها."}
  if(/افتح.*(qureo|كيريو)|افتح منصة/.test(q)&&/qureo|كيريو/.test(q)){window.open("https://me-portal.qureo.education/login","_blank","noopener,noreferrer");portalOpenDetails("#qureo");return "فتحت منصة QUREO الرسمية في تبويب جديد.";}
  if(/qureo|كيريو/.test(q)){portalOpenDetails("#qureo");return "لفتح منصة QUREO الرسمية اضغط رابط «افتح منصة QUREO الرسمية» في قسم QUREO. إضافة ملفات وشروحات متعلقة بها تتم من بطاقة «إضافة ملف أو مصدر».";}
  if(/رتبة|طالب|حساب|ادمن|إدارة/.test(q))return "إدارة الحسابات وتغيير رتبة طالب إلى معلم من اختصاص حساب المدير فقط.";
 }else{
  if(/اتعلم|تقدم|إنجاز|انجاز|تقييم|مشاهدات|نتيجة/.test(q)){portalOpenDetails("#studentVideosDone");return "دي مساحة «اتعلم على مهلك». هتلاقي عدد الفيديوهات والامتحانات المسجلة وتقييم تقدمك وأيام النشاط.";}
  if(/فيديو|شرح|درس|يوتيوب/.test(q)){
   const terms=q.split(/\s+/).filter(x=>x.length>2&&!["افتح","فيديو","شرح","عايز","من","فضلك"].includes(x));
   const match=terms.length?academyVideos.find(v=>terms.some(t=>(v.title+" "+v.subject+" "+v.teacher).toLowerCase().includes(t))):null;
   const lib=document.querySelector(".library-collapsible");if(lib)lib.open=true;
   if(match){academyState.subject=match.subject;academyState.teacher="all";academyState.kind="all";academyState.activeVideo=match.id;academyRender();portalOpenDetails("#academyFeatured");return "لقيت الفيديو الأقرب لطلبك: "+match.title+". فتحته في مشغل المكتبة.";}
   portalOpenDetails("#academyVideoGrid");return "فتحت مكتبة الفيديوهات. اختار المادة ثم المدرس أو نوع الفيديو.";
  }
  if(/إعلان|اعلان|قرار/.test(q)){portalOpenDetails("#announcements .empty-panel");return "إعلانات المدرسة وقراراتها في قسم الإعلانات أعلى الصفحة. فتحت لك القسم.";}
  if(/افتح.*(كيريو|qureo)|افتح منصة/.test(q)&&/كيريو|qureo/.test(q)){window.open("https://me-portal.qureo.education/login","_blank","noopener,noreferrer");portalOpenDetails("#qureo");return "فتحت منصة QUREO الرسمية في تبويب جديد.";}
   if(/كيريو|qureo|برمج/.test(q)){portalOpenDetails("#qureo");return "مركز QUREO موجود أعلى المكتبة. فتحت لك مكانه.";}
  if(/محادث|شات|رسالة|زملاء/.test(q)){portalOpenDetails("#communityMessages");return "المحادثة الجماعية موجودة في مساحة الطلاب، افتح بطاقة الحديث الجماعي.";}
  if(/ملف|pdf|مكتبة|مصدر/.test(q)){const library=document.querySelector(".library-collapsible");if(library)library.open=true;portalOpenDetails("#library");return "المكتبة التعليمية فيها المواد والمدرسين والفيديوهات، والملفات المنشورة تظهر أسفلها.";}
 }
 const terms=q.split(/\s+/).filter(x=>x.length>2);
 const candidates=[...document.querySelectorAll("main h1,main h2,main h3,main h4,main a,main button,main summary")].filter(el=>el.offsetParent!==null&&!el.closest("#adminPanel"));
 let best=null,score=0;
 for(const el of candidates){const t=(el.innerText||el.textContent||"").toLowerCase();const n=terms.reduce((v,w)=>v+(t.includes(w)?1:0),0);if(n>score){best=el;score=n;}}
 if(best&&score){const d=best.closest("details");if(d)d.open=true;best.scrollIntoView({behavior:"smooth",block:"center"});return "أقرب مكان لسؤالك هو «"+(best.innerText||best.textContent).trim()+"». نقلتك إليه؛ لو تقصد حاجة تانية اكتب اسمها بشكل أوضح.";}
 return role==="teacher"?"أقدر أساعدك في الإعلانات ورفع ملفات PDF والمصادر وتعديل المحتوى الذي نشرته.":"أقدر أوصلك للإعلانات وQUREO والمكتبة والفيديوهات ومساحة تقدمك.";
}
function portalBindAssistant(role){
 const form=document.getElementById(role+"AssistantForm"),input=document.getElementById(role+"AssistantInput"),log=document.getElementById(role+"AssistantLog");if(!form||!input||!log)return;
 form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim();if(!q)return;const userLine=document.createElement("p");userLine.className="assistant-user";userLine.textContent=q;log.appendChild(userLine);const answer=document.createElement("p");answer.className="assistant-answer";answer.textContent=portalAssistantAnswer(q,role);log.appendChild(answer);input.value="";log.scrollTop=log.scrollHeight;});
}
portalBindAssistant("student");portalBindAssistant("teacher");

function portalMakeCompact(selector,title,description){
 document.querySelectorAll(selector).forEach(el=>{
  if(el.closest("details.portal-collapsible"))return;
  const d=document.createElement("details");d.className="portal-collapsible";
  const s=document.createElement("summary");s.innerHTML='<span><b>'+portalEsc(title||el.querySelector(".portal-card-heading h3,h3,h4")?.textContent||"تفاصيل القسم")+'</b><small>'+portalEsc(description||"اضغط لعرض المحتوى")+'</small></span><span class="assistant-chevron">⌄</span>';
  const body=document.createElement("div");body.className="portal-collapsible-body";
  el.parentNode.insertBefore(d,el);d.appendChild(s);d.appendChild(body);body.appendChild(el);
 });
}
portalMakeCompact("#library #academyFeatured","الفيديو المختار","افتح المشغل والوصف");
portalMakeCompact("#library #academyPlaylists","قوائم التشغيل","افتح قوائم الشرح الكاملة");
portalMakeCompact("#library #academyVideoGrid","فيديوهات المادة","اضغط لعرض الفيديوهات المتاحة");
portalMakeCompact("#studentSpace .portal-card","أداة الطالب","اضغط لفتح المحادثة أو السجل");
portalMakeCompact("#teacherSpace .portal-card","أداة المعلم","اضغط لفتح الإضافة أو الإدارة");
portalMakeCompact("#adminPanel .portal-card","أداة الإدارة","اضغط لفتح التفاصيل");
portalMakeCompact("#learningProgressContent .progress-dashboard","إحصاءات تقدمك","مشاهدات وامتحانات وتقييم النشاط");
portalMakeCompact("#learningProgressContent .progress-detail","تفاصيل اتعلم على مهلك","طريقة حساب مؤشر التقدم");
portalMakeCompact("#adminPanel .admin-stats","ملخص الإدارة","أرقام الحسابات والنشاط");

document.getElementById("adminUsersList")?.addEventListener("click",async e=>{
 const button=e.target.closest("[data-save-role]");if(!button)return;
 const id=button.dataset.saveRole,select=document.querySelector('[data-role-user="'+id+'"]');
 if(!select)return;
 const role=select.value;
 if(!confirm(role==="teacher"?"تأكيد تحويل هذا الحساب إلى رتبة معلم؟":"تأكيد إعادة الحساب إلى رتبة طالب؟"))return;
 button.disabled=true;
 try{await portalAdminCall("set_role",{user_id:id,role});await portalLoadAdminUsers();}
 catch(error){alert(error.message);}
 finally{button.disabled=false;}
});

async function portalLoadTeacherCommunity(){
 const box=document.getElementById("teacherCommunityMessages");if(!box||!window.sealCurrentUser)return;
 const [messages,profiles]=await Promise.all([
  db.from("community_messages").select("id,user_id,body,created_at").order("created_at",{ascending:false}).limit(80),
  db.from("community_profiles_public").select("id,display_name,username")
 ]);
 if(messages.error||profiles.error){box.innerHTML='<p class="resource-loading">تعذر تحميل المحادثة.</p>';return;}
 const names=new Map((profiles.data||[]).map(p=>[p.id,p.display_name||p.username||"عضو"]));
 box.innerHTML=(messages.data||[]).reverse().map(m=>'<div class="chat-bubble '+(m.user_id===window.sealCurrentUser.id?'mine':'')+'"><div class="chat-bubble-meta">'+portalEsc(names.get(m.user_id)||"عضو")+' · '+portalEsc(portalTime(m.created_at))+'</div><p>'+portalEsc(m.body)+'</p></div>').join("")||'<p class="resource-loading">ابدأ أول نقاش جماعي.</p>';
 box.scrollTop=box.scrollHeight;
}
document.getElementById("teacherCommunityForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const input=document.getElementById("teacherCommunityInput"),body=input.value.trim(),user=window.sealCurrentUser;if(!body||!user||window.sealCurrentProfile?.role!=="teacher")return;
 const {error}=await db.from("community_messages").insert({user_id:user.id,body});if(error){alert("تعذر إرسال الرسالة: "+error.message);return;}input.value="";await portalLoadTeacherCommunity();
});
document.getElementById("adminCommunityForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const input=document.getElementById("adminCommunityInput"),body=input.value.trim(),user=window.sealCurrentUser;if(!body||!user||window.sealCurrentProfile?.role!=="admin")return;
 const {error}=await db.from("community_messages").insert({user_id:user.id,body});if(error){alert("تعذر إرسال الرسالة: "+error.message);return;}input.value="";await portalLoadAdminCommunity();
});

/* A small in-memory index of the controls and content visible to each role. */
window.sealPlatformKnowledge={student:[],teacher:[]};
function portalBuildKnowledge(role){
 const visibleSections=[...document.querySelectorAll("main section:not([hidden])")];
 const nodes=visibleSections.flatMap(section=>[...section.querySelectorAll("h1,h2,h3,h4,summary,button,a,label")]);
 window.sealPlatformKnowledge[role]=nodes.filter(el=>el.offsetParent!==null&&!el.closest("#adminPanel")).map(el=>({
  label:(el.innerText||el.textContent||"").trim().replace(/\s+/g," ").slice(0,180),
  section:el.closest("section")?.id||"",
  href:el.getAttribute("href")||""
 })).filter(x=>x.label);
}
const sealAssistantAnswerBase=portalAssistantAnswer;
portalAssistantAnswer=function(question,role){
 const answer=sealAssistantAnswerBase(question,role);
 portalBuildKnowledge(role);
 return answer;
};

document.querySelector(".learn-pace-link")?.addEventListener("click",e=>{
 if(!window.sealCurrentUser){e.preventDefault();document.getElementById("accountOpen")?.click();alert("سجّل الدخول أولاً لعرض تقدمك الشخصي.");}
});
portalMakeCompact("#announcements .empty-panel","الإعلانات والقرارات","اضغط لعرض الإعلانات المنشورة");
portalMakeCompact("#qureo .feature-card","قسم تعليمي","اضغط لعرض التفاصيل");
