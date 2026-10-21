# Dibuja los iconos PNG de la app. Uso: python icons/make_icons.py <carpeta_salida>
import math, sys, os
from PIL import Image, ImageDraw

S = 1024

def icono(maskable=False):
    im = Image.new('RGB', (S, S), '#7a2a35')
    d = ImageDraw.Draw(im)
    k = 0.76 if maskable else 1.0
    cx, cy = S / 2, S / 2 + 10 * k
    def P(x, y): return (cx + (x - 512) * k, cy + (y - 512) * k)
    cream = '#f3eee5'; w = int(46 * k); r = w / 2
    def dot(x, y):
        X, Y = P(x, y); d.ellipse([X - r, Y - r, X + r, Y + r], fill=cream)
    d.arc([P(437, 200), P(587, 350)], start=200, end=90, fill=cream, width=w)
    d.line([P(512, 348), P(512, 400)], fill=cream, width=w)
    a = math.radians(200); dot(512 + 75 * math.cos(a), 275 + 75 * math.sin(a))
    d.line([P(512, 400), P(842, 628), P(182, 628), P(512, 400)], fill=cream, width=w, joint='curve')
    for x, y in [(842, 628), (182, 628), (512, 400)]: dot(x, y)
    d.rounded_rectangle([P(300, 668), P(724, 808)], radius=int(36 * k), fill='#c9b48f')
    d.rounded_rectangle([P(300, 668), P(540, 808)], radius=int(36 * k), fill='#9fc4e2')
    d.rectangle([P(480, 668), P(512, 808)], fill='#9fc4e2')
    return im

out = sys.argv[1] if len(sys.argv) > 1 else 'icons'
os.makedirs(out, exist_ok=True)
base, mask = icono(), icono(True)
for nombre, lado, im in [('apple-touch-icon.png', 180, base), ('icon-192.png', 192, base), ('icon-512.png', 512, base), ('icon-maskable-512.png', 512, mask)]:
    im.resize((lado, lado), Image.LANCZOS).save(os.path.join(out, nombre), optimize=True)
print('Iconos generados en', out)
