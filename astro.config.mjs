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
          { label: 'SureForge', link: '/docs/sureforge/' },
          { label: 'SureForge Studio', link: '/docs/studio/' },
          { label: 'PolicyForge', link: '/docs/policyforge/' },
          { label: 'TrellisForge', link: '/docs/trellisforge/' },
          { label: 'BugNarrator', link: '/docs/bugnarrator/' },
          { label: 'Terminal Workspace', link: '/docs/terminal-workspace/' },
          { label: 'SureForge FM', link: '/docs/sureforge-fm/' },
          { label: 'FlowForge', link: '/docs/flowforge/' }
        ] }
      ]
    })
  ]
});
