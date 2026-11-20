import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'parse5';

function collectScriptHashes(node, hashes) {
  if (node.tagName === 'script') {
    const attributes = new Map(node.attrs.map(({ name, value }) => [name, value]));
    const type = attributes.get('type')?.trim().toLowerCase();
    if (!attributes.has('src') && type !== 'application/ld+json' && type !== 'application/json') {
      // The parser returns the script text as the browser sees it, including HTML newline normalization.
      const script = node.childNodes.filter(({ nodeName }) => nodeName === '#text')
        .map(({ value }) => value).join('');
      if (script) {
        hashes.add(`'sha256-${createHash('sha256').update(script).digest('base64')}'`);
      }
    }
  }
  for (const child of node.childNodes ?? []) {
    collectScriptHashes(child, hashes);
  }
}

async function writePagesHeaders({ dir }) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  const pages = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.html'));
  // Pages serves the root 404.html for unmatched paths.
  await readFile(new URL('404.html', dir));

  const hashes = new Set();
  for (const page of pages) {
    const html = await readFile(join(page.parentPath, page.name), 'utf8');
    collectScriptHashes(parse(html), hashes);
  }

  const policy = [
    "default-src 'none'",
    // Same-origin scripts include Cloudflare's email decoder. Pagefind compiles WebAssembly.
    ["script-src 'self' 'wasm-unsafe-eval'", ...[...hashes].sort()].join(' '),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'self'",
    "worker-src 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'none'",
  ].join('; ');

  const rules = [
    [
      '/*',
      `  Content-Security-Policy: ${policy}`,
      '  Strict-Transport-Security: max-age=31536000',
      '  X-Frame-Options: DENY',
      '  X-Content-Type-Options: nosniff',
      '  Referrer-Policy: strict-origin-when-cross-origin',
    ],
    [
      '/.well-known/security.txt',
      '  Content-Type: text/plain; charset=utf-8',
    ],
  ];
  // https://developers.cloudflare.com/pages/configuration/headers/#attach-a-header
  if (rules.length > 100 || rules.flat().some((line) => line.length > 2000)) {
    throw new Error('Generated _headers exceeds Cloudflare Pages limits (100 rules, 2,000 characters per line).');
  }
  await writeFile(new URL('_headers', dir), rules.map((rule) => rule.join('\n')).join('\n\n') + '\n', { flag: 'wx' });
}

export default {
  name: 'cloudflare-pages-headers',
  hooks: { 'astro:build:done': writePagesHeaders },
};
