import type { APIRoute } from 'astro';

const SITE = 'https://seattletruelight.church';

const pages = [
  { url: '/',               priority: '1.0', changefreq: 'weekly'  },
  { url: '/sermons',        priority: '0.9', changefreq: 'weekly'  },
  { url: '/news',           priority: '0.8', changefreq: 'weekly'  },
  { url: '/gallery',        priority: '0.7', changefreq: 'monthly' },
  { url: '/about',          priority: '0.8', changefreq: 'monthly' },
  { url: '/about/history',  priority: '0.6', changefreq: 'yearly'  },
  { url: '/about/pastor',   priority: '0.6', changefreq: 'yearly'  },
  { url: '/worship',        priority: '0.7', changefreq: 'monthly' },
  { url: '/directions',     priority: '0.7', changefreq: 'yearly'  },
];

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${SITE}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
