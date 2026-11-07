(() => {
"use strict";
const root=document.getElementById("sealAcademyRoot");
if(!root)return;
const markup=`
<section class="academy-editor-card academy-playground" aria-label="مختبر الأكواد">
 <div class="academy-editor-heading"><div><b>مختبر الأكواد — HTML + CSS + JavaScript</b><small>اكتب في المحررات الثلاثة معاً، ثم شغّل المشروع كصفحة واحدة.</small></div><span>تجربة حرة</span></div>
 <div class="playground-editors">
  <label class="playground-pane"><span><b>HTML</b><small>هيكل الصفحة</small></span><textarea data-playground="html" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="محرر HTML" placeholder="اكتب HTML هنا..."></textarea></label>
  <label class="playground-pane"><span><b>CSS</b><small>التصميم والألوان</small></span><textarea data-playground="css" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="محرر CSS" placeholder="اكتب CSS هنا..."></textarea></label>
  <label class="playground-pane"><span><b>JavaScript</b><small>التفاعل والبرمجة</small></span><textarea data-playground="js" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="محرر JavaScript" placeholder="اكتب JavaScript هنا..."></textarea></label>
 </div>
 <div class="academy-editor-actions"><button type="button" data-playground-run>تشغيل المشروع ▶</button><button type="button" data-playground-clear>مسح الكل</button><button type="button" data-playground-example>تحميل مثال بسيط</button></div>
 <div class="academy-editor-output-head"><b>معاينة المشروع</b><small data-playground-status>المحررات فارغة — ابدأ التجربة</small></div>
 <iframe class="academy-editor-preview playground-preview" data-playground-preview sandbox="allow-scripts" title="معاينة مشروع HTML وCSS وJavaScript" referrerpolicy="no-referrer"></iframe>
 <p class="academy-editor-note">المختبر مستقل عن دروس الأكاديمية ولا يحتاج إلى حساب أو حفظ. التشغيل داخل إطار معزول، مع منع الاتصال بالشبكة والوصول إلى بيانات المنصة. امسح المحررات أو اتركها فارغة وقتما تحب.</p>
</section>`;
function mount(){
 const workspace=root.querySelector(".academy-workspace");
 if(!workspace||root.querySelector(".academy-playground"))return;
 workspace.insertAdjacentHTML("afterend",markup);
}
function getCode(){
 const read=name=>root.querySelector('[data-playground="'+name+'"]')?.value||"";
 return {html:read("html"),css:read("css"),js:read("js")};
}
function run(){
 const frame=root.querySelector("[data-playground-preview]");
 const status=root.querySelector("[data-playground-status]");
 if(!frame||!status)return;
 const {html,css,js}=getCode();
 const safeCss=css.slice(0,20000).replaceAll("</style","<\\/style");
 const pagePolicy='<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src blob:; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; font-src \'none\'; object-src \'none\'; base-uri \'none\'; form-action \'none\'">';
 const output='<pre id="seal-playground-console" style="white-space:pre-wrap;overflow-wrap:anywhere;direction:ltr;text-align:left;background:#101827;color:#e7edf7;padding:10px;margin:0 0 12px;border-radius:8px;font:12px/1.6 monospace;min-height:28px">Console output will appear here.</pre>';
 const runner=[
 "const box=document.getElementById('seal-playground-console');",
 "const write=(...values)=>{try{box.textContent+=(values.map(value=>{if(typeof value==='string')return value;try{return JSON.stringify(value)}catch(_){return String(value)}}).join(' ')+'\n').slice(0,10000)}catch(_){}};",
 "console.log=(...values)=>write(...values);console.info=(...values)=>write(...values);console.warn=(...values)=>write('Warning:',...values);console.error=(...values)=>write('Error:',...values);",
 "window.addEventListener('error',event=>write('Error:',event.message));",
 "window.addEventListener('unhandledrejection',event=>write('Unhandled promise:',event.reason?.message||event.reason));",
 "try{\n"+js.slice(0,20000)+"\n}catch(error){write('Error:',error?.message||error)}"
 ].join('\n');
 const blob=new Blob([runner],{type:"text/javascript"});
 const runnerUrl=URL.createObjectURL(blob);
 frame.onload=()=>URL.revokeObjectURL(runnerUrl);
 frame.srcdoc='<!doctype html><html><head><meta charset="utf-8">'+pagePolicy+'<meta name="viewport" content="width=device-width,initial-scale=1"><style>'+safeCss+'</style></head><body>'+output+html.slice(0,30000)+'<script src="'+runnerUrl+'"></script></body></html>';
 status.textContent="تم تشغيل HTML وCSS وJavaScript معاً";
}
root.addEventListener("click",event=>{
 if(event.target.closest("[data-playground-run]")){run();return;}
 if(event.target.closest("[data-playground-clear]")){root.querySelectorAll("[data-playground]").forEach(el=>el.value="");const frame=root.querySelector("[data-playground-preview]");if(frame)frame.srcdoc="";const status=root.querySelector("[data-playground-status]");if(status)status.textContent="تم مسح المحررات والمعاينة";return;}
 if(event.target.closest("[data-playground-example]")){const samples={html:'<main class="card">\n  <h1>أول مشروع لي 🚀</h1>\n  <p>أنا أتعلم HTML وCSS وJavaScript.</p>\n  <button id="hello">اضغط هنا</button>\n</main>',css:'body { font-family: Arial, sans-serif; background: #eef2ff; padding: 24px; }\n.card { max-width: 520px; margin: 30px auto; padding: 28px; text-align: center; background: white; border-radius: 18px; box-shadow: 0 8px 28px #17255422; }\nh1 { color: #2457a6; }\nbutton { padding: 10px 18px; border: 0; border-radius: 9px; background: #2457a6; color: white; cursor: pointer; }',js:'document.getElementById("hello").addEventListener("click", () => {\n  console.log("أهلاً بك في مختبر Seal X1!");\n});'};for(const [key,value] of Object.entries(samples)){const el=root.querySelector('[data-playground="'+key+'"]');if(el)el.value=value;}const status=root.querySelector("[data-playground-status]");if(status)status.textContent="تم تحميل المثال — اضغط تشغيل المشروع";return;}
});
const observer=new MutationObserver(mount);
observer.observe(root,{childList:true});
mount();
})();