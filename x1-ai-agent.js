/* Seal X1 AI Agents — secure UI bridge. */
(function () {
  "use strict";
  const db = window.sealX1Db;
  function esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function safeMarkdown(value) {
    const blocks = [];
    let source = String(value ?? "").replace(/\x60{3}([a-zA-Z0-9_-]*)\n([\s\S]*?)\x60{3}/g, (_, lang, code) => {
      const marker = "\u0000X1BLOCK" + blocks.length + "\u0000";
      blocks.push("<pre class=\"x1-ai-code\"><code>" + esc(code.replace(/\n$/, "")) + "</code></pre>");
      return marker;
    });
    let html = esc(source).replace(/\x60([^\x60\n]+)\x60/g, "<code>$1</code>")
      .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
    blocks.forEach((block, i) => { html = html.replace("\u0000X1BLOCK" + i + "\u0000", block); });
    return html;
  }
  function snapshot(role) {
    const sections = [...document.querySelectorAll("main section[id]")]
      .filter(s => !s.hidden && !s.closest("[hidden]"))
      .filter(s => role !== "student" || !s.closest("#teacherSpace,#adminPanel"))
      .filter(s => role !== "teacher" || !s.closest("#studentSpace,#adminPanel"))
      .slice(0, 35).map(s => {
        const title = s.querySelector("h1,h2,h3")?.textContent?.trim() || s.id;
        const summary = [...s.querySelectorAll("p")]
          .filter(p => !p.closest(".chat-messages,.assistant-log,.qureo-chat-messages,.chat-bubble"))
          .map(p => p.textContent.trim().replace(/\s+/g," ").slice(0,160)).filter(Boolean).slice(0,3).join(" ");
        const controls = [...s.querySelectorAll("h3,h4,summary,button,a,label,input,select")]
          .filter(x => !x.closest(".chat-messages,.assistant-log,.qureo-chat-messages"))
          .map(x => (x.innerText || x.textContent || x.getAttribute("placeholder") || x.getAttribute("aria-label") || "").trim().replace(/\s+/g," ").slice(0,80))
          .filter(Boolean).slice(0,35);
        return {id:s.id,title,summary,controls};
      });
    return {sections,videos:Array.isArray(window.sealAcademyVideos)?window.sealAcademyVideos.slice(0,80):[]};
  }
  function key(agent) { return "seal-x1-ai-" + (window.sealCurrentUser?.id || "guest") + "-" + agent; }
  function getId(agent) { try { return sessionStorage.getItem(key(agent)) || ""; } catch { return ""; } }
  function setId(agent,id) { try { sessionStorage.setItem(key(agent),id); } catch {} }
  function scrollToSection(id) {
    const el=document.getElementById(id); if(!el)return false;
    let p=el; while(p){if(p.tagName==="DETAILS")p.open=true;p=p.parentElement;}
    el.scrollIntoView({behavior:"smooth",block:"center"}); return true;
  }
  function applyActions(node,actions) {
    (actions||[]).forEach(a=>{
      if(a.type==="navigate") scrollToSection(a.section_id);
      if(a.type==="play_video" && typeof window.sealOpenAcademyVideo==="function") window.sealOpenAcademyVideo(a.video_id);
      if(a.type==="open_link" && a.url==="https://me-portal.qureo.education/login") {
        const link=document.createElement("a"); link.href=a.url; link.target="_blank"; link.rel="noopener noreferrer";
        link.className="x1-ai-action-link"; link.textContent="فتح منصة QUREO الرسمية ↗"; node.appendChild(link);
      }
    });
  }
  async function ask(agent,question) {
    if(!db || !window.sealCurrentUser) { const e=new Error("سجّل الدخول لاستخدام المساعد المتقدم.");e.code="AUTH_REQUIRED";throw e; }
    const role=window.sealCurrentProfile?.role||"student";
    const {data,error}=await db.functions.invoke("x1-ai-agent",{body:{
      agent,question,conversation_id:getId(agent),platform_context:snapshot(role)
    }});
    if(error) {
      let message=error.message||"تعذر الاتصال بالمساعد.", code="";
      try { if(error.context?.json){const b=await error.context.json();message=b.error||message;code=b.code||"";} } catch {}
      const e=new Error(message);e.code=code;throw e;
    }
    if(!data?.ok){const e=new Error(data?.error||"تعذر الحصول على إجابة.");e.code=data?.code||"";throw e;}
    setId(agent,data.conversation_id);return data;
  }
  function localQureo(question) {
    return typeof window.sealQureoLocalFallback==="function" ? window.sealQureoLocalFallback(question) :
      "المساعد المتقدم يحتاج إلى تفعيل خدمة الذكاء الاصطناعي.";
  }
  function localGeneral(question,role) {
    return typeof window.portalAssistantAnswer==="function" ? window.portalAssistantAnswer(question,role) :
      "المساعد المتقدم غير مفعّل حالياً.";
  }
  function addQureo(box,text,kind,actions) {
    const node=document.createElement("div");node.className="qureo-chat-bubble "+kind;
    if(kind==="user")node.textContent=text;else node.innerHTML=safeMarkdown(text);
    box.appendChild(node);applyActions(node,actions);box.scrollTop=box.scrollHeight;return node;
  }
  function bindQureo() {
    const form=document.getElementById("qureoAssistantForm"),input=document.getElementById("qureoAssistantInput"),box=document.getElementById("qureoAssistantMessages");
    if(!form||!input||!box)return;
    form.addEventListener("submit",async e=>{
      e.preventDefault();e.stopImmediatePropagation();
      const q=input.value.trim();if(!q)return;
      addQureo(box,q,"user");input.value="";
      const button=form.querySelector("button");if(button)button.disabled=true;
      const loading=addQureo(box,"جاري تحليل السؤال والكود...","assistant x1-ai-typing");
      try { const result=await ask("qureo",q);loading.remove();addQureo(box,result.answer,"assistant",result.actions); }
      catch(err) {
        loading.remove();
        const text=(err.code==="AI_NOT_CONFIGURED"||err.code==="AUTH_REQUIRED")?localQureo(q):
          "تعذر إكمال الطلب: "+(err.message||"خطأ غير معروف")+"\nحاول مرة أخرى بعد قليل.";
        addQureo(box,text,"assistant");
      } finally { if(button)button.disabled=false; }
    },true);
  }
  function bindGeneral(role) {
    const form=document.getElementById(role+"AssistantForm"),input=document.getElementById(role+"AssistantInput"),log=document.getElementById(role+"AssistantLog");
    if(!form||!input||!log)return;
    form.addEventListener("submit",async e=>{
      e.preventDefault();e.stopImmediatePropagation();
      const q=input.value.trim();if(!q)return;
      const user=document.createElement("p");user.className="assistant-user";user.textContent=q;log.appendChild(user);input.value="";
      const button=form.querySelector("button");if(button)button.disabled=true;
      const loading=document.createElement("p");loading.className="assistant-answer x1-ai-typing";loading.textContent="جاري فهم طلبك والبحث في المنصة...";
      log.appendChild(loading);log.scrollTop=log.scrollHeight;
      try {
        const result=await ask("general",q);loading.remove();
        const answer=document.createElement("p");answer.className="assistant-answer";answer.innerHTML=safeMarkdown(result.answer);
        log.appendChild(answer);applyActions(answer,result.actions);
      } catch(err) {
        loading.remove();const answer=document.createElement("p");answer.className="assistant-answer";
        answer.textContent=(err.code==="AI_NOT_CONFIGURED"||err.code==="AUTH_REQUIRED")?localGeneral(q,role):
          "تعذر إكمال البحث: "+(err.message||"خطأ غير معروف");
        log.appendChild(answer);
      } finally {if(button)button.disabled=false;log.scrollTop=log.scrollHeight;}
    },true);
  }
  window.sealX1AskAgent=ask;
  bindQureo();bindGeneral("student");bindGeneral("teacher");
})();