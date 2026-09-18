/* ============================================================
   BJ CONSULTING - скрипт страницы.
   Штрихкод (сборка штрихов и прогресс) · плиты · перевод RU/KZ ·
   тома каталога по якорям · меню · лента · форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = ["7","708","909","4098"].join("");  /* WhatsApp BJ Consulting: в исходнике не одной строкой - от сборщиков номеров */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская, казахский словарь - в assets/lang/kk.js (window.SITE_KK), грузится
   только по явному выбору KZ: проверка Google Ads видит один русский сайт. Ключа нет → строка русская. */
var KZ = null, TICK_KZ = null, FORM_KK = null;
var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";

/* готовые тексты WhatsApp под каждый блок */
var WA_TXT = {
ru:{
  hero:"Здравствуйте! Нужна сертификация продукции для ЕАЭС. Продукция: ",
  se:"Здравствуйте! Нужен сертификат соответствия ТР ТС. Продукция: ",
  de:"Здравствуйте! Нужна декларация о соответствии ТР ТС. Продукция: ",
  ob:"Здравствуйте! Нужен документ на бытовое / промышленное оборудование (ТР ТС 004, 020, 010, 016, 032). Оборудование: ",
  pi:"Здравствуйте! Нужна декларация на пищевую продукцию (ТР ТС 021 и др.). Продукция: ",
  ko:"Здравствуйте! Нужна декларация на косметику / парфюмерию (ТР ТС 009). Продукция: ",
  od:"Здравствуйте! Нужен документ на одежду (ТР ТС 017, 007). Продукция: ",
  ig:"Здравствуйте! Нужен документ на игрушки / товары для детей (ТР ТС 008, 007). Продукция: ",
  me:"Здравствуйте! Нужен документ на мебель / упаковку (ТР ТС 025, 005). Продукция: ",
  ea:"Здравствуйте! Продаём продукцию в страны ЕАЭС, нужен документ ТР ТС. Продукция и страны: ",
  kontakty:"Здравствуйте! Пишу с сайта BJ Consulting. Нужна консультация по сертификации: "
}};
var TICK = ["Сертификат соответствия","Декларация о соответствии","ТР ТС","Оборудование","Пищевая продукция","Косметика и парфюмерия","Одежда","Игрушки","Мебель и упаковка","Казахстан · Кыргызстан · Россия · Армения · Беларусь"];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

function setWaLinks(){
  if (!isHuman()) return;                 /* боту и сборщику номеров - пустой href="#" */
  var L = curLang();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var t = WA_TXT[L][a.dataset.wa] || WA_TXT[L].hero;
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

/* казахский словарь - по требованию, один раз */
function loadKK(done){
  if (KZ) return done();
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
  s.onload = function(){
    var k = window.SITE_KK;
    if (k) { KZ = k.dict; WA_TXT.kk = k.wa; TICK_KZ = k.tick; FORM_KK = k.form; }
    done();
  };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}
function setLang(lang){
  if (lang === "kk") loadKK(function(){ applyLang(KZ ? "kk" : "ru"); });
  else applyLang("ru");
}

function applyLang(lang){
  var kk = lang === "kk" && !!KZ;
  root.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === (kk ? "kk" : "ru");
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("bj-lang", kk ? "kk" : "ru"); } catch(e){}
  setWaLinks();
  fillTicker();
  requestAnimationFrame(fitText);
}
function initLang(){
  var url = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("bj-lang"); } catch(e){}
  var lang = (url === "kk" || url === "ru") ? url : (saved === "kk" ? "kk" : "ru");
  setLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ setLang(b.getAttribute("data-lang")); });
});

/* дисплейные строки: казахский длиннее - ужимаем, пока не влезет */
function fitText(){
  document.querySelectorAll(".h1 .l1, .h1 .l2, .kphone").forEach(function(el){
    el.style.fontSize = "";
    var box = el.parentElement.clientWidth;
    if (!box) return;
    var size = parseFloat(getComputedStyle(el).fontSize), base = size;
    while (el.scrollWidth > box + 1 && size > base * 0.55) {
      size *= 0.95;
      el.style.fontSize = size + "px";
    }
  });
}

