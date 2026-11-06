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

// Public browser client: publishable key only. Database RLS limits this client to published content.
const SUPABASE_URL="https://glhsbvgzthsmxxguefxu.supabase.co";
const SUPABASE_KEY="sb_publishable_2BJmBVumRl6RRz1Ag9FLag_aeIFX3p8";
const db=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);
const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const dateLabel=value=>{if(!value)return "";try{return new Date(value).toLocaleDateString("ar-EG",{year:"numeric",month:"short",day:"numeric"});}catch{return "";}};
function setPanelState(panel,title,body){if(!panel)return;panel.innerHTML='<div class="empty-symbol">▤</div><h3>'+escapeHTML(title)+'</h3><p>'+escapeHTML(body)+'</p>';}
async function loadAnnouncements(){
 const panel=document.querySelector("#announcements .empty-panel");
 if(!db){setPanelState(panel,"تعذر الاتصال","مكتبة Supabase لم يتم تحميلها. حدّث الصفحة وحاول مرة أخرى.");return;}
 const {data,error}=await db.from("announcements").select("id,title,body,pinned,created_at").eq("status","published").order("pinned",{ascending:false}).order("created_at",{ascending:false}).limit(20);
 if(error){setPanelState(panel,"الإعلانات غير متاحة مؤقتاً","تعذر تحميل الإعلانات. حاول تحديث الصفحة لاحقاً.");console.error("Announcements:",error);return;}
 if(!data?.length){setPanelState(panel,"لا توجد إعلانات منشورة حالياً","ستظهر هنا إعلانات المدرسة والقرارات فور اعتمادها ونشرها.");return;}
 panel.classList.add("live-list");panel.innerHTML=data.map(item=>'<article class="live-item"><div class="live-item-top"><span class="live-tag">'+(item.pinned?"إعلان مهم":"إعلان المدرسة")+'</span><time>'+escapeHTML(dateLabel(item.created_at))+'</time></div><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.body||"")+'</p></article>').join("");
}
async function loadResources(){
 const section=document.querySelector("#library");
 const grid=section?.querySelector(".library-grid");
 if(!section||!db)return;
 let container=section.querySelector("#liveResources");
 if(!container){container=document.createElement("div");container.id="liveResources";container.className="live-resources";grid?.after(container);}
 container.innerHTML='<p class="resource-loading">جاري تحميل الملفات المنشورة...</p>';
 const {data,error}=await db.from("resources").select("id,title,description,teacher_name,external_url,file_path,created_at,subjects(name),resource_categories(name)").eq("status","published").eq("verified",true).order("created_at",{ascending:false}).limit(60);
 if(error){container.innerHTML='<p class="resource-loading">تعذر تحميل المكتبة حالياً. حاول تحديث الصفحة.</p>';console.error("Resources:",error);return;}
 if(!data?.length){container.innerHTML='<p class="resource-loading">لا توجد ملفات منشورة ومعتمدة حالياً. ستظهر هنا بمجرد إضافتها.</p>';return;}
 const cards=await Promise.all(data.map(async item=>{
  let href=item.external_url||"";
  let label=href?"فتح المصدر":"";
  if(item.file_path){const {data:signed,error:signError}=await db.storage.from("school-files").createSignedUrl(item.file_path,3600);if(!signError&&signed?.signedUrl){href=signed.signedUrl;label="فتح / تحميل الملف";}}
  return '<article class="resource-item"><div class="resource-symbol">▧</div><div class="resource-copy"><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.description||"")+'</p><div class="resource-meta">'+escapeHTML(item.subjects?.name||"مصدر تعليمي")+(item.teacher_name?" · "+escapeHTML(item.teacher_name):"")+'</div></div>'+(href?'<a class="resource-link" href="'+escapeHTML(href)+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>':'<span class="resource-pending">الرابط غير متاح</span>')+'</article>';
 }));
 container.innerHTML=cards.join("");
}
if(db){Promise.all([loadAnnouncements(),loadResources()]);}
else{setPanelState(document.querySelector("#announcements .empty-panel"),"تعذر الاتصال","لم يتم تحميل مكتبة الاتصال بقاعدة البيانات.");}
