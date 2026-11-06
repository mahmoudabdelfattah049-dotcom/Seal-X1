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
async function loadSchoolAnnouncements(){
 const panel=document.getElementById("schoolAnnouncementsFeed");
 if(!panel)return;
 panel.setAttribute("aria-busy","true");
 try{
  if(!db)throw new Error("خدمة قاعدة البيانات لم تبدأ.");
  const {data,error}=await db.from("school_announcements")
   .select("id,title,body,is_pinned,published_at,created_at")
   .eq("status","published")
   .order("is_pinned",{ascending:false})
   .order("published_at",{ascending:false})
   .order("created_at",{ascending:false})
   .limit(30);
  if(error)throw error;
  if(!Array.isArray(data)||data.length===0){
   panel.classList.remove("live-list");
   setPanelState(panel,"لا توجد إعلانات منشورة حالياً","ستظهر هنا إعلانات المدرسة فور نشرها.");
   return;
  }
  panel.classList.add("live-list");
  panel.innerHTML=data.map(item=>'<article class="live-item"><div class="live-item-top"><span class="live-tag">'+(item.is_pinned?"إعلان مهم":"إعلان المدرسة")+'</span><time>'+escapeHTML(dateLabel(item.published_at||item.created_at))+'</time></div><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.body)+'</p></article>').join("");
 }catch(error){
  console.error("School announcements feed:",error);
  panel.classList.remove("live-list");
  setPanelState(panel,"تعذر تحميل الإعلانات","حدث خطأ أثناء الاتصال بخدمة الإعلانات. حاول التحديث بعد قليل.");
 }finally{
  panel.setAttribute("aria-busy","false");
 }
}

// One read path refreshes the public feed and the active staff workspace.
async function refreshSchoolAnnouncementViews(){
 await loadSchoolAnnouncements();
 const role=window.sealCurrentProfile?.role;
 if(role==="admin")await portalLoadSchoolAdminAnnouncements();
 else if(role==="teacher")await portalLoadSchoolTeacherAnnouncements();
}
let schoolAnnouncementsRealtime=null;
if(db){
 schoolAnnouncementsRealtime=db.channel("school-announcements-v1")
  .on("postgres_changes",{event:"*",schema:"public",table:"school_announcements"},refreshSchoolAnnouncementViews)
  .subscribe(status=>console.info("School announcements realtime:",status));
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
// Load immediately, then refresh all destinations every 20 seconds as a Realtime fallback.
refreshSchoolAnnouncementViews();
if(db)loadResources();
setInterval(()=>{if(document.visibilityState==="visible")refreshSchoolAnnouncementViews();},20000);
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")refreshSchoolAnnouncementViews();});


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
  const {data:profile}=await db.from("profiles").select("username,display_name,role,grade,teacher_full_name,teacher_subject,teacher_verified").eq("id",user.id).maybeSingle();
  if(profile?.role==="admin"){
   try{
    let deviceToken=localStorage.getItem("seal_admin_device_v1");
    if(!deviceToken){const bytes=crypto.getRandomValues(new Uint8Array(32));deviceToken=Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");localStorage.setItem("seal_admin_device_v1",deviceToken);}
    const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(deviceToken));
    const deviceHash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,"0")).join("");
    await portalAdminCall("check_admin_device",{device_hash:deviceHash});
   }catch(deviceError){
    await db.auth.signOut();
    authForm.hidden=false;authSession.hidden=true;
    setAuthMessage(deviceError.message||"تم رفض الدخول من هذا الجهاز. اطلب فتح تسجيل الدخول لحساب الإدارة.","error");
    return;
   }
  }
  authForm.hidden=true;authSession.hidden=false;
  document.getElementById("accountOpen").hidden=true;
  document.getElementById("authSessionName").textContent=profile?.display_name||profile?.username||user.user_metadata?.username||"طالب Seal X1";
  authHeading.textContent=profile?.role==="admin"?"أهلاً بك يا مدير المنصة":"تم تسجيل الدخول";
  authSubheading.textContent=profile?.role==="admin"?"صلاحيات الإدارة الكاملة مفعّلة":profile?.role==="teacher"?(profile.teacher_verified?"معلم موثق — "+profile.teacher_subject:"حساب معلم غير موثق بعد"):"حسابك متصل وجاهز لحفظ تقدمك";
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
  db.from("community_profiles_public").select("id,display_name,username,role,teacher_verified,teacher_full_name,teacher_subject")
 ]);
 if(messages.error||profiles.error){box.innerHTML='<p class="resource-loading">تعذر تحميل المحادثة حالياً.</p>';return;}
 const names=new Map((profiles.data||[]).map(p=>[p.id,{name:p.teacher_verified?(p.teacher_full_name||p.display_name||p.username):p.display_name||p.username||"طالب",verified:p.teacher_verified===true}]));
 const rows=(messages.data||[]).reverse().map(x=>({...x,sender_id:x.user_id,sender_name:names.get(x.user_id)?.name||"طالب",verified:names.get(x.user_id)?.verified||false}));
 box.innerHTML=rows.length?rows.map(row=>'<div class="chat-bubble"><div class="chat-bubble-meta">'+portalEsc(row.sender_name)+(row.verified?' <span class="verified-teacher-badge">✓ موثق</span>':"")+' · '+portalEsc(portalTime(row.created_at))+'</div><p>'+portalEsc(row.body)+'</p></div>').join(""):'<p class="resource-loading">لسه مفيش رسائل. ابدأ أول نقاش.</p>';
 box.scrollTop=box.scrollHeight;
}
async function portalLoadStudentSupport(){
 const box=document.getElementById("studentSupportMessages");if(!box||!window.sealCurrentUser)return;
 const {data,error}=await db.from("admin_messages").select("id,user_id,sender_id,body,created_at").eq("user_id",window.sealCurrentUser.id).order("created_at").limit(100);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل رسائلك.</p>';return;}
 box.innerHTML=portalMessageMarkup(data,window.sealCurrentUser.id,false);box.scrollTop=box.scrollHeight;
}
async function portalLoadStudentExamHistory(){
 const box=document.getElementById("studentExamHistory"),user=window.sealCurrentUser;if(!box||!user)return;
 const {data,error}=await db.from("platform_exam_attempts").select("id,score,total_score,completed_at,grading_status,teacher_feedback,platform_exams(title,subject,exam_type)").eq("user_id",user.id).order("completed_at",{ascending:false}).limit(30);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل سجل الامتحانات.</p>';return;}
 box.innerHTML=data?.length?data.map(x=>{
  const pending=x.grading_status==="pending";
  return '<article class="student-exam-history-row"><div><b>'+portalEsc(x.platform_exams?.title||"امتحان")+'</b><small>'+portalEsc(x.platform_exams?.subject||"")+' · '+portalEsc(portalTime(x.completed_at))+'</small></div><strong class="'+(pending?"pending":"")+'">'+(pending?"بانتظار تصحيح المعلم":Number(x.score)+" / "+Number(x.total_score))+'</strong>'+(x.teacher_feedback?'<p>ملاحظة المعلم: '+portalEsc(x.teacher_feedback)+'</p>':"")+'</article>';
 }).join(""):'<p class="resource-loading">لم تحل أي امتحانات حتى الآن.</p>';
}
document.getElementById("refreshStudentExamHistory")?.addEventListener("click",portalLoadStudentExamHistory);
async function portalLoadStudentStats(){
 const user=window.sealCurrentUser;if(!user)return;
 const [videos,exams]=await Promise.all([
  db.from("student_video_progress").select("video_id,completed,updated_at").eq("user_id",user.id),
  db.from("platform_exam_attempts").select("score,total_score,completed_at,grading_status").eq("user_id",user.id)
 ]);
 if(videos.error||exams.error){console.error(videos.error||exams.error);return;}
 const videoRows=videos.data||[],done=videoRows.filter(x=>x.completed),examRows=exams.data||[];
 const gradedRows=examRows.filter(x=>x.grading_status!=="pending");
 const average=gradedRows.length?gradedRows.reduce((a,x)=>a+(Number(x.score)/Number(x.total_score))*100,0)/gradedRows.length:0;
 const now=Date.now(),days=new Set();
 [...videoRows.map(x=>x.updated_at),...examRows.map(x=>x.completed_at)].forEach(date=>{
  const stamp=date?new Date(date).getTime():0;
  if(stamp&&now-stamp>=0&&now-stamp<=7*86400000)days.add(new Date(date).toISOString().slice(0,10));
 });
 const score=Math.round(Math.min(done.length/20,1)*40+(examRows.length?(average/100)*50:0)+(days.size/7)*10);
 const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
 set("studentVideosDone",done.length);set("studentExamsDone",examRows.length);set("studentScore",score);set("studentActiveDays",days.size);
 const bar=document.getElementById("studentProgressBar");if(bar)bar.style.width=score+"%";
 set("studentProgressLabel","إنجازك الحالي "+score+" من 100");
 window.sealCompletedVideoIds=new Set(done.map(x=>x.video_id));
 window.sealOfficialExamAverage=Math.round(average);
 portalLoadStudentExamHistory();
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
  const teacherSubjects=["اللغة العربية","اللغة الإنجليزية","الرياضيات","العلوم المتكاملة","التاريخ","الجغرافيا","الفلسفة والمنطق","اللغة الفرنسية","اللغة الألمانية","اللغة الإيطالية","اللغة الإسبانية","اللغة الأجنبية الثانية","التربية الدينية","البرمجة والذكاء الاصطناعي","الفيزياء","الكيمياء","الأحياء","الدراسات الاجتماعية","الحاسب الآلي"];
  box.innerHTML=adminUserCache.length?adminUserCache.map(u=>{
   const roleLabel=u.role==="teacher"?"معلم":u.role==="student"?"طالب":u.role;
   const teacherFields=u.role==="teacher"?'<div class="teacher-verify-fields" data-teacher-fields><input data-teacher-full-name maxlength="100" value="'+portalEsc(u.teacher_full_name||"")+'" placeholder="الاسم الكامل للمدرس"><select data-teacher-subject><option value="">اختر المادة</option>'+teacherSubjects.map(s=>'<option value="'+portalEsc(s)+'" '+(u.teacher_subject===s?'selected':'')+'>'+portalEsc(s)+'</option>').join("")+'</select><button type="button" data-verify-teacher="'+portalEsc(u.id)+'">'+(u.teacher_verified?"حفظ بيانات التوثيق":"توثيق المعلم بالعلامة الزرقاء")+'</button>'+(u.teacher_verified?'<button type="button" class="danger-action" data-unverify-teacher="'+portalEsc(u.id)+'">إلغاء التوثيق</button>':"")+'</div>':"";
   return '<article class="admin-user-row" data-admin-user-row="'+portalEsc(u.id)+'"><div class="admin-user-main"><b>'+portalEsc(u.display_name)+'</b>'+(u.teacher_verified?'<span class="verified-teacher-badge">✓ مدرس موثق</span>':'')+'<small>@'+portalEsc(u.username)+' · '+portalEsc(roleLabel)+(u.teacher_verified?' · '+portalEsc(u.teacher_subject):"")+'</small><span>فيديوهات: '+u.videos_completed+' · امتحانات: '+u.exams_completed+' · متوسط الامتحانات: '+(u.exam_average===null?'—':u.exam_average+'%')+' · آخر نشاط: '+portalEsc(portalTime(u.last_sign_in_at))+'</span></div>'+(u.role==="admin"?'<span class="admin-role-tag">ADMIN</span>':u.role==="moderator"?'<span class="admin-role-tag">MODERATOR</span>':'<div class="admin-user-actions"><select data-role-user="'+portalEsc(u.id)+'" aria-label="رتبة الحساب"><option value="student" '+(u.role==="student"?'selected':'')+'>طالب</option><option value="teacher" '+(u.role==="teacher"?'selected':'')+'>معلم</option></select><button type="button" data-save-role="'+portalEsc(u.id)+'">حفظ الرتبة</button><button type="button" data-edit-user="'+portalEsc(u.id)+'">تعديل</button><button type="button" class="danger-action" data-delete-user="'+portalEsc(u.id)+'">حذف</button>'+teacherFields+'</div>')+'</article>';
  }).join(""):'<p class="resource-loading">لا توجد حسابات بعد.</p>';
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

async function portalLoadSchoolAdminAnnouncements(){
 const box=document.getElementById("schoolAdminAnnouncementsList");if(!box)return;
 // The admin cards are compact by default; reveal this list whenever it is refreshed.
 const adminDetails=box.closest("details.portal-collapsible");if(adminDetails)adminDetails.open=true;
 const {data,error}=await db.from("school_announcements").select("id,title,body,is_pinned,status,published_at,created_at").order("created_at",{ascending:false}).limit(80);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل الإعلانات.</p>';return;}
 box.innerHTML=data?.length?data.map(a=>'<article class="admin-report"><div><b>'+portalEsc(a.title)+'</b><small>'+portalEsc(a.status)+' · '+portalEsc(portalTime(a.created_at))+'</small></div><p>'+portalEsc(a.body||"")+'</p><div class="admin-inline-actions"><button data-edit-school-announcement="'+portalEsc(a.id)+'">تعديل</button><button class="danger-action" data-delete-school-announcement="'+portalEsc(a.id)+'">حذف</button></div></article>').join(""):'<p class="resource-loading">لا توجد إعلانات.</p>';
}
async function portalLoadAdminCommunity(){
 const box=document.getElementById("adminCommunityList");if(!box)return;
 const {data,error}=await db.from("community_messages").select("id,user_id,body,created_at,profiles(display_name,username)").order("created_at",{ascending:false}).limit(60);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل رسائل المجموعة.</p>';return;}
 box.innerHTML=data?.length?data.map(m=>'<article class="admin-report"><div><b>'+portalEsc(m.profiles?.display_name||m.profiles?.username||"طالب")+'</b><small>'+portalEsc(portalTime(m.created_at))+'</small></div><p>'+portalEsc(m.body)+'</p><button class="danger-action" data-delete-community="'+portalEsc(m.id)+'">حذف الرسالة</button></article>').join(""):'<p class="resource-loading">لا توجد رسائل.</p>';
}

async function portalLoadEssayInbox(targetId,isAdmin=false){
 const box=document.getElementById(targetId);if(!box||!window.sealCurrentUser)return;
 box.innerHTML='<p class="resource-loading">جاري تحميل إجابات آخر 7 أيام...</p>';
 try{
  const result=await portalAdminCall("list_essay_submissions");
  const rows=result.submissions||[];
  box.innerHTML=rows.length?rows.map(x=>{
   const answers=Array.isArray(x.answers)?x.answers:[];
   const status=x.grading_status==="pending"?"بانتظار التصحيح":"تم التصحيح";
   return '<article class="essay-review-item"><div class="essay-review-head"><b>'+portalEsc(x.exam_title)+'</b><span>'+portalEsc(x.student_name)+' · '+portalEsc(x.subject)+'</span><small>'+portalEsc(portalTime(x.completed_at))+' · '+status+'</small></div>'+answers.map((a,i)=>'<div class="essay-answer"><b>الإجابة '+(i+1)+'</b><p>'+portalEsc(a)+'</p></div>').join("")+'<div class="essay-grade-fields"><label>الدرجة<input type="number" min="0" max="'+Number(x.total_score)+'" step="0.5" value="'+Number(x.score||0)+'" data-essay-score></label><label>ملاحظة للطالب<textarea rows="2" maxlength="2000" data-essay-feedback placeholder="ملاحظات التصحيح...">'+portalEsc(x.teacher_feedback||"")+'</textarea></label></div><div class="essay-review-foot"><small>الدرجة النهائية: '+Number(x.total_score)+'</small><button type="button" data-grade-essay="'+portalEsc(x.id)+'">حفظ التصحيح</button></div></article>';
  }).join(""):'<p class="resource-loading">لا توجد إجابات مقالية خلال آخر 7 أيام.</p>';
 }catch(error){box.innerHTML='<p class="resource-loading">'+portalEsc(error.message)+'</p>';}
}
async function portalLoadTeacherEssays(){return portalLoadEssayInbox("teacherEssayInbox",false);}
async function portalLoadAdminEssays(){return portalLoadEssayInbox("adminEssayInbox",true);}
document.getElementById("teacherEssayInbox")?.addEventListener("click",async e=>{
 const button=e.target.closest("[data-grade-essay]");if(!button)return;
 const row=button.closest(".essay-review-item"),score=Number(row.querySelector("[data-essay-score]").value),feedback=row.querySelector("[data-essay-feedback]").value;
 button.disabled=true;
 try{await portalAdminCall("grade_essay",{attempt_id:button.dataset.gradeEssay,score,feedback});await portalLoadTeacherEssays();alert("تم حفظ التصحيح.");}
 catch(error){alert(error.message);button.disabled=false;}
});
document.getElementById("adminEssayInbox")?.addEventListener("click",async e=>{
 const button=e.target.closest("[data-grade-essay]");if(!button)return;
 const row=button.closest(".essay-review-item"),score=Number(row.querySelector("[data-essay-score]").value),feedback=row.querySelector("[data-essay-feedback]").value;
 button.disabled=true;
 try{await portalAdminCall("grade_essay",{attempt_id:button.dataset.gradeEssay,score,feedback});await portalLoadAdminEssays();alert("تم حفظ التصحيح.");}
 catch(error){alert(error.message);button.disabled=false;}
});
document.getElementById("refreshTeacherEssays")?.addEventListener("click",portalLoadTeacherEssays);
document.getElementById("refreshAdminEssays")?.addEventListener("click",portalLoadAdminEssays);

async function portalInitSpaces(user,profile){
 window.sealCurrentUser=user;window.sealCurrentProfile=profile;
 const role=profile?.role||"student",logged=!!user;
 const isStudent=logged&&role==="student",isTeacher=logged&&role==="teacher",isAdmin=logged&&role==="admin";
 portalSetVisible("studentSpace",isStudent);portalSetVisible("studentNav",isStudent);portalSetVisible("studentNavMobile",isStudent);
 portalSetVisible("teacherSpace",isTeacher);portalSetVisible("teacherNav",isTeacher);portalSetVisible("teacherNavMobile",isTeacher);
 portalSetVisible("adminPanel",isAdmin);portalSetVisible("adminNav",isAdmin);portalSetVisible("adminNavMobile",isAdmin);
 portalSetVisible("learnAtYourPace",isStudent);
 portalSetVisible("studentAssistant",isStudent);portalSetVisible("teacherAssistant",isTeacher);
 if(!logged){if(portalRealtime){db.removeChannel(portalRealtime);portalRealtime=null;}return;}
 if(isStudent){
  const name=document.getElementById("studentWelcomeName");if(name)name.textContent=profile?.display_name||profile?.username||"طالب Seal X1";
  await Promise.all([portalLoadStudentStats(),portalLoadCommunity(),portalLoadStudentSupport(),portalLoadExams(),portalLoadLeaderboard()]);
 }
 if(isTeacher){
  const name=document.getElementById("teacherWelcomeName");if(name)name.textContent="مرحباً، "+(profile?.teacher_verified?(profile.teacher_full_name||profile.display_name):profile?.display_name||profile?.username||"معلم");
  const badge=document.getElementById("teacherWelcomeBadge");if(badge)badge.hidden=!profile?.teacher_verified;
  portalSetVisible("teacherEssayReviewCard",profile?.teacher_verified===true);
  const note=document.getElementById("teacherExamAccessNote");if(note)note.textContent=profile?.teacher_verified?"حسابك موثق في مادة "+profile.teacher_subject+"؛ يمكنك إنشاء امتحانات لهذه المادة فقط.":"إنشاء الامتحانات متاح بعد توثيق حسابك من الإدارة. يمكنك استخدام بقية أدوات المعلم.";
  const examForm=document.getElementById("teacherExamForm");if(examForm){const subject=examForm.querySelector("[data-exam-subject]");if(subject)subject.value=profile?.teacher_subject||"";}
  document.querySelectorAll('#teacherSpace [data-exam-create]').forEach(b=>b.disabled=!profile?.teacher_verified);
  await Promise.all([portalLoadTeacherResources(),portalLoadSchoolTeacherAnnouncements(),portalLoadTeacherCommunity(),...(profile?.teacher_verified?[portalLoadTeacherEssays()]:[])]);
 }
 if(isAdmin)await Promise.all([portalLoadAdminUsers(),portalLoadReports(),portalLoadSchoolAdminAnnouncements(),portalLoadAdminCommunity(),portalLoadAdminEssays()]);
 if(portalRealtime)db.removeChannel(portalRealtime);
 portalRealtime=db.channel("seal-portal-"+user.id)
  .on("postgres_changes",{event:"*",schema:"public",table:"community_messages"},()=>{if(isStudent)portalLoadCommunity();if(isTeacher)portalLoadTeacherCommunity();if(isAdmin)portalLoadAdminCommunity();})
  .on("postgres_changes",{event:"*",schema:"public",table:"admin_messages",filter:isAdmin?undefined:"user_id=eq."+user.id},async()=>{if(isAdmin&&selectedSupportUser)await portalLoadAdminThread(selectedSupportUser);else if(isStudent)await portalLoadStudentSupport();})
  .on("postgres_changes",{event:"*",schema:"public",table:"platform_exam_attempts",filter:isAdmin?undefined:"user_id=eq."+user.id},()=>{if(isStudent){portalLoadStudentStats();portalLoadLeaderboard();}if(isTeacher&&window.sealCurrentProfile?.teacher_verified)portalLoadTeacherEssays();if(isAdmin)portalLoadAdminEssays();})
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
document.getElementById("schoolAdminAnnouncementForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const user=window.sealCurrentUser;if(!user||window.sealCurrentProfile?.role!=="admin")return;
 const title=document.getElementById("schoolAdminAnnouncementTitle").value.trim(),body=document.getElementById("schoolAdminAnnouncementBody").value.trim(),pinned=document.getElementById("schoolAdminAnnouncementPinned").checked,status=document.getElementById("schoolAdminAnnouncementStatus");
 status.textContent="جاري نشر الإعلان...";
 const {error}=await db.from("school_announcements").insert({title,body,is_pinned:pinned,status:"published"});
 if(error){status.textContent="تعذر النشر: "+error.message;return;}e.target.reset();status.textContent="تم نشر الإعلان.";await refreshSchoolAnnouncementViews();
});
document.getElementById("refreshAdminUsers")?.addEventListener("click",portalLoadAdminUsers);
document.getElementById("refreshAdminReports")?.addEventListener("click",portalLoadReports);
document.getElementById("refreshSchoolAdminAnnouncements")?.addEventListener("click",portalLoadSchoolAdminAnnouncements);
document.getElementById("refreshAdminCommunity")?.addEventListener("click",portalLoadAdminCommunity);
document.getElementById("adminUsersList")?.addEventListener("change",e=>{
 const select=e.target.closest("[data-role-user]");if(!select)return;
 const row=select.closest("[data-admin-user-row]"),fields=row?.querySelector("[data-teacher-fields]");
 if(fields)fields.hidden=select.value!=="teacher";
});
document.getElementById("adminUsersList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-user]"),edit=e.target.closest("[data-edit-user]"),saveRole=e.target.closest("[data-save-role]"),verify=e.target.closest("[data-verify-teacher]"),unverify=e.target.closest("[data-unverify-teacher]");
 if(del){const id=del.dataset.deleteUser;if(!confirm("تأكيد حذف الحساب نهائياً؟ سيتم حذف سجلاته المرتبطة أيضاً."))return;try{await portalAdminCall("delete_user",{user_id:id});await portalLoadAdminUsers();}catch(err){alert(err.message);}return;}
 if(saveRole){const id=saveRole.dataset.saveRole,row=saveRole.closest("[data-admin-user-row]"),role=row.querySelector("[data-role-user]").value,current=adminUserCache.find(x=>x.id===id)?.role;if(role===current)return;try{await portalAdminCall("set_role",{user_id:id,role});await portalLoadAdminUsers();}catch(err){alert(err.message);}return;}
 if(verify||unverify){
  const id=(verify||unverify).dataset.verifyTeacher||(unverify?.dataset.unverifyTeacher),row=(verify||unverify).closest("[data-admin-user-row]");
  try{
   if(unverify){await portalAdminCall("verify_teacher",{user_id:id,verified:false});}
   else{
    const fullName=row.querySelector("[data-teacher-full-name]").value.trim(),subject=row.querySelector("[data-teacher-subject]").value;
    if(row.querySelector("[data-role-user]").value!=="teacher")await portalAdminCall("set_role",{user_id:id,role:"teacher"});
    await portalAdminCall("verify_teacher",{user_id:id,teacher_full_name:fullName,teacher_subject:subject,verified:true});
   }
   await portalLoadAdminUsers();
  }catch(err){alert(err.message);}return;
 }
 if(edit){const u=adminUserCache.find(x=>x.id===edit.dataset.editUser);if(!u)return;const name=prompt("الاسم الظاهر:",u.display_name);if(name===null)return;const grade=prompt("الصف الدراسي:",u.grade||"");if(grade===null)return;try{await portalAdminCall("update_student",{user_id:u.id,display_name:name,grade});await portalLoadAdminUsers();}catch(err){alert(err.message);}}
});

