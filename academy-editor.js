(() => {
"use strict";
const root=document.getElementById("sealAcademyRoot");
if(!root)return;
const defaults={
 js:'console.log("أهلاً بك في محرر Seal X1");\nconst score = 18;\nif (score >= 10) {\n  console.log("ناجح");\n} else {\n  console.log("حاول مرة أخرى");\n}',
 html:'<main>\n  <h1>صفحتي الأولى</h1>\n  <p>أنا أتعلم HTML في أكاديمية Seal X1.</p>\n  <button>ابدأ التعلم</button>\n</main>',
 css:'main {\n  max-width: 600px;\n  margin: 30px auto;\n  padding: 24px;\n  border-radius: 16px;\n  background: #eef3ff;\n  color: #172033;\n  font-family: Arial, sans-serif;\n}\nh1 { color: #2457a6; }\nbutton { padding: 10px 16px; border: 0; border-radius: 8px; }'
};
let mode="js",drafts={...defaults};
const markup='<section class="academy-editor-card"><div class="academy-editor-heading"><div><b>محرر الأكواد العملي</b><small>اكتب الكود وشغّله وشاهد النتيجة مباشرة</small></div><span>Sandbox</span></div><div class="academy-editor-tabs"><button type="button" data-editor-mode="js" class="active">JavaScript</button><button type="button" data-editor-mode="html">HTML</button><button type="button" data-editor-mode="css">CSS</button></div><textarea id="academyEditorInput" class="academy-editor-input" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="محرر الأكواد"></textarea><div class="academy-editor-actions"><button type="button" data-editor-run>تشغيل الكود ▶</button><button type="button" data-editor-reset>استعادة المثال</button></div><div class="academy-editor-output-head"><b id="academyEditorOutput">النتيجة</b><small>المعاينة معزولة عن حسابك وبيانات المنصة</small></div><iframe id="academyEditorPreview" class="academy-editor-preview" sandbox="allow-scripts" title="معاينة الكود" referrerpolicy="no-referrer"></iframe><p class="academy-editor-note">المحرر للتجربة التعليمية فقط. تشغيل JavaScript يتم داخل إطار معزول، مع منع طلبات الشبكة والوصول إلى بيانات المنصة.</p></section>';
function mount(){
 const workspace=root.querySelector(".academy-workspace");
 if(!workspace||root.querySelector(".academy-editor-card"))return;
 workspace.insertAdjacentHTML("afterend",markup);
 const input=root.querySelector("#academyEditorInput");
 if(input)input.value=drafts[mode];
}
function run(){
 const frame=root.querySelector("#academyEditorPreview"),label=root.querySelector("#academyEditorOutput");
 if(!frame||!label)return;
 const code=String(drafts[mode]||"").slice(0,12000);
 const policy='<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src blob:; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; font-src \'none\'; object-src \'none\'; base-uri \'none\'; form-action \'none\'">';
 const start='<!doctype html><html><head><meta charset="utf-8">'+policy+'<meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font:14px Arial,sans-serif;padding:12px;overflow-wrap:anywhere">';
 const end='</body></html>';
 if(mode==="html"){frame.srcdoc=start+code+end;label.textContent="معاينة HTML";return;}
 if(mode==="css"){frame.srcdoc=start+'<style>'+code.replace(/<\/style/gi,"<\\/style")+'</style><main><h1>مرحباً بك</h1><p>هذه صفحة تجريبية لتجربة تنسيقات CSS.</p><button>زر تجريبي</button></main>'+end;label.textContent="معاينة CSS";return;}
 const runner=[
 "const box=document.getElementById('result');",
 "const write=(...values)=>{try{box.textContent+=(values.map(value=>{if(typeof value==='string')return value;try{return JSON.stringify(value)}catch(_){return String(value)}}).join(' ')+'\\n').slice(0,12000)}catch(_){box.textContent+='تعذر عرض هذه النتيجة\\n'}};",
 "console.log=(...values)=>write(...values);",
 "console.info=(...values)=>write(...values);",
 "console.warn=(...values)=>write('تحذير:',...values);",
 "console.error=(...values)=>write('خطأ:',...values);",
 "window.addEventListener('error',event=>write('خطأ:',event.message));",
 "window.addEventListener('unhandledrejection',event=>write('خطأ غير معالج:',event.reason?.message||event.reason));",
 "(async()=>{try{",
 code,
 "}catch(error){write('خطأ:',error?.message||error)}})();"
 ].join('\n');
 const blob=new Blob([runner],{type:"text/javascript"});
 const runnerUrl=URL.createObjectURL(blob);
 frame.onload=()=>{URL.revokeObjectURL(runnerUrl);};
 frame.srcdoc=start+'<pre id="result" style="white-space:pre-wrap;overflow-wrap:anywhere;background:#101827;color:#e7edf7;padding:12px;border-radius:8px;min-height:90px">جاري تشغيل الكود...</pre><script src="'+runnerUrl+'"></script>'+end;
 label.textContent="نتيجة تشغيل JavaScript";
}
root.addEventListener("input",event=>{if(event.target.id==="academyEditorInput")drafts[mode]=event.target.value;});
root.addEventListener("click",event=>{
 const tab=event.target.closest("[data-editor-mode]");
 if(tab){mode=tab.dataset.editorMode;root.querySelectorAll("[data-editor-mode]").forEach(b=>b.classList.toggle("active",b===tab));const input=root.querySelector("#academyEditorInput");if(input)input.value=drafts[mode];const label=root.querySelector("#academyEditorOutput");if(label)label.textContent="اضغط تشغيل الكود لمعاينة النتيجة.";return;}
 if(event.target.closest("[data-editor-run]")){const input=root.querySelector("#academyEditorInput");if(input)drafts[mode]=input.value;run();return;}
 if(event.target.closest("[data-editor-reset]")){drafts[mode]=defaults[mode];const input=root.querySelector("#academyEditorInput");if(input)input.value=drafts[mode];return;}
});
document.addEventListener("click",event=>{const link=event.target.closest('a[href="#sealAcademy"]');if(link){const accordion=document.querySelector(".academy-section-accordion");if(accordion)accordion.open=true;}});
const observer=new MutationObserver(mount);
observer.observe(root,{childList:true});
mount();
})();