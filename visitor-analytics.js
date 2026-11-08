(function () {
  "use strict";
  // Pseudonymous analytics only: random ID, no canvas/audio/font fingerprinting.
  const ENDPOINT = "https://glhsbvgzthsmxxguefxu.supabase.co/functions/v1/seal-visitor-log";
  const STORAGE_KEY = "seal_x1_visitor_session_v1";
  function uuidV4() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16); crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    const hex = [...bytes].map(x => x.toString(16).padStart(2, "0")).join("");
    return hex.slice(0,8)+"-"+hex.slice(8,12)+"-"+hex.slice(12,16)+"-"+hex.slice(16,20)+"-"+hex.slice(20);
  }
  function sessionId() {
    try {
      let id = localStorage.getItem(STORAGE_KEY);
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id || "")) {
        id = uuidV4(); localStorage.setItem(STORAGE_KEY, id);
      }
      return id;
    } catch { return uuidV4(); }
  }
  function deviceInfo() {
    const ua = navigator.userAgent || "";
    let browser = "Unknown", version = "";
    const tests = [
      ["Edge", /Edg\/([\d.]+)/], ["Opera", /OPR\/([\d.]+)/],
      ["Samsung Internet", /SamsungBrowser\/([\d.]+)/], ["Chrome", /Chrome\/([\d.]+)/],
      ["Firefox", /Firefox\/([\d.]+)/], ["Safari", /Version\/([\d.]+).*Safari/]
    ];
    for (const [name, re] of tests) { const m = ua.match(re); if (m) { browser = name; version = m[1]; break; } }
    let os = "Unknown";
    if (/Android/i.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
    else if (/Windows/i.test(ua)) os = "Windows";
    else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
    else if (/Linux/i.test(ua)) os = "Linux";
    const isTablet = /iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
    const isMobile = /Mobile|iPhone|Android/i.test(ua) && !isTablet;
    const device = /bot|crawler|spider/i.test(ua) ? "bot" : isTablet ? "tablet" : isMobile ? "mobile" : "desktop";
    let model = "";
    const android = ua.match(/Android[^;]*;\s*([^;)]+)/i);
    if (android) model = android[1].replace(/Build\/.*/i, "").trim().slice(0, 80);
    return { browser, browser_version: version, operating_system: os, device_type: device, device_model: model || null };
  }
  let lastPath = "";
  function sendPageView() {
    const path = location.pathname.slice(0, 180) || "/";
    if (path === lastPath) return;
    lastPath = path;
    const info = deviceInfo();
    const body = {
      session_id: sessionId(), page_path: path, ...info,
      language: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      referrer: document.referrer || ""
    };
    fetch(ENDPOINT, {
      method: "POST", mode: "cors", credentials: "omit",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(body), keepalive: true
    }).catch(() => {});
  }
  sendPageView();
  window.addEventListener("hashchange", sendPageView);
  window.addEventListener("popstate", sendPageView);
})();