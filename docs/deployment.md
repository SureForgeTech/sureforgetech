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

The build hashes inline Astro and Starlight scripts from the final HTML and writes the baseline policy to `dist/_headers` and the [Pages advanced-mode Worker](https://developers.cloudflare.com/pages/functions/advanced-mode/) in `dist/_worker.js`. The Worker serves through the Pages asset binding and adds a fresh CSP nonce and `Cache-Control: private, no-store` to HTML. Cloudflare reads the nonce from the CSP header and adds it to the injected bootstrap. `frame-src 'self'` permits the site's same-origin challenge frame, while `frame-ancestors 'none'` and `X-Frame-Options: DENY` prevent embedding site pages. See [Cloudflare JavaScript Detections](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/).

GitHub’s production artifact upload skips dot-directories. Cloudflare Pages serves `public/security.txt` at `/.well-known/security.txt` through an internal HTTP 200 rewrite. Before its `Expires` date, confirm the private reporting link still works, set a new UTC expiration less than one year ahead, and publish the updated file.

### Verify JavaScript Detections in production

1. In a fresh browser session, open DevTools and navigate to `https://sureforgetech.com/`. In Network, inspect the document response. Match the `'nonce-…'` value in `script-src` to the `nonce` on Cloudflare's injected inline bootstrap in the response body. Reload and confirm the nonce changes and each response has `Cache-Control: private, no-store`.
2. Filter Network for `/cdn-cgi/challenge-platform/` and confirm the script initiated by the challenge frame loads successfully. Check the Console for CSP errors involving the bootstrap, frame, or challenge script.
3. Request a missing path and confirm HTTP 404 with the HTML CSP and framing headers. Check that `/.well-known/security.txt` returns HTTP 200 with `Content-Type: text/plain; charset=utf-8`, and that `/deployment.json` reports the deployed commit. Run a documentation search to verify Pagefind under the enforced policy.

## Automatic publishing

Pushes to `main` run the **Validate and deploy site** GitHub Actions workflow. The build job installs the locked dependencies, builds the static site, records the source commit in `deployment.json`, and saves `dist/` as a short-lived artifact. Only after the build passes does the production job upload that artifact to the existing Cloudflare Pages project. Verification checks the published artifact and Cloudflare Pages metadata.

- The runner validates the exact immutable HTTPS deployment URL from Wrangler, authenticates the `/deployment.json` request with a Cloudflare Access service token, and checks that the manifest reports the expected GitHub commit. The request does not follow redirects.
- The authenticated Cloudflare Pages API confirms that the project's canonical production deployment matches the commit and URL from the workflow, that its deploy stage succeeded, and that `sureforgetech.com` is active in the project.

After a release, independently smoke-test `https://sureforgetech.com/` in a browser using the production checks above. This confirms that the custom domain serves the expected revision and that the site works under the live Cloudflare policies.

Pull requests and other branches run validation without publishing. Production deploys are serialized to avoid overlapping uploads. The workflow can also be run manually from GitHub Actions on `main`.

The GitHub `production` environment permits deployment only from `main` and holds these secrets:

- `CLOUDFLARE_API_TOKEN`: the dedicated Pages deployment credential.
- `CLOUDFLARE_ACCOUNT_ID`: the account containing the Pages project.
- `PAGES_ACCESS_CLIENT_ID` holds the Access service token's client ID.
- `PAGES_ACCESS_CLIENT_SECRET` holds the Access service token's client secret.

The deployment token needs Pages Edit access for that account. Store replacements directly in the environment's encrypted secrets. Do not put tokens in workflow files, artifacts, logs, or pull requests. Existing tokens for other sites may be source-IP restricted; the dedicated GitHub Actions token must support the hosted runner used by this workflow.

The Cloudflare Pages preview restriction also protects the immutable production deployment URL. Configure a Cloudflare Access Service Auth policy for the service token scoped to `*.sureforgetech.pages.dev/deployment.json`. Set the service token to expire after one year, then rotate it and update both GitHub `production` Access secrets before it expires. See [Cloudflare service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) and [Access application paths](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/).

The verifier requires both values before making any requests and sends them only to `/deployment.json` on the validated Wrangler hostname. The Pages API checks use the separate Cloudflare API token.

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