/* ---------------- БЕГУЩАЯ ЛЕНТА ---------------- */
function fillTicker(){
  var el = document.getElementById("ticker"); if (!el) return;
  var list = curLang() === "kk" ? TICK_KZ : TICK;
  var one = list.map(function(t){ return "<b>" + t + "</b>"; }).join("");
  el.innerHTML = one;
  var w = el.scrollWidth || 1000;
  var need = Math.max(2, Math.ceil((innerWidth * 2) / w) + 1);
  var html = "";
  for (var i = 0; i < need; i++) html += one;
  el.innerHTML = html;
  el.style.setProperty("--tkw", w + "px");
}
var rsTimer;
addEventListener("resize", function(){
  clearTimeout(rsTimer);
  rsTimer = setTimeout(function(){
    fillTicker(); fitText();
  }, 200);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- МЕНЮ ---------------- */
var burger = document.getElementById("burger");
var mnav = document.getElementById("mnav");
function closeMenu(){
  document.body.classList.remove("menu-open");
  if (burger) burger.setAttribute("aria-expanded", "false");
}
if (burger) burger.addEventListener("click", function(){
  var open = document.body.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
if (mnav) mnav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

/* ---------------- ЯКОРЯ И ТОМА ----------------
   Якорь на томе каталога открывает его (важно для рекламы). */
var HH = function(){ return parseFloat(getComputedStyle(root).getPropertyValue("--hh")) || 64; };
function openVol(t){
  if (!t || !t.classList.contains("vol")) return;
  document.querySelectorAll(".vol[open]").forEach(function(v){ if (v !== t) v.removeAttribute("open"); });
  t.setAttribute("open", "");
  t.classList.remove("hl"); void t.offsetWidth; t.classList.add("hl");
}
function goTo(id, smooth){
  var t = document.getElementById(id); if (!t) return false;
  openVol(t);
  var top = t.getBoundingClientRect().top + scrollY - (t.classList.contains("pw") ? 0 : HH() + (t.classList.contains("vol") ? 12 : 0));
  scrollTo({ top: Math.max(0, top), behavior: (smooth && !RED) ? "smooth" : "auto" });
  return true;
}
document.addEventListener("click", function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute("href").slice(1); if (!id) return;
  if (!document.getElementById(id)) return;
  e.preventDefault();
  closeMenu();
  goTo(id, true);
  try { history.pushState(null, "", "#" + id); } catch(err){}
});
/* один раскрытый том за раз; открытый том не должен уходить под шапку */
document.querySelectorAll(".vol").forEach(function(v){
  v.addEventListener("toggle", function(){
    if (!v.open) return;
    document.querySelectorAll(".vol[open]").forEach(function(o){ if (o !== v) o.removeAttribute("open"); });
    var r = v.getBoundingClientRect();
    if (r.top < HH()) scrollTo({ top: r.top + scrollY - HH() - 12, behavior: RED ? "auto" : "smooth" });
  });
});

/* ---------------- ПЛИТЫ ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay. Дальше всё делает CSS. */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var heroPw = document.getElementById("top");
var hero = heroPw ? heroPw.querySelector(".hero") : null;
var regno = document.getElementById("regno");
var REG_FINAL = regno ? regno.textContent : "";
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
var regSettled = true, regFrame = 0;
function scrambleReg(stay){
  if (!regno) return;
  if (stay > .5 && stay < .96) {
    regSettled = false;
    if (++regFrame % 2) return;
    var s = "";
    for (var i = 0; i < REG_FINAL.length; i++) {
      var ch = REG_FINAL[i];
      s += /\d/.test(ch) ? String(Math.floor(Math.random() * 10)) : ch;
    }
    regno.textContent = s;
  } else if (!regSettled) {
    regSettled = true; regno.textContent = REG_FINAL;
  }
}
function update(){
  var H = innerHeight || root.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw && !RED) scrambleReg(stay);
  });
  if (bar) {
    var onKont = kont && kont.getBoundingClientRect().top < H * 0.6;
    bar.classList.toggle("show", scrollY > H * 0.55 && !onKont);
  }
}
if (RED) {
  root.classList.add("no-plate");
  root.classList.add("no-intro");
  if (hero) hero.classList.add("on");
} else {
  var tick = false;
  addEventListener("scroll", function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; update(); });
  }, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
  /* текст героя проявляется сразу; при переходе по якорю - без задержек */
  if (location.hash || scrollY > 80) root.classList.add("no-intro");
  if (hero) hero.classList.add("on");
  update();
}
window.plateSync = function(){ if (hero) hero.classList.add("on"); update(); };

