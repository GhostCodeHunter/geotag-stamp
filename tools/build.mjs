// Builds index.html (the file GitHub Pages serves) from src/app.html.
// Inlines the two font files and fills in the Content-Security-Policy hashes.
// Run: node tools/build.mjs     (no dependencies, Node 18+)
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const here = p => new URL('../' + p, import.meta.url);
const b64 = p => readFileSync(here(p)).toString('base64');
const sha = text => createHash('sha256').update(text, 'utf8').digest('base64');

let html = readFileSync(here('src/app.html'), 'utf8');
html = html
  .replace('{{FONT_REG}}', b64('fonts/InstrumentSans-Regular.subset.woff'))
  .replace('{{FONT_BOLD}}', b64('fonts/InstrumentSans-Bold.subset.woff'));

const style = /<style>([\s\S]*?)<\/style>/.exec(html)[1];
const script = /<script>([\s\S]*?)<\/script>/.exec(html)[1];
html = html.replace('{{STYLE_HASH}}', sha(style)).replace('{{SCRIPT_HASH}}', sha(script));

if (/\{\{[A-Z_]+\}\}/.test(html)) throw new Error('An unfilled {{placeholder}} is left in the build.');
writeFileSync(here('index.html'), html);
console.log(`Built index.html (${(html.length / 1024).toFixed(0)} KB)`);
