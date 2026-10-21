// Ejecuta runTests() del motor que está dentro de index.html, sin navegador.
// Uso: node tests/run-tests.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(raiz, 'index.html'), 'utf8');
const m = html.match(/<script id="motor">([\s\S]*?)<\/script>/);
if (!m) { console.error('No encuentro <script id="motor"> en index.html'); process.exit(2); }

const ctx = vm.createContext({ console });
vm.runInContext(m[1] + '\n;globalThis.__r = runTests(true);', ctx);
const r = ctx.__r;
for (const t of r.resultados) console.log(`${t.ok ? '✓' : '✗'} ${t.nombre}${t.info ? '  · ' + t.info : ''}`);
console.log(`\n${r.pasan}/${r.total} tests ${r.ok ? 'OK' : 'CON FALLOS'}`);
process.exit(r.ok ? 0 : 1);
