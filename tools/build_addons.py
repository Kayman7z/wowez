#!/usr/bin/env python3
"""Собирает data/addons.js из папок addons/ours, addons/plugins, addons/recommended.

zip-архив: название, версия, автор, описание и зависимость берутся из .toc внутри архива.
.json рядом с архивом (то же имя) или отдельный .json: дополняет/заменяет поля.
Сайт умеет делать то же самое прямо в браузере, этот скрипт нужен, чтобы список
был в файле сразу (быстрее открывается и работает без интернета к api.github.com).
"""
import json, os, re, sys, zipfile, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KINDS = ["ours", "plugins", "recommended"]


def clean(s):
    return re.sub(r"\|c[0-9a-fA-F]{8}|\|r", "", s or "").strip()


def read_toc(path):
    meta = {}
    with zipfile.ZipFile(path) as z:
        tocs = [n for n in z.namelist() if n.lower().endswith(".toc")]
        if not tocs:
            return meta
        tocs.sort(key=lambda n: (n.count("/"), len(n)))
        text = z.read(tocs[0]).decode("utf-8", "replace")
        meta["folder"] = tocs[0].split("/")[0] if "/" in tocs[0] else os.path.splitext(tocs[0])[0]
    for line in text.splitlines():
        m = re.match(r"##\s*([^:]+):\s*(.*)", line)
        if m:
            meta[m.group(1).strip()] = clean(m.group(2))
    return meta


def from_zip(kind, fn):
    full = os.path.join(ROOT, "addons", kind, fn)
    toc = read_toc(full)
    deps = toc.get("RequiredDeps") or toc.get("Dependencies") or toc.get("Dep") or ""
    st = os.stat(full)
    a = {
        "id": os.path.splitext(fn)[0],
        "name": toc.get("Title") or os.path.splitext(fn)[0],
        "kind": kind,
        "author": toc.get("Author", ""),
        "version": toc.get("Version", ""),
        "interface": toc.get("Interface", ""),
        "description": {"ru": toc.get("Notes-ruRU") or toc.get("Notes", ""), "en": toc.get("Notes", "")},
        "download": f"addons/{kind}/{fn}",
        "size": st.st_size,
        "updated": datetime.date.fromtimestamp(st.st_mtime).isoformat(),
        "status": "ok" if kind != "recommended" else "unknown",
    }
    if toc.get("X-Website"):
        a["links"] = [{"label": "Сайт / Website", "url": toc["X-Website"]}]
    if kind == "plugins" and deps:
        a["for"] = deps.split(",")[0].strip()
    return a


def main():
    out = []
    for kind in KINDS:
        d = os.path.join(ROOT, "addons", kind)
        if not os.path.isdir(d):
            continue
        files = sorted(os.listdir(d))
        zips = {os.path.splitext(f)[0]: f for f in files if f.lower().endswith(".zip")}
        arcs = {os.path.splitext(f)[0]: f for f in files if f.lower().endswith((".rar", ".7z"))}
        jsons = {os.path.splitext(f)[0]: f for f in files if f.lower().endswith(".json")}
        for key in sorted(set(zips) | set(jsons) | set(arcs)):
            if key in zips:
                a = from_zip(kind, zips[key])
            elif key in arcs:
                st = os.stat(os.path.join(d, arcs[key]))
                a = {"id": key, "name": key, "kind": kind, "download": f"addons/{kind}/{arcs[key]}", "size": st.st_size,
                     "updated": datetime.date.fromtimestamp(st.st_mtime).isoformat(), "status": "ok" if kind != "recommended" else "unknown"}
            else:
                a = {"id": key, "kind": kind}
            if key in jsons:
                try:
                    extra = json.load(open(os.path.join(d, jsons[key]), encoding="utf-8"))
                    a.update({k: v for k, v in extra.items() if v not in ("", None)})
                except Exception as e:
                    print("bad json", jsons[key], e, file=sys.stderr)
            a["kind"] = kind
            out.append(a)
    js = ("// Генерируется tools/build_addons.py из папки addons/. Руками не править: положите zip или .json в addons/.\n"
          "window.ADDONS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
    open(os.path.join(ROOT, "data", "addons.js"), "w", encoding="utf-8").write(js)
    print(len(out), "addons")


if __name__ == "__main__":
    main()
