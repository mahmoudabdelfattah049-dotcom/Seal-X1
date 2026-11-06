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
 academyFeatured.innerHTML='<div class="academy-player"><iframe src="https://www.youtube-nocookie.com/embed/'+active.id+'?rel=0" title="'+academyEsc(active.title)+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="academy-feature-info"><div class="academy-video-badges"><span>'+academyEsc(active.kind)+'</span><span>'+academyEsc(active.teacher)+'</span>'+(active.older?'<span class="older-label">محتوى أقدم</span>':'<span class="fresh-label">محتوى تعليمي</span>')+'</div><h4>'+academyEsc(active.title)+'</h4><p>'+academyEsc(active.description)+'</p><a href="https://www.youtube.com/watch?v='+active.id+'" target="_blank" rel="noopener noreferrer">فتح الفيديو على YouTube ↗</a></div>';
 academyGrid.innerHTML=items.map(v=>'<article class="academy-video-card '+(v.id===active.id?"playing":"")+'"><button class="academy-thumb" data-video="'+v.id+'" aria-label="شاهد '+academyEsc(v.title)+'"><img src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt="" loading="lazy"><span class="academy-play">▶</span><span class="academy-duration">'+academyEsc(v.duration)+'</span></button><div class="academy-card-body"><div class="academy-video-badges"><span>'+academyEsc(v.kind)+'</span>'+(v.older?'<span class="older-label">أقدم</span>':'')+'</div><h5>'+academyEsc(v.title)+'</h5><p>'+academyEsc(v.description)+'</p><div class="academy-card-footer"><span>'+academyEsc(v.teacher)+'</span><button data-video="'+v.id+'">'+(v.id===active.id?"يُعرض الآن":"عرض الفيديو")+'</button></div></div></article>').join("");
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
  if(item.file_path){const {data:signed,error:signError}=await db.storage.from("school-files").createSignedUrl(item.file_path,3600);if(!signError&&signed?.signedUrl){href=signed.signedUrl;label="فتح / تحميل الملف";}}
  return '<article class="resource-item"><div class="resource-symbol">▧</div><div class="resource-copy"><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.description||"")+'</p><div class="resource-meta">'+escapeHTML(item.subjects?.name||"مصدر تعليمي")+(item.teacher_name?" · "+escapeHTML(item.teacher_name):"")+'</div></div>'+(href?'<a class="resource-link" href="'+escapeHTML(href)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>':'<span class="resource-pending">الرابط غير متاح</span>')+'</article>';
 }));
 container.innerHTML='<h3 class="school-files-title">ملفات المدرسة المنشورة</h3>'+cards.join("");
}
if(db)Promise.all([loadAnnouncements(),loadResources()]);
else setPanelState(document.querySelector("#announcements .empty-panel"),"تعذر الاتصال","لم يتم تحميل مكتبة الاتصال بقاعدة البيانات.");
