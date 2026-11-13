// Ротации и таланты WoW Forever (клиент 1.60.1).
// Собрано из открытых гайдов 13.11.2026. У каждой специализации есть ссылка на источник.
// Названия способностей даны как в английских гайдах; в скобках пояснения по-русски.
// split — распределение очков талантов по трём веткам класса (в порядке trees); null — источник не указал.
// beta: true — источник пока даёт только сборку беты (ур. 30), обновление на 60 обещано.

const WT = "https://www.warcrafttavern.com/forever/guides/";
const CHANGES = "https://wow.gg/ru/guides/forever-class-changes-03-11-26";
const RACES = "https://seemeta.com/ru/wow-forever/classes";

window.CLASSES = [
  {
    id: "warrior", name: "Воин", color: "#C69B6D", icon: "⚔️",
    trees: ["Оружие", "Неистовство", "Защита"],
    races: ["Человек", "Орк", "Дворф", "Ночной эльф", "Нежить", "Таурен", "Гном", "Тролль", "Небеснорожденный"],
    changes: [],
    specs: [
      {
        name: "Оружие", role: "Ближний бой", split: null, beta: true,
        key: ["Mortal Strike", "Bloodthrill", "Improved Rend", "Improved Overpower", "Improved Slam", "Impale", "Two-Handed Specialization", "Weaponmaster"],
        rot: [
          ["Heroic Strike / Cleave", "тратить лишнюю ярость"],
          ["Battle Shout", "держать бафф"],
          ["Sunder Armor", "довести стаки"],
          ["Overpower", "когда доступен"],
          ["Rend", "держать на цели"],
          ["Mortal Strike", "по перезарядке"],
          ["Spearing Strike", ""],
          ["Slam", ""],
          ["Hamstring", "филлер при лишней ярости"]
        ],
        cds: "Recklessness — самый сильный кулдаун на урон; также Bloodrage, Retaliation, Shield Wall, Berserker Rage.",
        aoe: "Sweeping Strikes, Cleave и Whirlwind на бои с несколькими целями.",
        stats: null, statsNote: "Точный приоритет ждут после тестов на 60. Важны сила/сила атаки (1 к 2), меткость, крит.",
        src: WT + "arms-warrior/"
      },
      {
        name: "Неистовство", role: "Ближний бой", split: null, beta: true,
        key: ["Bloodthirst", "Cruelty", "Unbridled Wrath", "Furious Precision", "Dual Wield Specialization", "Flurry", "Enrage", "Death Wish"],
        rot: [
          ["Heroic Strike / Cleave", "тратить лишнюю ярость"],
          ["Battle Shout", "держать бафф"],
          ["Sunder Armor", "довести стаки"],
          ["Execute", "когда доступен"],
          ["Bloodthirst", "по перезарядке"],
          ["Whirlwind", "по перезарядке"],
          ["Hamstring", "если больше нечего жать и есть ярость"]
        ],
        cds: "Recklessness, Death Wish, Bloodrage. Танец стоек: ненадолго в Battle Stance для Rend и Overpower.",
        aoe: "Cleave и Whirlwind — часть обычной ротации.",
        stats: null, statsNote: "Приоритет ждут после тестов на 60. Важны меткость, крит, сила/сила атаки.",
        src: WT + "fury-warrior/"
      },
      {
        name: "Защита", role: "Танк", split: null, beta: true,
        key: ["Shield Slam", "Shield Specialization", "Anticipation", "Defiance", "Improved Revenge", "Improved Thunder Clap", "Improved Sunder Armor", "Last Stand", "Vanguard"],
        rot: [
          ["Heroic Strike / Cleave", "тратить лишнюю ярость"],
          ["Battle Shout", ""],
          ["Thunder Clap + Demoralizing Shout", "держать дебаффы"],
          ["Sunder Armor", "довести стаки"],
          ["Revenge", "когда доступен"],
          ["Rend", "держать на цели"],
          ["Shield Slam", "по перезарядке"]
        ],
        cds: "Shield Wall, Last Stand, Retaliation (Battle Stance), Challenging Shout, Berserker Rage.",
        aoe: "Thunder Clap и Cleave.",
        stats: ["Меткость", "Выносливость / броня / уклонение", "Сила / сила атаки", "Крит", "Ловкость"], statsNote: "Порядок разделов в гайде; финальный приоритет на 60 ещё не опубликован.",
        src: WT + "protection-warrior/"
      }
    ]
  },
  {
    id: "paladin", name: "Паладин", color: "#F48CBA", icon: "🛡️",
    trees: ["Свет", "Защита", "Воздаяние"],
    races: ["Человек", "Дворф", "Нежить"],
    changes: [
      "Праведное неистовство с 10 уровня (было 16).",
      "Убраны благословение спасения, Печать ярости, специализация на одноручном оружии.",
      "Новые таланты: Клятва Света, Безграничный Свет (Свет), Клятва щита и Стоицизм (Защита).",
      "Улучшенные печати теперь 5 очков, Божественная точность 4/8% меткости."
    ],
    specs: [
      {
        name: "Свет", role: "Лекарь", split: null, beta: true,
        key: ["Holy Shock", "Illumination", "Reverence", "Purifying Power", "Benediction", "Healing Light", "Holy Power", "Divine Favor", "Light's Vigil"],
        rot: [
          ["Печать на цели", "обычно Seal of Wisdom"],
          ["Holy Shock", "если цель может умереть до конца каста или вы двигаетесь"],
          ["Holy Light", "заранее на цель под сильным уроном"],
          ["Holy Light", "по проку Infusion of Light"],
          ["Flash of Light", "на лёгкий урон"],
          ["Light's Vigil", "только когда очень нужен массовый хил (дорого)"]
        ],
        cds: "Divine Shield, Divine Protection, Blessing of Protection, Lay on Hands, Blessing of Sacrifice.",
        aoe: "Light's Vigil — единственный массовый хил.",
        stats: ["Сила исцеления", "Интеллект", "Крит", "Дух / MP5"], statsNote: "Порядок по гайду, точный приоритет на 60 ещё не опубликован.",
        src: WT + "holy-paladin/"
      },
      {
        name: "Защита", role: "Танк", split: null, beta: true,
        key: ["Holy Shield", "Redoubt", "Anticipation", "Shield Specialization", "Improved Righteous Fury", "Sacred Duty", "Reckoning", "Swift Judgement", "Templar's Bulwark"],
        rot: [
          ["Seal of the Crusader", "перед пуллом"],
          ["Judgement of the Crusader", "открытие"],
          ["Seal of Fury", "держать"],
          ["Judgement", "по перезарядке, если не нужен как таунт"],
          ["Swift Judgement", "по перезарядке, если не нужен как таунт"],
          ["Consecration", "держать"],
          ["Holy Shield", "когда доступен"],
          ["Holy Strike", "когда доступен"],
          ["Exorcism", "против нежити"]
        ],
        cds: "Templar's Bulwark, Holy Shield, Divine Protection.",
        aoe: "Consecration — урон снижается против 5+ целей.",
        stats: ["Меткость", "Сила заклинаний", "Выносливость / броня / уклонение", "Сила / сила атаки", "Крит", "Ловкость"], statsNote: "Порядок разделов в гайде.",
        src: WT + "protection-paladin/"
      },
      {
        name: "Воздаяние", role: "Ближний бой", split: null, beta: true,
        key: ["Seal of Command", "Sanctified Judgement", "Conviction", "Vengeance", "Divine Strength", "Improved Seals", "Sacred Arbiter", "Champion of the Light", "Twist of Light"],
        rot: [
          ["Seal of the Crusader", "перед пуллом"],
          ["Judgement of the Crusader", "открытие"],
          ["Seal of Command", "держать"],
          ["Judgement", "по перезарядке"],
          ["Holy Strike", "когда доступен"],
          ["Consecration", "держать"],
          ["Exorcism", "против нежити"],
          ["Twist of Light", "с талантом держать Seal of Command + Seal of Righteousness"]
        ],
        cds: "",
        aoe: "Consecration.",
        stats: null, statsNote: "Приоритет на 60 не опубликован. Важны меткость, крит, сила (1 к 2 силы атаки), интеллект/сила заклинаний.",
        src: WT + "retribution-paladin/"
      }
    ]
  },
  {
    id: "hunter", name: "Охотник", color: "#AAD372", icon: "🏹",
    trees: ["Повелитель зверей", "Стрельба", "Выживание"],
    races: ["Человек", "Орк", "Дворф", "Ночной эльф", "Таурен", "Тролль", "Небеснорожденный"],
    changes: [
      "Все ловушки делят общий кулдаун 30 сек.",
      "Arcane Shot и Serpent Sting сильно усилены, коэффициенты от силы атаки выше.",
      "Aspect of the Hawk: бонус силы атаки почти вдвое больше.",
      "Sniper Shot (Стрельба) — бонусный урон удвоен."
    ],
    specs: [
      {
        name: "Повелитель зверей", role: "Дальний бой", split: [31, 20, 0],
        key: ["Bestial Wrath", "Deadly Aspects", "Focused Fire", "Unleashed Fury", "Ferocity", "Frenzy", "Mortal Shots", "Careful Aim", "Rapid Killing"],
        rot: [
          ["Immolation Trap", "поставить заранее"],
          ["Aimed Shot", "прекаст"],
          ["Serpent Sting", "обновлять"],
          ["Summon Hawk", ""],
          ["Aimed Shot", "по перезарядке"],
          ["Arcane Shot", "когда два ястреба живут 6+ сек"],
          ["Держать двух ястребов", ""],
          ["Rapid Fire", "по перезарядке"],
          ["Bestial Wrath", "по перезарядке"]
        ],
        cds: "Rapid Fire, Bestial Wrath.",
        aoe: "Explosive Trap заранее → Multi-Shot → Serpent Sting на всех → Summon Hawk → Arcane Shot → Explosive Trap по КД под пак → Rapid Fire → Bestial Wrath.",
        stats: null, statsNote: "Ждут тестов на 60. Ловкость — один из главных статов, затем крит, сила атаки, скорость. Кап меткости 9% (6% при 305 навыка оружия).",
        src: WT + "beast-mastery-hunter/"
      },
      {
        name: "Стрельба", role: "Дальний бой", split: [5, 46, 0],
        key: ["Sniper Shot", "Barrage", "Lone Wolf", "Deadly Aspects", "Lethal Attacks", "Improved Stings", "Mortal Shots", "Ranged Weapon Specialization", "Rapid Killing"],
        rot: [
          ["Immolation Trap", "заранее на месте танка"],
          ["Sniper Shot", "прекаст в пулл, далее по КД"],
          ["Serpent Sting", "обновлять"],
          ["Aimed Shot", "по перезарядке"],
          ["Arcane Shot", "по перезарядке"],
          ["Rapid Fire", "по перезарядке"]
        ],
        cds: "Rapid Fire. Можно играть без питомца (Lone Wolf).",
        aoe: "Explosive Trap заранее → Multi-Shot → Serpent Sting на всех → Sniper Shot → Arcane Shot → Explosive Trap по КД → Rapid Fire.",
        stats: ["Ловкость", "Меткость", "Крит", "Сила атаки", "Скорость", "Интеллект", "Дух"], statsNote: "Порядок перечисления в гайде (~53 ловкости = 1% крита на 60).",
        src: WT + "marksmanship-hunter/"
      },
      {
        name: "Выживание", role: "Ближний + дальний", split: [0, 18, 33],
        key: ["Savage Strikes", "Clever Traps", "Predator's Edge", "Expose Prey", "Survivalist's Discipline", "Lightning Reflexes", "Resourcefulness", "Lone Wolf"],
        rot: [
          ["Immolation Trap", "заранее"],
          ["Aimed Shot", "прекаст"],
          ["Serpent Sting", ""],
          ["Arcane Shot", ""],
          ["В ближний бой", ""],
          ["Raptor Strike", ""],
          ["Mongoose Bite", "если доступен"],
          ["Immolation Trap", "если доступна"],
          ["Strider Kick", ""],
          ["Назад на дистанцию", "повторить выстрелы"],
          ["Rapid Fire", "по перезарядке"]
        ],
        cds: "Rapid Fire.",
        aoe: "То же, но Explosive Trap и Multi-Shot вместо Immolation Trap и Aimed Shot.",
        stats: ["Ловкость", "Меткость", "Крит", "Сила атаки", "Скорость", "Интеллект", "Дух"], statsNote: "Порядок перечисления в гайде.",
        src: WT + "survival-hunter/"
      }
    ]
  },
  {
    id: "rogue", name: "Разбойник", color: "#FFF468", icon: "🗡️",
    trees: ["Ликвидация", "Бой", "Скрытность"],
    races: ["Человек", "Орк", "Дворф", "Ночной эльф", "Нежить", "Гном", "Тролль", "Небеснорожденный"],
    changes: [
      "Новая пассивка Собранность (ур. 18) и новый удар левой рукой (ур. 24).",
      "Яды: коэффициент от силы атаки удвоен.",
      "Убраны Убийство, Упокоение, Горлорез, Тысяча порезов.",
      "Расправа поднята в 7 ряд, 90% урона оружия."
    ],
    specs: [
      {
        name: "Ликвидация", role: "Ближний бой", split: null,
        key: ["Mutilate", "Venom", "Seal Fate", "Cold Blood", "Vile Poisons", "Improved Poisons", "Lethality", "Malice", "Relentless Strikes"],
        rot: [
          ["Ambush", "открытие из незаметности"],
          ["Mutilate", "основной генератор приёмов"],
          ["Expose Armor", "на 5 приёмах"],
          ["Venom", "на 5 приёмах, когда висят Expose Armor и Slice and Dice"],
          ["Обновлять Venom, Expose Armor, Slice and Dice", ""],
          ["Vanish + Ambush", "для бурста"],
          ["Kidney Shot", "лишние приёмы"]
        ],
        cds: "Cold Blood, Vanish.",
        aoe: "У разбойника нет АоЕ — убивайте по одной цели.",
        stats: null, statsNote: "Точный приоритет на 60 не указан. Основа — ловкость, сила атаки, крит (яды тоже критуют).",
        src: WT + "assassination-rogue/"
      },
      {
        name: "Бой", role: "Ближний бой", split: null,
        key: ["Blade Flurry", "Adrenaline Rush", "Hack and Slash", "Weapon Expertise", "Dual-wield Specialization", "Riposte", "Flawless Execution", "Aggression", "Precision"],
        rot: [
          ["Stealth", ""],
          ["Ambush", "открытие, если в руках кинжал"],
          ["Sinister Strike", "основной генератор (Backstab в кинжальной сборке)"],
          ["Shank", "по перезарядке"],
          ["Blade Flurry", "по перезарядке"],
          ["Slice and Dice", "на 5 приёмах"],
          ["Expose Armor", "на следующих 5 приёмах"],
          ["Eviscerate", "остальные приёмы"]
        ],
        cds: "Adrenaline Rush для бурста. Hack and Slash гайд называет ключевым талантом.",
        aoe: "Blade Flurry — единственный клив у разбойников. Не меняйте цель, пока копите приёмы.",
        stats: null, statsNote: "Приоритет ждут после тестов на 60.",
        src: WT + "combat-rogue/"
      },
      {
        name: "Скрытность", role: "Ближний бой", split: null,
        key: ["Hemorrhage", "Ghostly Strike", "Premeditation", "Preparation", "Death Mark", "Master of Deception", "Initiative", "Setup", "Serrated Blades"],
        rot: [
          ["Stealth → Premeditation", ""],
          ["Ambush", "открытие (в блид-сборке — Garrote)"],
          ["Hemorrhage", "основной генератор"],
          ["Ghostly Strike", "по перезарядке"],
          ["Slice and Dice", "держать"],
          ["Expose Armor", "в долгих боях (в блид-сборке — Rupture)"],
          ["Death Mark", "когда висят Slice and Dice и Expose Armor/Rupture"],
          ["Eviscerate", "лишние приёмы"],
          ["Vanish + Ambush", "бурст; Preparation для повтора"]
        ],
        cds: "Vanish, Preparation, Death Mark.",
        aoe: "Нет АоЕ.",
        stats: null, statsNote: "Приоритет ждут после тестов на 60.",
        src: WT + "subtlety-rogue/"
      }
    ]
  },
  {
    id: "priest", name: "Жрец", color: "#F2F2F2", icon: "✨",
    trees: ["Послушание", "Свет", "Тьма"],
    races: ["Человек", "Дворф", "Ночной эльф", "Нежить", "Гном", "Тролль"],
    changes: [
      "Shadow Word: Death бьёт по себе на 30% от макс. здоровья, если цель выжила.",
      "Связующее исцеление заменено: жрец лечится на 50% от своих Flash Heal по другим.",
      "Выход из облика Тьмы больше не происходит при снятии болезней."
    ],
    specs: [
      {
        name: "Послушание", role: "Лекарь", split: [31, 20, 0],
        key: ["Penance", "Divine Aegis", "Power Infusion", "Soul Warding", "Renewed Hope", "Inspiration", "Meditation"],
        rot: [
          ["Renew", "держать на танке"],
          ["Power Word: Shield", ""],
          ["Penance", ""],
          ["Flash Heal", ""],
          ["Greater Heal", "с Inner Focus"]
        ],
        cds: "Inner Focus, Power Infusion, Abolish Disease, Dispel Magic, Fade.",
        aoe: "Для группы: Renew на как можно больше целей, затем щиты.",
        stats: ["Сила исцеления", "Интеллект", "MP5", "Дух", "Крит"], statsNote: "",
        src: WT + "discipline-priest/"
      },
      {
        name: "Свет", role: "Лекарь", split: [18, 33, 0],
        key: ["Prayer of Mending", "Spiritual Guidance", "Spiritual Healing", "Improved Renew", "Holy Binding", "Litany of Light", "Meditation"],
        rot: [
          ["Renew", "на как можно больше целей"],
          ["Power Word: Shield", ""],
          ["Flash Heal", ""],
          ["Greater Heal", "с Inner Focus"],
          ["Holy Nova / Prayer of Mending", "массовое лечение"]
        ],
        cds: "Inner Focus, Abolish Disease, Dispel Magic, Fade.",
        aoe: "Holy Nova и Prayer of Mending.",
        stats: ["Сила исцеления", "Интеллект", "MP5", "Дух", "Крит"], statsNote: "",
        src: WT + "holy-priest/"
      },
      {
        name: "Тьма", role: "Дальний бой", split: [14, 3, 34],
        key: ["Shadowform", "Vampiric Embrace", "Shadow Weaving", "Improved Mind Flay", "Silence", "Inner Focus", "Spirit Tap"],
        rot: [
          ["Shadow Word: Pain", "держать"],
          ["Devouring Plague", "держать"],
          ["Mind Blast", "по перезарядке"],
          ["Shadow Word: Death", "по перезарядке"],
          ["Vampiric Embrace", "держать"],
          ["Mind Flay", "филлер, не прерывать"]
        ],
        cds: "Опенер: Fade → прекаст Mind Blast → SW:P → Devouring Plague → SW:D → Vampiric Embrace → Mind Blast → Mind Flay.",
        aoe: "Devouring Plague на основной цели, SW:P на всех целях (главное в АоЕ), затем как в соло. Против 5+ целей слабо.",
        stats: ["Меткость", "Сила заклинаний / тёмной магии", "Крит", "Интеллект", "Дух"], statsNote: "",
        src: WT + "shadow-priest/"
      }
    ]
  },
  {
    id: "shaman", name: "Шаман", color: "#0070DD", icon: "⚡",
    trees: ["Стихии", "Совершенствование", "Исцеление"],
    races: ["Орк", "Дворф", "Таурен", "Тролль", "Небеснорожденный (Ваятели ветра)"],
    changes: [
      "Lightning Bolt усилен (макс. ранг +80%), Chain Lightning кастуется 2,5 сек.",
      "Stormstrike 150% урона оружия, кулдаун 6 сек.",
      "Riptide (Быстрина) — только периодическое лечение, КД 12 сек, на 40% дешевле.",
      "По изменениям 03.11 Lava Burst заменён талантом Зов грома. Warcraft Tavern пока советует Lava Burst — проверяйте в игре."
    ],
    specs: [
      {
        name: "Стихии", role: "Дальний бой", split: null, beta: true,
        key: ["Lightning Overload", "Lava Burst", "Elemental Fury", "Elemental Focus", "Trial By Fire", "Earthbound", "Convection", "Mindfulness"],
        rot: [
          ["Searing Totem", "держать (сначала войти в бой)"],
          ["Lava Burst → Flame Shock", "открытие"],
          ["Flame Shock", "держать"],
          ["Lava Burst", "по перезарядке"],
          ["Lightning Bolt", "филлер"]
        ],
        cds: "",
        aoe: "Magma Totem рядом с мобами → Lava Burst → Flame Shock → Fire Nova по КД → Chain Lightning, пока хватает маны.",
        stats: null, statsNote: "Сила заклинаний — главный стат, затем крит, меткость, интеллект. Финальный приоритет на 60 не опубликован.",
        src: WT + "elemental-shaman/"
      },
      {
        name: "Совершенствование", role: "Ближний бой", split: null, beta: true,
        key: ["Stormstrike", "Improved Stormstrike", "Maelstrom Weapon", "Flurry", "Mental Dexterity", "Shamanistic Focus", "Rage of the Farseer"],
        rot: [
          ["Lightning Shield + Windfury Weapon", "или Rockbiter Weapon"],
          ["Flame Shock", "на основной цели"],
          ["Searing Totem", "если моб проживёт достаточно"],
          ["Lightning Bolt", "пулл"],
          ["Stormstrike", "по перезарядке"],
          ["Lightning Bolt", "мгновенный от стаков Maelstrom, под дебафф Stormstrike"],
          ["Earth Shock", "филлер"]
        ],
        cds: "",
        aoe: "Шилд и Windfury → Magma Totem → Fire Nova по КД → Flame Shock → Stormstrike → мгновенный Lightning Bolt.",
        stats: null, statsNote: "Приоритет на 60 не опубликован.",
        src: WT + "enhancement-shaman/"
      },
      {
        name: "Исцеление", role: "Лекарь", split: null, beta: true,
        key: ["Riptide", "Mana Tide Totem", "Nature's Swiftness", "Water Shield", "Ancestral Healing", "Tidal Mastery", "Mindfulness"],
        rot: [
          ["Riptide", "на основную цель (усиливает следующий Chain Heal)"],
          ["Chain Heal", "по цели рядом с ранеными"],
          ["Healing Stream Totem", "если слот воды свободен"],
          ["Lesser Healing Wave", "срочный хил"],
          ["Healing Wave", "обычный урон"]
        ],
        cds: "Nature's Swiftness + Healing Wave или Chain Heal, Mana Tide Totem.",
        aoe: "Chain Heal.",
        stats: null, statsNote: "Примерно: сила исцеления, дух, интеллект, крит, скорость.",
        src: WT + "restoration-shaman/"
      }
    ]
  },
  {
    id: "mage", name: "Маг", color: "#3FC7EB", icon: "🔮",
    trees: ["Тайная магия", "Огонь", "Лёд"],
    races: ["Человек", "Орк", "Нежить", "Гном", "Тролль", "Небеснорожденный (Высший орден)"],
    changes: [
      "Убраны таланты Ледяной взрыв, Пронзающий лёд и Средоточие чар (слито в Точность).",
      "Arcane Blast: рост цены за стак 175% → 100%.",
      "Incineration до 5 очков (10% крита), Critical Mass 3 очка (6%).",
      "Ice Barrier даёт +15% урона льдом на 1 мин."
    ],
    specs: [
      {
        name: "Тайная магия", role: "Дальний бой", split: null,
        key: ["Arcane Blast", "Arcane Power", "Presence of Mind", "Missile Barrage", "Arcane Concentration", "Arcane Wrath", "Arcane Impact", "Heating Up", "Pyroblast"],
        rot: [
          ["Arcane Blast", "набирать стаки"],
          ["Arcane Missiles", "по проку Missile Barrage"],
          ["Arcane Wrath", "на 3–4 стаках Arcane Blast"],
          ["Fire Blast", "на 1–2 и 4 стаках"],
          ["Scorch", "с Heating Up на 4 стаках, когда Fire Blast на КД"],
          ["Pyroblast", "при 3 стаках Heating Up и 3–4 стаках AB"],
          ["Arcane Power", "на 4 стаках"],
          ["Presence of Mind", "на Wrath или Pyroblast при 4 стаках"],
          ["Заново с Arcane Blast", ""]
        ],
        cds: "Arcane Power, Presence of Mind.",
        aoe: "Спам Arcane Explosion.",
        stats: null, statsNote: "Сила заклинаний — самый важный стат. Остальной приоритет на 60 не указан.",
        src: WT + "arcane-mage/"
      },
      {
        name: "Огонь", role: "Дальний бой", split: null,
        key: ["Combustion", "Pyroblast", "Incineration", "Critical Mass", "Ignite", "Improved Scorch", "Heating Up", "Master of Elements", "Fire Power"],
        rot: [
          ["Pyroblast", "прекаст на боссе (на обычных — пулл Fireball)"],
          ["Scorch", "до 5 стаков Improved Scorch"],
          ["Combustion", "бурст"],
          ["Fire Blast", "по перезарядке"],
          ["Fireball", "основной каст; Scorch, когда дебафф спадает"],
          ["Pyroblast", "при 3 стаках Heating Up"],
          ["Arcane Missiles", "по проку Missile Barrage"]
        ],
        cds: "Combustion. Есть вариант Frostfire Bolt: он вместо Fireball + Ice Lance на проках.",
        aoe: "Flamestrike (обновлять), Blast Wave после него, спам Arcane Explosion.",
        stats: ["Сила заклинаний (огонь)", "Крит", "Интеллект", "Скорость", "Дух / MP5", "Выносливость"], statsNote: "Порядок перечисления в гайде.",
        src: WT + "fire-mage/"
      },
      {
        name: "Лёд", role: "Дальний бой", split: null,
        key: ["Ice Lance", "Shatter", "Fingers of Frost", "Frostbite", "Ice Barrier", "Cold Snap", "Winter's Chill", "Arctic Reach", "Missile Barrage"],
        rot: [
          ["Arcane Intellect + Ice Barrier", "держать"],
          ["Mage Armor", "в данжах и рейдах (Frost Armor в соло)"],
          ["Frostbolt", "основной каст, и на прок Arcane Concentration"],
          ["Ice Lance", "по проку Fingers of Frost / Frostbite"],
          ["Frost Nova → Ice Lance", "если проков нет"],
          ["Arcane Missiles", "по проку Missile Barrage"],
          ["Cone of Cold", "если Frost Nova на КД"]
        ],
        cds: "Cold Snap, Ice Barrier. Вариант Winter's Chill: Cone of Cold на 5 стаках под Shatter.",
        aoe: "Blizzard, если опасно стоять близко; иначе Frost Nova → Flamestrike → Cone of Cold / Arcane Explosion.",
        stats: ["Сила заклинаний (лёд)", "Скорость", "Крит", "Интеллект", "Дух / MP5", "Выносливость"], statsNote: "Порядок перечисления в гайде.",
        src: WT + "frost-mage/"
      }
    ]
  },
  {
    id: "warlock", name: "Чернокнижник", color: "#8788EE", icon: "💀",
    trees: ["Колдовство", "Демонология", "Разрушение"],
    races: ["Человек", "Орк", "Нежить", "Гном", "Тролль"],
    changes: [
      "Spellstone усиливает только урон тьмой.",
      "Питомцы получают 2 здоровья за выносливость хозяина (было 7,5).",
      "Drain Soul реже даёт осколки души от урона.",
      "Shadow and Flame 4–20% (было 2–10%)."
    ],
    specs: [
      {
        name: "Колдовство", role: "Дальний бой", split: [35, 11, 5], updated: "2026-11-11",
        key: ["Wrack", "Siphon Life", "Amplify Curse", "Shadow Trance", "Improved Corruption", "Demonic Sacrifice"],
        rot: [
          ["Bane of Agony", "с Amplify Curse, когда готов"],
          ["Проклятие", "по назначению рейда, иначе Curse of the Elements или Curse of Recklessness"],
          ["Corruption", ""],
          ["Siphon Life", ""],
          ["Shadow Bolt", "только под Shadow Trance"],
          ["Life Tap", "ниже ~40% маны в конце Wrack"],
          ["Wrack", "филлер, прерывать, если что-то выше нужно"]
        ],
        cds: "Перед пуллом пожертвовать беса (Demonic Sacrifice). Альтернатива — SM/Ruin 30/0/21.",
        aoe: "Corruption на вторую цель, Bane of Agony и Siphon Life, если живёт 30+ сек. Данжи: Hellfire на 3+, Rain of Fire издалека.",
        stats: ["Сила заклинаний / тьма", "Крит", "Меткость (до капа)", "Скорость", "Проникновение", "Интеллект", "Дух"], statsNote: "",
        src: WT + "affliction-warlock/"
      },
      {
        name: "Демонология", role: "Дальний бой", split: [2, 31, 18], updated: "2026-11-01",
        key: ["Demonic Pact", "Demonic Brand", "Decimation", "Demonic Knowledge", "Unholy Power", "Fel Vitality", "Ruin", "Improved Imp / Improved Sayaad"],
        rot: [
          ["Searing Pain", "если нет Demonic Brand"],
          ["Bane of Doom", "если бой ещё 1+ мин, иначе Bane of Agony"],
          ["Проклятие", "по назначению рейда"],
          ["Immolate", ""],
          ["Soul Fire", "под Decimation (огненная сборка)"],
          ["Corruption", ""],
          ["Life Tap", "в паузах и на бегу"],
          ["Searing Pain", "филлер (в тёмной сборке — Shadow Bolt)"]
        ],
        cds: "Огненная сборка: жертвуем Sayaad, держим беса. Тёмная — наоборот.",
        aoe: "Две цели: Corruption и Immolate на вторую. Данжи: Bane of Agony на всех, Hellfire на 3+, Rain of Fire.",
        stats: ["Сила заклинаний", "Меткость (кап 17%)", "Крит", "Скорость", "Проникновение", "Интеллект", "Дух"], statsNote: "",
        src: WT + "demonology-warlock/"
      },
      {
        name: "Разрушение", role: "Дальний бой", split: [14, 4, 33], updated: "2026-11-03",
        key: ["Conflagrate", "Incinerate", "Shadowburn", "Shadow and Flame", "Fire and Brimstone", "Ruin", "Bane of Havoc", "Cataclysm", "Pandemic"],
        rot: [
          ["Bane of Doom", "если бой 1+ мин, иначе Amplify Curse → Bane of Agony"],
          ["Проклятие", "по назначению рейда"],
          ["Immolate", ""],
          ["Corruption", ""],
          ["Conflagrate", "нужен Immolate на цели"],
          ["Shadowburn", "нужен осколок души"],
          ["Life Tap", "в паузах и на бегу"],
          ["Incinerate", "филлер"]
        ],
        cds: "Опенер: Soul Fire, пока танк пуллит. Держать 2 осколка души. Вариант с Demonic Sacrifice: 7/11/33.",
        aoe: "Bane of Havoc на вторую цель для клива. Данжи: Hellfire на 3+, Rain of Fire.",
        stats: ["Сила заклинаний / огонь", "Крит", "Меткость (кап 17%)", "Скорость", "Проникновение", "Интеллект", "Дух"], statsNote: "",
        src: WT + "destruction-warlock/"
      }
    ]
  },
  {
    id: "druid", name: "Друид", color: "#FF7C0A", icon: "🌿",
    trees: ["Баланс", "Сила зверя", "Исцеление"],
    races: ["Ночной эльф", "Таурен", "Небеснорожденный"],
    changes: [
      "Угроза в облике медведя 50% → 115%; Swipe, Claw, Pounce и Shred сильно усилены.",
      "Убран Берсерк, Lacerate (Растерзать) теперь талант Силы зверя.",
      "Новая пассивка Собранность (ур. 32) и новые таланты в Силе зверя и Исцелении.",
      "Starfire +40% базового урона, Regrowth каст 3 сек."
    ],
    specs: [
      {
        name: "Баланс", role: "Дальний бой", split: [41, 0, 10],
        key: ["Moonkin Form", "Eclipse", "Insect Swarm", "Improved Starfire", "Improved Wrath", "Moonglow", "Genesis", "Improved Moonfire", "Nature's Splendor"],
        rot: [
          ["Moonfire", "держать"],
          ["Insect Swarm", "держать"],
          ["2× Starfire → 1× Wrath", "чередовать"]
        ],
        cds: "",
        aoe: "2–4 цели: Moonfire и Insect Swarm на всех. 5+: Hurricane.",
        stats: null, statsNote: "Сила заклинаний — главное, крит ценится высоко, скорость слабее крита.",
        src: WT + "balance-druid/"
      },
      {
        name: "Сила зверя", role: "Танк / ближний бой", split: [9, 37, 5],
        key: ["Feral Charge", "Lacerate", "Leader of the Pack", "Primal Bite", "Shifting Power", "Predatory Discipline", "Nature's Reach"],
        rot: [
          ["Кошка: Faerie Fire", "держать (Thorns в соло)"],
          ["Rip", "на 5 приёмах"],
          ["Ferocious Bite", "4–5 приёмов и 70+ энергии"],
          ["Rake", ""],
          ["Shifting Power", "по КД, если энергии < 50"],
          ["Shred", "или Claw, если не за спиной"],
          ["Медведь: Faerie Fire → Demoralizing Roar", ""],
          ["Primal Bite", "по перезарядке"],
          ["Lacerate", "до 5 стаков; Swipe на пачку, Maul на одну цель"]
        ],
        cds: "Challenging Roar — массовый таунт.",
        aoe: "Swipe в облике медведя.",
        stats: ["Кошка: меткость (9%)", "Мастерство", "Крит", "Скорость", "Ловкость"], statsNote: "Медведь: защита (кап 440), уклонение, броня, выносливость.",
        src: WT + "feral-druid/"
      },
      {
        name: "Исцеление", role: "Лекарь", split: [13, 0, 38],
        key: ["Wild Growth", "Swiftmend", "Nature's Swiftness", "Bloom", "Reflection", "Improved Tranquility", "Nature's Splendor"],
        rot: [
          ["Swiftmend", "срочно, если на цели Rejuvenation/Regrowth"],
          ["Wild Growth", "урон по нескольким"],
          ["Rejuvenation", "на тех, кто под постоянным уроном"],
          ["Regrowth", "на цели без HoT"],
          ["Healing Touch", "высоким рангом на остальное"]
        ],
        cds: "Nature's Swiftness (раз в 3 мин), Innervate, Rebirth, Tranquility (под Wild Growth).",
        aoe: "Wild Growth и Tranquility.",
        stats: null, statsNote: "Сила исцеления, дух, скорость, крит, интеллект (без точного порядка).",
        src: WT + "restoration-druid/"
      }
    ]
  }
];
window.CLASS_SOURCES = { changes: CHANGES, races: RACES, checked: "13.11.2026" };
