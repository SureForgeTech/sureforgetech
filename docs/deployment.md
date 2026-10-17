# Website deployment

The production website is a static Astro build on the Cloudflare Pages project `sureforgetech`. Its custom domain is `sureforgetech.com`, with `sureforgetech.pages.dev` as the Pages hostname.

## Build and verify

Use Node.js 22 or newer and pnpm 10.12.1:

```sh
pnpm install --frozen-lockfile
pnpm build
node --check src/data/portfolio.js
node --check src/scripts/portfolio.js
git diff --check
```

The build produces the homepage, nine product pages, fourteen documentation pages, support page, and 404 page. Check the homepage filters, product dialogs, navigation, favicon, documentation, and mobile layout before publishing. Product cards are rendered into the HTML and remain readable without JavaScript.

## Publish

The initial release uses Pages Direct Upload. In Cloudflare, open **Workers & Pages → sureforgetech → Create deployment**, select Production, and upload the contents of `dist/` as a folder or ZIP. A ZIP must have `index.html` at its root, rather than inside a `dist/` folder.

For authenticated command-line publishing:

```sh
wrangler pages deploy dist --project-name sureforgetech --branch main
```

Keep Cloudflare credentials in an approved credential manager or CI secret store. Never commit them, include them in the upload, or print them in logs. Existing deployment notes from related sites identify source-IP restrictions on some Cloudflare API tokens: use the permitted deployment host for those tokens. This Pages project does not yet have automatic Git deployment configured; pushing a commit alone does not publish it.

After publishing, confirm the production deployment succeeds, then verify HTTPS, the homepage, one product page, documentation, and the brand assets on the custom domain. DNS and certificate activation may take time when connecting a new domain.

## Rollback

Open the project's **Deployments** tab, select an earlier successful production deployment, and use Cloudflare's rollback action. Keep the previous deployment available until the new release has been verified.

## Public content boundary

Upload only `dist/`. It contains public website content and assets, not product implementation code, credentials, internal repositories, or local design work. Preserve the product maturity and licensing statements, and do not add claims of corporate formation or trademark registration without approved evidence.
