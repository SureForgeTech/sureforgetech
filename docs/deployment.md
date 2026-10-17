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

## Automatic publishing

Pushes to `main` run the **Validate and deploy site** GitHub Actions workflow. The build job installs the locked dependencies, builds the static site, records the source commit in `deployment.json`, and saves `dist/` as a short-lived artifact. Only after the build passes does the production job upload that artifact to the existing Cloudflare Pages project. It then verifies the published commit through both the deployment URL and `sureforgetech.com`.

Pull requests and other branches run validation without publishing. Production deploys are serialized to avoid overlapping uploads. The workflow can also be run manually from GitHub Actions on `main`.

The GitHub `production` environment permits deployment only from `main` and holds these secrets:

- `CLOUDFLARE_API_TOKEN`: the dedicated Pages deployment credential.
- `CLOUDFLARE_ACCOUNT_ID`: the account containing the Pages project.

The deployment token needs Pages Edit access for that account. Store replacements directly in the environment's encrypted secrets. Do not put tokens in workflow files, artifacts, logs, or pull requests. Existing tokens for other sites may be source-IP restricted; the dedicated GitHub Actions token must support the hosted runner used by this workflow.

## Manual publishing

For a recovery deployment, open **Workers & Pages → sureforgetech → Create deployment**, select Production, and upload the contents of `dist/` as a folder or ZIP. A ZIP must have `index.html` at its root, rather than inside a `dist/` folder.

For authenticated command-line publishing:

```sh
wrangler pages deploy dist --project-name sureforgetech --branch main
```

After publishing, confirm the production deployment succeeds, then verify HTTPS, the homepage, one product page, documentation, and the brand assets on the custom domain. DNS and certificate activation may take time when connecting a new domain.

## Rollback

Open the project's **Deployments** tab, select an earlier successful production deployment, and use Cloudflare's rollback action. Keep the previous deployment available until the new release has been verified.

## Public content boundary

Upload only `dist/`. It contains public website content and assets, not product implementation code, credentials, internal repositories, or local design work. Preserve the product maturity and licensing statements, and do not add claims of corporate formation or trademark registration without approved evidence.
