"""Prévia HTTP do MESOZOICO; execute na raiz: python tools/preview.py."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port', type=int, default=8781)
args=parser.parse_args()
site=Path(__file__).resolve().parents[1]/'site'
class Preview(SimpleHTTPRequestHandler):
    def __init__(self,*a,**kw): super().__init__(*a,directory=str(site),**kw)
    def end_headers(self):
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
print(f'Prévia: http://127.0.0.1:{args.port}/',flush=True)
ThreadingHTTPServer(('127.0.0.1',args.port),Preview).serve_forever()
