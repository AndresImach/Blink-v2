import { describe, expect, it } from 'vitest';
import {
  SEARCH_MERCHANT_PROJECTION,
  assertProviderCatalogAvailable,
  loadMerchants,
} from '../../../scripts/search-indexer.mjs';
import { buildProviderCatalog } from '../../../server/providers.js';

describe('search indexer provider catalog guard', () => {
  it('aborts when the provider catalog is empty', () => {
    expect(() => assertProviderCatalogAvailable(buildProviderCatalog([]))).toThrow(
      'Provider catalog is empty'
    );
  });

  it('allows indexing when the provider catalog has providers', () => {
    const catalog = buildProviderCatalog([
      { key: 'mercadopago', name: 'Mercado Pago', aliases: ['mercado'], shortName: 'MP' },
    ]);

    expect(() => assertProviderCatalogAvailable(catalog)).not.toThrow();
  });
});

describe('search indexer Mongo loading', () => {
  it('loads only search fields and caps locations without embedded benefit previews', async () => {
    let capturedProjection: Record<string, unknown> | undefined;
    const expectedMerchants = [{ merchantId: 'merchant_1', merchantName: 'Merchant One' }];
    const db = {
      collection: () => ({
        find: (_query: unknown, options: { projection?: Record<string, unknown> }) => {
          capturedProjection = options.projection;
          return {
            toArray: async () => expectedMerchants,
          };
        },
      }),
    };

    await expect(loadMerchants(db)).resolves.toEqual(expectedMerchants);
    expect(capturedProjection).toBe(SEARCH_MERCHANT_PROJECTION);
    expect(capturedProjection).toMatchObject({
      _id: 0,
      merchantId: 1,
      merchantName: 1,
      locations: { $slice: 15 },
      'searchProfile.searchText': 1,
    });
    expect(capturedProjection).not.toHaveProperty('searchProfile');
    expect(capturedProjection).not.toHaveProperty('searchProfile.benefits');
  });
});
