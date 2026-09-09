import { slugify } from '../api/search/normalize.js';

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getMerchantSeoPath(merchant) {
  const merchantId = String(merchant?.merchantId || '').trim();
  const merchantSlug = slugify(merchant?.merchantName || '') || 'comercio';
  return `/comercios/${merchantSlug}--${encodeURIComponent(merchantId)}`;
}

export function buildMerchantRoutes(merchants) {
  return (merchants || [])
    .filter((merchant) => (
      String(merchant?.merchantId || '').trim() &&
      Number(merchant?.activeBenefitCount || 0) > 0
    ))
    .map((merchant) => ({
      path: getMerchantSeoPath(merchant),
      changefreq: 'weekly',
      priority: '0.8',
    }));
}

export function buildUrlset(routeChunk, siteUrl) {
  const xmlUrls = (routeChunk || [])
    .map((route) => {
      const lastmod = String(route?.lastmod || '').trim();
      return [
        '  <url>',
        `    <loc>${escapeXml(`${siteUrl}${route.path}`)}</loc>`,
        ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
        `    <changefreq>${escapeXml(route.changefreq)}</changefreq>`,
        `    <priority>${escapeXml(route.priority)}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>
`;
}

export function buildSitemapIndex(sitemapPaths, siteUrl) {
  const sitemapEntries = (sitemapPaths || [])
    .map((sitemapPath) => [
      '  <sitemap>',
      `    <loc>${escapeXml(`${siteUrl}${sitemapPath}`)}</loc>`,
      '  </sitemap>',
    ].join('\n'))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>
`;
}
