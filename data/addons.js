// Каталог аддонов. Чтобы добавить аддон — скопируйте блок { ... } и поменяйте поля.
// kind: "ours" — наш аддон, "recommended" — чужой, который советуем.
// Текстовые поля можно писать на двух языках: { ru: "...", en: "..." } или просто строкой.
window.ADDONS = [
  {
    name: { ru: "Пример: наш аддон", en: "Example: our addon" },
    kind: "ours",
    author: "Kayman",
    version: "1.0.0",
    updated: "2026-11-13",
    description: { ru: "Короткое описание: что делает аддон и зачем он нужен.", en: "A short description: what the addon does and why you need it." },
    tags: [{ ru: "интерфейс", en: "UI" }],
    download: "https://example.com",
    source: "https://example.com"
  },
  {
    name: { ru: "Пример: аддон Danrer", en: "Example: Danrer's addon" },
    kind: "ours",
    author: "Danrer",
    version: "0.3.2",
    updated: "2026-11-01",
    description: { ru: "Ещё один наш аддон. Здесь можно описать установку и особенности.", en: "Another one of ours. Describe installation and features here." },
    tags: [{ ru: "бой", en: "combat" }, { ru: "утилиты", en: "utility" }],
    download: "https://example.com",
    source: "https://example.com"
  },
  {
    name: { ru: "Пример: полезный чужой аддон", en: "Example: a useful third-party addon" },
    kind: "recommended",
    author: { ru: "Сторонний автор", en: "Third-party author" },
    version: "5.2",
    updated: "2026-10-20",
    description: { ru: "Аддон, который мы советуем. Ссылка ведёт на оригинальную страницу автора.", en: "An addon we recommend. The link goes to the author's own page." },
    tags: [{ ru: "карта", en: "map" }],
    download: "https://example.com",
    source: "https://example.com",
    note: { ru: "Почему советуем: экономит кучу времени.", en: "Why we recommend it: saves a lot of time." }
  }
];
