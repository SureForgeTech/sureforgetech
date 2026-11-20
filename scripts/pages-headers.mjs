import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'parse5';

function sha256Source(text) {
  return `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
}

function parsedText(node) {
  return node.childNodes.filter(({ nodeName }) => nodeName === '#text')
    .map(({ value }) => value).join('');
}

function collectInlineHashes(node, hashes) {
  // Hash the parsed strings, preserving whitespace after HTML newline normalization
  // and attribute character reference decoding.
  if (node.tagName === 'script') {
    const attributes = new Map(node.attrs.map(({ name, value }) => [name, value]));
    const type = attributes.get('type')?.trim().toLowerCase();
    if (!attributes.has('src') && type !== 'application/ld+json' && type !== 'application/json') {
      const script = parsedText(node);
      if (script) {
        hashes.scripts.add(sha256Source(script));
      }
    }
  } else if (node.tagName === 'style') {
    hashes.styleElements.add(sha256Source(parsedText(node)));
  }

  const style = node.attrs?.find(({ name, namespace }) => name === 'style' && !namespace)?.value;
  if (style) {
    hashes.styleAttributes.add(sha256Source(style));
  }

  for (const child of node.childNodes ?? []) {
    collectInlineHashes(child, hashes);
  }
}

async function writePagesHeaders({ dir }) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  const pages = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.html'));
  // Pages serves the root 404.html for unmatched paths.
  await readFile(new URL('404.html', dir));

  const hashes = { scripts: new Set(), styleElements: new Set(), styleAttributes: new Set() };
  for (const page of pages) {
    const html = await readFile(join(page.parentPath, page.name), 'utf8');
    collectInlineHashes(parse(html), hashes);
  }

  const policy = [
    "default-src 'none'",
    // Same-origin scripts include Cloudflare's email decoder. Pagefind compiles WebAssembly.
    ["script-src 'self' 'wasm-unsafe-eval'", ...[...hashes.scripts].sort()].join(' '),
    ["style-src 'self'", ...[...hashes.styleElements].sort()].join(' '),
    "img-src 'self' data:",
    "connect-src 'self'",
    "worker-src 'self'",
    "frame-src 'self'",
    "base-uri 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'none'",
  ].join('; ');

  const securityHeaders = {
    'Strict-Transport-Security': 'max-age=31536000',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
  const rules = [
    [
      '/*',
      `  Content-Security-Policy: ${policy}`,
      ...Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`),
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

  const worker = await readFile(new URL('pages-worker.js', import.meta.url), 'utf8');
  // The full attribute allowlist exceeds the Pages _headers line limit.
  const styleAttributes = hashes.styleAttributes.size
    ? ["'unsafe-hashes'", ...[...hashes.styleAttributes].sort()].join(' ')
    : "'none'";
  const workerPolicy = `${policy}; style-src-attr ${styleAttributes}`;
  const config = `const { policy, securityHeaders } = ${JSON.stringify({ policy: workerPolicy, securityHeaders })};`;
  await writeFile(new URL('_worker.js', dir), `${config}\n\n${worker}`, { flag: 'wx' });
}

export default {
  name: 'cloudflare-pages-headers',
  hooks: { 'astro:build:done': writePagesHeaders },
};
