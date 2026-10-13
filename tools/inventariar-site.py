"""Auditoria estática de caminhos, nomes sensíveis a caixa e imagens do site."""
import json, re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
OUT = ROOT / 'auditoria' / '2026-10-13'
OUT.mkdir(parents=True, exist_ok=True)
class Inventory(HTMLParser):
    def __init__(self):
        super().__init__(); self.scenes=[]; self.refs=[]; self.ids=[]; self.controls=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='section' and 'data-id' in a: self.scenes.append(a['data-id'])
        if tag in ('button','summary','details'): self.controls.append({'tag':tag,**a})
        for k in ('src','href','poster'):
            if a.get(k): self.refs.append(a[k])
p=Inventory(); source=(SITE/'index.html').read_text(encoding='utf-8'); p.feed(source)
refs=p.refs + re.findall(r'(?<![\w])(?:assets/)[^\s"\'<>`]+',source)
local=[]; bad=[]
for ref in sorted(set(refs)):
    u=urlsplit(ref)
    if u.scheme or u.netloc: continue
    if not u.path:
        if u.fragment and unquote(u.fragment) not in p.ids and unquote(u.fragment) not in p.scenes: bad.append({'ref':ref,'reason':'anchor missing'})
        continue
    q=SITE/unquote(u.path)
    record={'ref':ref,'exists':q.is_file()}
    if q.is_file():
        current=SITE
        for part in Path(unquote(u.path)).parts:
            if part not in [x.name for x in current.iterdir()]: bad.append({'ref':ref,'reason':'case mismatch'})
            current=current/part
        record['bytes']=q.stat().st_size
        try:
            with Image.open(q) as im: record.update(format=im.format,size=list(im.size)); im.verify()
        except Exception as e:
            if q.suffix.lower() in ('.webp','.png','.jpg','.jpeg'): bad.append({'ref':ref,'reason':str(e)})
    else: bad.append({'ref':ref,'reason':'file missing'})
    local.append(record)
result={'scenes':p.scenes,'controls':p.controls,'local':local,'errors':bad,'external':sorted(set(r for r in p.refs if urlsplit(r).scheme in ('http','https')))}
(OUT/'inventario.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'scenes':len(p.scenes),'controls':len(p.controls),'local':len(local),'errors':bad},ensure_ascii=False))
