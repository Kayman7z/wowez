# WoWez

Гайды, сборки талантов, экипировка, аддоны и поиск по миру для World of Warcraft: Forever. Сайт Kayman и Danrer: https://kayman7z.github.io/wowez/

## Как добавить аддон
- Свой аддон: загрузите zip в папку `addons/ours` (на GitHub: Add file → Upload files → Commit changes).
- Дополнение к известному аддону: zip в `addons/plugins`.
- Чужой аддон по ссылке или русское описание: форма «Добавить аддон» на странице «Аддоны» сайта.

Название, версия, автор и описание берутся из `.toc` внутри zip. Сайт подхватывает новые файлы сам.
`tools/build_addons.py` собирает `data/addons.js` заранее (необязательно).
