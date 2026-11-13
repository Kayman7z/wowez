(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = u => /^https?:\/\//i.test(u || "") ? u : "";
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const SITE = window.SITE || { brand: { ru: "WoW Forever", en: "WoW Forever" }, mark: "F", authors: { ru: "", en: "" } };
  const ADDONS = window.ADDONS || [];
  const SRC = window.CLASS_SOURCES || {};
  const AB = window.ABILITIES_RU || {};

  /* ---------- языки ---------- */
  const T = {
    ru: {
      "nav.where": "Где?", "w.eyebrow": "Поиск по миру", "w.lead": "Впишите название монстра, NPC, босса, задания, подземелья или места, и мы покажем, где это находится.", "w.ph": "Например: Хиджал, Мертвые копи, Overseer Wrex…", "w.hint": "Можно писать по-русски или по-английски. Наша база собрана из датамайна клиента 1.60.1 и знает в основном новое содержимое Forever. У старых мест и NPC есть русские названия, а у нового контента Forever их пока нигде нет, поэтому такие записи на английском. Русское слово мы также пробуем латиницей: «хоггер» найдёт Hogger. Если ничего не нашлось, кнопка ниже ищет на Wowhead по-русски.", "w.wh": "Искать «{q}» на Wowhead ↗", "w.none": "В нашей базе ничего не нашлось.", "w.more": "Показаны первые {n} совпадений, уточните запрос.", "w.noloc": "место пока не известно, смотрите Wowhead", "w.src": "Источник базы:", "w.st": "мест, NPC и заданий в базе",
      "wt.npc": "NPC", "wt.boss": "Босс", "wt.dungeon": "Подземелье", "wt.raid": "Рейд", "wt.zone": "Зона", "wt.area": "Место", "wt.flight": "Точка полётов", "wt.quest": "Задание", "wt.starter": "Предмет, начинающий задание",
      "tal.title": "Калькулятор талантов", "tal.reset": "Сбросить", "tal.help": "Левый клик добавляет очко, правый клик убирает. Чтобы открыть следующий ряд, нужно вложить 5 очков в дерево. Распределение сохраняется в браузере.", "tal.client": "описания талантов из английского клиента 1.60.1", "tal.needRow": "Нужно {n} очков в дереве «{tree}»", "tal.needReq": "Нужно {n} очк. в таланте «{name}»", "tal.rank": "Ранг", "tal.next": "Следующий ранг:",
      "nav.home": "Главная", "nav.addons": "Аддоны", "nav.classes": "Классы", "nav.doll": "Кукла персонажа",
      "home.h1a": "Всё для игры", "home.h1b": "в одном месте",
      "home.lead": "Наши аддоны и те, что мы считаем полезными. Актуальные ротации и таланты для всех девяти классов и планировщик экипировки персонажа.",
      "home.cta1": "Смотреть аддоны →", "home.cta2": "Ротации классов",
      "home.st1": "аддонов в каталоге", "home.st2": "классов", "home.st3": "специализаций с ротациями", "home.st4": "максимальный уровень",
      "home.f1": "Наши разработки и проверенные чужие аддоны с описанием и ссылкой на скачивание.",
      "home.f2t": "Ротации и таланты", "home.f2": "Приоритеты способностей, распределение талантов и статы по каждой специализации, с источниками.",
      "home.f3": "Соберите экипировку по слотам и поделитесь ссылкой с друзьями.", "home.m2": "9 классов · 27 специализаций", "home.demo": "Ротация в действии", "ql.reward": "Награда", "ql.by": "Автор", "ql.ver": "Версия", "ql.upd": "Обновлён", "ql.pick": "Выберите аддон в списке слева.", "c.play": "▶ Проиграть ротацию", "c.stop": "■ Стоп", "c.bar": "Панель команд",
      "addons.eyebrow": "Каталог", "addons.lead": "Наши аддоны и полезные находки.", "addons.search": "Название, автор, тег…",
      "addons.all": "Все", "addons.ours": "Наши", "addons.rec": "Рекомендуем", "addons.our1": "Наш",
      "addons.dl": "⬇ Скачать", "addons.src": "Исходники", "addons.none": "Ничего не найдено",
      "classes.eyebrow": "Гайды", "classes.lead": "Сведено из открытых гайдов. У каждой специализации есть ссылка на первоисточник.",
      "c.races": "Расы", "c.rot": "Ротация на одну цель", "c.heal": "Приоритет лечения", "c.prio": "по приоритету",
      "c.cds": "Кулдауны и советы", "c.aoe": "АоЕ и несколько целей", "c.talents": "Таланты", "c.lvl60": "уровень 60",
      "c.beta": "Источник пока даёт только бета-сборку (ур. 30), версию для 60 обещают обновить.",
      "c.img": "Точное распределение очков источник показывает только картинкой, смотрите по ссылке ниже.",
      "c.key": "Ключевые таланты", "c.stats": "Приоритет статов", "c.changes": "Что изменилось в Forever",
      "c.changesSrc": "wow.gg · изменения от 03.11", "c.source": "Источник:", "c.updated": "гайд обновлён", "c.checked": "проверено",
      "c.names": "Названия способностей даны как в русском клиенте. Новые способности Forever, у которых ещё нет русского названия в открытых источниках, оставлены на английском. Наведите на название, чтобы увидеть английский вариант.",
      "doll.eyebrow": "Планировщик", "doll.lead": "Нажмите на слот, чтобы вписать предмет. Всё сохраняется в браузере, а кнопкой «Поделиться» можно отправить сборку другу.",
      "doll.name": "Имя персонажа", "doll.share": "🔗 Поделиться", "doll.copied": "✓ Ссылка скопирована", "doll.reset": "Очистить",
      "doll.noname": "Безымянный", "doll.empty": "Пусто", "doll.filled": "слотов заполнено", "doll.avg": "средний уровень предметов",
      "doll.epic": "эпических и выше", "doll.rot": "Ротация",
      "dlg.name": "Название предмета", "dlg.q": "Качество", "dlg.ilvl": "Уровень предмета", "dlg.url": "Ссылка (необязательно)",
      "dlg.clear": "Снять", "dlg.cancel": "Отмена", "dlg.save": "Сохранить",
      "q.common": "Обычное", "q.uncommon": "Необычное", "q.rare": "Редкое", "q.epic": "Эпическое", "q.legendary": "Легендарное",
      "foot.made": "сделано", "foot.data": "Данные гайдов:",
      slots: { head: "Голова", neck: "Шея", shoulder: "Плечи", back: "Спина", chest: "Грудь", shirt: "Рубашка", tabard: "Гербовая накидка", wrist: "Запястья", hands: "Кисти рук", waist: "Пояс", legs: "Ноги", feet: "Ступни", finger1: "Палец", finger2: "Палец", trinket1: "Аксессуар", trinket2: "Аксессуар", main: "Правая рука", off: "Левая рука", ranged: "Дальний бой" }
    },
    en: {
      "nav.where": "Where?", "w.eyebrow": "World search", "w.lead": "Type the name of a monster, NPC, boss, quest, dungeon or place and we'll show you where it is.", "w.ph": "e.g. Hogger, Overseer Wrex, Hyjal…", "w.hint": "Our index is built from the 1.60.1 client datamine and mostly covers new Forever content. If nothing turns up, the button below searches Wowhead.", "w.wh": "Search Wowhead for “{q}” ↗", "w.none": "Nothing in our index.", "w.more": "Showing the first {n} matches, try a more specific search.", "w.noloc": "location not known yet, check Wowhead", "w.src": "Index source:", "w.st": "places, NPCs and quests indexed",
      "wt.npc": "NPC", "wt.boss": "Boss", "wt.dungeon": "Dungeon", "wt.raid": "Raid", "wt.zone": "Zone", "wt.area": "Area", "wt.flight": "Flight point", "wt.quest": "Quest", "wt.starter": "Quest starter item",
      "tal.title": "Talent calculator", "tal.reset": "Reset", "tal.help": "Left click adds a point, right click removes one. Each row needs 5 more points in that tree. Your build is saved in this browser.", "tal.client": "talent text from client 1.60.1", "tal.needRow": "Requires {n} points in {tree}", "tal.needReq": "Requires {n} points in {name}", "tal.rank": "Rank", "tal.next": "Next rank:",
      "nav.home": "Home", "nav.addons": "Addons", "nav.classes": "Classes", "nav.doll": "Character sheet",
      "home.h1a": "Everything you need", "home.h1b": "in one place",
      "home.lead": "Our own addons and the ones we find useful. Up-to-date rotations and talents for all nine classes, plus a gear planner for your character.",
      "home.cta1": "Browse addons →", "home.cta2": "Class rotations",
      "home.st1": "addons in the catalog", "home.st2": "classes", "home.st3": "specs with rotations", "home.st4": "level cap",
      "home.f1": "Addons we made and tested third-party ones, with a description and a download link.",
      "home.f2t": "Rotations & talents", "home.f2": "Ability priorities, talent points and stat weights for every spec, with sources.",
      "home.f3": "Plan your gear slot by slot and share the build with a link.", "home.m2": "9 classes · 27 specs", "home.demo": "Rotation in action", "ql.reward": "Reward", "ql.by": "Author", "ql.ver": "Version", "ql.upd": "Updated", "ql.pick": "Pick an addon from the list.", "c.play": "▶ Play rotation", "c.stop": "■ Stop", "c.bar": "Action bar",
      "addons.eyebrow": "Catalog", "addons.lead": "Our addons and useful finds.", "addons.search": "Name, author, tag…",
      "addons.all": "All", "addons.ours": "Ours", "addons.rec": "Recommended", "addons.our1": "Ours",
      "addons.dl": "⬇ Download", "addons.src": "Source", "addons.none": "Nothing found",
      "classes.eyebrow": "Guides", "classes.lead": "Compiled from public guides. Every spec links to its original source.",
      "c.races": "Races", "c.rot": "Single-target rotation", "c.heal": "Healing priority", "c.prio": "by priority",
      "c.cds": "Cooldowns & tips", "c.aoe": "AoE & multiple targets", "c.talents": "Talents", "c.lvl60": "level 60",
      "c.beta": "The source only has a beta build (level 30) so far; a level 60 update is promised.",
      "c.img": "The source only shows the exact point split as an image; see the link below.",
      "c.key": "Key talents", "c.stats": "Stat priority", "c.changes": "What changed in Forever",
      "c.changesSrc": "wow.gg · 3 Nov changes", "c.source": "Source:", "c.updated": "guide updated", "c.checked": "checked",
      "c.names": "",
      "doll.eyebrow": "Planner", "doll.lead": "Click a slot to add an item. Everything is saved in your browser, and Share gives you a link to send the build to a friend.",
      "doll.name": "Character name", "doll.share": "🔗 Share", "doll.copied": "✓ Link copied", "doll.reset": "Clear",
      "doll.noname": "Unnamed", "doll.empty": "Empty", "doll.filled": "slots filled", "doll.avg": "average item level",
      "doll.epic": "epic or better", "doll.rot": "Rotation",
      "dlg.name": "Item name", "dlg.q": "Quality", "dlg.ilvl": "Item level", "dlg.url": "Link (optional)",
      "dlg.clear": "Remove", "dlg.cancel": "Cancel", "dlg.save": "Save",
      "q.common": "Common", "q.uncommon": "Uncommon", "q.rare": "Rare", "q.epic": "Epic", "q.legendary": "Legendary",
      "foot.made": "made by", "foot.data": "Guide data:",
      slots: { head: "Head", neck: "Neck", shoulder: "Shoulder", back: "Back", chest: "Chest", shirt: "Shirt", tabard: "Tabard", wrist: "Wrist", hands: "Hands", waist: "Waist", legs: "Legs", feet: "Feet", finger1: "Finger", finger2: "Finger", trinket1: "Trinket", trinket2: "Trinket", main: "Main hand", off: "Off hand", ranged: "Ranged" }
    }
  };
  const guess = (navigator.language || "ru").toLowerCase().startsWith("ru") ? "ru" : "en";
  let lang = store.get("lang") || guess;
  if (!T[lang]) lang = "ru";
  const t = k => (T[lang] && T[lang][k]) ?? T.ru[k] ?? k;
  const pick = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] ?? v.ru ?? v.en ?? "") : v;

  // Русские названия способностей: заменяем известные английские названия (длинные первыми).
  const abKeys = Object.keys(AB).sort((a, b) => b.length - a.length);
  const abRe = abKeys.length ? new RegExp("(?<![A-Za-z])(" + abKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?![A-Za-z])", "g") : null;
  const ab = s => (lang === "ru" && abRe) ? String(s ?? "").replace(abRe, m => AB[m]) : String(s ?? "");

  // Классы: оформление (цвета, иконки) из русского файла, тексты из файла нужного языка.
  function classes() {
    const ru = window.CLASSES || [], en = window.CLASSES_EN || [];
    if (lang === "ru") return ru;
    return ru.map(c => {
      const e = en.find(x => x.id === c.id);
      return e ? { ...c, ...e, specs: e.specs } : c;
    });
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.title = pick(SITE.brand);
    $("#brand-name").textContent = pick(SITE.brand);
    $("#home-brand").textContent = pick(SITE.brand);
    $("#brand-mark").textContent = SITE.mark || "F";
    $$("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
    $$("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
    $$("#lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    $("#foot-made").textContent = `© 2026 ${pick(SITE.brand)}`;
    $("#foot-src").innerHTML = `${esc(t("foot.data"))} <a href="https://www.warcrafttavern.com/forever/guides/classes/" target="_blank" rel="noopener">Warcraft Tavern</a>, <a href="${esc(SRC.changes)}" target="_blank" rel="noopener">wow.gg</a>, <a href="${esc(SRC.races)}" target="_blank" rel="noopener">seemeta</a>`;
  }
  $$("#lang button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang; store.set("lang", lang); renderAll();
  }));

  /* ---------- роутинг ---------- */
  let page = "home";
  function route() {
    const h = location.hash.slice(1) || "home"; const i = h.indexOf("-");
    const p = i < 0 ? h : h.slice(0, i), arg = i < 0 ? "" : h.slice(i + 1);
    page = ["home", "addons", "classes", "doll", "where"].includes(p) ? p : "home";
    $$("section.page").forEach(s => s.classList.toggle("active", s.id === "page-" + page));
    $$(".tabs a").forEach(a => a.classList.toggle("active", a.dataset.page === page));
    if (page === "classes") selectClass(arg || store.get("cls") || "warrior", false);
    if (page === "doll" && arg) importDoll(arg);
    if (page === "where") { if (arg) { try { wq.value = decodeURIComponent(arg); } catch {} } renderWhere(); setTimeout(() => wq.focus(), 50); }
    window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", route);


  /* ---------- «Где?» ---------- */
  const WHERE = window.WHERE || [];
  const PRU = window.WHERE_PLACES_RU || {};
  const wq = $("#wq");
  const norm = x => String(x).toLowerCase().replace(/ё/g, "е").replace(/[’'`]/g, "'").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const prKeys = Object.keys(PRU).sort((a, b) => b.length - a.length);
  const prRe = prKeys.length ? new RegExp("\\b(" + prKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "g") : null;
  const placeRu = x => prRe ? String(x).replace(prRe, m => PRU[m]) : String(x);
  // русская раскладка → латиница, чтобы «хоггер» нашёл Hogger, а «аили» — Aili
  const TR = { а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya" };
  const PLACE_T = ["zone", "area", "dungeon", "raid", "flight"];
  const ruName = e => e[4] || (PLACE_T.includes(e[1]) ? placeRu(e[0]) : e[0]);
  const translit = x => [...x].map(ch => TR[ch] ?? ch).join("");
  const WIDX = WHERE.map(e => norm([e[0], e[4], placeRu(e[0]), e[2], placeRu(e[2])].filter(Boolean).join(" | ")));
  const WLAT = WIDX.map(x => x.replace(/[^a-z0-9' |]/g, ""));
  const whUrl = v => `https://www.wowhead.com/classic${lang === "ru" ? "/ru" : ""}/search?q=${encodeURIComponent(v)}`;
  function renderWhere() {
    const v = wq.value.trim(), n = norm(v);
    const out = $("#where-out");
    if ($("#st-where")) $("#st-where").textContent = WHERE.length;
    if (n.length < 2) { out.innerHTML = ""; $("#where-wh").hidden = true; return; }
    const cyr = /[а-я]/.test(n), lat = cyr ? translit(n) : "";
    const hits = [];
    WIDX.forEach((x, i) => {
      const nameN = norm(WHERE[i][0]), ruN = norm(ruName(WHERE[i]));
      let rank = -1;
      if (nameN.startsWith(n) || ruN.startsWith(n)) rank = 0;
      else if (nameN.includes(n) || ruN.includes(n)) rank = 1;
      else if (x.includes(n)) rank = 3;
      else if (lat.length >= 3 && (nameN.startsWith(lat) || nameN.includes(" " + lat) ? (rank = 2) : nameN.includes(lat) ? (rank = 2.5) : WLAT[i].includes(lat) ? (rank = 4) : 0)) {}
      if (rank >= 0) hits.push([rank, nameN.length, i]);
    });
    hits.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const LIM = 60, ru = lang === "ru";
    out.innerHTML = hits.length ? hits.slice(0, LIM).map(([, , i]) => { const [name, ty, w, info, rn] = WHERE[i];
      const shown = ru ? ruName(WHERE[i]) : name, wShown = ru ? placeRu(w) : w;
      return `<li class="w-hit w-${ty}"><span class="w-type">${esc(t("wt." + ty))}</span><b>${esc(shown)}${shown !== name ? ` <em class="w-en">${esc(name)}</em>` : ""}</b>
        <span class="w-where">${w ? "📍 " + esc(wShown) : `<i>${esc(t("w.noloc"))}</i>`}</span>${info ? `<small>${esc(info)}</small>` : ""}
        <a href="${esc(whUrl(ru && rn ? rn : name))}" target="_blank" rel="noopener" class="w-link">Wowhead ↗</a></li>`; }).join("")
      + (hits.length > LIM ? `<li class="w-more">${esc(t("w.more").replace("{n}", LIM))}</li>` : "")
      : `<li class="w-more">${esc(t("w.none"))}</li>`;
    const a = $("#where-wh"); a.hidden = false; a.href = whUrl(v); a.textContent = t("w.wh").replace("{q}", v);
  }
  wq.addEventListener("input", () => { history.replaceState(null, "", "#where" + (wq.value.trim() ? "-" + encodeURIComponent(wq.value.trim()) : "")); renderWhere(); });

  /* ---------- аддоны ---------- */
  let kind = "all";
  const q = $("#q");
  let selAddon = 0;
  function addonList() {
    const term = q.value.trim().toLowerCase();
    return ADDONS
      .filter(a => kind === "all" || a.kind === kind)
      .filter(a => !term || [pick(a.name), pick(a.author), pick(a.description), ...(a.tags || []).map(pick)].join(" ").toLowerCase().includes(term))
      .sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "ours" ? -1 : 1) || (b.updated || "").localeCompare(a.updated || ""));
  }
  function renderAddons() {
    const list = addonList();
    if (selAddon >= list.length) selAddon = 0;
    $("#st-addons").textContent = ADDONS.length;
    const groups = [["ours", t("addons.ours")], ["recommended", t("addons.rec")]];
    let i = -1;
    $("#addon-grid").innerHTML = list.length ? groups.map(([k, label]) => {
      const items = list.filter(a => a.kind === k);
      if (!items.length) return "";
      return `<div class="ql-group">${esc(label)}</div>` + items.map(a => { i++; return `
        <button class="ql-item ${i === selAddon ? "active" : ""} ${esc(a.kind)}" data-i="${i}" role="option" aria-selected="${i === selAddon}">
          <span class="ql-mark">${a.kind === "ours" ? "!" : "?"}</span>
          <span class="ql-name">${esc(pick(a.name))}</span>
          <span class="ql-lvl">${a.version ? "v" + esc(a.version) : ""}</span>
        </button>`; }).join("");
    }).join("") : `<p class="empty">${esc(t("addons.none"))}</p>`;
    $$("#addon-grid .ql-item").forEach(b => b.addEventListener("click", () => { selAddon = +b.dataset.i; renderAddons(); }));
    const a = list[selAddon];
    $("#addon-detail").innerHTML = a ? `
      <span class="pill ${esc(a.kind)}">${esc(a.kind === "ours" ? t("addons.our1") : t("addons.rec"))}</span>
      <h3>${esc(pick(a.name))}</h3>
      <p class="ql-desc">${esc(pick(a.description))}</p>
      ${a.note ? `<p class="note">${esc(pick(a.note))}</p>` : ""}
      <dl class="ql-meta">
        <div><dt>${esc(t("ql.by"))}</dt><dd>${esc(pick(a.author))}</dd></div>
        ${a.version ? `<div><dt>${esc(t("ql.ver"))}</dt><dd>${esc(a.version)}</dd></div>` : ""}
        ${a.updated ? `<div><dt>${esc(t("ql.upd"))}</dt><dd>${esc(a.updated)}</dd></div>` : ""}
      </dl>
      <div class="tags">${(a.tags || []).map(x => `<span class="tag">${esc(pick(x))}</span>`).join("")}</div>
      <div class="ql-reward">
        <div class="ql-reward-label">${esc(t("ql.reward"))}</div>
        <div class="links">
          ${safeUrl(a.download) ? `<a class="btn primary" href="${esc(a.download)}" target="_blank" rel="noopener">${esc(t("addons.dl"))}</a>` : ""}
          ${safeUrl(a.source) ? `<a class="btn" href="${esc(a.source)}" target="_blank" rel="noopener">${esc(t("addons.src"))}</a>` : ""}
        </div>
      </div>` : `<p class="muted">${esc(t("ql.pick"))}</p>`;
  }
  q.addEventListener("input", () => { selAddon = 0; renderAddons(); });
  $$("#kind button").forEach(b => b.addEventListener("click", () => {
    kind = b.dataset.kind; selAddon = 0;
    $$("#kind button").forEach(x => x.setAttribute("aria-pressed", x === b));
    renderAddons();
  }));

  /* ---------- классы ---------- */
  const roleIcon = r => /Танк|Tank/.test(r) ? "🛡" : /Лекарь|Healer/.test(r) ? "✚" : "⚔";
  let curClass = "warrior", specIdx = 0;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mono = name => { const w = ab(name).replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean); return ((w[0] || "?")[0] + (w[1] ? w[1][0] : "")).toUpperCase(); };
  const ABI = window.AB_ICONS || {};
  const icoImg = (a, cls) => ABI[a] ? `<img class="${cls}" src="icons/${ABI[a]}" alt="" loading="lazy" onerror="this.remove()">` : "";
  const barHtml = (rot, color) => rot.map(([a], i) => `<button class="ab-btn ${ABI[a] ? "has-ico" : ""}" data-i="${i}" style="--c:${color}" title="${esc(ab(a))}"><span class="ab-mono">${esc(mono(a))}</span>${icoImg(a, "ab-ico")}<span class="ab-key">${i < 9 ? i + 1 : ""}</span><i class="ab-cd"></i></button>`).join("");
  function makePlayer(bar, cast, list, rot, opts = {}) {
    let i = -1, timer = null;
    const ms = opts.ms || 1100;
    const step = n => {
      i = n % rot.length;
      $$(".ab-btn", bar).forEach((b, k) => { b.classList.toggle("on", k === i); if (k === i) { b.classList.remove("cd"); void b.offsetWidth; b.classList.add("cd"); } });
      if (list) $$("li", list).forEach((li, k) => li.classList.toggle("on", k === i));
      if (cast) { cast.querySelector("span").textContent = ab(rot[i][0]); const f = cast.querySelector("i"); f.style.transition = "none"; f.style.width = "0%"; void f.offsetWidth; f.style.transition = `width ${ms}ms linear`; f.style.width = "100%"; }
      if (opts.onStep) opts.onStep(i);
    };
    $$(".ab-btn", bar).forEach(b => b.addEventListener("click", () => step(+b.dataset.i)));
    return {
      play() { if (timer) return; step(i + 1); timer = setInterval(() => step(i + 1), ms); },
      stop() { clearInterval(timer); timer = null; },
      get playing() { return !!timer; }
    };
  }

  /* ---------- деревья талантов ---------- */
  const TAL = window.TALENTS || {};
  const ICON = k => `icons/${k}.png`;
  const tn = n => ab(n);
  const MAX_POINTS = 51;
  let talState = {};   // id -> rank
  let talClass = null;
  function talentKey(c) { return "tal-" + c; }
  function treePoints(tree) { return tree.talents.reduce((n, t) => n + (talState[t.id] || 0), 0); }
  function totalPoints(trees) { return trees.reduce((n, tr) => n + treePoints(tr), 0); }
  function canAdd(trees, tree, t) {
    const r = talState[t.id] || 0;
    if (r >= t.max || totalPoints(trees) >= MAX_POINTS) return false;
    if (treePoints(tree) < t.row * 5) return false;
    if (t.req) { const p = tree.talents.find(x => x.id === t.req); if (p && (talState[p.id] || 0) < (t.reqRank || p.max)) return false; }
    return true;
  }
  function canRemove(trees, tree, t) {
    const r = talState[t.id] || 0;
    if (!r) return false;
    // нельзя снять, если на этот талант опирается другой, или если сломаются требования рядов
    if (tree.talents.some(x => x.req === t.id && (talState[x.id] || 0) > 0)) return false;
    const after = treePoints(tree) - 1;
    for (const x of tree.talents) {
      if (!(talState[x.id] || 0) || x.row <= t.row) continue;
      const below = tree.talents.filter(y => y.row < x.row).reduce((n, y) => n + (talState[y.id] || 0), 0) - (t.row < x.row ? 1 : 0);
      if (below < x.row * 5) return false;
    }
    return after >= 0;
  }
  function renderTalents(c) {
    const host = $("#talents");
    if (!host) return;
    const trees = TAL[c.id];
    if (!trees) { host.innerHTML = ""; return; }
    if (talClass !== c.id) { talClass = c.id; talState = store.get(talentKey(c.id)) || {}; }
    const used = totalPoints(trees);
    const split = trees.map(treePoints).join(" / ");
    host.innerHTML = `
      <div class="tal-head">
        <h3>${esc(t("tal.title"))}</h3>
        <div class="tal-count"><b>${used}</b> / ${MAX_POINTS} · <span>${split}</span></div>
        <button class="btn" id="tal-reset">${esc(t("tal.reset"))}</button>
      </div>
      <p class="muted small flat">${esc(t("tal.help"))}</p>
      <div class="tal-trees">${trees.map((tr, ti) => {
        const rows = Math.max(...tr.talents.map(x => x.row)) + 1;
        const byId = Object.fromEntries(tr.talents.map(x => [x.id, x]));
        const arrows = tr.talents.filter(x => x.req && byId[x.req]).map(x => {
          const p = byId[x.req]; const on = (talState[p.id] || 0) >= (x.reqRank || p.max);
          if (p.col === x.col) return `<i class="tal-arrow v ${on ? "on" : ""}" style="grid-column:${x.col + 1};grid-row:${p.row + 1} / ${x.row + 2}"></i>`;
          return `<i class="tal-arrow h ${on ? "on" : ""}" style="grid-column:${Math.min(p.col, x.col) + 1} / ${Math.max(p.col, x.col) + 2};grid-row:${p.row + 1}"></i>`;
        }).join("");
        return `<div class="tal-tree">
          <div class="tal-tree-head"><b>${esc(tn(tr.name))}</b><span>${treePoints(tr)}</span></div>
          <div class="tal-grid" style="grid-template-rows:repeat(${rows}, 56px)">
            ${arrows}
            ${tr.talents.map(x => {
              const r = talState[x.id] || 0; const avail = canAdd(trees, tr, x);
              const st = r >= x.max ? "max" : r > 0 ? "some" : avail ? "avail" : "locked";
              return `<button class="tal ${st}" data-tree="${ti}" data-id="${x.id}" style="grid-row:${x.row + 1};grid-column:${x.col + 1}" aria-label="${esc(tn(x.name))} ${r}/${x.max}">
                <img src="${ICON(x.icon)}" alt="" width="40" height="40" onerror="this.style.visibility='hidden'"><span class="tal-rank">${r}/${x.max}</span></button>`;
            }).join("")}
          </div></div>`;
      }).join("")}</div>
      <div class="tal-tip" id="tal-tip" hidden></div>
      <div class="source">${esc(t("c.source"))} <a href="https://wowforevercalc.com/${c.id}/" target="_blank" rel="noopener">wowforevercalc.com ↗</a><span>${esc(t("tal.client"))}</span></div>`;
    const tip = $("#tal-tip");
    $$(".tal", host).forEach(b => {
      const tr = trees[+b.dataset.tree]; const x = tr.talents.find(y => y.id === +b.dataset.id);
      const show = () => {
        const r = talState[x.id] || 0;
        const cur = r ? x.ranks[Math.min(r, x.ranks.length) - 1] : "";
        const next = r < x.max ? x.ranks[Math.min(r, x.ranks.length - 1)] : "";
        const need = [];
        if (treePoints(tr) < x.row * 5 && !r) need.push(t("tal.needRow").replace("{n}", x.row * 5).replace("{tree}", tn(tr.name)));
        if (x.req) { const p = tr.talents.find(y => y.id === x.req); if (p && (talState[p.id] || 0) < (x.reqRank || p.max)) need.push(t("tal.needReq").replace("{n}", x.reqRank || p.max).replace("{name}", tn(p.name))); }
        tip.innerHTML = `<b>${esc(tn(x.name))}</b><small>${esc(t("tal.rank"))} ${r}/${x.max}</small>
          ${cur ? `<p>${esc(cur)}</p>` : ""}${next ? `<p class="next"><em>${esc(t("tal.next"))}</em> ${esc(next)}</p>` : ""}
          ${need.map(n => `<p class="need">${esc(n)}</p>`).join("")}`;
        tip.hidden = false;
        const rb = b.getBoundingClientRect(), hb = host.getBoundingClientRect();
        let left = rb.right - hb.left + 8; if (left + 300 > hb.width) left = Math.max(0, rb.left - hb.left - 308);
        tip.style.left = left + "px"; tip.style.top = (rb.top - hb.top) + "px";
      };
      b.addEventListener("mouseenter", show); b.addEventListener("focus", show);
      b.addEventListener("mouseleave", () => tip.hidden = true); b.addEventListener("blur", () => tip.hidden = true);
      b.addEventListener("click", () => { if (canAdd(trees, tr, x)) { talState[x.id] = (talState[x.id] || 0) + 1; store.set(talentKey(c.id), talState); renderTalents(c); $(`.tal[data-id="${x.id}"]`, host)?.focus(); } });
      b.addEventListener("contextmenu", e => { e.preventDefault(); if (canRemove(trees, tr, x)) { talState[x.id]--; if (!talState[x.id]) delete talState[x.id]; store.set(talentKey(c.id), talState); renderTalents(c); $(`.tal[data-id="${x.id}"]`, host)?.focus(); } });
    });
    $("#tal-reset").addEventListener("click", () => { talState = {}; store.set(talentKey(c.id), talState); renderTalents(c); });
  }

  let classPlayer = null;
  function renderClassGrid() {
    $("#class-grid").innerHTML = classes().map(c => `
      <button class="class-btn ${c.id === curClass ? "active" : ""}" data-id="${c.id}" style="--c:${c.color}">
        <div class="ci">${c.icon}</div><b>${esc(c.name)}</b><span>${c.specs.map(s => roleIcon(s.role)).join(" ")}</span>
      </button>`).join("");
    $$(".class-btn").forEach(b => b.addEventListener("click", () => {
      history.replaceState(null, "", "#classes-" + b.dataset.id);
      selectClass(b.dataset.id, true);
    }));
  }
  function selectClass(id, scroll) {
    const c = classes().find(x => x.id === id) || classes()[0];
    curClass = c.id; store.set("cls", c.id);
    $$(".class-btn").forEach(b => b.classList.toggle("active", b.dataset.id === c.id));
    specIdx = Math.min(store.get("spec-" + c.id) || 0, c.specs.length - 1);
    renderClass();
    if (scroll) $("#class-view").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderClass() {
    const c = classes().find(x => x.id === curClass) || classes()[0];
    const s = c.specs[specIdx];
    const host = new URL(s.src).hostname.replace("www.", "");
    const healer = /Лекарь|Healer/.test(s.role);
    const date = d => lang === "ru" ? d.split("-").reverse().join(".") : new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    $("#class-view").innerHTML = `
      <div class="class-head glass" style="--c:${c.color}">
        <h2>${c.icon} ${esc(c.name)}</h2>
        <p>${esc(t("c.races"))}: ${c.races.map(esc).join(", ")}</p>
        <div class="spec-tabs">${c.specs.map((x, i) => `<button data-i="${i}" class="${i === specIdx ? "active" : ""}">${esc(x.name)}<span class="role">${esc(x.role)}</span></button>`).join("")}</div>
      </div>
      <div class="bar-wrap glass" style="--c:${c.color}">
        <div class="bar-head"><h3>${esc(t("c.bar"))}</h3><button class="btn primary" id="rot-play">${esc(t("c.play"))}</button></div>
        <div class="castbar" id="rot-cast"><i></i><span>${esc(ab(s.rot[0][0]))}</span></div>
        <div class="actionbar" id="rot-bar">${barHtml(s.rot, c.color)}</div>
      </div>
      <div class="spec-body" style="--c:${c.color}">
        <div class="panel glass">
          <h3>${esc(t(healer ? "c.heal" : "c.rot"))}<small>${esc(t("c.prio"))}</small></h3>
          <ol class="rot" id="rot-list">${s.rot.map(([a, n]) => `<li>${icoImg(a, "li-ico")}<div><b title="${esc(a)}">${esc(ab(a))}</b>${n ? `<span>${esc(ab(n))}</span>` : ""}</div></li>`).join("")}</ol>
          ${s.cds ? `<h3 class="sub">${esc(t("c.cds"))}</h3><p class="muted small flat">${esc(ab(s.cds))}</p>` : ""}
          ${s.aoe ? `<h3 class="sub">${esc(t("c.aoe"))}</h3><p class="muted small flat">${esc(ab(s.aoe))}</p>` : ""}
        </div>
        <div class="kv">
          <div class="panel glass">
            <h3>${esc(t("c.talents"))}<small>${s.split ? esc(t("c.lvl60")) : ""}</small></h3>
            ${s.split ? `<div class="talent-split">${s.split.map((p, i) => `<div><b>${p}</b><span>${esc(c.trees[i])}</span></div>`).join("")}</div>`
              : `<div class="warn">${esc(t(s.beta ? "c.beta" : "c.img"))}</div>`}
            <h3 class="sub">${esc(t("c.key"))}</h3>
            <div class="chips">${s.key.map(k => `<span title="${esc(k)}">${icoImg(k, "chip-ico")}${esc(ab(k))}</span>`).join("")}</div>
          </div>
          <div class="panel glass">
            <h3>${esc(t("c.stats"))}</h3>
            ${s.stats ? `<div class="statline">${s.stats.map(esc).join(" <i>›</i> ")}</div>` : ""}
            ${s.statsNote ? `<p class="muted small flat" style="margin-top:${s.stats ? "10px" : "0"}">${esc(s.statsNote)}</p>` : ""}
          </div>
          ${c.changes.length ? `<div class="panel glass"><h3>${esc(t("c.changes"))}</h3>
            <ul class="muted small changes">${c.changes.map(x => `<li>${esc(ab(x))}</li>`).join("")}</ul>
            <div class="source"><a href="${esc(SRC.changes)}" target="_blank" rel="noopener">${esc(t("c.changesSrc"))}</a></div></div>` : ""}
        </div>
      </div>
      <div class="source">${esc(t("c.source"))} <a href="${esc(s.src)}" target="_blank" rel="noopener">${esc(host)} · ${esc(s.name)} ↗</a>
        ${s.updated ? `<span>${esc(t("c.updated"))} ${esc(date(s.updated))}</span>` : ""}
        <span>${esc(t("c.checked"))} ${esc(date("2026-11-13"))}</span></div>
      <div class="panel glass tal-wrap" id="talents" style="--c:${c.color}"></div>
      ${t("c.names") ? `<p class="muted small names-note">${esc(t("c.names"))}</p>` : ""}`;
    renderTalents(c);
    $$(".spec-tabs button").forEach(b => b.addEventListener("click", () => {
      specIdx = +b.dataset.i; store.set("spec-" + c.id, specIdx); renderClass();
    }));
    if (classPlayer) classPlayer.stop();
    classPlayer = makePlayer($("#rot-bar"), $("#rot-cast"), $("#rot-list"), s.rot);
    $("#rot-play").addEventListener("click", () => {
      if (classPlayer.playing) { classPlayer.stop(); $("#rot-play").textContent = t("c.play"); }
      else { classPlayer.play(); $("#rot-play").textContent = t("c.stop"); }
    });
  }

  /* ---------- кукла персонажа ---------- */
  const SLOTS = {
    left: [["head", "⛑"], ["neck", "📿"], ["shoulder", "🦺"], ["back", "🧣"], ["chest", "🥋"], ["shirt", "👕"], ["tabard", "🏳"], ["wrist", "⌚"]],
    right: [["hands", "🧤"], ["waist", "➰"], ["legs", "👖"], ["feet", "🥾"], ["finger1", "💍"], ["finger2", "💍"], ["trinket1", "🔶"], ["trinket2", "🔶"]],
    weapons: [["main", "🗡"], ["off", "🛡"], ["ranged", "🏹"]]
  };
  const ALL_SLOTS = [...SLOTS.left, ...SLOTS.right, ...SLOTS.weapons];
  const QCOL = { common: "#ffffff", uncommon: "#1eff00", rare: "#0070dd", epic: "#a335ee", legendary: "#ff8000" };
  let doll = store.get("doll") || { name: "", cls: "warrior", spec: 0, items: {} };
  const dc = $("#doll-class"), ds = $("#doll-spec"), dn = $("#doll-name");

  function fillDollSelects() {
    dc.innerHTML = classes().map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
    const c = classes().find(x => x.id === doll.cls) || classes()[0];
    dc.value = c.id;
    ds.innerHTML = c.specs.map((s, i) => `<option value="${i}">${esc(s.name)}</option>`).join("");
    ds.value = doll.spec;
  }
  function saveDoll() { store.set("doll", doll); renderDoll(); }
  function slotHtml([id, ico]) {
    const it = doll.items[id];
    const label = T[lang].slots[id];
    return `<button class="slot ${it ? "filled" : ""}" data-slot="${id}" style="${it ? `--q:${QCOL[it.q] || QCOL.rare}` : ""}">
      <span class="sq">${ico}</span>
      <span class="txt"><small>${esc(label)}${it && it.ilvl ? ` · ${esc(it.ilvl)}` : ""}</small>
      ${it ? `<b>${esc(it.name)}</b>` : `<b class="empty-s">${esc(t("doll.empty"))}</b>`}</span></button>`;
  }
  function renderDoll() {
    const c = classes().find(x => x.id === doll.cls) || classes()[0];
    const s = c.specs[doll.spec] || c.specs[0];
    dn.value = doll.name || "";
    const el = $("#doll-grid");
    el.style.setProperty("--c", c.color);
    el.innerHTML = `
      <div class="col left">${SLOTS.left.map(slotHtml).join("")}</div>
      <div class="figure">
        <div class="who"><b id="doll-who">${esc(doll.name || t("doll.noname"))}</b><span>${esc(s.name)} · ${esc(c.name)}</span></div>
        <svg viewBox="0 0 120 200" fill="none" stroke="${c.color}" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true">
          <circle cx="60" cy="28" r="15" fill="${c.color}22"/>
          <path d="M38 52 Q60 44 82 52 L92 100 L82 102 L78 74 L76 118 L44 118 L42 74 L38 102 L28 100 Z" fill="${c.color}18"/>
          <path d="M46 118 L44 186 L56 186 L60 128 L64 186 L76 186 L74 118" fill="${c.color}14"/>
        </svg>
        <div class="who"><span>${c.icon} ${esc(s.role)}</span></div>
      </div>
      <div class="col right">${SLOTS.right.map(slotHtml).join("")}</div>
      <div class="weapons">${SLOTS.weapons.map(slotHtml).join("")}</div>`;
    $$(".slot", el).forEach(b => b.addEventListener("click", () => openSlot(b.dataset.slot)));
    const items = Object.values(doll.items);
    const lv = items.filter(i => +i.ilvl > 0).map(i => +i.ilvl);
    const avg = lv.length ? (lv.reduce((a, b) => a + b, 0) / lv.length).toFixed(1) : "—";
    const epics = items.filter(i => i.q === "epic" || i.q === "legendary").length;
    const links = items.filter(i => safeUrl(i.url));
    $("#doll-summary").innerHTML = `
      <div><b>${items.length}</b> <span class="muted">/ ${ALL_SLOTS.length} ${esc(t("doll.filled"))}</span></div>
      <div><b>${avg}</b> <span class="muted">${esc(t("doll.avg"))}</span></div>
      <div><b style="color:${QCOL.epic}">${epics}</b> <span class="muted">${esc(t("doll.epic"))}</span></div>
      <a class="btn" href="#classes-${c.id}" style="margin-left:auto">${esc(t("doll.rot"))}: ${esc(s.name)} →</a>
      ${links.length ? `<div class="item-links">${links.map(i => `<a href="${esc(i.url)}" target="_blank" rel="noopener" style="color:${QCOL[i.q] || QCOL.rare}">${esc(i.name)} ↗</a>`).join("")}</div>` : ""}`;
  }
  const dlg = $("#slot-dialog");
  let curSlot = null;
  function openSlot(id) {
    curSlot = id;
    const it = doll.items[id] || {};
    $("#slot-title").textContent = T[lang].slots[id];
    $("#f-name").value = it.name || ""; $("#f-q").value = it.q || "rare"; $("#f-ilvl").value = it.ilvl || ""; $("#f-url").value = it.url || "";
    dlg.showModal();
  }
  dlg.addEventListener("close", () => {
    if (dlg.returnValue === "save" && $("#f-name").value.trim()) {
      doll.items[curSlot] = { name: $("#f-name").value.trim(), q: $("#f-q").value, ilvl: $("#f-ilvl").value, url: $("#f-url").value.trim() };
    } else if (dlg.returnValue === "clear") delete doll.items[curSlot];
    saveDoll();
  });
  dc.addEventListener("change", () => { doll.cls = dc.value; doll.spec = 0; fillDollSelects(); saveDoll(); });
  ds.addEventListener("change", () => { doll.spec = +ds.value; saveDoll(); });
  dn.addEventListener("input", () => { doll.name = dn.value; store.set("doll", doll); $("#doll-who").textContent = dn.value || t("doll.noname"); });
  $("#doll-reset").addEventListener("click", () => { doll.items = {}; saveDoll(); });
  $("#doll-share").addEventListener("click", async () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(doll)))).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
    const url = location.href.split("#")[0] + "#doll-" + code;
    const out = $("#doll-share-url");
    try { await navigator.clipboard.writeText(url); $("#doll-share").textContent = t("doll.copied"); setTimeout(() => $("#doll-share").textContent = t("doll.share"), 2000); }
    catch { out.hidden = false; out.value = url; out.select(); }
  });
  function importDoll(code) {
    try {
      const d = JSON.parse(decodeURIComponent(escape(atob(code.replace(/-/g, "+").replace(/_/g, "/")))));
      if (d && typeof d.items === "object") { doll = { name: String(d.name || ""), cls: String(d.cls || "warrior"), spec: +d.spec || 0, items: d.items }; fillDollSelects(); saveDoll(); }
    } catch {}
    history.replaceState(null, "", "#doll");
  }

  let demo = null, demoIdx = 0, demoNext = null;
  function renderDemo() {
    const cls = classes();
    const c = cls[demoIdx % cls.length]; const sp = c.specs.find(x => !/Лекарь|Healer/.test(x.role)) || c.specs[0];
    const rot = sp.rot.slice(0, 8);
    $(".demo").style.setProperty("--c", c.color);
    $("#demo-label").innerHTML = `${esc(t("home.demo"))} · <b style="color:${c.color}">${esc(sp.name)} · ${esc(c.name)}</b>`;
    $("#demo-bar").innerHTML = barHtml(rot, c.color);
    if (demo) demo.stop();
    clearTimeout(demoNext);
    demo = makePlayer($("#demo-bar"), $("#demo-cast"), null, rot, { ms: 900, onStep: i => {
      if (i === rot.length - 1) { demo.stop(); demoNext = setTimeout(() => { demoIdx++; renderDemo(); }, 1100); }
    } });
    if (!reduce) demo.play();
  }

  function renderAll() {
    applyStatic();
    renderAddons();
    renderClassGrid();
    if (page === "classes") renderClass();
    fillDollSelects();
    renderDoll();
    renderDemo();
    renderWhere();
  }
  renderAll();
  route();
})();