/* прямой переход по якорю: открыть том и встать на место (интро уже пропущено) */
function hashJump(){
  var id = location.hash.slice(1); if (!id) return;
  root.classList.add("no-intro");
  var t = document.getElementById(id); if (!t) return;
  openVol(t);
  setTimeout(function(){ goTo(id, false); update(); }, 60);
}
addEventListener("hashchange", hashJump);
if (location.hash) { try { history.scrollRestoration = "manual"; } catch(e){} hashJump(); addEventListener("load", function(){ goTo(location.hash.slice(1), false); update(); }); }

/* ---------------- ПОЯВЛЕНИЕ ---------------- */
if (HAS_IO) {
  if (!RED) root.classList.add("js");
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });
  setTimeout(function(){ document.querySelectorAll(".rv:not(.in)").forEach(function(el){
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in");
  }); }, 1500);
} else {
  document.querySelectorAll(".rv").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- ЗАЩИТА ОТ БОТОВ ----------------
   Сервера у сайта нет, поэтому фильтр работает в браузере и решает три задачи:
   1) номер WhatsApp не лежит в разметке: ссылки wa.me и сам номер появляются только
      после живого действия человека (движение мыши, касание, прокрутка колесом, клавиша)
      и не раньше 2 секунд на странице - сборщики номеров и скрипты его не видят;
   2) цели Google Ads (телефон, WhatsApp, форма) засчитываются только человеку -
      автоматика кабинета перестаёт учиться на ботах и искать похожий трафик;
   3) явные боты (webdriver, headless, пустой язык) WhatsApp не получают вовсе,
      сомнительный визит подтверждает себя вторым нажатием в окне проверки.
   Подмены по user-agent нет: всем людям показывается одна и та же страница. */
var HB = { t0: Date.now(), moves: 0, act: false, open: false, sent: 0,
  bot: (function(){
    var n = navigator, ua = n.userAgent || "";
    if (n.webdriver) return true;
    if (/HeadlessChrome|PhantomJS|Puppeteer|Playwright|Selenium|Lighthouse|bot\b|crawl|spider/i.test(ua)) return true;
    if (window.callPhantom || window._phantom || window.__nightmare || window.domAutomation) return true;
    if (n.languages && n.languages.length === 0) return true;
    return false;
  })()
};
function isHuman(){ return !HB.bot && HB.act && Date.now() - HB.t0 > 2000; }

var SH_RU = {
  t:"Подтвердите, что вы не робот",
  p:"Защищаем переписку от спам-ботов. Нажмите кнопку - откроется WhatsApp с готовым сообщением.",
  b:"Я не робот - открыть WhatsApp",
  x:"Закрыть",
  f:"Не получилось открыть WhatsApp. Позвоните нам:"
};
function shTxt(k){ return (curLang() === "kk" && FORM_KK && FORM_KK["sh." + k]) || SH_RU[k]; }

/* живое действие: засчитываем только настоящие (isTrusted) события */
function humanSignal(e){
  if (HB.act || HB.bot || !e.isTrusted) return;
  if (e.type === "pointermove" || e.type === "mousemove") { if (++HB.moves < 3) return; }
  HB.act = true;
  ["pointermove","mousemove","touchstart","wheel","keydown"].forEach(function(t){ window.removeEventListener(t, humanSignal, true); });
  setTimeout(unlockWa, Math.max(0, 2050 - (Date.now() - HB.t0)));
}
["pointermove","mousemove","touchstart","wheel","keydown"].forEach(function(t){
  window.addEventListener(t, humanSignal, {capture:true, passive:true});
});
function unlockWa(){
  if (!isHuman()) return;
  setWaLinks();
  document.querySelectorAll("[data-wa-num]").forEach(function(el){
    el.textContent = "+" + WA.charAt(0) + " " + WA.substr(1,3) + " " + WA.substr(4,3) + " " + WA.substr(7);
  });
}

function waText(key){ var L = curLang(); return WA_TXT[L][key] || WA_TXT[L].hero; }
function goWa(text, kind){
  if (window.awConv) window.awConv(kind);
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
}

/* окно проверки для сомнительного визита: кнопка оживает через 0,7 с,
   мгновенный скриптовый клик по ней не проходит */
