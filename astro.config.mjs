import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sureforgetech.com',
  integrations: [sitemap(),
    starlight({
      title: 'SureForge Documentation',
      description: 'Documentation for tools from SureForgeTech.',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/SureForgeTech' }],
      sidebar: [
        { label: 'Welcome', link: '/docs/' },
        { label: 'Legal and security', items: [
          { label: 'Privacy (draft)', link: '/docs/privacy-draft/' },
          { label: 'Terms (draft)', link: '/docs/terms-draft/' },
          { label: 'Security (draft)', link: '/docs/security-draft/' }
        ] },
        { label: 'Products', items: [
          { label: 'SureForge Agent', link: '/docs/sureforge/' },
          { label: 'SureForge Studio', link: '/docs/studio/' },
          { label: 'SureForge Policy', link: '/docs/policyforge/' },
          { label: 'SureForge Trellis', link: '/docs/trellisforge/' },
          { label: 'SureForge Capture', link: '/docs/bugnarrator/' },
          { label: 'SureForge Terminal', link: '/docs/terminal-workspace/' },
          { label: 'SureForge FM Data API', link: '/docs/sureforge-fm-data-api/' },
          { label: 'SureForge FM Snippets', link: '/docs/sureforge-fm-snippets/' },
          { label: 'SureForge Flow', link: '/docs/flowforge/' }
        ] }
      ]
    })
  ]
});
