/* ============================================================
   BJ CONSULTING - скрипт страницы.
   Штрихкод (сборка штрихов и прогресс) · плиты · перевод RU/KZ ·
   тома каталога по якорям · меню · лента · форма в WhatsApp. Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77089094098";                 /* WhatsApp BJ Consulting */
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var root = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Разметка русская. Ключа нет → строка остаётся русской. */
var KZ = {
"m.title":"Алматыда өнімді сертификаттау: КО ТР бойынша сәйкестік сертификаты мен декларациясы - BJ Consulting",
"m.desc":"BJ Consulting, Алматы: Кеден одағының техникалық регламенттері бойынша сәйкестік сертификаты мен сәйкестік туралы декларацияны рәсімдеуде сүйемелдеу. 20 техникалық регламент, ЕАЭО құрамындағы 5 ел. Кеңес пен құжат макеті тегін, төлем реестрге тіркеу алдында.",
"m.ogt":"ЕАЭО үшін өнімді сертификаттау - BJ Consulting, Алматы",
"m.ogd":"КО ТР бойынша сәйкестік сертификаты мен сәйкестік туралы декларация. 20 регламент, ЕАЭО құрамындағы 5 ел. Кеңес пен макет тегін, төлем реестрге тіркеу алдында.",
"a.home":"BJ Consulting, басты бетке","a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір",
"nav.se":"Сертификат","nav.de":"Декларация","nav.pr":"Өнім","nav.ea":"ЕАЭО","nav.kr":"Жұмыс тәртібі","nav.kt":"Байланыс",
"nav.se2":"Сәйкестік сертификаты","nav.de2":"Сәйкестік туралы декларация","nav.pr2":"Өнім топтары","nav.ea2":"ЕАЭО құрамындағы 5 ел",
"b.wa2":"WhatsApp-қа жазу","b.wa":"WhatsApp арқылы құнын білу","b.pr":"Өнім топтары","b.price":"Құнын білу","b.wa3":"WhatsApp-та талқылау","b.call":"Қоңырау шалу",

"h.a":"Цехтағы өнеркәсіптік прес қатары: сертификаттаудан өтетін жабдық",
"h.reg":"ЕАЭО реестрі · жазба енгізілді",
"h.kick":"Алматы · сертификаттау · 3 жылдан астам",
"h.h1a":"Сертификаттау","h.h1b":"ЕАЭО нарығындағы өнім",
"h.lead":"КО ТР бойынша сәйкестік сертификаты мен сәйкестік туралы декларация: 20 техникалық регламент, ЕАЭО құрамындағы 5 ел. Кеңес пен құжат макеті - тегін, төлем реестрге тіркеу алдында.",

"se.a":"Зертханада өнім үлгілерін сынау","se.k":"Сәйкестік сертификаты","se.h":"КО ТР бойынша сәйкестік сертификаты",
"se.l":"Регламент сынақ талап ететін жабдық, ойыншық, балалар киімі мен жиһаз үшін. Техникалық регламентті таңдаудан реестрге тіркеуге дейін сүйемелдейміз.",
"se.c1":"Техникалық регламентті таңдау","se.c2":"Құжат макеті","se.c3":"Реестрге тіркеу",
"de.a":"Жөнелту алдындағы қоймадағы өнім паллеттері","de.k":"Сәйкестік туралы декларация","de.h":"КО ТР бойынша сәйкестік туралы декларация",
"de.l":"Тамақ өнімдері, косметика, қаптама және киім үшін. Макетін дайындап, тіркейміз - реестрдегі нөмірді алып, ЕАЭО құрамындағы барлық елде сатасыз.",
"de.c1":"Кеңес тегін","de.c2":"Макет және келісу","de.c3":"Төлем тіркеу алдында",

"pr.k":"Өнім топтары","pr.h":"Сіздің өніміңізге қандай құжат керек",
"pr.l":"Топты басыңыз: құжат, КО ТР техникалық регламенттері, өнім мысалдары және сізден не қажет. Құны өнім мен құжат санына байланысты - есеп кеңестен кейін.",
"pr.n":"Тізімде сіздің тобыңыз жоқ па? Қандай өнім екенін жазыңыз - регламент пен құжатты таңдап береміз.",
"v.tr":"Техникалық регламенттер","v.ex":"Мысалы","v.need":"Сізден не қажет",
"tr.004":"төмен вольтты жабдық","tr.020":"электромагниттік үйлесімділік","tr.010":"машиналар мен жабдық","tr.016":"газ тәрізді отынмен жұмыс істейтін аппараттар","tr.032":"артық қысыммен жұмыс істейтін жабдық",
"tr.021":"тамақ өнімдерінің қауіпсіздігі","tr.022":"тамақ өнімдерін таңбалау","tr.015":"астық","tr.023":"шырын өнімдері","tr.024":"май-тоң май өнімдері","tr.029":"тағамдық қоспалар мен хош иістендіргіштер","tr.033":"сүт және сүт өнімдері","tr.034":"ет және ет өнімдері","tr.051":"құс еті",
"tr.009":"парфюмерия-косметика өнімдері","tr.017":"жеңіл өнеркәсіп өнімдері","tr.007":"балалар мен жасөспірімдерге арналған өнім","tr.008":"ойыншықтар қауіпсіздігі","tr.025":"жиһаз өнімдері","tr.005":"қаптама қауіпсіздігі",
"n.1":"Өнім сипаттамасы: мақсаты, сипаттамалары","n.2":"ЕАЭО резиденті - өтініш берушінің деректемелері","n.3":"Тауар құжаттары: келісімшарт пен инвойс немесе ТШ / МЕМСТ","n.4":"Регламент сынақ талап етсе - үлгілер",
"n.5":"Құрамы мен заттаңбасы","n.6":"Мата құрамы, өлшем қатары","n.7":"Бала жасы, материалдар","n.8":"Материалдар мен жиынтығы",
"ob.a":"Цехтағы технологиялық жабдық","ob.d":"Сертификат немесе декларация","ob.t":"Тұрмыстық және өнеркәсіптік жабдық",
"ob.e1":"Тұрмыстық техника мен электр аспаптары","ob.e2":"Электр құралдары","ob.e3":"Станоктар мен өндірістік желілер","ob.e4":"Компрессорлар мен сорғылар","ob.e5":"Қазандықтар мен газ аспаптары","ob.e6":"Қысыммен жұмыс істейтін ыдыстар",
"pi.a":"Тамақ өндірісіндегі сусын құю желісі","pi.d":"Сәйкестік туралы декларация","pi.t":"Тамақ өнімдері",
"pi.e1":"Кондитерлік өнімдер мен снектер","pi.e2":"Сусындар, шырындар, су","pi.e3":"Сүт өнімдері","pi.e4":"Ет және шұжық өнімдері","pi.e5":"Жарма, ұн, астық","pi.e6":"Майлар, қоспалар, хош иістендіргіштер",
"ko.a":"Зертхана сөрелеріндегі косметика флакондары","ko.d":"Сәйкестік туралы декларация","ko.t":"Косметика және парфюмерия",
"ko.e1":"Кремдер мен тері күтімі","ko.e2":"Сусабындар мен шаш күтімі құралдары","ko.e3":"Декоративті косметика","ko.e4":"Парфюмерия","ko.e5":"Сабын, гельдер, гигиена құралдары",
"od.a":"Тігін өндірісінде киім тігу","od.d":"Сертификат немесе декларация","od.t":"Балалар мен ересектер киімі",
"od.e1":"Ересектерге арналған киім мен іш киім","od.e2":"Балалар киімі","od.e3":"Трикотаж және тоқыма","od.e4":"Аяқ киім","od.e5":"Бас киім мен аксессуарлар",
"ig.a":"Дүкен сөрелеріндегі жұмсақ ойыншықтар","ig.d":"Сертификат немесе декларация","ig.t":"Ойыншықтар мен балалар тауарлары",
"ig.e1":"Жұмсақ ойыншықтар","ig.e2":"Конструкторлар мен үстел ойындары","ig.e3":"Қуыршақтар мен электронды ойыншықтар","ig.e4":"Нәрестелерге арналған тауарлар","ig.e5":"Арбалар мен балалар ыдысы",
"me.a":"Жиһаз цехындағы шебер","me.d":"Сертификат немесе декларация","me.t":"Жиһаз және қаптама",
"me.e1":"Корпустық және жұмсақ жиһаз","me.e2":"Балалар және кеңсе жиһазы","me.e3":"Қаптама және ыдыс","me.e4":"Пакеттер, үлдірлер, контейнерлер","me.e5":"Тығындау құралдары",

"ea.a":"Контейнер терминалы: ЕАЭО елдеріне жеткізілетін өнім","ea.k":"Кеден одағы","ea.h":"Бес елге бір құжат",
"ea.l":"КО ТР сертификаты мен декларациясы ЕАЭО аумағының барлығында жарамды. Одақ елдерінің кез келгенінің резиденті - өндірушілермен және импорттаушылармен жұмыс істейміз.",
"ea.c1":"Қазақстан","ea.c2":"Қырғызстан","ea.c3":"Ресей","ea.c4":"Армения","ea.c5":"Беларусь",

"tr.k":"Неге BJ Consulting","tr.h":"Қағаз жұмысын өз мойнымызға аламыз",
"tr.1":"Кеңес тегін","tr.1p":"Міндетті талдап, регламент пен құжатты таңдаймыз. Ешбір сұрақ жауапсыз қалмайды.",
"tr.2":"Төлем соңында","tr.2p":"Техникалық жұмыс пен макет - тегін. Құжат реестрге тіркеуге дайын болғанда төлейсіз.",
"tr.3":"ЕАЭО резиденттерінің бәрі","tr.3p":"Қазақстан, Қырғызстан, Ресей, Армения және Беларусь өндірушілері мен импорттаушылары.",
"tr.4":"Тез жауап береміз","tr.4p":"Мамандар жұмыс уақытында байланыста: мәселе тізімін емес, шешім ұсынамыз.",
"st.a":"BJ Consulting кеңсесі","st.t":"Кеңсе фотосы","st.s":"BJ Consulting · Алматы, Көкмайса шағын ауданы, 4",

"st.k":"Жұмыс тәртібі","st.h":"Кеңестен реестрдегі нөмірге дейін","st.pa":"Құжаттарға қол қою",
"s.1":"Кеңес","s.1p":"Өнімді сипаттайсыз - құжат пен техникалық регламенттерді анықтаймыз.",
"s.2":"Құнын келісу","s.2p":"Құны өнім мен құжат санына байланысты.",
"s.3":"Құжат макеті","s.3p":"Сертификат немесе декларация макетін дайындап, сізбен келісеміз.",
"s.4":"Реестрге тіркеу","s.4p":"Төлем осы кезеңде. Құжат нөмір алып, ЕАЭО құрамындағы барлық елде жарамды болады.",

"fq.k":"Сұрақтар","fq.h":"Ең бастысы қысқаша",
"q.1":"Сертификат немесе декларация қанша тұрады?","q.1p":"Құны жеке есептеледі: өнімнің күрделілігі мен құжат санына байланысты. Нақты сомасын кеңестен кейін айтамыз.",
"q.2":"Қашан төлеу керек?","q.2p":"Кеңес, регламенттерді таңдау және макет - тегін. Төлем құжатты реестрге тіркеу алдында.",
"q.3":"Құжат қай жерде жарамды?","q.3p":"ЕАЭО құрамындағы барлық елде: Қазақстан, Қырғызстан, Ресей, Армения, Беларусь.",
"q.4":"Сертификат пен декларация: айырмашылығы неде?","q.4p":"Қандай құжат керек екенін өніміңізге қатысты техникалық регламент анықтайды. Кеңесте бірден айтамыз.",

"kt.k":"Байланыс","kt.h":"Өнімді сипаттаңыз - құжатты таңдап береміз","kt.l":"Жұмыс уақытында жауап береміз: дүйсенбі-жұма, 09:00-17:00.",
"fm.name":"Атыңыз","fm.phone":"Телефон","fm.msg":"Қандай өнім","fm.send":"WhatsApp-қа жіберу",
"fm.ok":"Рақмет! WhatsApp ашылады, хабарлама дайын.","fm.err":"Атыңыз бен телефоныңызды көрсетіңіз.",
"kt.city":"Алматы, Көкмайса шағын ауданы, 4","kt.time":"дс-жм · 09:00-17:00",
"f.sub":"ЕАЭО үшін өнімді сертификаттау · Алматы",
"f.copy":"© 2026 BJ Consulting. КО ТР бойынша сәйкестік сертификаттары мен сәйкестік туралы декларацияларды рәсімдеуде сүйемелдеу."
};

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
},
kk:{
  hero:"Сәлеметсіз бе! ЕАЭО үшін өнімді сертификаттау керек. Өнім: ",
  se:"Сәлеметсіз бе! КО ТР бойынша сәйкестік сертификаты керек. Өнім: ",
  de:"Сәлеметсіз бе! КО ТР бойынша сәйкестік туралы декларация керек. Өнім: ",
  ob:"Сәлеметсіз бе! Тұрмыстық / өнеркәсіптік жабдыққа құжат керек (КО ТР 004, 020, 010, 016, 032). Жабдық: ",
  pi:"Сәлеметсіз бе! Тамақ өніміне декларация керек (КО ТР 021 және т.б.). Өнім: ",
  ko:"Сәлеметсіз бе! Косметика / парфюмерияға декларация керек (КО ТР 009). Өнім: ",
  od:"Сәлеметсіз бе! Киімге құжат керек (КО ТР 017, 007). Өнім: ",
  ig:"Сәлеметсіз бе! Ойыншықтар / балалар тауарларына құжат керек (КО ТР 008, 007). Өнім: ",
  me:"Сәлеметсіз бе! Жиһаз / қаптамаға құжат керек (КО ТР 025, 005). Өнім: ",
  ea:"Сәлеметсіз бе! Өнімді ЕАЭО елдеріне сатамыз, КО ТР құжаты керек. Өнім және елдер: ",
  kontakty:"Сәлеметсіз бе! BJ Consulting сайтынан жазып отырмын. Сертификаттау бойынша кеңес керек: "
}};