var shEl = null;
function shieldAsk(text, kind){
  if (!shEl) {
    shEl = document.createElement("div");
    shEl.className = "shield";
    shEl.setAttribute("role", "dialog");
    shEl.setAttribute("aria-modal", "true");
    shEl.innerHTML = '<div class="shield-box"><button type="button" class="shield-x"></button>' +
      '<p class="shield-t"></p><p class="shield-p"></p>' +
      '<button type="button" class="btn btn-solid shield-go"></button>' +
      '<a class="shield-call" href="tel:+77007575036">+7 700 757 5036</a></div>';
    document.body.appendChild(shEl);
    shEl.addEventListener("click", function(e){
      if (e.target === shEl || e.target.closest(".shield-x")) shieldClose();
    });
    shEl.querySelector(".shield-go").addEventListener("click", function(e){
      if (!e.isTrusted || HB.bot || Date.now() - HB.openedAt < 700) return;
      var d = HB.pending; shieldClose();
      if (d) goWa(d.text, d.kind);
    });
  }
  HB.pending = { text: text, kind: kind };
  shEl.querySelector(".shield-x").setAttribute("aria-label", shTxt("x"));
  shEl.querySelector(".shield-x").textContent = "×";
  shEl.querySelector(".shield-t").textContent = shTxt("t");
  shEl.querySelector(".shield-p").textContent = HB.bot ? shTxt("f") : shTxt("p");
  shEl.querySelector(".shield-go").textContent = shTxt("b");
  shEl.querySelector(".shield-go").hidden = HB.bot;
  shEl.querySelector(".shield-call").hidden = !HB.bot;
  HB.openedAt = Date.now();
  shEl.classList.add("on");
  document.body.classList.add("shield-open");
}
function shieldClose(){
  if (!shEl) return;
  shEl.classList.remove("on");
  document.body.classList.remove("shield-open");
  HB.pending = null;
}
document.addEventListener("keydown", function(e){ if (e.key === "Escape") shieldClose(); });

/* ---------------- ФОРМА → WhatsApp ---------------- */
var form = document.getElementById("form");
var LINK_RE = /https?:|www\.|\.(ru|com|net|org|xyz|top|info)\b|<[a-z]/i;
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  var name = form.name.value.trim(), phone = form.phone.value.trim(), msg = form.msg.value.trim();
  var digits = phone.replace(/\D/g, "");
  /* ловушки для ботов: скрытое поле, мгновенная отправка, ссылки в полях -
     делаем вид, что всё прошло, но WhatsApp не открываем и цель не засчитываем */
  var trap = (form.company && form.company.value) || HB.bot ||
             Date.now() - HB.t0 < 3000 || LINK_RE.test(name + " " + msg) ||
             Date.now() - HB.sent < 20000;
  if (!trap && (!/[A-Za-zА-Яа-яЁёЀ-ӿ]/.test(name) || name.length > 60 ||
      digits.length < 10 || digits.length > 15)) { err.hidden = false; ok.hidden = true; return; }
  err.hidden = true;
  ok.hidden = false;
  if (trap) return;
  HB.sent = Date.now();
  var F = (curLang() === "kk" && FORM_KK) ? FORM_KK : null;
  var t = F
    ? F.hi + "\n" + F.name + ": " + name + "\n" + F.phone + ": " + phone + (msg ? "\n" + F.prod + ": " + msg : "")
    : "Здравствуйте! Заявка с сайта BJ Consulting.\nИмя: " + name + "\nТелефон: " + phone + (msg ? "\nПродукция: " + msg : "");
  if (isHuman()) goWa(t, "lead"); else shieldAsk(t, "lead");
});

/* ---------------- КЛИКИ: WhatsApp и телефон + КОНВЕРСИИ GOOGLE ADS ----------------
   Слушаем window в фазе захвата - раньше любых других обработчиков. */
window.addEventListener("click", function(e){
  var a = e.target.closest ? e.target.closest("a") : null;
  if (!a || (shEl && shEl.contains(a))) return;
  var href = a.getAttribute("href") || "";
  if (href.indexOf("tel:") === 0) { if (isHuman() && window.awConv) window.awConv("phone"); return; }
  if (!a.hasAttribute("data-wa")) return;
  if (isHuman() && e.isTrusted && href.indexOf("wa.me") > -1) { if (window.awConv) window.awConv("wa"); return; }
  e.preventDefault();
  if (isHuman() && e.isTrusted) goWa(waText(a.dataset.wa), "wa");   /* ссылка не успела получить номер */
  else shieldAsk(waText(a.dataset.wa), "wa");
}, true);

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
