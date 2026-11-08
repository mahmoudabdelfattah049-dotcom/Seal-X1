(function () {
  "use strict";
  const ENDPOINT = "https://glhsbvgzthsmxxguefxu.supabase.co/functions/v1/seal-visitor-log";
  const PUBLIC_KEY = "sb_publishable_2BJmBVumRl6RRz1Ag9FLag_aeIFX3p8";
  const STORAGE_KEY = "seal_x1_visitor_session_v1";
  function uuidV4() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
    const h=[...b].map(x=>x.toString(16).padStart(2,"0")).join("");
    return h.slice(0,8)+"-"+h.slice(8,12)+"-"+h.slice(12,16)+"-"+h.slice(16,20)+"-"+h.slice(20);
  }
  function getSessionId() {
    try { let id=localStorage.getItem(STORAGE_KEY);
      if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id||"")){id=uuidV4();localStorage.setItem(STORAGE_KEY,id);}
      return id;
    } catch { return uuidV4(); }
  }
  function deviceInfo() {
    const ua=navigator.userAgent||"";let browser="Unknown",version="";
    const tests=[["Edge",/Edg\/([\d.]+)/],["Opera",/OPR\/([\d.]+)/],["Samsung Internet",/SamsungBrowser\/([\d.]+)/],["Chrome",/Chrome\/([\d.]+)/],["Firefox",/Firefox\/([\d.]+)/],["Safari",/Version\/([\d.]+).*Safari/]];
    for(const [name,re] of tests){const m=ua.match(re);if(m){browser=name;version=m[1];break;}}
    let os="Unknown";
    if(/Android/i.test(ua))os="Android";else if(/iPhone|iPad|iPod/i.test(ua))os="iOS";else if(/Windows/i.test(ua))os="Windows";else if(/Mac OS X|Macintosh/i.test(ua))os="macOS";else if(/Linux/i.test(ua))os="Linux";
    const tablet=/iPad|Tablet/i.test(ua)||(/Android/i.test(ua)&&!/Mobile/i.test(ua));
    const mobile=/Mobile|iPhone|Android/i.test(ua)&&!tablet;
    const device=/bot|crawler|spider/i.test(ua)?"bot":tablet?"tablet":mobile?"mobile":"desktop";
    const android=ua.match(/Android[^;]*;\s*([^;)]+)/i);
    const model=android?android[1].replace(/Build\/.*/i,"").trim().slice(0,80):null;
    return {browser,browser_version:version,operating_system:os,device_type:device,device_model:model};
  }
  let lastPath="";
  function record(){
    const path=location.pathname.slice(0,180)||"/";if(path===lastPath)return;lastPath=path;
    const body={session_id:getSessionId(),page_path:path,...deviceInfo(),language:navigator.language||"",timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"",referrer:document.referrer||""};
    fetch(ENDPOINT,{method:"POST",mode:"cors",credentials:"omit",headers:{"apikey":PUBLIC_KEY,"Content-Type":"application/json"},body:JSON.stringify(body),keepalive:true}).catch(()=>{});
  }
  record();window.addEventListener("hashchange",record);window.addEventListener("popstate",record);
})();