var TICK = ["Сертификат соответствия","Декларация о соответствии","ТР ТС","Оборудование","Пищевая продукция","Косметика и парфюмерия","Одежда","Игрушки","Мебель и упаковка","Казахстан · Кыргызстан · Россия · Армения · Беларусь"];
var TICK_KZ = ["Сәйкестік сертификаты","Сәйкестік туралы декларация","КО ТР","Жабдық","Тамақ өнімдері","Косметика және парфюмерия","Киім","Ойыншықтар","Жиһаз және қаптама","Қазақстан · Қырғызстан · Ресей · Армения · Беларусь"];

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ if (RU[el.dataset.i] === undefined) RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return root.lang === "kk" ? "kk" : "ru"; }

function setWaLinks(){
  var L = curLang();
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var t = WA_TXT[L][a.dataset.wa] || WA_TXT[L].hero;
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
    a.target = "_blank"; a.rel = "noopener";
  });
}

function applyLang(lang){
  var kk = lang === "kk";
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
  applyLang(lang);
}
document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){ applyLang(b.getAttribute("data-lang")); });
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
var rsTimer, lastMob = innerWidth < 761;
addEventListener("resize", function(){
  clearTimeout(rsTimer);
  rsTimer = setTimeout(function(){
    fillTicker(); fitText();
    var mob = innerWidth < 761;
    if (mob !== lastMob) { lastMob = mob; buildAllBars(); }
  }, 200);
});
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ fillTicker(); fitText(); });