document.getElementById("schoolAdminAnnouncementsList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-school-announcement]"),edit=e.target.closest("[data-edit-school-announcement]");
 if(del){if(!confirm("تأكيد حذف الإعلان؟"))return;const {error}=await db.from("school_announcements").delete().eq("id",del.dataset.deleteSchoolAnnouncement);if(error)alert("تعذر الحذف: "+error.message);else{await portalLoadSchoolAdminAnnouncements();await loadSchoolAnnouncements();}return;}
 if(edit){const {data:a}=await db.from("school_announcements").select("id,title,body").eq("id",edit.dataset.editSchoolAnnouncement).maybeSingle();if(!a)return;const title=prompt("عنوان الإعلان:",a.title);if(title===null)return;const body=prompt("تفاصيل الإعلان:",a.body||"");if(body===null)return;const {error}=await db.from("school_announcements").update({title:title.trim(),body:body.trim()}).eq("id",a.id);if(error)alert("تعذر التعديل: "+error.message);else{await portalLoadSchoolAdminAnnouncements();await loadSchoolAnnouncements();}}
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
  if(user){const {data:profile}=await db.from("profiles").select("username,display_name,role,grade,teacher_full_name,teacher_subject,teacher_verified").eq("id",user.id).maybeSingle();await portalInitSpaces(user,profile);}
 });
}

