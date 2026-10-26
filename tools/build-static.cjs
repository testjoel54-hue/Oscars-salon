/**
 * Generate a no-npm, directly deployable Cloudflare Pages site from React TSX.
 * English is rendered into dist/index.html; the independent Vietnamese page
 * is rendered into dist/vi/index.html. Both pages contain actual HTML content.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const child = require('child_process');
const sourceRoot = path.resolve(__dirname, '..');
const globalNpmRoot = child.execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
const ts = require(path.join(globalNpmRoot, 'typescript'));
const src = fs.readFileSync(path.join(sourceRoot, 'src/App.tsx'), 'utf8');
const withoutImports = src
  .replace(/^import \{ useEffect, useState \} from 'react';\s*/m, '')
  .replace('export default function App()', 'function App()');
const compiled = ts.transpileModule(withoutImports, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None, jsx: ts.JsxEmit.React },
  reportDiagnostics: true,
});
if (compiled.diagnostics && compiled.diagnostics.some(d => d.category === ts.DiagnosticCategory.Error)) {
  throw Error('JSX compilation diagnostics: ' + compiled.diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('; '));
}
const React = { Fragment: Symbol('Fragment'), createElement: (type, props, ...children) => ({ type, props: { ...props, children } }) };
const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const attrMap = { className: 'class', htmlFor: 'for', hrefLang: 'hreflang', autoPlay: 'autoplay', playsInline: 'playsinline', tabIndex:'tabindex', fetchPriority:'fetchpriority', strokeWidth:'stroke-width', strokeLinecap:'stroke-linecap', strokeLinejoin:'stroke-linejoin', viewBox:'viewBox' };
const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
function render(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (Array.isArray(node)) return node.map(render).join('');
  if (typeof node === 'string' || typeof node === 'number') return esc(node);
  if (node.type === React.Fragment) return render(node.props && node.props.children);
  if (typeof node.type === 'function') return render(node.type(node.props || {}));
  if (typeof node.type !== 'string') throw Error('Unsupported tree node type: '+typeof node.type);
  const attrs = Object.entries(node.props || {}).filter(([key, val]) => key !== 'children' && key !== 'key' && key !== 'ref' && !key.startsWith('on') && val != null);
  const attrText = attrs.map(([key, val]) => {
    if (key === 'style') {
      const toKebab = s => s.replace(/[A-Z]/g, x=>'-'+x.toLowerCase());
      return ' style="'+esc(Object.entries(val).map(([key,val])=>toKebab(key)+':'+val).join(';'))+'"';
    }
    const name = attrMap[key] || key;
    if (typeof val === 'boolean') {
      if (name.startsWith('aria-') || name.startsWith('data-')) return ` ${name}="${String(val)}"`;
      return val ? ` ${name}` : '';
    }
    return ' '+name+'="'+esc(val)+'"';
  }).join('');
  const tag = node.type;
  if (voidTags.has(tag)) return `<${tag}${attrText}>`;
  return `<${tag}${attrText}>${render(node.props && node.props.children)}</${tag}>`;
}

const staticRoot = path.join(sourceRoot, 'dist');
fs.rmSync(staticRoot, { recursive:true, force:true });
fs.mkdirSync(staticRoot, { recursive:true });

for (const language of ['en', 'vi']) {
  const context = {
    React, Intl, Date, console,
    window: { location: { pathname: language === 'vi' ? '/vi/' : '/' } },
    document: {},
    useState: initial => [typeof initial === 'function' ? initial() : initial, () => {}],
    useEffect: () => {},
  };
  vm.createContext(context);
  vm.runInContext(compiled.outputText + '\nthis.appTree = App();', context);
  const markup = render(context.appTree);
  const pageSource = language === 'vi' ? 'vi/index.html' : 'index.html';
  let html = fs.readFileSync(path.join(sourceRoot, pageSource),'utf8');
  html = html.replace('<div id="root"></div>', '<div id="root">'+markup+'</div>');
  html = html.replace('<script type="module" src="/src/main.tsx"></script>', '<script defer src="/site.js"></script>');
  html = html.replace('</head>','  <link rel="stylesheet" href="/styles.css" />\n  </head>');
  const pageOut = path.join(staticRoot, pageSource);
  fs.mkdirSync(path.dirname(pageOut), { recursive: true });
  fs.writeFileSync(pageOut, html);
  console.log(`Wrote ${pageSource}, ${markup.length.toLocaleString()} bytes of ${language} HTML`);
}
fs.copyFileSync(path.join(sourceRoot,'src/styles.css'), path.join(staticRoot,'styles.css'));
fs.copyFileSync(path.join(sourceRoot,'tools/site.js'), path.join(staticRoot,'site.js'));
for (const item of fs.readdirSync(path.join(sourceRoot,'public'))) fs.copyFileSync(path.join(sourceRoot,'public',item), path.join(staticRoot,item));
fs.writeFileSync(path.join(staticRoot, 'DEPLOY-README.txt'),
  'OSCAR SALON - Cloudflare Pages Direct Upload\n\n' +
  'Upload this ZIP or the files in it to Cloudflare Pages.\n' +
  'English homepage: /\nVietnamese homepage: /vi/\n' +
  'Both pages have separate, complete HTML and a shared stylesheet.\n' +
  'The hero is a STILL image. No video or animation file is included.\n' +
  'Language links in the navigation switch directly between the two pages.\n');
