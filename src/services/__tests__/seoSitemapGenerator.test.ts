import { describe, expect, it } from 'vitest';
import {
  buildMerchantRoutes,
  buildSitemapIndex,
  buildUrlset,
} from '../../../scripts/seo-sitemap.js';

describe('SEO sitemap generation', () => {
  it('publishes only merchants with active benefits', () => {
    const routes = buildMerchantRoutes([
      {
        merchantId: 'merchant_active',
        merchantName: 'Comercio Activo',
        activeBenefitCount: 2,
        benefitCount: 4,
      },
      {
        merchantId: 'merchant_expired',
        merchantName: 'Comercio Vencido',
        activeBenefitCount: 0,
        benefitCount: 3,
      },
      {
        merchantId: 'merchant_missing_count',
        merchantName: 'Sin contador activo',
        benefitCount: 1,
      },
    ]);

    expect(routes).toEqual([
      {
        path: '/comercios/comercio-activo--merchant_active',
        changefreq: 'weekly',
        priority: '0.8',
      },
    ]);
  });

  it('does not claim a modification date unless one is explicitly available', () => {
    const xml = buildUrlset([
      { path: '/', changefreq: 'daily', priority: '1.0' },
      {
        path: '/actualizado',
        changefreq: 'weekly',
        priority: '0.8',
        lastmod: '2026-09-01',
      },
    ], 'https://www.blinkapp.com.ar');

    expect(xml.match(/<lastmod>/g)).toHaveLength(1);
    expect(xml).toContain('<lastmod>2026-09-01</lastmod>');
  });

  it('does not mark every child sitemap as modified on each build', () => {
    const xml = buildSitemapIndex(
      ['/sitemap-1.xml', '/sitemap-2.xml'],
      'https://www.blinkapp.com.ar',
    );

    expect(xml).not.toContain('<lastmod>');
    expect(xml).toContain('https://www.blinkapp.com.ar/sitemap-1.xml');
    expect(xml).toContain('https://www.blinkapp.com.ar/sitemap-2.xml');
  });
});