/* Teacher-only workspace and contextual platform guide. */
const sealBaseInit=window.sealInitPortalSpaces;
window.sealInitPortalSpaces=async function(user,profile){
 await sealBaseInit?.(user,profile);
 const role=profile?.role||"student",logged=!!user;
 portalSetVisible("learnAtYourPace",logged&&role==="student");
 portalSetVisible("studentAssistant",logged&&role==="student");
 portalSetVisible("teacherAssistant",logged&&role==="teacher");
 if(logged)await loadResources();
 if(logged&&(role==="student"||role==="teacher"))portalBuildKnowledge(role);
};

async function portalLoadTeacherResources(){
 const box=document.getElementById("teacherResourcesList");if(!box||!window.sealCurrentUser)return;
 const {data,error}=await db.from("resources").select("id,title,description,status,external_url,file_path,created_at").eq("created_by",window.sealCurrentUser.id).order("created_at",{ascending:false}).limit(100);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل المصادر: '+portalEsc(error.message)+'</p>';return;}
 box.innerHTML=data?.length?data.map(r=>'<article class="admin-report"><div><b>'+portalEsc(r.title)+'</b><small>'+portalEsc(r.status)+' · '+portalEsc(portalTime(r.created_at))+'</small></div><p>'+portalEsc(r.description||r.external_url||r.file_path||"")+'</p><div class="admin-inline-actions"><button data-edit-resource="'+portalEsc(r.id)+'">تعديل</button><button class="danger-action" data-delete-resource="'+portalEsc(r.id)+'">حذف</button></div></article>').join(""):'<p class="resource-loading">لم تضف أي مصادر بعد.</p>';
}
async function portalLoadSchoolTeacherAnnouncements(){
 const box=document.getElementById("schoolTeacherAnnouncementsList");if(!box||!window.sealCurrentUser)return;
 // Keep the teacher announcement manager visible after every load.
 const teacherDetails=box.closest("details.portal-collapsible");if(teacherDetails)teacherDetails.open=true;
 const {data,error}=await db.from("school_announcements").select("id,title,body,is_pinned,status,published_at,created_at").eq("created_by",window.sealCurrentUser.id).order("created_at",{ascending:false}).limit(80);
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل إعلاناتك.</p>';return;}
 box.innerHTML=data?.length?data.map(a=>'<article class="admin-report"><div><b>'+portalEsc(a.title)+'</b><small>'+portalEsc(a.status)+' · '+portalEsc(portalTime(a.created_at))+'</small></div><p>'+portalEsc(a.body||"")+'</p><div class="admin-inline-actions"><button data-edit-own-school-announcement="'+portalEsc(a.id)+'">تعديل</button><button class="danger-action" data-delete-own-school-announcement="'+portalEsc(a.id)+'">حذف</button></div></article>').join(""):'<p class="resource-loading">لم تنشر أي إعلانات بعد.</p>';
}
document.getElementById("schoolTeacherAnnouncementForm")?.addEventListener("submit",async e=>{
 e.preventDefault();const user=window.sealCurrentUser;if(!user||window.sealCurrentProfile?.role!=="teacher")return;
 const title=document.getElementById("schoolTeacherAnnouncementTitle").value.trim(),body=document.getElementById("schoolTeacherAnnouncementBody").value.trim(),pinned=document.getElementById("schoolTeacherAnnouncementPinned").checked,status=document.getElementById("schoolTeacherAnnouncementStatus");
 status.textContent="جاري نشر الإعلان...";
 const {error}=await db.from("school_announcements").insert({title,body,is_pinned:pinned,status:"published"});
 if(error){status.textContent="تعذر النشر: "+error.message;return;}
 e.target.reset();status.textContent="تم نشر الإعلان.";await refreshSchoolAnnouncementViews();
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
document.getElementById("refreshSchoolTeacherAnnouncements")?.addEventListener("click",portalLoadSchoolTeacherAnnouncements);
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
document.getElementById("schoolTeacherAnnouncementsList")?.addEventListener("click",async e=>{
 const del=e.target.closest("[data-delete-own-school-announcement]"),edit=e.target.closest("[data-edit-own-school-announcement]");
 if(del){if(!confirm("حذف الإعلان؟"))return;const {error}=await db.from("school_announcements").delete().eq("id",del.dataset.deleteOwnSchoolAnnouncement);if(error)alert("تعذر الحذف: "+error.message);else await Promise.all([portalLoadSchoolTeacherAnnouncements(),loadSchoolAnnouncements()]);return;}
 if(edit){const {data:a,error}=await db.from("school_announcements").select("id,title,body").eq("id",edit.dataset.editOwnSchoolAnnouncement).maybeSingle();if(error||!a)return;const title=prompt("عنوان الإعلان:",a.title);if(title===null)return;const body=prompt("التفاصيل:",a.body||"");if(body===null)return;const {error:updateError}=await db.from("school_announcements").update({title:title.trim(),body:body.trim()}).eq("id",a.id);if(updateError)alert("تعذر التعديل: "+updateError.message);else await Promise.all([portalLoadSchoolTeacherAnnouncements(),loadSchoolAnnouncements()]);}
});

function portalOpenDetails(selector){
 const el=document.querySelector(selector);if(!el)return false;
 let parent=el.parentElement;
 while(parent){if(parent.tagName==="DETAILS")parent.open=true;parent=parent.parentElement;}
 el.scrollIntoView({behavior:"smooth",block:"center"});return true;
}
function portalNormalizeArabic(value){
 return String(value||"").toLowerCase().normalize("NFD")
  .replace(/[\u064B-\u065F\u0670\u0640]/g,"")
  .replace(/[أإآٱ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه")
  .replace(/[ًٌٍَُِّْـ]/g,"").replace(/[؟?!،؛:.,;'"`]/g," ")
  .replace(/\s+/g," ").trim();
}
function portalHasAny(text,terms){return terms.some(term=>text.includes(portalNormalizeArabic(term)));}
function portalVideoMatch(query){
 const q=portalNormalizeArabic(query);
 const stop=new Set(["افتح","شغل","عايز","عاوزه","فيديو","الفيديو","شرح","درس","لي","من","عن","في","على","الماده","ماده","لو","سمحت"]);
 const words=q.split(" ").filter(w=>w.length>1&&!stop.has(w));
 let best=null,bestScore=0;
 (academyVideos||[]).forEach(video=>{
  const title=portalNormalizeArabic(video.title),subject=portalNormalizeArabic(video.subject),teacher=portalNormalizeArabic(video.teacher);
  const hay=(title+" "+subject+" "+teacher);
  let score=0;
  words.forEach(word=>{if(title.includes(word))score+=3;else if(subject.includes(word))score+=2;else if(teacher.includes(word))score+=1;});
  if(words.length)score=score/(words.length*3);
  if(score>bestScore){best=video;bestScore=score;}
 });
 return bestScore>=0.34?best:null;
}
function portalSearchKnowledge(query,role){
 const stop=new Set(["انا","انت","انتي","هو","هي","في","على","من","الي","الى","عن","مع","عايز","عاوزه","محتاج","ممكن","ازاي","كيف","فين","مكان","افتح","روح","وديني","لو","سمحت","هل","ده","دي","دا","ايه","اي","اعمل","اعرف","اقدر","اللي","بقى","بقا","طيب"]);
 const words=portalNormalizeArabic(query).split(" ").filter(w=>w.length>2&&!stop.has(w));
 if(words.length<2)return null;
 const index=window.sealPlatformKnowledge?.[role]||[];
 const ranked=index.map(section=>{
  const body=portalNormalizeArabic(section.fullText+" "+section.title+" "+(section.controls||[]).map(x=>x.label).join(" "));
  const hits=words.filter(word=>body.includes(word)).length;
  return {section,hits,coverage:hits/words.length};
 }).sort((a,b)=>b.hits-a.hits||b.coverage-a.coverage);
 const best=ranked[0],second=ranked[1];
 if(!best||best.hits<2||best.coverage<0.5)return null;
 if(second&&second.hits===best.hits&&Math.abs(second.coverage-best.coverage)<0.18)return {ambiguous:true,choices:[best.section.title,second.section.title]};
 return {section:best.section};
}
function portalAssistantAnswer(question,role){
 const q=portalNormalizeArabic(question);
 const teacher=role==="teacher";
 const admin=role==="admin";
 const how=portalHasAny(q,["ازاي","كيف","طريقه","اعمل","اضيف","انشر","ارفع","اكتب","فين","مكان","افتح","روح","وصل","عايز اوصل"]);
 const open=portalHasAny(q,["افتح","افتحلي","تفتح","روح","وديني","وصلني","اعرض","شغل","ادخل"]);
 const go=(selector)=>portalOpenDetails(selector);
 const result=(text)=>text+(how?" لو تحب، اكتب اسم الجزء أو المادة بالتحديد.":"");
 if(teacher){
  if(portalHasAny(q,["امتحان","امتحانات","اختبار","اختبارات","سؤال"])){
   go("#teacherExamForm");
   if(!window.sealCurrentProfile?.teacher_verified)return "تقدر تشوف معاينة المسارين، لكن إنشاء الامتحانات ومراجعة المقالي يحتاجان توثيق حسابك من الإدارة وتحديد اسمك الكامل ومادتك.";
   return "حسابك موثق لمادة "+window.sealCurrentProfile.teacher_subject+". اختار مسار الاختيار أو المقالي، ثم «تجربة الامتحان» لمعاينة الأسئلة أو «إنشاء امتحان» لبناء امتحان ونشره. لا يمكنك إنشاء امتحان لمادة أخرى.";
  }
  if(portalHasAny(q,["اعلان","اعلانات","تنبيه","قرار"])){
   const manage=portalHasAny(q,["تعديل","حذف","إعلاناتي","اعلاناتي","المنشور","منشور"]);
   go(manage?"#schoolTeacherAnnouncementsList":"#schoolTeacherAnnouncementForm");
   return manage?"إدارة إعلاناتك: افتح بطاقة «إعلاناتي»، وستجد تعديل وحذف بجوار كل إعلان.":"إضافة إعلان: افتح بطاقة «إضافة إعلان للطلاب»، اكتب العنوان والتفاصيل، ويمكنك تحديد أنه إعلان مهم، ثم اضغط «نشر الإعلان».";
  }
  if(portalHasAny(q,["pdf","بى دى اف","بي دي اف","ملف","مصدر","مصادر","مستند","رابط"])){
   const manage=portalHasAny(q,["تعديل","حذف","مصادري","ملفاتي","المنشور","منشور"]);
   go(manage?"#teacherResourcesList":"#teacherResourceForm");
   return manage?"إدارة ملفاتك: افتح «مصادري المنشورة» واستخدم تعديل أو حذف بجوار الملف.":"رفع ملف: افتح «إضافة ملف أو مصدر»، اكتب العنوان والوصف، ثم ارفع PDF أو مستنداً أو أضف رابطاً خارجياً واضغط «إضافة إلى المنصة».";
  }
  if(portalHasAny(q,["كيريو","qureo","برمجه","برمجة"])){
   go("#qureo");if(open)window.open("https://me-portal.qureo.education/login","_blank","noopener,noreferrer");
   return "قسم QUREO فيه رابط المنصة الرسمية. افتحه من الرابط أعلى القسم؛ ولإضافة مذكرة أو شرح متعلق بها استخدم «إضافة ملف أو مصدر».";
  }
  if(portalHasAny(q,["محادثه","شات","رساله","رسائل","جماعي"])){go("#teacherCommunityMessages");return "المحادثة الجماعية داخل مجلد المعلمين، ويمكنك إرسال رسالة لجميع أعضاء المنصة.";}
  if(portalHasAny(q,["حساب","رتبه","طالب","معلم","ادمن","مدير"])){return "تغيير رتب الحسابات وإدارة المستخدمين متاحان لحساب المدير فقط، وليس لحساب المعلم.";}
 }else if(!admin){
  if(portalHasAny(q,["نتيجة الامتحان","درجات الامتحان","درجتي","نتائجي","محاولاتي"])){
   go("#learnAtYourPace");return "درجات الامتحانات المصححة تظهر في «اتعلم على مهلك» ضمن إحصاءات تقدمك وسجل المحاولات.";
  }
  if(portalHasAny(q,["امتحان","امتحانات","اختبار","اختبارات","امتحن","حل امتحان"])){
   go("#studentExamsList");
   return "الامتحانات مقسمة حسب المادة. افتح اسم المادة، ثم افتح الامتحان، أجب عن كل الأسئلة واضغط «تسليم الإجابات». المنصة تصحح الاختيارات وتسجل درجتك تلقائياً في «اتعلم على مهلك».";
  }
  if(portalHasAny(q,["ليدربورد","ترتيب","المتفوقين","الأوائل","اعلي تقييم","اعلى تقييم","المتصدرين"])){
   go("#studentLeaderboardList");document.getElementById("refreshLeaderboard")?.click();
   return "فتحت ترتيب المتفوقين. القائمة تعرض أعلى 10 طلاب حسب تقييم التقدم ونتائج الامتحانات والنشاط.";
  }
  if(portalHasAny(q,["اتعلم","تقدم","انجاز","تقييم","مشاهدات","درجاتي","نتائجي","سجلي"])){
   go("#learnAtYourPace");return "قسم «اتعلم على مهلك» يعرض مشاهدات الفيديوهات ودرجات الامتحانات وعدد أيام نشاطك وتقييمك الحالي. درجات الامتحانات هنا تأتي من امتحانات المنصة المصححة تلقائياً.";
  }
  if(portalHasAny(q,["فيديو","فيديوهات","شرح","درس","يوتيوب","الجبر","الهندسه","الرياضيات","الانجليزي","العربي","علوم","دراسات"])){
   const video=portalVideoMatch(q);
   const lib=document.querySelector(".library-collapsible");if(lib)lib.open=true;
   if(video){
    academyState.subject=video.subject;academyState.teacher="all";academyState.kind="all";academyState.activeVideo=video.id;academyRender();
    go("#academyFeatured");return "وجدت فيديو بعنوان «"+video.title+"» في مادة "+video.subject+" وفتحته في المشغل. لو تقصد درساً آخر اكتب اسم الدرس أو المدرس.";
   }
   go("#academyVideoGrid");
   return "فتحت المكتبة. لم أجد تطابقاً مؤكداً مع اسم الفيديو؛ اكتب اسم الدرس أو المادة أو اسم المدرس لأحدد الفيديو الصحيح بدل ما أفتح لك نتيجة عشوائية.";
  }
  if(portalHasAny(q,["اعلان","اعلانات","قرار","تنبيه","اخبار المدرسه"])){go("#announcements");return "الإعلانات والقرارات موجودة في قسم «الإعلانات والقرارات» أعلى الصفحة.";}
  if(portalHasAny(q,["كيريو","qureo","برمجه","برمجة"])){go("#qureo");if(open)window.open("https://me-portal.qureo.education/login","_blank","noopener,noreferrer");return "قسم QUREO يحتوي رابط المنصة الرسمية ومصادر المساعدة المتاحة.";}
  if(portalHasAny(q,["محادثه","شات","رساله","رسائل","زملاء","جماعي"])){go("#communityMessages");return "المحادثة الجماعية داخل مساحة الطلاب. أما التواصل الخاص فمخصص للإدارة.";}
  if(portalHasAny(q,["شكوي","شكوى","استفسار","خاص","الاداره","الإدارة"])){go("#studentSupportMessages");return "للتواصل الخاص مع الإدارة استخدم بطاقة «تواصل خاص مع الإدارة» داخل مساحة الطلاب.";}
  if(portalHasAny(q,["ملف","pdf","مكتبه","مصدر","مراجع"])){const lib=document.querySelector(".library-collapsible");if(lib)lib.open=true;go("#liveResources");return "الملفات والمصادر المنشورة تظهر في قسم «ملفات المدرسة المنشورة» أسفل المكتبة التعليمية.";}
 }
 const aliases=[
  {id:"announcements",keys:["اعلان","قرار","تنبيه"],title:"الإعلانات والقرارات"},
  {id:"qureo",keys:["كيريو","qureo","برمجه"],title:"مركز QUREO"},
  {id:"library",keys:["مكتبه","فيديو","درس","شرح","ماده"],title:"المكتبة التعليمية"},
  {id:teacher?"teacherExamForm":"studentExamsList",keys:["امتحان","اختبار"],title:"الامتحانات"},
  {id:teacher?"teacherResourcesList":"learnAtYourPace",keys:["تقدم","درجات","انجاز"],title:teacher?"مصادري المنشورة":"اتعلم على مهلك"}
 ];
 const ranked=aliases.map(x=>({...x,score:x.keys.reduce((n,k)=>n+(q.includes(portalNormalizeArabic(k))?1:0),0)})).sort((a,b)=>b.score-a.score);
 if(ranked[0]?.score>=2){go("#"+ranked[0].id);return "القسم الأقرب لطلبك هو «"+ranked[0].title+"»، فتحته لك.";}
 const found=portalSearchKnowledge(q,role);
 if(found?.ambiguous)return "سؤالك ممكن يقصد أكثر من قسم: «"+found.choices.join("» أو «")+"». اكتب اسم القسم المقصود وسأفتحه لك.";
 if(found?.section?.id){go("#"+found.section.id);return "بحثت في دليل الأقسام الظاهرة لرتبتك ووجدت «"+(found.section.title||found.section.id)+"». فتحته لك، وتقدر تسألني عن خطوة محددة داخله.";}
 return result("مش قادر أحدد قصدك بثقة، ومش هفتح قسماً عشوائياً. اكتب اسم الجزء أو المادة أو الإجراء المطلوب بشكل أوضح؛ أقدر أساعدك في الامتحانات، التقدم، المكتبة، الإعلانات، QUREO"+(teacher?"، إنشاء امتحان، الإعلانات ورفع الملفات.":"."));
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
portalMakeCompact("#studentSpace .portal-card",null,"افتح المحادثة أو بيانات القسم");
portalMakeCompact("#teacherSpace .portal-card",null,"افتح الإضافة أو إدارة المحتوى");
portalMakeCompact("#adminPanel .portal-card",null,"افتح تفاصيل هذا القسم");
portalMakeCompact("#learningProgressContent .progress-dashboard","إحصاءات تقدمك","مشاهدات وامتحانات وتقييم النشاط");
portalMakeCompact("#learningProgressContent .progress-detail","طريقة حساب تقييمك","تفاصيل نقاط التقدم والنشاط");
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
  db.from("community_profiles_public").select("id,display_name,username,teacher_verified,teacher_full_name,teacher_subject")
 ]);
 if(messages.error||profiles.error){box.innerHTML='<p class="resource-loading">تعذر تحميل المحادثة.</p>';return;}
 const names=new Map((profiles.data||[]).map(p=>[p.id,{name:p.teacher_verified?(p.teacher_full_name||p.display_name||p.username):p.display_name||p.username||"عضو",verified:p.teacher_verified===true}]));
 box.innerHTML=(messages.data||[]).reverse().map(m=>{const sender=names.get(m.user_id)||{name:"عضو",verified:false};return '<div class="chat-bubble '+(m.user_id===window.sealCurrentUser.id?'mine':'')+'"><div class="chat-bubble-meta">'+portalEsc(sender.name)+(sender.verified?' <span class="verified-teacher-badge">✓ موثق</span>':"")+' · '+portalEsc(portalTime(m.created_at))+'</div><p>'+portalEsc(m.body)+'</p></div>';}).join("")||'<p class="resource-loading">ابدأ أول نقاش جماعي.</p>';
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
 const visibleSections=[...document.querySelectorAll("main section:not([hidden])")].filter(section=>section.offsetParent!==null);
 window.sealPlatformKnowledge[role]=visibleSections.map(section=>{
  const controls=[...section.querySelectorAll("h1,h2,h3,h4,summary,button,a,label,input,select")].map(el=>({
   label:(el.innerText||el.textContent||el.getAttribute("placeholder")||el.getAttribute("aria-label")||"").trim().replace(/\s+/g," ").slice(0,180),
   href:el.getAttribute("href")||"",
   action:el.tagName.toLowerCase()
  })).filter(x=>x.label);
  return {
   id:section.id||"",
   title:section.querySelector("h1,h2")?.textContent?.trim()||"",
   fullText:(section.textContent||"").replace(/\s+/g," ").trim().slice(0,12000),
   controls
  };
 });
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
// Keep public announcements visible: this live output must never be placed inside a closed collapsible.
portalMakeCompact("#qureo .feature-card","قسم تعليمي","اضغط لعرض التفاصيل");

async function portalExamAction(action,payload={}){return await portalAdminCall(action,payload);}
let sealStudentExamType="choice";
async function portalLoadExams(){
 const box=document.getElementById("studentExamsList");if(!box||!window.sealCurrentUser)return;
 box.innerHTML='<p class="resource-loading">جاري تحميل الامتحانات المنشورة...</p>';
 const {data,error}=await db.from("platform_exams").select("id,title,subject,description,duration_minutes,total_points,questions,exam_type,created_at").eq("status","published").eq("exam_type",sealStudentExamType).order("subject").order("created_at",{ascending:false});
 if(error){box.innerHTML='<p class="resource-loading">تعذر تحميل الامتحانات: '+portalEsc(error.message)+'</p>';return;}
 if(!data?.length){box.innerHTML='<p class="resource-loading">لا توجد امتحانات في هذا المسار حالياً.</p>';return;}
 const groups=new Map();data.forEach(exam=>{const subject=exam.subject||"مواد أخرى";if(!groups.has(subject))groups.set(subject,[]);groups.get(subject).push(exam);});
 box.innerHTML=[...groups.entries()].map(([subject,exams])=>'<details class="subject-exam-group"><summary><span><b>'+portalEsc(subject)+'</b><small>'+exams.length+' امتحان</small></span><span class="assistant-chevron">⌄</span></summary><div class="subject-exam-items">'+exams.map(exam=>{
  const questions=Array.isArray(exam.questions)?exam.questions:[];
  const questionMarkup=questions.map((q,i)=>{
   if(exam.exam_type==="essay")return '<fieldset class="exam-question"><legend>'+(i+1)+'. '+portalEsc(q.prompt)+' <small>('+Number(q.points||1)+' درجة)</small></legend><textarea class="essay-student-answer" rows="4" maxlength="5000" placeholder="اكتب إجابتك هنا..." required></textarea></fieldset>';
   return '<fieldset class="exam-question"><legend>'+(i+1)+'. '+portalEsc(q.prompt)+' <small>('+Number(q.points||1)+' درجة)</small></legend>'+(q.options||[]).map((option,n)=>'<label class="exam-option"><input type="radio" name="question-'+i+'" value="'+n+'" required><span>'+portalEsc(option)+'</span></label>').join("")+'</fieldset>';
  }).join("");
  return '<details class="student-exam-card" data-exam-card="'+portalEsc(exam.id)+'"><summary><span><b>'+portalEsc(exam.title)+'</b><small>'+questions.length+' سؤال · '+exam.duration_minutes+' دقيقة مقترحة · '+exam.total_points+' درجة</small></span><span class="assistant-chevron">⌄</span></summary><div class="student-exam-body"><p>'+portalEsc(exam.description||"")+'</p><form class="student-take-exam" data-take-exam="'+portalEsc(exam.id)+'" data-exam-type="'+portalEsc(exam.exam_type)+'">'+questionMarkup+'<button type="submit">'+(exam.exam_type==="essay"?"إرسال الإجابات للمراجعة":"تسليم الإجابات والتصحيح الفوري")+'</button><p class="exam-result" aria-live="polite"></p></form></div></details>';
 }).join("")+'</div></details>').join("");
}
document.querySelectorAll("[data-student-exam-type]").forEach(button=>button.addEventListener("click",()=>{
 sealStudentExamType=button.dataset.studentExamType;
 document.querySelectorAll("[data-student-exam-type]").forEach(b=>b.classList.toggle("active",b===button));
 portalLoadExams();
}));
async function portalLoadLeaderboard(){
 const box=document.getElementById("studentLeaderboardList");if(!box||!window.sealCurrentUser)return;
 box.innerHTML='<p class="resource-loading">جاري حساب الترتيب...</p>';
 try{
  const result=await portalExamAction("get_leaderboard");
  const rows=result.leaderboard||[];
  box.innerHTML=rows.length?rows.map(row=>'<div class="leaderboard-row '+(row.rank===1?"leaderboard-first":"")+'"><span class="leaderboard-rank">'+row.rank+'</span><span class="leaderboard-name">'+portalEsc(row.display_name)+'</span><span class="leaderboard-stats">'+row.videos_completed+' فيديو · '+row.exams_completed+' امتحان</span><b class="leaderboard-rating">'+row.rating+'/100</b></div>').join(""):'<p class="resource-loading">لسه مفيش نتائج كفاية لعرض ترتيب المتفوقين.</p>';
 }catch(error){box.innerHTML='<p class="resource-loading">تعذر تحميل الترتيب: '+portalEsc(error.message)+'</p>';}
}
document.getElementById("refreshStudentExams")?.addEventListener("click",portalLoadExams);
document.getElementById("refreshLeaderboard")?.addEventListener("click",portalLoadLeaderboard);
document.getElementById("studentExamsList")?.addEventListener("submit",async e=>{
 const form=e.target.closest("[data-take-exam]");if(!form)return;e.preventDefault();
 const button=form.querySelector('button[type="submit"]'),status=form.querySelector(".exam-result");
 const isEssay=form.dataset.examType==="essay";
 const questions=[...form.querySelectorAll(".exam-question")];
 const answers=isEssay?questions.map(q=>q.querySelector("textarea")?.value.trim()||""):questions.map((_,i)=>{const picked=form.querySelector('input[name="question-'+i+'"]:checked');return picked?Number(picked.value):-1;});
 if(answers.some(x=>x===""||x===-1)){status.textContent="أكمل إجابة كل الأسئلة قبل الإرسال.";return;}
 button.disabled=true;button.textContent="جاري الإرسال...";
 try{
  const result=await portalExamAction("submit_exam",{exam_id:form.dataset.takeExam,answers});
  status.textContent=isEssay?"تم إرسال إجاباتك بنجاح. حالتها الآن «بانتظار التصحيح»، وستظهر الدرجة بعد مراجعة المعلم.":"نتيجتك: "+result.score+" من "+result.total_score+" ("+result.percentage+"%). تم حفظ الدرجة في تقدمك.";
  form.querySelectorAll("input,textarea,button").forEach(el=>el.disabled=true);
  await Promise.all([portalLoadStudentStats(),portalLoadLeaderboard()]);
 }catch(error){status.textContent="تعذر تسليم الامتحان: "+error.message;button.disabled=false;button.textContent=isEssay?"إرسال الإجابات للمراجعة":"تسليم الإجابات والتصحيح الفوري";}
});
function portalInitExamBuilder(form){
 if(!form||form.dataset.bound)return;form.dataset.bound="1";form.__questions=[];
 const list=form.querySelector("[data-question-list]"),status=form.querySelector("[data-exam-status]");
 const choiceOnly=form.querySelectorAll("[data-choice-only]");
 const syncType=()=>{
  const essay=form.dataset.examType==="essay";
  choiceOnly.forEach(el=>el.hidden=essay);
  const heading=form.querySelector("[data-question-editor-title]");if(heading)heading.textContent=essay?"إضافة سؤال مقالي":"إضافة سؤال اختيار من متعدد";
  const subject=form.querySelector("[data-exam-subject]");
  if(form.id==="teacherExamForm"&&window.sealCurrentProfile?.teacher_verified&&subject)subject.value=window.sealCurrentProfile.teacher_subject||"";
 };
 const render=()=>{list.innerHTML=form.__questions.length?form.__questions.map((q,i)=>'<div class="exam-question-chip"><span><b>سؤال '+(i+1)+'</b> · '+portalEsc(q.prompt)+' ('+q.points+' درجة)</span><button type="button" data-remove-question="'+i+'" aria-label="حذف السؤال">×</button></div>').join(""):'<p class="resource-loading">لم تضف أسئلة بعد.</p>';};
 const add=()=>{
  const prompt=form.querySelector("[data-question-prompt]").value.trim(),essay=form.dataset.examType==="essay";
  let options=[],answerIndex=null;
  if(!essay){
   const rawOptions=[...form.querySelectorAll("[data-question-option]")].map(x=>x.value.trim());
   const lastFilled=rawOptions.map((x,i)=>x?i:-1).reduce((a,b)=>Math.max(a,b),-1);options=rawOptions.slice(0,lastFilled+1);
   answerIndex=Number(form.querySelector("[data-question-answer]").value);
   if(prompt.length<3||options.length<2||options.some(x=>!x)||answerIndex>=options.length){status.textContent="اكتب السؤال واختيارين على الأقل دون ترك فراغ، وحدد الإجابة الصحيحة.";return false;}
  }else if(prompt.length<3){status.textContent="اكتب نص السؤال المقالي أولاً.";return false;}
  const points=Number(form.querySelector("[data-question-points]").value)||1;
  form.__questions.push(essay?{type:"essay",prompt,points:Math.max(1,Math.min(100,points))}:{type:"choice",prompt,options,answerIndex,points:Math.max(1,Math.min(100,points))});
  form.querySelector("[data-question-prompt]").value="";
  form.querySelectorAll("[data-question-option]").forEach(x=>x.value="");
  if(form.querySelector("[data-question-answer]"))form.querySelector("[data-question-answer]").value="0";
  form.querySelector("[data-question-points]").value="1";
  status.textContent="تمت إضافة السؤال. أضف السؤال التالي أو جرّب الامتحان.";
  render();return true;
 };
 form.addEventListener("examtypechange",syncType);
 form.querySelector("[data-add-question]")?.addEventListener("click",add);
 list.addEventListener("click",e=>{const b=e.target.closest("[data-remove-question]");if(!b)return;form.__questions.splice(Number(b.dataset.removeQuestion),1);render();});
 form.addEventListener("submit",async e=>{
  e.preventDefault();const user=window.sealCurrentUser,role=window.sealCurrentProfile?.role,isEssay=form.dataset.examType==="essay";
  if(!user||!["teacher","admin"].includes(role)){status.textContent="إنشاء الامتحانات متاح للمعلمين والإدارة فقط.";return;}
  if(role==="teacher"&&!window.sealCurrentProfile?.teacher_verified){status.textContent="يجب توثيق حساب المعلم قبل إنشاء الامتحانات.";return;}
  if(role==="teacher"&&form.querySelector("[data-exam-subject]").value!==window.sealCurrentProfile.teacher_subject){status.textContent="لا يمكنك إنشاء امتحان خارج مادتك الموثقة.";return;}
  const prompt=form.querySelector("[data-question-prompt]").value.trim();
  if(prompt&&!add())return;
  if(!form.__questions.length){status.textContent="أضف سؤالاً واحداً على الأقل قبل النشر.";return;}
  const payload={title:form.querySelector("[data-exam-title]").value.trim(),subject:form.querySelector("[data-exam-subject]").value.trim(),description:form.querySelector("[data-exam-description]").value.trim(),duration_minutes:Number(form.querySelector("[data-exam-duration]").value)||30,exam_type:isEssay?"essay":"choice",questions:form.__questions};
  const button=form.querySelector('button[type="submit"]');button.disabled=true;status.textContent="جاري إنشاء الامتحان...";
  try{
   const result=await portalExamAction("create_exam",payload);
   form.reset();form.__questions=[];render();status.textContent="تم نشر امتحان «"+result.exam.title+"» في مادة "+result.exam.subject+".";
  }catch(error){status.textContent="تعذر نشر الامتحان: "+error.message;}
  finally{button.disabled=false;syncType();}
 });
 syncType();
}

document.querySelectorAll(".exam-builder-card").forEach(card=>{
 const form=card.querySelector(".exam-builder-form");if(!form||card.dataset.trackBound)return;card.dataset.trackBound="1";
 const tabs=[...card.querySelectorAll("[data-exam-track-tab]")],create=card.querySelector("[data-exam-create]"),preview=card.querySelector("[data-exam-preview]");
 const previewBox=document.createElement("div");previewBox.className="exam-draft-preview";previewBox.hidden=true;previewBox.dataset.examPreviewBox="";form.after(previewBox);
 tabs.forEach(tab=>tab.addEventListener("click",()=>{
  const next=tab.dataset.examTrackTab;
  tabs.forEach(x=>x.classList.toggle("active",x===tab));
  if(form.dataset.examType!==next){form.dataset.examType=next;form.__questions=[];const list=form.querySelector("[data-question-list]");if(list)list.innerHTML='<p class="resource-loading">لم تضف أسئلة بعد.</p>';const status=form.querySelector("[data-exam-status]");if(status)status.textContent="تم اختيار "+(next==="essay"?"مسار المقالي":"مسار الاختيار")+". أضف الأسئلة الخاصة بهذا المسار.";form.dispatchEvent(new Event("examtypechange"));}
  if(create)create.textContent=next==="essay"?"إنشاء امتحان مقالي":"إنشاء امتحان اختيار";
  previewBox.hidden=true;
 }));
 create?.addEventListener("click",()=>{
  if(form.id==="teacherExamForm"&&!window.sealCurrentProfile?.teacher_verified){alert("توثيق حساب المعلم مطلوب قبل إنشاء الامتحانات.");return;}
  form.scrollIntoView({behavior:"smooth",block:"center"});form.querySelector("[data-exam-title]")?.focus();
 });
 preview?.addEventListener("click",()=>{
  const questions=form.__questions||[];
  if(!questions.length){alert("أضف سؤالاً واحداً على الأقل ثم جرّب شكل الامتحان.");form.querySelector("[data-question-prompt]")?.focus();return;}
  const essay=form.dataset.examType==="essay";
  previewBox.innerHTML='<div class="exam-preview-heading"><b>معاينة: '+portalEsc(form.querySelector("[data-exam-title]").value||"امتحان تجريبي")+'</b><span>'+ (essay?"مسار مقالي":"مسار اختيار")+'</span></div>'+questions.map((q,i)=>'<fieldset class="exam-question"><legend>'+(i+1)+'. '+portalEsc(q.prompt)+' ('+q.points+' درجة)</legend>'+(essay?'<textarea rows="3" placeholder="مكان إجابة الطالب" disabled></textarea>':q.options.map(option=>'<div class="exam-option"><span>'+portalEsc(option)+'</span></div>').join(""))+'</fieldset>').join("");
  previewBox.hidden=false;previewBox.scrollIntoView({behavior:"smooth",block:"center"});
 });
});
portalInitExamBuilder(document.getElementById("teacherExamForm"));
portalInitExamBuilder(document.getElementById("adminExamForm"));


document.querySelectorAll('.student-quick-links a[href="#studentExamsList"],.student-quick-links a[href="#studentLeaderboardList"]').forEach(link=>{
 link.addEventListener("click",e=>{e.preventDefault();portalOpenDetails(link.getAttribute("href"));});
});

/* Hero shortcut: open the assistant available to the signed-in role. */
document.getElementById("heroAssistantJump")?.addEventListener("click", function(event) {
 event.preventDefault();
 const candidates = ["studentAssistant", "teacherAssistant"];
 const target = candidates.map(id => document.getElementById(id)).find(el => el && el.getClientRects().length > 0);
 if (target) {
  if (target.tagName === "DETAILS") target.open = true;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
  return;
 }
 document.getElementById("studentAuth")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