/* ---------------- ШТРИХКОД: сборка штрихов ----------------
   Детерминированный генератор: у каждого блока свой узор, но он
   не меняется от загрузки к загрузке. Ширины трёх сортов - тонкие,
   средние, широкие - как у настоящего штрихкода. */
function seedRnd(s){
  return function(){ s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
}
function hash(str){ var h = 7; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000003; return h + 11; }
function buildBars(el){
  var mob = innerWidth < 761;
  var small = el.classList.contains("bc-s");
  var target = small ? (mob ? 10 : 13) : (mob ? 26 : 48);
  var rnd = seedRnd(hash(el.dataset.bars || "x"));
  var unit = 100 / target;                 /* средний шаг в % */
  var x = 0, html = "", idx = 0;
  while (x < 100) {
    var t = rnd(), w;
    if (t < .52) w = unit * (0.16 + rnd() * 0.24);        /* тонкий */
    else if (t < .86) w = unit * (0.42 + rnd() * 0.4);    /* средний */
    else w = unit * (0.9 + rnd() * 0.8);                  /* широкий */
    var g = unit * (0.7 + rnd() * 1.1);                   /* щель */
    var d = (rnd() * 0.6).toFixed(2);
    var o = ["0%", "100%", "50%"][Math.floor(rnd() * 3)];
    var c = rnd();
    var cls = c < .06 ? ' class="r"' : (c < .12 ? ' class="r2"' : "");
    html += "<i" + cls + ' style="--x:' + x.toFixed(2) + "%;--w:" + (w + 0.06).toFixed(2) + "%;--d:" + d + ";--o:" + o + '"></i>';
    x += w + g; idx++;
  }
  el.innerHTML = html;
}
function buildAllBars(){ document.querySelectorAll(".bc").forEach(buildBars); }
buildAllBars();

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

/* ---------------- ПЛИТЫ И ШТРИХКОД ----------------
   Один слушатель scroll через rAF. На каждую обёртку .pw пишем
   --enter / --exit / --stay и --open (раскрытие штрихов фото-плит),
   герою ещё --hp: доля интро плюс прокрутка. Дальше всё делает CSS. */
var pws = [].slice.call(document.querySelectorAll(".pw"));
var heroPw = document.getElementById("top");
var hero = heroPw ? heroPw.querySelector(".hero") : null;
var regno = document.getElementById("regno");
var REG_FINAL = regno ? regno.textContent : "";
var bar = document.getElementById("bar");
var kont = document.getElementById("kontakty");
var introK = 1, introDone = true;
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOut(t){ return 1 - Math.pow(1 - t, 2.4); }
function easeInOut(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
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
    pw.style.setProperty("--open",  easeOut(clamp((enter - 0.08) / 0.5)).toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.62);
    if (pw === heroPw) {
      var hp = 0.55 * easeOut(introK) + 0.45 * easeInOut(clamp(stay * 1.25));
      pw.style.setProperty("--hp", hp.toFixed(3));
      if (!RED) scrambleReg(stay);
    }
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
  /* интро: шторки печатают кадр 1250 мс; пропускаем при хэше / прокрутке */
  var skip = location.hash || scrollY > 80;
  if (skip) {
    root.classList.add("no-intro");
    if (hero) hero.classList.add("on");
    update();
  } else {
    introK = 0; introDone = false; update();
    var t0 = null;
    var step = function(ts){
      if (introDone) return;
      if (t0 === null) t0 = ts;
      var p = clamp((ts - t0) / 1250);
      introK = p;
      update();
      if (p < 1) requestAnimationFrame(step);
      else { introDone = true; if (hero) hero.classList.add("on"); }
    };
    requestAnimationFrame(step);
    setTimeout(function(){ if (hero) hero.classList.add("on"); }, 600);
  }
}
window.plateSync = function(){ introDone = true; introK = 1; if (hero) hero.classList.add("on"); update(); };

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

/* ---------------- ФОРМА → WhatsApp ---------------- */
var form = document.getElementById("form");
if (form) form.addEventListener("submit", function(e){
  e.preventDefault();
  var ok = document.getElementById("fmok"), err = document.getElementById("fmerr");
  if (form.company && form.company.value) return;          /* honeypot */
  var name = form.name.value.trim(), phone = form.phone.value.trim(), msg = form.msg.value.trim();
  if (!name || phone.replace(/\D/g, "").length < 10) { err.hidden = false; ok.hidden = true; return; }
  err.hidden = true;
  var L = curLang();
  var t = (L === "kk"
    ? "Сәлеметсіз бе! BJ Consulting сайтынан өтінім.\nАты: " + name + "\nТелефон: " + phone + (msg ? "\nӨнім: " + msg : "")
    : "Здравствуйте! Заявка с сайта BJ Consulting.\nИмя: " + name + "\nТелефон: " + phone + (msg ? "\nПродукция: " + msg : ""));
  ok.hidden = false;
  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(t), "_blank", "noopener");
});

/* ---------------- СТАРТ ---------------- */
snapshot();
initLang();
})();
