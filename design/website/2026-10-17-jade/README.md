# SureForgeTech — jade website mockup

Local design preview using the selected dark jade/steel branding, transparent logo, and original approved product-icon strip. This does not replace or deploy the production Astro site.

## Preview

Serve this directory with a static HTTP server and open `index.html`. There are no build dependencies.

The hero explains the product family through three purposes: build with AI (Agent and Studio), test and secure (Capture and Policy), and connect and run (Terminal and Flow). Each original app icon opens its product details. These are use-case groupings, not claims of integration between products.

The homepage includes nine distinct product panels, category filters, an accessible product-details dialog, responsive navigation, and a simplified bookmark favicon. Product descriptions and maturity are grounded in the existing product data and user-provided brief. Outbound documentation and product links use the existing corporate routes.

## Assets

- [Transparent logo](assets/logo-transparent.png) — RGBA PNG with actual transparency.
- [Selected brand board](assets/brand-board.png) — revised proportions with the product family.
- [Patinated branding artwork](assets/hero-art.png) — retained as a brand asset; the homepage hero now explains the products.
- [Original approved app-icon strip](assets/product-icons.png) — saved unchanged; CSS displays each icon separately.
- [SVG favicon](assets/favicon.svg), [ICO favicon](assets/favicon.ico), and PNG exports at 16, 32, 48, 180, and 256 pixels.

The favicon is a native vector S on a jade tile, simplified for bookmark size. The larger branding images were created with built-in image generation; their exact prompts are saved in the branding refinements folder.

The source of truth for this mockup is this repository directory. The desktop browser preview is a copy for local review. No production deployment, repository transfer, or external publication is part of this change.

## Verification

- JavaScript syntax check passed.
- All local HTML assets resolve; local preview responds successfully.
- All four filters show the expected product counts: 9, 3, 2, and 4.
- Product detail dialog opens from the hero icons and product panels with the correct availability information and closes correctly.
- Desktop and 390 px mobile layouts inspected; mobile navigation opens and closes.
- Original app-icon strip is preserved byte-for-byte.
- Transparent logo has a real alpha channel. SVG and multi-size ICO favicon files are present.

[Mobile preview](preview-mobile.html) renders the same site inside a 390 px viewport.
