(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = u => /^(https?:\/\/|addons\/)/i.test(u || "") ? u : "";
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const SITE = window.SITE || { brand: { ru: "WoWez", en: "WoWez" } };
  const REPO = { owner: "Kayman7z", name: "wowez", branch: "main" };
  const SRC = window.CLASS_SOURCES || {};
  const AB = window.ABILITIES_RU || {};
  const ART = window.CLASS_ART || {};
  const ABI = window.AB_ICONS || {};
  const ITEMS = window.ITEMS || [];
  const BIS = window.BIS || { lists: {}, worn: {}, specs: [] };
  const ITEM = new Map(ITEMS.map(i => [i.i, i]));

  /* ---------- тексты ---------- */
  const T = {
    ru: {
      "brand.sub": "WoW Forever · гайды и аддоны",
      "nav.home": "Главная", "nav.guides": "Гайды по классам", "nav.addons": "Аддоны", "nav.doll": "Кукла персонажа", "nav.where": "Где?",
      "home.live": "Серверы работают · клиент 1.60.1", "home.h1": "Гайды, таланты и аддоны для WoW Forever",
      "home.lead": "Готовые сборки талантов 60 уровня, ротации и лучшая экипировка для всех 27 специализаций. Наши аддоны и проверенные чужие, кукла персонажа и поиск по миру игры.",
      "home.cta1": "Выбрать класс", "home.cta2": "Аддоны", "home.cta3": "Где найти?", "home.demo": "Ротация в действии",
      "home.pick": "Выберите класс и специализацию", "home.addonsT": "Аддоны", "home.changesT": "Что изменилось в Forever", "home.all": "Все →",
      "home.s1": "специализаций", "home.s2": "предметов в базе", "home.s3": "аддонов", "home.s4": "мест и NPC",
      "c.tags.pve": "PvE", "c.updated": "Гайд обновлён", "c.checked": "проверено",
      "toc.talents": "Таланты", "toc.rot": "Ротация", "toc.stats": "Статы", "toc.gear": "Экипировка", "toc.changes": "Изменения Forever",
      "c.rot": "Ротация на одну цель", "c.heal": "Приоритет лечения", "c.prio": "по приоритету", "c.bar": "Панель команд",
      "c.play": "▶ Проиграть", "c.stop": "■ Стоп", "c.cds": "Кулдауны и советы", "c.aoe": "АоЕ и несколько целей",
      "c.key": "Ключевые таланты", "c.stats": "Приоритет характеристик", "c.races": "Расы", "c.changes": "Что изменилось у класса",
      "c.changesSrc": "wow.gg · изменения от 03.11", "c.source": "Источник:", "c.guideSrc": "Ротация и статы:",
      "c.names": "Названия способностей даны как в русском клиенте. Новые способности Forever, у которых ещё нет русского названия, оставлены на английском. Наведите на название, чтобы увидеть английский вариант.",
      "g.lead": "Лучшие предметы для специализации по слотам. Первым идёт лучший, ниже замены. Наведите на предмет, чтобы увидеть характеристики.",
      "g.lvl": "Уровень", "g.src": "Списки BiS:", "g.doll": "Открыть в кукле →",
      "tal.title": "Таланты 60 уровня", "tal.reset": "Очистить", "tal.preset": "Сборка из гайда", "tal.presetSrc": "Сборка:", "tal.pick": "Сборка", "tal.partial": "На сайте-источнике в этой сборке распределено {n} из 51 очка, остальные можно добавить самому.", "tal.calc": "открыть в их калькуляторе",
      "tal.help": "Открыта рекомендуемая PvE-сборка. Левый клик добавляет очко, правый убирает. Изменения сохраняются в браузере, «Сборка из гайда» возвращает исходную.",
      "tal.client": "описания талантов из клиента 1.60.1 (англ.)", "tal.needRow": "Нужно {n} очков в дереве «{tree}»", "tal.needReq": "Нужно {n} очк. в таланте «{name}»", "tal.rank": "Ранг", "tal.next": "Следующий ранг:",
      "addons.eyebrow": "Каталог", "addons.h1": "Аддоны для WoW Forever", "addons.lead": "Наши аддоны, дополнения к известным аддонам и проверенные чужие. У каждого видно, работает ли он в Forever и когда это проверяли.",
      "addons.search": "Название, автор, категория…", "addons.all": "Все", "addons.ours": "Наши", "addons.plugins": "Дополнения", "addons.rec": "Рекомендуем",
      "addons.none": "Пока пусто. Загрузите первый аддон, инструкция ниже.", "addons.dl": "⬇ Скачать", "addons.by": "Автор", "addons.ver": "Версия", "addons.checked": "Проверено", "addons.for": "Дополнение к",
      "addons.inForever": "В Forever:", "addons.statusSrc": "Статус по данным", "addons.add": "+ Добавить аддон",
      "st.ok": "Работает в Forever", "st.classic": "Есть версия для Classic, в Forever не подтверждено", "st.unknown": "Неизвестно",
      "k.ours": "Наш", "k.plugins": "Дополнение", "k.recommended": "Рекомендуем",
      "up.title": "Как добавить свой аддон (для Kayman и Danrer)",
      "up.formT": "Добавить аддон", "up.kind": "Куда", "up.name": "Название", "up.cat": "Категория", "up.descRu": "Описание (рус.)", "up.descEn": "Описание (англ., можно пусто)",
      "up.status": "Работает в Forever?", "up.for": "Для какого аддона (только для дополнений)", "up.link": "Ссылка на скачивание (если zip не загружаете)", "up.file": "Имя zip-файла (если загружали в папку)", "up.go": "Открыть на GitHub и сохранить",
      "doll.eyebrow": "Планировщик экипировки", "doll.lead": "Выберите класс и специализацию. Кнопка «Лучшая экипировка» ставит BiS 60 уровня из базы игры. Нажмите на слот, чтобы выбрать другой предмет из списка.",
      "doll.name": "Имя персонажа", "doll.share": "🔗 Поделиться", "doll.copied": "✓ Ссылка скопирована", "doll.reset": "Очистить", "doll.bis": "★ Лучшая экипировка (BiS 60)",
      "doll.noname": "Безымянный", "doll.empty": "Пусто", "doll.filled": "слотов", "doll.avg": "ср. уровень предметов", "doll.stats": "Характеристики", "doll.nostats": "Наденьте предметы, и здесь появятся суммарные характеристики.",
      "doll.find": "Название предмета…", "doll.clearSlot": "Снять предмет", "doll.recommended": "Лучшее для специализации", "doll.all": "Все подходящие предметы", "doll.more": "Показаны первые {n}, уточните поиск.", "doll.guide": "Гайд",
      "where.x": "",
      "slots": { head: "Голова", neck: "Шея", shoulder: "Плечи", back: "Спина", chest: "Грудь", shirt: "Рубашка", tabard: "Гербовая накидка", wrist: "Запястья", hands: "Кисти рук", waist: "Пояс", legs: "Ноги", feet: "Ступни", finger1: "Палец", finger2: "Палец", trinket1: "Аксессуар", trinket2: "Аксессуар", main: "Правая рука", off: "Левая рука", ranged: "Дальний бой", relic: "Реликвия" },
      "relic": { paladin: "Манускрипт", shaman: "Тотем", druid: "Идол" },
      "islot": { "Head": "Голова", "Neck": "Шея", "Shoulder": "Плечи", "Back": "Спина", "Chest": "Грудь", "Wrist": "Запястья", "Hands": "Кисти рук", "Waist": "Пояс", "Legs": "Ноги", "Feet": "Ступни", "Finger": "Кольцо", "Trinket": "Аксессуар", "Main hand": "Правая рука", "Off hand": "Левая рука", "One-hand": "Одноручное", "Two-hand": "Двуручное", "Held in off hand": "В левой руке", "Shield": "Щит", "Ranged": "Дальний бой", "Thrown": "Метательное", "Relic": "Реликвия", "Shirt": "Рубашка", "Tabard": "Накидка" },
      "stat": { "Stamina": "Выносливость", "Intellect": "Интеллект", "Strength": "Сила", "Spirit": "Дух", "Agility": "Ловкость", "Spell Power": "Сила заклинаний", "Critical Strike": "Крит. удар", "Healing": "Исцеление", "Armor": "Броня", "Spell Damage": "Урон от заклинаний", "Attack Power": "Сила атаки", "Hit": "Меткость", "Mana per 5 sec": "Мана раз в 5 сек.", "Defense": "Защита", "Fire Resistance": "Сопр. огню", "Nature Resistance": "Сопр. силам природы", "Shadow Resistance": "Сопр. тьме", "Frost Resistance": "Сопр. магии льда", "Haste": "Скорость", "Dodge": "Уклонение", "Expertise": "Мастерство", "Parry": "Парирование", "Block": "Блок", "Block Value": "Показатель блока", "Ranged Attack Power": "Сила атаки дальн. боя", "Spell Penetration": "Проник. заклинаний", "Health per 5 sec": "Здоровье раз в 5 сек.", "Arcane Resistance": "Сопр. тайной магии" },
      "w.eyebrow": "Поиск по миру", "w.lead": "Впишите название монстра, NPC, босса, задания, подземелья или места, и мы покажем, где это находится.", "w.ph": "Например: Хиджал, Мертвые копи, Overseer Wrex…",
      "w.hint": "Можно писать по-русски или по-английски. База собрана из датамайна клиента 1.60.1 и знает в основном новое содержимое Forever. У нового контента Forever русских названий пока нет нигде, такие записи на английском. Если ничего не нашлось, кнопка ниже ищет на Wowhead.",
      "w.wh": "Искать «{q}» на Wowhead ↗", "w.none": "В нашей базе ничего не нашлось.", "w.more": "Показаны первые {n} совпадений, уточните запрос.", "w.noloc": "место пока не известно, смотрите Wowhead", "w.src": "Источник базы:",
      "wt.npc": "NPC", "wt.boss": "Босс", "wt.dungeon": "Подземелье", "wt.raid": "Рейд", "wt.zone": "Зона", "wt.area": "Место", "wt.flight": "Точка полётов", "wt.quest": "Задание", "wt.starter": "Начинает задание",
      "foot.data": "Данные:"
    },
    en: {
      "brand.sub": "WoW Forever · guides & addons",
      "nav.home": "Home", "nav.guides": "Class guides", "nav.addons": "Addons", "nav.doll": "Character sheet", "nav.where": "Where?",
      "home.live": "Servers live · client 1.60.1", "home.h1": "Guides, talents and addons for WoW Forever",
      "home.lead": "Ready level 60 talent builds, rotations and best-in-slot gear for all 27 specs. Our own addons and tested third-party ones, a character planner and a world search.",
      "home.cta1": "Pick a class", "home.cta2": "Addons", "home.cta3": "Where is it?", "home.demo": "Rotation in action",
      "home.pick": "Pick your class and spec", "home.addonsT": "Addons", "home.changesT": "What changed in Forever", "home.all": "All →",
      "home.s1": "specs", "home.s2": "items indexed", "home.s3": "addons", "home.s4": "places & NPCs",
      "c.tags.pve": "PvE", "c.updated": "Guide updated", "c.checked": "checked",
      "toc.talents": "Talents", "toc.rot": "Rotation", "toc.stats": "Stats", "toc.gear": "Gear", "toc.changes": "Forever changes",
      "c.rot": "Single-target rotation", "c.heal": "Healing priority", "c.prio": "by priority", "c.bar": "Action bar",
      "c.play": "▶ Play", "c.stop": "■ Stop", "c.cds": "Cooldowns & tips", "c.aoe": "AoE & cleave",
      "c.key": "Key talents", "c.stats": "Stat priority", "c.races": "Races", "c.changes": "Class changes",
      "c.changesSrc": "wow.gg · changes from 11/03", "c.source": "Source:", "c.guideSrc": "Rotation & stats:", "c.names": "",
      "g.lead": "Best items for the spec by slot. The first is the best, alternatives below. Hover an item to see its stats.",
      "g.lvl": "Level", "g.src": "BiS lists:", "g.doll": "Open in character sheet →",
      "tal.title": "Level 60 talents", "tal.reset": "Clear", "tal.preset": "Guide build", "tal.presetSrc": "Build:", "tal.pick": "Build", "tal.partial": "The source spends only {n} of 51 points in this build; add the rest yourself.", "tal.calc": "open in their calculator",
      "tal.help": "The recommended PvE build is loaded. Left click adds a point, right click removes one. Changes are saved in this browser; \"Guide build\" restores the original.",
      "tal.client": "talent text from client 1.60.1", "tal.needRow": "Requires {n} points in {tree}", "tal.needReq": "Requires {n} points in {name}", "tal.rank": "Rank", "tal.next": "Next rank:",
      "addons.eyebrow": "Catalog", "addons.h1": "Addons for WoW Forever", "addons.lead": "Our addons, plugins for well-known addons and tested third-party ones. Each shows whether it works in Forever and when that was checked.",
      "addons.search": "Name, author, category…", "addons.all": "All", "addons.ours": "Ours", "addons.plugins": "Plugins", "addons.rec": "Recommended",
      "addons.none": "Nothing here yet. Upload the first addon, see below.", "addons.dl": "⬇ Download", "addons.by": "Author", "addons.ver": "Version", "addons.checked": "Checked", "addons.for": "Plugin for",
      "addons.inForever": "In Forever:", "addons.statusSrc": "Status from", "addons.add": "+ Add addon",
      "st.ok": "Works in Forever", "st.classic": "Classic version exists, Forever unconfirmed", "st.unknown": "Unknown",
      "k.ours": "Ours", "k.plugins": "Plugin", "k.recommended": "Recommended",
      "up.title": "How to add your addon (for Kayman and Danrer)",
      "up.formT": "Add an addon", "up.kind": "Where", "up.name": "Name", "up.cat": "Category", "up.descRu": "Description (Russian)", "up.descEn": "Description (English, optional)",
      "up.status": "Works in Forever?", "up.for": "Plugin for which addon (plugins only)", "up.link": "Download link (if you don't upload a zip)", "up.file": "Zip file name (if uploaded to the folder)", "up.go": "Open on GitHub and save",
      "doll.eyebrow": "Gear planner", "doll.lead": "Pick a class and spec. \"Best gear\" equips level 60 BiS from the game data. Click a slot to choose another item from the list.",
      "doll.name": "Character name", "doll.share": "🔗 Share", "doll.copied": "✓ Link copied", "doll.reset": "Clear", "doll.bis": "★ Best gear (BiS 60)",
      "doll.noname": "Unnamed", "doll.empty": "Empty", "doll.filled": "slots", "doll.avg": "avg item level", "doll.stats": "Stats", "doll.nostats": "Equip items to see your total stats here.",
      "doll.find": "Item name…", "doll.clearSlot": "Unequip", "doll.recommended": "Best for this spec", "doll.all": "All matching items", "doll.more": "Showing the first {n}, refine the search.", "doll.guide": "Guide",
      "slots": { head: "Head", neck: "Neck", shoulder: "Shoulder", back: "Back", chest: "Chest", shirt: "Shirt", tabard: "Tabard", wrist: "Wrist", hands: "Hands", waist: "Waist", legs: "Legs", feet: "Feet", finger1: "Finger", finger2: "Finger", trinket1: "Trinket", trinket2: "Trinket", main: "Main hand", off: "Off hand", ranged: "Ranged", relic: "Relic" },
      "relic": { paladin: "Libram", shaman: "Totem", druid: "Idol" },
      "islot": {}, "stat": {},
      "w.eyebrow": "World search", "w.lead": "Type the name of a monster, NPC, boss, quest, dungeon or place and we'll show you where it is.", "w.ph": "e.g. Hogger, Overseer Wrex, Hyjal…",
      "w.hint": "Our index is built from the 1.60.1 client datamine and mostly covers new Forever content. If nothing turns up, the button below searches Wowhead.",
      "w.wh": "Search Wowhead for “{q}” ↗", "w.none": "Nothing in our index.", "w.more": "Showing the first {n} matches, try a more specific search.", "w.noloc": "location not known yet, check Wowhead", "w.src": "Index source:",
      "wt.npc": "NPC", "wt.boss": "Boss", "wt.dungeon": "Dungeon", "wt.raid": "Raid", "wt.zone": "Zone", "wt.area": "Area", "wt.flight": "Flight point", "wt.quest": "Quest", "wt.starter": "Quest starter",
      "foot.data": "Data:"
    }
  };
  const guess = (navigator.language || "ru").toLowerCase().startsWith("ru") ? "ru" : "en";
  let lang = store.get("lang") || guess;
  if (!T[lang]) lang = "ru";
  const t = k => (T[lang] && T[lang][k]) ?? T.ru[k] ?? k;
  const pick = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[lang] || v.ru || v.en || "") : (v ?? "");
  const slotName = k => t("slots")[k] || k;
  const islot = k => (lang === "ru" && T.ru.islot[k]) || k;
  const statName = k => (lang === "ru" && T.ru.stat[k]) || k;

  const abKeys = Object.keys(AB).sort((a, b) => b.length - a.length);
  const abRe = abKeys.length ? new RegExp("(?<![A-Za-z])(" + abKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")(?![A-Za-z])", "g") : null;
  const ab = s => (lang === "ru" && abRe) ? String(s ?? "").replace(abRe, m => AB[m]) : String(s ?? "");

  function classes() {
    const ru = window.CLASSES || [], en = window.CLASSES_EN || [];
    if (lang === "ru") return ru;
    return ru.map(c => { const e = en.find(x => x.id === c.id); return e ? { ...c, ...e, specs: e.specs } : c; });
  }
  const findClass = id => classes().find(x => x.id === id) || classes()[0];
  const classIcon = id => ART[id] && ART[id].icon ? `icons/${ART[id].icon}.png` : "";
  const specIcon = (id, i) => ART[id] && ART[id].spec && ART[id].spec[i] ? `icons/${ART[id].spec[i]}.png` : classIcon(id);
  const treeBg = (id, i) => ART[id] && ART[id].bg && ART[id].bg[i] ? `bg/${ART[id].bg[i]}.jpg` : "";
  const roleOf = r => /Танк|Tank/.test(r) ? "tank" : /Лекарь|Healer/.test(r) ? "heal" : "dps";
  const roleTag = r => ({ tank: lang === "ru" ? "Танк" : "Tank", heal: lang === "ru" ? "Лекарь" : "Healer", dps: lang === "ru" ? "Урон" : "DPS" })[roleOf(r)];
  const fmtDate = d => !d ? "" : lang === "ru" ? d.split("-").reverse().join(".") : new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  // Какой список BiS соответствует нашей специализации
  const BIS_SPEC = {
    warrior: ["warrior-dps", "warrior-dps", "warrior-tank"], paladin: ["paladin-heal", "paladin-tank", "paladin-ret"],
    hunter: ["hunter-dps", "hunter-dps", "hunter-dps"], rogue: ["rogue-dps", "rogue-dps", "rogue-dps"],
    priest: ["priest-heal", "priest-heal", "priest-shadow"], shaman: ["shaman-ele", "shaman-enh", "shaman-heal"],
    mage: ["mage-dps", "mage-dps", "mage-dps"], warlock: ["warlock-dps", "warlock-dps", "warlock-dps"],
    druid: ["druid-balance", "druid-feral", "druid-resto"]
  };
  const RELIC = { paladin: "Libram", shaman: "Totem", druid: "Idol" };

  /* ---------- предметы: иконки и подсказка ---------- */
  const SLOT_IMG = { head: "head", neck: "neck", shoulder: "shoulder", back: "back", chest: "chest", shirt: "shirt", tabard: "tabard", wrist: "wrists", hands: "hands", waist: "waist", legs: "legs", feet: "feet", finger1: "finger", finger2: "finger", trinket1: "trinket", trinket2: "trinket", main: "mainhand", off: "offhand", ranged: "ranged", relic: "relic" };
  const itemImg = it => it && it.c ? `icons/i${it.c}.jpg` : "";
  function itemRow(id, cls = "") {
    const it = ITEM.get(id); if (!it) return "";
    const img = itemImg(it);
    return `<div class="it q${it.q} ${cls}" data-item="${it.i}">${img ? `<img src="${img}" alt="" loading="lazy">` : `<span class="noimg"></span>`}<b>${esc(it.n)}</b><small>${it.l}</small></div>`;
  }
  const tipEl = $("#item-tip");
  function itemTipHtml(it) {
    const st = (it.t || []).map(([k, v]) => `<div class="st ${/Resist|Health|Mana|Spell|Attack|Hit|Crit|Haste|Expertise|Defense|Dodge|Parry|Block|Healing/.test(k) ? "gr" : ""}">+${v} ${esc(statName(k))}</div>`).join("");
    return `<b style="color:var(--q${it.q})">${esc(it.n)}</b>
      <small>${lang === "ru" ? "Уровень предмета" : "Item Level"} ${it.l}${it.r ? ` · ${lang === "ru" ? "треб. уровень" : "requires level"} ${it.r}` : ""}</small>
      <div class="st">${esc(islot(it.s))}${it.m ? " · " + esc(it.m) : ""}${it.w ? " · " + esc(it.w) : ""}${it.a ? ` · ${it.a} ${lang === "ru" ? "брони" : "armor"}` : ""}</div>
      ${it.d ? `<div class="st">${esc(it.d)}</div>` : ""}${st}
      ${(it.e || []).map(e => `<p>${esc(e)}</p>`).join("")}`;
  }
  function placeTip(x, y) {
    const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
    let left = x + 16, top = y + 12;
    if (left + w > innerWidth - 8) left = Math.max(8, x - w - 16);
    if (top + h > innerHeight - 8) top = Math.max(8, innerHeight - h - 8);
    tipEl.style.left = left + "px"; tipEl.style.top = top + "px";
  }
  document.addEventListener("mouseover", e => {
    const el = e.target.closest("[data-item]");
    if (!el) return;
    const it = ITEM.get(+el.dataset.item); if (!it) return;
    tipEl.innerHTML = itemTipHtml(it); tipEl.hidden = false; placeTip(e.clientX, e.clientY);
  });
  document.addEventListener("mousemove", e => { if (!tipEl.hidden) placeTip(e.clientX, e.clientY); });
  document.addEventListener("mouseout", e => { if (e.target.closest("[data-item]") && !e.relatedTarget?.closest?.("[data-item]")) tipEl.hidden = true; });
  document.addEventListener("scroll", () => tipEl.hidden = true, { passive: true });

  /* ---------- общий статический текст ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    $("#brand-name").textContent = pick(SITE.brand);
    $$("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
    $$("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
    $$("#lang button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    $("#foot-made").textContent = `© 2026 ${pick(SITE.brand)} · Kayman & Danrer`;
    $("#foot-src").innerHTML = `${esc(t("foot.data"))} <a href="https://wowforeverbuilds.com/" target="_blank" rel="noopener">wowforeverbuilds</a>, <a href="https://wowforevercalc.com/" target="_blank" rel="noopener">wowforevercalc</a>, <a href="https://daybreakforever.com/" target="_blank" rel="noopener">daybreakforever</a>, <a href="https://www.warcrafttavern.com/forever/guides/classes/" target="_blank" rel="noopener">Warcraft Tavern</a>, <a href="${esc(SRC.changes || "https://wow.gg")}" target="_blank" rel="noopener">wow.gg</a>, <a href="https://www.wowhead.com/" target="_blank" rel="noopener">Wowhead</a>`;
  }
  $$("#lang button").forEach(b => b.addEventListener("click", () => { lang = b.dataset.lang; store.set("lang", lang); renderAll(); }));

  /* ---------- роутинг ---------- */
  let page = "home";
  function route() {
    const h = location.hash.slice(1) || "home"; const i = h.indexOf("-");
    const p = i < 0 ? h : h.slice(0, i), arg = i < 0 ? "" : h.slice(i + 1);
    const prev = page;
    page = ["home", "addons", "classes", "doll", "where"].includes(p) ? p : "home";
    $$("section.page").forEach(s => s.classList.toggle("active", s.id === "page-" + page));
    $$(".tabs a").forEach(a => a.classList.toggle("active", a.dataset.page === page));
    if (page === "classes") {
      const [cid, si] = (arg || "").split("-");
      selectClass(cid || store.get("cls") || "warrior", si !== undefined && si !== "" ? +si : null);
    }
    if (page === "doll" && arg) importDoll(arg);
    if (page === "where") { if (arg) { try { wq.value = decodeURIComponent(arg); } catch {} } renderWhere(); setTimeout(() => wq.focus(), 50); }
    if (page === "home") startDemo(); else stopDemo();
    if (prev !== page || page !== "classes") window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", route);

  /* ---------- панель команд (ротация) ---------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mono = name => { const w = ab(name).replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean); return ((w[0] || "?")[0] + (w[1] ? w[1][0] : "")).toUpperCase(); };
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
    return { play() { if (timer) return; step(i + 1); timer = setInterval(() => step(i + 1), ms); }, stop() { clearInterval(timer); timer = null; }, get playing() { return !!timer; } };
  }

  /* ---------- главная ---------- */
  let demo = null, demoIdx = 0, demoNext = null;
  function renderDemo() {
    const cls = classes();
    const c = cls[demoIdx % cls.length]; const si = c.specs.findIndex(x => roleOf(x.role) === "dps"); const sp = c.specs[Math.max(0, si)];
    const rot = sp.rot.filter(([a]) => !/^(Заново|Repeat|Restart)/.test(a)).slice(0, 8);
    $(".demo").style.setProperty("--c", c.color);
    $("#demo-label").innerHTML = `<a href="#classes-${c.id}-${Math.max(0, si)}" style="color:${c.color}">${esc(sp.name)} · ${esc(c.name)}</a>`;
    $("#demo-bar").innerHTML = barHtml(rot, c.color);
    if (demo) demo.stop();
    clearTimeout(demoNext);
    demo = makePlayer($("#demo-bar"), $("#demo-cast"), null, rot, { ms: 900, onStep: i => {
      if (i === rot.length - 1) { demo.stop(); demoNext = setTimeout(() => { demoIdx++; renderDemo(); }, 1100); }
    } });
    if (!reduce && page === "home") demo.play();
  }
  function startDemo() { if (demo && !demo.playing && !reduce) renderDemo(); }
  function stopDemo() { if (demo) demo.stop(); clearTimeout(demoNext); }
  function renderHome() {
    const cls = classes();
    $("#home-stats").innerHTML = [[cls.reduce((n, c) => n + c.specs.length, 0), "home.s1"], [ITEMS.length.toLocaleString(lang === "ru" ? "ru-RU" : "en-US"), "home.s2"], [allAddons().length, "home.s3"], [(window.WHERE || []).length, "home.s4"]]
      .map(([n, k]) => `<div><b>${n}</b><span>${esc(t(k))}</span></div>`).join("");
    $("#home-classes").innerHTML = cls.map(c => `<div class="cp" style="--c:${c.color}">
        <a href="#classes-${c.id}"><img src="${classIcon(c.id)}" alt=""></a>
        <div><a href="#classes-${c.id}"><b>${esc(c.name)}</b></a>
        <div class="specs">${c.specs.map((s, i) => `<a href="#classes-${c.id}-${i}" title="${esc(roleTag(s.role))}"><img src="${specIcon(c.id, i)}" alt="">${esc(s.name)}</a>`).join("")}</div></div></div>`).join("");
    const ad = allAddons().slice().sort((a, b) => (a.kind === "recommended") - (b.kind === "recommended")).slice(0, 6);
    $("#home-addons").innerHTML = ad.length ? ad.map(a => `<a class="mini" href="#addons"><span class="ph">${esc(pick(a.name)[0] || "?")}</span><span><b>${esc(pick(a.name))}</b><small>${esc(pick(a.category) || t("k." + a.kind))}</small></span>${statusBadge(a, true)}</a>`).join("") : `<p class="muted">${esc(t("addons.none"))}</p>`;
    const ch = [];
    cls.forEach(c => (c.changes || []).slice(0, 1).forEach(x => ch.push([c, x])));
    $("#home-changes").innerHTML = ch.map(([c, x]) => `<a class="mini" href="#classes-${c.id}"><img src="${classIcon(c.id)}" alt=""><span><b style="color:${c.color}">${esc(c.name)}</b><small>${esc(ab(x))}</small></span><span></span></a>`).join("");
  }

  /* ---------- гайды по классам ---------- */
  let curClass = "warrior", specIdx = 0, classPlayer = null;
  function renderClassGrid() {
    $("#class-grid").innerHTML = classes().map(c => `<button class="class-btn ${c.id === curClass ? "active" : ""}" data-id="${c.id}" style="--c:${c.color}" title="${esc(c.name)}"><img src="${classIcon(c.id)}" alt=""><b>${esc(c.name)}</b></button>`).join("");
    $$(".class-btn").forEach(b => b.addEventListener("click", () => { location.hash = "classes-" + b.dataset.id; }));
  }
  function selectClass(id, si) {
    const c = findClass(id);
    curClass = c.id; store.set("cls", c.id);
    specIdx = si !== null && si !== undefined && c.specs[si] ? si : Math.min(store.get("spec-" + c.id) || 0, c.specs.length - 1);
    store.set("spec-" + c.id, specIdx);
    $$(".class-btn").forEach(b => b.classList.toggle("active", b.dataset.id === c.id));
    renderClass();
  }
  function gearHtml(c, lvl) {
    const key = BIS_SPEC[c.id][specIdx];
    const L = (BIS.lists[lvl] || {})[key] || {};
    const worn = (BIS.worn[lvl] || {})[key] || [];
    const order = ["Head", "Neck", "Shoulder", "Back", "Chest", "Wrist", "Hands", "Waist", "Legs", "Feet", "Finger", "Trinket", ...worn];
    return order.filter(s => L[s] && L[s].length).map(s => `<div class="gear-row"><small>${esc(islot(s))}</small><div class="gear-alts">${L[s].map((id, k) => itemRow(id, k ? "alt" : "")).join("")}</div></div>`).join("");
  }
  function renderClass() {
    const c = findClass(curClass);
    const s = c.specs[specIdx];
    const host = new URL(s.src).hostname.replace("www.", "");
    const healer = roleOf(s.role) === "heal";
    $("#class-crumbs").innerHTML = `<a href="#home">${esc(t("nav.home"))}</a><span>/</span><a href="#classes">${esc(t("nav.guides"))}</a><span>/</span><a href="#classes-${c.id}">${esc(c.name)}</a><span>/</span><b>${esc(s.name)}</b>`;
    const lvls = Object.keys(BIS.lists).sort((a, b) => b - a);
    let gearLvl = store.get("gear-lvl") || "60"; if (!lvls.includes(gearLvl)) gearLvl = lvls[0];
    $("#class-view").innerHTML = `
      <div class="guide-head" style="--c:${c.color}">
        <img src="${specIcon(c.id, specIdx)}" alt="">
        <div><h1>${esc(s.name)} <span>${esc(c.name)}</span></h1>
          <div class="guide-tags"><span class="tag" style="--c:${c.color}"><i></i>${esc(c.name)}</span><span class="tag">${esc(s.name)}</span><span class="tag">${esc(roleTag(s.role))}</span><span class="tag">${esc(t("c.tags.pve"))}</span><span class="tag">60</span>
          ${s.updated ? `<span class="upd">${esc(t("c.updated"))} ${esc(fmtDate(s.updated))}</span>` : ""}</div></div>
      </div>
      <div class="spec-tabs">${c.specs.map((x, i) => `<a class="spec-tab ${i === specIdx ? "active" : ""}" href="#classes-${c.id}-${i}" style="--c:${c.color};text-decoration:none"><img src="${specIcon(c.id, i)}" alt=""><span>${esc(x.name)}<small>${esc(roleTag(x.role))}</small></span></a>`).join("")}</div>
      <nav class="toc"><a href="#" data-go="sec-tal">${esc(t("toc.talents"))}</a><a href="#" data-go="sec-rot">${esc(t("toc.rot"))}</a><a href="#" data-go="sec-stats">${esc(t("toc.stats"))}</a><a href="#" data-go="sec-gear">${esc(t("toc.gear"))}</a>${c.changes.length ? `<a href="#" data-go="sec-ch">${esc(t("toc.changes"))}</a>` : ""}</nav>

      <section class="sec" id="sec-tal"><h2 class="sec-title">${esc(t("tal.title"))}<small id="tal-split"></small></h2>
        <div class="card tal-wrap" id="talents" style="--c:${c.color}"></div></section>

      <section class="sec" id="sec-rot" style="--c:${c.color}"><h2 class="sec-title">${esc(t(healer ? "c.heal" : "c.rot"))}<small>${esc(t("c.prio"))}</small></h2>
        <div class="two">
          <div class="card"><ol class="rot" id="rot-list">${s.rot.map(([a, n]) => `<li>${icoImg(a, "li-ico")}<div><b title="${esc(a)}">${esc(ab(a))}</b>${n ? `<span>${esc(ab(n))}</span>` : ""}</div></li>`).join("")}</ol></div>
          <div class="card bar-wrap">
            <div class="card-label" style="margin:0">${esc(t("c.bar"))}</div>
            <div class="castbar" id="rot-cast"><i></i><span>${esc(ab(s.rot[0][0]))}</span></div>
            <div class="actionbar" id="rot-bar">${barHtml(s.rot, c.color)}</div>
            <button class="btn primary" id="rot-play">${esc(t("c.play"))}</button>
            <div style="justify-self:stretch">
              ${s.cds ? `<div class="h4">${esc(t("c.cds"))}</div><p class="muted small" style="margin:0">${esc(ab(s.cds))}</p>` : ""}
              ${s.aoe ? `<div class="h4">${esc(t("c.aoe"))}</div><p class="muted small" style="margin:0">${esc(ab(s.aoe))}</p>` : ""}
              <div class="h4">${esc(t("c.key"))}</div>
              <div class="chips">${s.key.map(k => `<span title="${esc(k)}">${icoImg(k, "chip-ico")}${esc(ab(k))}</span>`).join("")}</div>
            </div>
          </div>
        </div>
        <div class="source">${esc(t("c.guideSrc"))} <a href="${esc(s.src)}" target="_blank" rel="noopener">${esc(host)} · ${esc(s.name)} ↗</a><span>${esc(t("c.checked"))} ${esc(fmtDate("2026-11-13"))}</span></div>
        ${t("c.names") ? `<p class="muted small">${esc(t("c.names"))}</p>` : ""}
      </section>

      <section class="sec" id="sec-stats"><h2 class="sec-title">${esc(t("c.stats"))}</h2>
        <div class="card">
          ${s.stats ? `<div class="statline">${s.stats.map(x => `<span>${esc(x)}</span>`).join("<i>›</i>")}</div>` : ""}
          ${s.statsNote ? `<p class="muted" style="margin:${s.stats ? "12px" : "0"} 0 0">${esc(s.statsNote)}</p>` : ""}
          <div class="h4">${esc(t("c.races"))}</div><p style="margin:0">${c.races.map(esc).join(", ")}</p>
        </div></section>

      <section class="sec" id="sec-gear"><h2 class="sec-title">${esc(t("toc.gear"))}<small>BiS</small></h2>
        <div class="card">
          <div class="gear-tabs">${lvls.map(l => `<button class="btn sm ${l === gearLvl ? "primary" : ""}" data-lvl="${l}">${esc(t("g.lvl"))} ${l}</button>`).join("")}<a class="btn sm ghost" href="#doll" id="gear-doll" style="margin-left:auto">${esc(t("g.doll"))}</a></div>
          <p class="muted small" style="margin:0 0 8px">${esc(t("g.lead"))}</p>
          <div class="gear-grid" id="gear-grid">${gearHtml(c, gearLvl)}</div>
          <div class="source">${esc(t("g.src"))} <a href="https://daybreakforever.com/" target="_blank" rel="noopener">daybreakforever.com ↗</a><span>datamine 1.60.1</span></div>
        </div></section>

      ${c.changes.length ? `<section class="sec" id="sec-ch"><h2 class="sec-title">${esc(t("c.changes"))}</h2><div class="card">
        <ul class="changes">${c.changes.map(x => `<li>${esc(ab(x))}</li>`).join("")}</ul>
        <div class="source"><a href="${esc(SRC.changes)}" target="_blank" rel="noopener">${esc(t("c.changesSrc"))} ↗</a></div></div></section>` : ""}`;
    $$(".toc a").forEach(a => a.addEventListener("click", e => { e.preventDefault(); document.getElementById(a.dataset.go)?.scrollIntoView({ behavior: "smooth" }); }));
    $$(".gear-tabs [data-lvl]").forEach(b => b.addEventListener("click", () => {
      store.set("gear-lvl", b.dataset.lvl);
      $$(".gear-tabs [data-lvl]").forEach(x => x.classList.toggle("primary", x === b));
      $("#gear-grid").innerHTML = gearHtml(c, b.dataset.lvl);
    }));
    $("#gear-doll").addEventListener("click", () => { doll.cls = c.id; doll.spec = specIdx; fillBis(); saveDoll(); fillDollSelects(); });
    renderTalents(c);
    if (classPlayer) classPlayer.stop();
    classPlayer = makePlayer($("#rot-bar"), $("#rot-cast"), $("#rot-list"), s.rot);
    $("#rot-play").addEventListener("click", () => {
      if (classPlayer.playing) { classPlayer.stop(); $("#rot-play").textContent = t("c.play"); }
      else { classPlayer.play(); $("#rot-play").textContent = t("c.stop"); }
    });
  }

  /* ---------- таланты ---------- */
  const TAL = window.TALENTS || {};
  const PRESETS = window.TALENT_PRESETS || {};
  const MAX_POINTS = 51;
  let talState = {}, talKey = null;
  const talentKey = c => "tal-" + c + "-" + specIdx;
  const treePoints = tree => tree.talents.reduce((n, x) => n + (talState[x.id] || 0), 0);
  const totalPoints = trees => trees.reduce((n, tr) => n + treePoints(tr), 0);
  const variants = cid => { const v = (PRESETS[cid] || [])[specIdx]; return !v ? [] : Array.isArray(v) ? v : [Object.assign({ mode: "pve", site: "wowforeverbuilds.com", label: { ru: "PvE", en: "PvE" } }, v)]; };
  const varKey = cid => "talv-" + cid + "-" + specIdx;
  const curVar = cid => { const v = variants(cid); const i = +(store.get(varKey(cid)) || 0); return v[i] ? i : 0; };
  function presetState(cid, trees, vi) {
    const p = variants(cid)[vi ?? curVar(cid)]; if (!p) return null;
    const st = {};
    p.b.split("-").forEach((digs, ti) => {
      if (!trees[ti]) return;
      const order = [...trees[ti].talents].sort((a, b) => a.row - b.row || a.col - b.col);
      [...digs].forEach((d, k) => { if (+d && order[k]) st[order[k].id] = +d; });
    });
    return st;
  }
  function canAdd(trees, tree, x) {
    const r = talState[x.id] || 0;
    if (r >= x.max || totalPoints(trees) >= MAX_POINTS) return false;
    if (treePoints(tree) < x.row * 5) return false;
    if (x.req) { const p = tree.talents.find(y => y.id === x.req); if (p && (talState[p.id] || 0) < (x.reqRank || p.max)) return false; }
    return true;
  }
  function canRemove(trees, tree, x) {
    if (!(talState[x.id] || 0)) return false;
    if (tree.talents.some(y => y.req === x.id && (talState[y.id] || 0) > 0)) return false;
    for (const y of tree.talents) {
      if (!(talState[y.id] || 0) || y.row <= x.row) continue;
      const below = tree.talents.filter(z => z.row < y.row).reduce((n, z) => n + (talState[z.id] || 0), 0) - 1;
      if (below < y.row * 5) return false;
    }
    return true;
  }
  function renderTalents(c) {
    const host = $("#talents");
    const trees = TAL[c.id];
    if (!host || !trees) { if (host) host.innerHTML = ""; return; }
    const k = c.id + "-" + specIdx;
    if (talKey !== k) { talKey = k; talState = store.get(talentKey(c.id)) || presetState(c.id, trees) || {}; }
    const vars = variants(c.id), vi = curVar(c.id), preset = vars[vi];
    const mode = preset ? preset.mode : "pve";
    const modes = ["pve", "pvp"].filter(m => vars.some(v => v.mode === m));
    const used = totalPoints(trees);
    const sp = $("#tal-split"); if (sp) sp.textContent = trees.map(treePoints).join("/");
    host.innerHTML = `
      <div class="tal-head">
        <div class="tal-count"><b>${used}</b> / ${MAX_POINTS} · ${trees.map(treePoints).join(" / ")}</div>
        <div class="sp">${preset ? `<button class="btn sm primary" id="tal-preset">${esc(t("tal.preset"))}</button>` : ""}<button class="btn sm ghost" id="tal-reset">${esc(t("tal.reset"))}</button></div>
      </div>
      ${preset ? `<div class="tal-pick">
        ${modes.length > 1 ? `<div class="seg" id="tal-mode">${modes.map(m => `<button data-mode="${m}" aria-pressed="${m === mode}">${m === "pve" ? "PvE" : "PvP"}</button>`).join("")}</div>` : ""}
        <label class="tal-sel"><span>${esc(t("tal.pick"))}</span><select id="tal-var">${vars.map((v, i) => v.mode === mode ? `<option value="${i}" ${i === vi ? "selected" : ""}>${esc(v.site)} · ${esc(pick(v.label))} · ${esc(v.split || "")}</option>` : "").join("")}</select></label>
        <span class="muted small">${esc(t("tal.presetSrc"))} <a href="${esc(preset.src)}" target="_blank" rel="noopener">${esc(preset.site)} ↗</a>${preset.calc ? ` · <a href="${esc(preset.calc)}" target="_blank" rel="noopener">${esc(t("tal.calc"))} ↗</a>` : ""}</span>
      </div>
      ${preset.pts && preset.pts < MAX_POINTS ? `<p class="muted small tal-note">${esc(t("tal.partial").replace("{n}", preset.pts))}</p>` : ""}` : ""}
      <p class="muted small" style="margin:0">${esc(t("tal.help"))}</p>
      <div class="tal-trees">${trees.map((tr, ti) => {
        const rows = Math.max(...tr.talents.map(x => x.row)) + 1;
        const byId = Object.fromEntries(tr.talents.map(x => [x.id, x]));
        const arrows = tr.talents.filter(x => x.req && byId[x.req]).map(x => {
          const p = byId[x.req]; const on = (talState[p.id] || 0) >= (x.reqRank || p.max);
          if (p.col === x.col) return `<i class="tal-arrow v ${on ? "on" : ""}" style="grid-column:${x.col + 1};grid-row:${p.row + 1} / ${x.row + 2}"></i>`;
          return `<i class="tal-arrow h ${on ? "on" : ""}" style="grid-column:${Math.min(p.col, x.col) + 1} / ${Math.max(p.col, x.col) + 2};grid-row:${p.row + 1}"></i>`;
        }).join("");
        const bg = treeBg(c.id, ti);
        return `<div class="tal-tree">
          <div class="tal-tree-head"><img src="${specIcon(c.id, ti)}" alt=""><b>${esc((c.trees && c.trees[ti]) || ab(tr.name))}</b><span>${treePoints(tr)}</span></div>
          <div class="tal-canvas" ${bg ? `style="background-image:url('${bg}')"` : ""}><div class="tal-grid" style="grid-template-rows:repeat(${rows}, 78px)">
            ${arrows}
            ${tr.talents.map(x => {
              const r = talState[x.id] || 0; const avail = canAdd(trees, tr, x);
              const st = r >= x.max ? "max" : r > 0 ? "some" : avail ? "avail" : "locked";
              return `<div class="tal-cell ${r ? "" : "off"}" style="grid-row:${x.row + 1};grid-column:${x.col + 1}">
                <button class="tal ${st}" data-tree="${ti}" data-id="${x.id}" aria-label="${esc(ab(x.name))} ${r}/${x.max}">
                <img src="icons/${x.icon}.png" alt="" width="40" height="40" onerror="this.style.visibility='hidden'"><span class="tal-rank">${r}/${x.max}</span></button>
                <span class="tal-name">${esc(ab(x.name))}</span></div>`;
            }).join("")}
          </div></div></div>`;
      }).join("")}</div>
      <div class="source">${esc(t("c.source"))} <a href="https://wowforevercalc.com/${c.id}/" target="_blank" rel="noopener">wowforevercalc.com ↗</a><span>${esc(t("tal.client"))}</span>
</div>`;
    $$(".tal", host).forEach(b => {
      const tr = trees[+b.dataset.tree]; const x = tr.talents.find(y => y.id === +b.dataset.id);
      const show = e => {
        const r = talState[x.id] || 0;
        const cur = r ? x.ranks[Math.min(r, x.ranks.length) - 1] : "";
        const next = r < x.max ? x.ranks[Math.min(r, x.ranks.length - 1)] : "";
        const need = [];
        if (treePoints(tr) < x.row * 5 && !r) need.push(t("tal.needRow").replace("{n}", x.row * 5).replace("{tree}", (c.trees && c.trees[+b.dataset.tree]) || ab(tr.name)));
        if (x.req) { const p = tr.talents.find(y => y.id === x.req); if (p && (talState[p.id] || 0) < (x.reqRank || p.max)) need.push(t("tal.needReq").replace("{n}", x.reqRank || p.max).replace("{name}", ab(p.name))); }
        tipEl.innerHTML = `<b>${esc(ab(x.name))}</b><small>${esc(t("tal.rank"))} ${r}/${x.max}</small>
          ${cur ? `<p>${esc(cur)}</p>` : ""}${next ? `<p class="next"><em>${esc(t("tal.next"))}</em> ${esc(next)}</p>` : ""}
          ${need.map(n => `<p class="need">${esc(n)}</p>`).join("")}`;
        tipEl.hidden = false;
        const rb = b.getBoundingClientRect();
        placeTip(e && e.clientX ? e.clientX : rb.right, e && e.clientY ? e.clientY : rb.top);
      };
      b.addEventListener("mouseenter", show); b.addEventListener("focus", show);
      b.addEventListener("mouseleave", () => tipEl.hidden = true); b.addEventListener("blur", () => tipEl.hidden = true);
      const save = () => { store.set(talentKey(c.id), talState); renderTalents(c); $(`.tal[data-id="${x.id}"]`, host)?.focus(); };
      b.addEventListener("click", () => { if (canAdd(trees, tr, x)) { talState[x.id] = (talState[x.id] || 0) + 1; save(); } });
      b.addEventListener("contextmenu", e => { e.preventDefault(); if (canRemove(trees, tr, x)) { talState[x.id]--; if (!talState[x.id]) delete talState[x.id]; save(); } });
    });
    $("#tal-reset").addEventListener("click", () => { talState = {}; store.set(talentKey(c.id), talState); renderTalents(c); });
    $("#tal-preset")?.addEventListener("click", () => { talState = presetState(c.id, trees) || {}; store.set(talentKey(c.id), null); renderTalents(c); });
    const applyVar = i => { store.set(varKey(c.id), i); talState = presetState(c.id, trees, i) || {}; store.set(talentKey(c.id), null); renderTalents(c); };
    $("#tal-var")?.addEventListener("change", e => applyVar(+e.target.value));
    $$("#tal-mode button", host).forEach(b => b.addEventListener("click", () => { const i = vars.findIndex(v => v.mode === b.dataset.mode); if (i >= 0 && vars[i].mode !== mode) applyVar(i); }));
  }

  /* ---------- кукла персонажа ---------- */
  const ARMOR = { warrior: 4, paladin: 4, hunter: 3, shaman: 3, rogue: 2, druid: 2, priest: 1, mage: 1, warlock: 1 };
  const MAT = { Cloth: 1, Leather: 2, Mail: 3, Plate: 4 };
  const WEAP = {
    warrior: ["Axe", "Sword", "Mace", "Dagger", "Fist Weapon", "Polearm", "Staff", "Bow", "Gun", "Crossbow", "Thrown"],
    paladin: ["Axe", "Sword", "Mace", "Polearm"], hunter: ["Axe", "Sword", "Dagger", "Fist Weapon", "Polearm", "Staff", "Bow", "Gun", "Crossbow", "Thrown"],
    rogue: ["Dagger", "Sword", "Mace", "Fist Weapon", "Bow", "Gun", "Crossbow", "Thrown"], priest: ["Mace", "Dagger", "Staff", "Wand"],
    shaman: ["Axe", "Mace", "Dagger", "Fist Weapon", "Staff"], mage: ["Dagger", "Sword", "Staff", "Wand"], warlock: ["Dagger", "Sword", "Staff", "Wand"],
    druid: ["Dagger", "Mace", "Fist Weapon", "Staff", "Polearm"]
  };
  const SHIELD = { warrior: 1, paladin: 1, shaman: 1 };
  const DUAL = { warrior: 1, rogue: 1, hunter: 1, shaman: 1 };
  const LEFT = ["head", "neck", "shoulder", "back", "chest", "shirt", "tabard", "wrist"];
  const RIGHT = ["hands", "waist", "legs", "feet", "finger1", "finger2", "trinket1", "trinket2"];
  const lastSlot = cid => RELIC[cid] ? "relic" : "ranged";
  const SLOT_ITEM = { head: ["Head"], neck: ["Neck"], shoulder: ["Shoulder"], back: ["Back"], chest: ["Chest"], shirt: ["Shirt"], tabard: ["Tabard"], wrist: ["Wrist"], hands: ["Hands"], waist: ["Waist"], legs: ["Legs"], feet: ["Feet"], finger1: ["Finger"], finger2: ["Finger"], trinket1: ["Trinket"], trinket2: ["Trinket"], main: ["Main hand", "One-hand", "Two-hand"], off: ["Off hand", "One-hand", "Held in off hand", "Shield"], ranged: ["Ranged", "Thrown"], relic: ["Relic"] };
  function fits(it, slot, cid) {
    if (!SLOT_ITEM[slot].includes(it.s)) return false;
    if (it.k && !it.k.some(k => k.toLowerCase() === cid)) return false;
    if (it.m && MAT[it.m] > ARMOR[cid] && !["Back"].includes(it.s)) return false;
    if (slot === "relic") return it.w === RELIC[cid];
    if (slot === "off") {
      if (it.s === "Shield") return !!SHIELD[cid];
      if (it.s === "One-hand") return !!DUAL[cid] && (!it.w || WEAP[cid].includes(it.w));
      return true;
    }
    if (it.w && ["main", "ranged"].includes(slot)) return WEAP[cid].includes(it.w);
    return true;
  }
  let doll = store.get("doll2") || { name: "", cls: "warrior", spec: 0, items: {} };
  const dc = $("#doll-class"), ds = $("#doll-spec"), dn = $("#doll-name");
  function fillDollSelects() {
    dc.innerHTML = classes().map(c => `<option value="${c.id}">${esc(c.name)}</option>`).join("");
    const c = findClass(doll.cls);
    dc.value = c.id;
    ds.innerHTML = c.specs.map((s, i) => `<option value="${i}">${esc(s.name)}</option>`).join("");
    ds.value = doll.spec;
  }
  function saveDoll() { store.set("doll2", doll); renderDoll(); }
  function bisFor(slot) {
    const key = BIS_SPEC[doll.cls][doll.spec] || BIS_SPEC[doll.cls][0];
    const L = (BIS.lists["60"] || {})[key] || {}, worn = (BIS.worn["60"] || {})[key] || [];
    if (slot === "main") return L[worn[0]] || [];
    if (slot === "off") return worn.length > 2 ? (L[worn[1]] || []) : [];
    if (slot === "ranged" || slot === "relic") return L[worn[worn.length - 1]] || L.Ranged || L.Relic || [];
    const base = SLOT_ITEM[slot][0];
    return L[base] || [];
  }
  function fillBis() {
    const slots = [...LEFT, ...RIGHT, "main", "off", lastSlot(doll.cls)];
    doll.items = {};
    for (const s of slots) {
      const list = bisFor(s);
      const id = /2$/.test(s) ? (list[1] ?? list[0]) : list[0];
      if (id && ITEM.has(id)) doll.items[s] = id;
    }
    const m = ITEM.get(doll.items.main);
    if (m && m.s === "Two-hand") delete doll.items.off;
  }
  function slotHtml(id) {
    const it = ITEM.get(doll.items[id]);
    const label = id === "relic" ? (t("relic")[doll.cls] || slotName(id)) : slotName(id);
    const img = it ? itemImg(it) : `icons/slot-${SLOT_IMG[id]}.jpg`;
    return `<button class="slot ${it ? "q" + it.q : "is-empty"}" data-slot="${id}" ${it ? `data-item="${it.i}"` : ""}>
      <span class="sq"><img src="${img || `icons/slot-${SLOT_IMG[id]}.jpg`}" alt=""></span>
      <span class="txt"><small>${esc(label)}${it ? ` · ${it.l}` : ""}</small><b>${it ? esc(it.n) : esc(t("doll.empty"))}</b></span></button>`;
  }
  function renderDoll() {
    const c = findClass(doll.cls);
    const s = c.specs[doll.spec] || c.specs[0];
    dn.value = doll.name || "";
    const last = lastSlot(c.id);
    const el = $("#doll-grid");
    el.style.setProperty("--c", c.color);
    el.innerHTML = `
      <div class="col left">${LEFT.map(slotHtml).join("")}</div>
      <div class="figure"><img class="cls" src="${specIcon(c.id, doll.spec)}" alt="">
        <b id="doll-who">${esc(doll.name || t("doll.noname"))}</b><span>${esc(s.name)} · ${esc(c.name)}</span>
        <a class="btn sm" href="#classes-${c.id}-${doll.spec}">${esc(t("doll.guide"))} →</a></div>
      <div class="col right">${RIGHT.map(slotHtml).join("")}</div>
      <div class="weapons">${["main", "off", last].map(slotHtml).join("")}</div>`;
    $$(".slot", el).forEach(b => b.addEventListener("click", () => openSlot(b.dataset.slot)));
    const eq = Object.values(doll.items).map(id => ITEM.get(id)).filter(Boolean);
    const avg = eq.length ? (eq.reduce((n, i) => n + i.l, 0) / eq.length).toFixed(1) : "—";
    const sum = {};
    eq.forEach(i => (i.t || []).forEach(([k, v]) => sum[k] = (sum[k] || 0) + v));
    const armor = eq.reduce((n, i) => n + (i.a || 0), 0);
    if (armor) sum.Armor = (sum.Armor || 0) + armor;
    const total = LEFT.length + RIGHT.length + 3;
    $("#doll-summary").innerHTML = `
      <div class="sum-top"><div><b>${eq.length}/${total}</b><span>${esc(t("doll.filled"))}</span></div><div><b>${avg}</b><span>${esc(t("doll.avg"))}</span></div></div>
      <h3>${esc(t("doll.stats"))}</h3>
      ${Object.keys(sum).length ? `<div class="stat-list">${Object.entries(sum).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<div><span>${esc(statName(k))}</span><b>+${v}</b></div>`).join("")}</div>` : `<p class="muted small">${esc(t("doll.nostats"))}</p>`}
      <div class="source">${esc(t("c.source"))} <a href="https://daybreakforever.com/" target="_blank" rel="noopener">daybreakforever.com ↗</a></div>`;
  }
  const idlg = $("#item-dialog");
  let curSlot = null;
  function renderItemResults() {
    const q = $("#item-q").value.trim().toLowerCase();
    const cid = doll.cls;
    const rec = bisFor(curSlot).filter(id => ITEM.has(id) && (!q || ITEM.get(id).n.toLowerCase().includes(q)));
    const all = [];
    for (const it of ITEMS) { if (fits(it, curSlot, cid) && (!q || it.n.toLowerCase().includes(q))) { all.push(it.i); if (all.length > 400) break; } }
    const LIM = 150;
    $("#item-results").innerHTML =
      (rec.length ? `<div class="grp">${esc(t("doll.recommended"))}</div>${rec.map(id => itemRow(id)).join("")}` : "") +
      `<div class="grp">${esc(t("doll.all"))}</div>${all.slice(0, LIM).map(id => itemRow(id)).join("")}` +
      (all.length > LIM ? `<p class="muted small">${esc(t("doll.more").replace("{n}", LIM))}</p>` : "");
    $$("#item-results .it").forEach(r => r.addEventListener("click", () => {
      doll.items[curSlot] = +r.dataset.item;
      const it = ITEM.get(+r.dataset.item);
      if (curSlot === "main" && it.s === "Two-hand") delete doll.items.off;
      if (curSlot === "off") { const m = ITEM.get(doll.items.main); if (m && m.s === "Two-hand") delete doll.items.main; }
      tipEl.hidden = true; idlg.close(); saveDoll();
    }));
  }
  function openSlot(id) {
    curSlot = id;
    $("#item-title").textContent = id === "relic" ? (t("relic")[doll.cls] || slotName(id)) : slotName(id);
    $("#item-q").value = "";
    renderItemResults();
    idlg.showModal();
    setTimeout(() => $("#item-q").focus(), 30);
  }
  $("#item-q").addEventListener("input", renderItemResults);
  $("#item-close").addEventListener("click", () => idlg.close());
  $("#item-clear").addEventListener("click", () => { delete doll.items[curSlot]; idlg.close(); saveDoll(); });
  idlg.addEventListener("close", () => tipEl.hidden = true);
  dc.addEventListener("change", () => { doll.cls = dc.value; doll.spec = 0; doll.items = {}; fillDollSelects(); fillBis(); saveDoll(); });
  ds.addEventListener("change", () => { doll.spec = +ds.value; fillBis(); saveDoll(); });
  dn.addEventListener("input", () => { doll.name = dn.value; store.set("doll2", doll); const w = $("#doll-who"); if (w) w.textContent = dn.value || t("doll.noname"); });
  $("#doll-bis").addEventListener("click", () => { fillBis(); saveDoll(); });
  $("#doll-reset").addEventListener("click", () => { doll.items = {}; saveDoll(); });
  $("#doll-share").addEventListener("click", async () => {
    const short = { n: doll.name, c: doll.cls, s: doll.spec, i: doll.items };
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(short)))).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
    const url = location.href.split("#")[0] + "#doll-" + code;
    const out = $("#doll-share-url");
    try { await navigator.clipboard.writeText(url); $("#doll-share").textContent = t("doll.copied"); setTimeout(() => $("#doll-share").textContent = t("doll.share"), 2000); }
    catch { out.hidden = false; out.value = url; out.select(); }
  });
  function importDoll(code) {
    try {
      const d = JSON.parse(decodeURIComponent(escape(atob(code.replace(/-/g, "+").replace(/_/g, "/")))));
      if (d && typeof d.i === "object") {
        const items = {}; for (const [k, v] of Object.entries(d.i)) if (SLOT_ITEM[k] && ITEM.has(+v)) items[k] = +v;
        doll = { name: String(d.n || "").slice(0, 24), cls: findClass(String(d.c)).id, spec: +d.s || 0, items };
        fillDollSelects(); saveDoll();
      }
    } catch {}
    history.replaceState(null, "", "#doll");
  }
  if (!Object.keys(doll.items).length) fillBis();

  /* ---------- аддоны ---------- */
  let kind = "all", extraAddons = [];
  const allAddons = () => {
    const base = window.ADDONS || [];
    const ids = new Set(base.map(a => a.kind + "/" + a.id));
    return [...base, ...extraAddons.filter(a => !ids.has(a.kind + "/" + a.id))];
  };
  function statusBadge(a, short) {
    const st = a.kind === "ours" || a.kind === "plugins" ? (a.status || "ok") : (a.status || "unknown");
    const txt = t("st." + st);
    return `<span class="badge ${st}" title="${esc(txt)}">${esc(short && st === "classic" ? "Classic" : txt)}</span>`;
  }
  function renderAddons() {
    const q = $("#q").value.trim().toLowerCase();
    $("#status-key").innerHTML = ["ok", "classic", "unknown"].map(s => statusBadge({ kind: "recommended", status: s })).join("");
    const list = allAddons().filter(a => (kind === "all" || a.kind === kind) &&
      (!q || [pick(a.name), pick(a.description), pick(a.author), pick(a.category), a.for].join(" ").toLowerCase().includes(q)));
    const order = { ours: 0, plugins: 1, recommended: 2 };
    list.sort((a, b) => order[a.kind] - order[b.kind] || (a.status === "ok" ? -1 : 0) - (b.status === "ok" ? -1 : 0) || pick(a.name).localeCompare(pick(b.name)));
    $("#addon-list").innerHTML = list.length ? list.map(a => {
      const links = (a.links || []).filter(l => safeUrl(l.url));
      return `<article class="card addon k-${esc(a.kind)}">
        <div class="ai">${esc((pick(a.name)[0] || "?").toUpperCase())}</div>
        <div style="min-width:0">
          <h3>${esc(pick(a.name))}<small>${esc(pick(a.category) || "")}</small></h3>
          <div class="meta"><span class="badge ${a.kind === "ours" ? "ours" : a.kind === "plugins" ? "plugin" : "unknown"}">${esc(t("k." + a.kind))}</span>${statusBadge(a)}
            ${a.for ? `<span>${esc(t("addons.for"))} <b>${esc(a.for)}</b></span>` : ""}
            ${pick(a.author) ? `<span>${esc(t("addons.by"))}: ${esc(pick(a.author))}</span>` : ""}
            ${a.version ? `<span>${esc(t("addons.ver"))} ${esc(a.version)}</span>` : ""}
            ${a.checked || a.updated ? `<span>${esc(t("addons.checked"))} ${esc(fmtDate(a.checked || a.updated))}</span>` : ""}</div>
          ${pick(a.description) ? `<p>${esc(pick(a.description))}</p>` : ""}
          ${pick(a.note) ? `<p class="in"><b>${esc(t("addons.inForever"))}</b> ${esc(pick(a.note))}</p>` : ""}
          <div class="links">
            ${safeUrl(a.download) ? `<a class="btn primary" href="${esc(a.download)}" ${a.download.startsWith("http") ? 'target="_blank" rel="noopener"' : "download"}>${esc(t("addons.dl"))}</a>` : ""}
            ${links.map(l => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(pick(l.label))} ↗</a>`).join("")}
          </div>
          ${a.statusSource && safeUrl(a.statusSource.url) ? `<div class="source">${esc(t("addons.statusSrc"))} <a href="${esc(a.statusSource.url)}" target="_blank" rel="noopener">${esc(a.statusSource.label)} ↗</a></div>` : ""}
        </div></article>`;
    }).join("") : `<p class="empty">${esc(t("addons.none"))}</p>`;
    renderHowto();
  }
  const gh = p => `https://github.com/${REPO.owner}/${REPO.name}/${p}`;
  function renderHowto() {
    const ru = lang === "ru";
    $("#howto-body").innerHTML = ru ? `
      <ol>
        <li><b>Свой аддон или дополнение (zip):</b> откройте папку <a href="${gh(`upload/${REPO.branch}/addons/ours`)}" target="_blank" rel="noopener">addons/ours ↗</a> (наши аддоны) или <a href="${gh(`upload/${REPO.branch}/addons/plugins`)}" target="_blank" rel="noopener">addons/plugins ↗</a> (дополнения к чужим аддонам), перетащите zip-архив и нажмите зелёную кнопку <b>Commit changes</b>. Через 1–2 минуты аддон появится здесь. Название, версию, автора, описание и «для какого аддона» сайт возьмёт из файла <code>.toc</code> внутри архива.</li>
        <li><b>Русское описание, категория, статус или чужой аддон по ссылке:</b> нажмите <button class="btn sm" id="open-add">${esc(t("addons.add"))}</button>, заполните форму. Откроется GitHub с готовым файлом, останется нажать <b>Commit changes</b>.</li>
        <li><b>Чтобы Danrer тоже мог загружать:</b> Kayman открывает <a href="${gh("settings/access")}" target="_blank" rel="noopener">Settings → Collaborators ↗</a>, нажимает <b>Add people</b> и вписывает ник Danrer на GitHub. Danrer принимает приглашение из почты и дальше делает всё так же.</li>
        <li><b>Новая версия аддона:</b> загрузите zip с тем же именем файла, он заменит старый.</li>
      </ol>` : `
      <ol>
        <li><b>Your addon or plugin (zip):</b> open <a href="${gh(`upload/${REPO.branch}/addons/ours`)}" target="_blank" rel="noopener">addons/ours ↗</a> or <a href="${gh(`upload/${REPO.branch}/addons/plugins`)}" target="_blank" rel="noopener">addons/plugins ↗</a>, drop the zip and press <b>Commit changes</b>. It shows up here in 1–2 minutes; name, version, author, description and parent addon come from the <code>.toc</code> inside.</li>
        <li><b>Description, category, status or a third-party addon by link:</b> press <button class="btn sm" id="open-add">${esc(t("addons.add"))}</button> and fill the form. GitHub opens with the file ready; press <b>Commit changes</b>.</li>
        <li><b>To let Danrer upload too:</b> Kayman opens <a href="${gh("settings/access")}" target="_blank" rel="noopener">Settings → Collaborators ↗</a>, presses <b>Add people</b> and enters Danrer's GitHub name.</li>
        <li><b>New version:</b> upload a zip with the same file name; it replaces the old one.</li>
      </ol>`;
    $("#open-add").addEventListener("click", openAdd);
  }
  const adlg = $("#add-dialog");
  function openAdd() {
    const f = $("#add-form");
    f.innerHTML = `
      <div class="row"><label>${esc(t("up.kind"))}<select name="kind"><option value="ours">${esc(t("k.ours"))}</option><option value="plugins">${esc(t("k.plugins"))}</option><option value="recommended">${esc(t("k.recommended"))}</option></select></label>
      <label>${esc(t("up.status"))}<select name="status"><option value="ok">${esc(t("st.ok"))}</option><option value="classic">${esc(t("st.classic"))}</option><option value="unknown">${esc(t("st.unknown"))}</option></select></label></div>
      <div class="row"><label>${esc(t("up.name"))}<input name="name" required maxlength="60"></label><label>${esc(t("up.cat"))}<input name="cat" maxlength="40" placeholder="${lang === "ru" ? "Интерфейс, бой, задания…" : "UI, combat, questing…"}"></label></div>
      <label>${esc(t("up.descRu"))}<textarea name="ru" rows="3"></textarea></label>
      <label>${esc(t("up.descEn"))}<textarea name="en" rows="2"></textarea></label>
      <div class="row"><label>${esc(t("up.for"))}<input name="for" maxlength="40" placeholder="WeakAuras, DBM…"></label><label>${esc(t("up.file"))}<input name="file" maxlength="80" placeholder="MyAddon.zip"></label></div>
      <label>${esc(t("up.link"))}<input name="link" type="url" placeholder="https://www.curseforge.com/wow/addons/…"></label>
      <button class="btn primary" type="submit">${esc(t("up.go"))} ↗</button>`;
    f.onsubmit = e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const slug = (d.file ? d.file.replace(/\.zip$/i, "") : d.name).trim().replace(/[^\p{L}\p{N}_.-]+/gu, "-").replace(/^-+|-+$/g, "") || "addon";
      const obj = { name: d.name.trim(), status: d.status, category: { ru: d.cat.trim(), en: d.cat.trim() }, description: { ru: d.ru.trim(), en: d.en.trim() || d.ru.trim() }, checked: new Date().toISOString().slice(0, 10) };
      if (d.for.trim()) obj.for = d.for.trim();
      if (d.link.trim()) obj.links = [{ label: "Скачать / Download", url: d.link.trim() }];
      const url = gh(`new/${REPO.branch}/addons/${d.kind}?filename=${encodeURIComponent(slug + ".json")}&value=${encodeURIComponent(JSON.stringify(obj, null, 2))}`);
      const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener";
      document.body.appendChild(a); a.click(); a.remove();
      adlg.close();
    };
    adlg.showModal();
  }
  $("#add-close").addEventListener("click", () => adlg.close());
  $("#q").addEventListener("input", renderAddons);
  $$("#kind button").forEach(b => b.addEventListener("click", () => {
    kind = b.dataset.kind; $$("#kind button").forEach(x => x.setAttribute("aria-pressed", x === b)); renderAddons();
  }));

  // Новые аддоны, загруженные в репозиторий после последней сборки: читаем папки через GitHub API и .toc из zip прямо в браузере.
  async function inflateRaw(buf) {
    const ds = new DecompressionStream("deflate-raw");
    return new Uint8Array(await new Response(new Blob([buf]).stream().pipeThrough(ds)).arrayBuffer());
  }
  async function readToc(url) {
    const buf = new Uint8Array(await (await fetch(url)).arrayBuffer());
    const dv = new DataView(buf.buffer);
    let e = buf.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) return {};
    let p = dv.getUint32(e + 16, true); const n = dv.getUint16(e + 10, true);
    let best = null;
    for (let k = 0; k < n; k++) {
      const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
      const name = new TextDecoder().decode(buf.subarray(p + 46, p + 46 + nl));
      if (/\.toc$/i.test(name) && (!best || name.split("/").length < best.name.split("/").length)) best = { name, method, csize, off };
      p += 46 + nl + xl + cl;
    }
    if (!best) return {};
    const lh = best.off, data = buf.subarray(lh + 30 + dv.getUint16(lh + 26, true) + dv.getUint16(lh + 28, true)).subarray(0, best.csize);
    const txt = new TextDecoder().decode(best.method === 8 ? await inflateRaw(data) : data);
    const meta = {};
    txt.split(/\r?\n/).forEach(l => { const m = l.match(/^##\s*([^:]+):\s*(.*)$/); if (m) meta[m[1].trim()] = m[2].replace(/\|c[0-9a-fA-F]{8}|\|r/g, "").trim(); });
    return meta;
  }
  async function loadLiveAddons() {
    if (!/github\.io$/.test(location.hostname)) return;
    try {
      const cached = JSON.parse(sessionStorage.getItem("live-addons") || "null");
      if (cached) { extraAddons = cached; renderAddons(); renderHome(); return; }
    } catch {}
    const known = new Set((window.ADDONS || []).map(a => a.kind + "/" + a.id));
    const found = [];
    for (const k of ["ours", "plugins", "recommended"]) {
      let files = [];
      try { const r = await fetch(`https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/addons/${k}?ref=${REPO.branch}`); if (!r.ok) continue; files = await r.json(); } catch { continue; }
      const byKey = {};
      files.forEach(f => { const m = f.name.match(/^(.*)\.(zip|rar|7z|json)$/i); if (m) (byKey[m[1]] = byKey[m[1]] || {})[m[2].toLowerCase()] = f; });
      for (const [id, f] of Object.entries(byKey)) {
        if (known.has(k + "/" + id)) continue;
        const a = { id, kind: k, name: id, status: k === "recommended" ? "unknown" : "ok" };
        try {
          if (f.zip) {
            const toc = await readToc(`addons/${k}/${encodeURIComponent(f.zip.name)}`);
            Object.assign(a, { name: toc.Title || id, author: toc.Author || "", version: toc.Version || "", description: { ru: toc["Notes-ruRU"] || toc.Notes || "", en: toc.Notes || "" }, download: `addons/${k}/${f.zip.name}` });
            const dep = toc.RequiredDeps || toc.Dependencies || ""; if (k === "plugins" && dep) a.for = dep.split(",")[0].trim();
          }
          const arc = f.rar || f["7z"];
          if (!f.zip && arc) Object.assign(a, { download: `addons/${k}/${arc.name}`, size: arc.size });
          if (f.zip) a.size = f.zip.size;
          if (f.json) Object.assign(a, await (await fetch(`addons/${k}/${encodeURIComponent(f.json.name)}`)).json());
        } catch {}
        a.kind = k; found.push(a);
      }
    }
    extraAddons = found;
    try { sessionStorage.setItem("live-addons", JSON.stringify(found)); } catch {}
    if (found.length) { renderAddons(); renderHome(); }
  }

  /* ---------- «Где?» ---------- */
  const WHERE = window.WHERE || [];
  const PRU = window.WHERE_PLACES_RU || {};
  const wq = $("#wq");
  const norm = x => String(x).toLowerCase().replace(/ё/g, "е").replace(/[’'`]/g, "'").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const prKeys = Object.keys(PRU).sort((a, b) => b.length - a.length);
  const prRe = prKeys.length ? new RegExp("\\b(" + prKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "g") : null;
  const placeRu = x => prRe ? String(x).replace(prRe, m => PRU[m]) : String(x);
  const TR = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya" };
  const PLACE_T = ["zone", "area", "dungeon", "raid", "flight"];
  const ruName = e => e[4] || (PLACE_T.includes(e[1]) ? placeRu(e[0]) : e[0]);
  const translit = x => [...x].map(ch => TR[ch] ?? ch).join("");
  const WIDX = WHERE.map(e => norm([e[0], e[4], placeRu(e[0]), e[2], placeRu(e[2])].filter(Boolean).join(" | ")));
  const WLAT = WIDX.map(x => x.replace(/[^a-z0-9' |]/g, ""));
  const whUrl = v => `https://www.wowhead.com/classic${lang === "ru" ? "/ru" : ""}/search?q=${encodeURIComponent(v)}`;
  function renderWhere() {
    const v = wq.value.trim(), n = norm(v);
    const out = $("#where-out");
    if (n.length < 2) { out.innerHTML = ""; $("#where-wh").hidden = true; return; }
    const cyr = /[а-я]/.test(n), lat = cyr ? translit(n) : "";
    const hits = [];
    WIDX.forEach((x, i) => {
      const nameN = norm(WHERE[i][0]), ruN = norm(ruName(WHERE[i]));
      let rank = -1;
      if (nameN.startsWith(n) || ruN.startsWith(n)) rank = 0;
      else if (nameN.includes(n) || ruN.includes(n)) rank = 1;
      else if (x.includes(n)) rank = 3;
      else if (lat.length >= 3) { if (nameN.startsWith(lat) || nameN.includes(" " + lat)) rank = 2; else if (nameN.includes(lat)) rank = 2.5; else if (WLAT[i].includes(lat)) rank = 4; }
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

  /* ---------- всё вместе ---------- */
  function renderAll() {
    applyStatic();
    renderHome();
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
  loadLiveAddons();
})();
