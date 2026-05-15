import { describe, expect, it } from 'vitest';

import { parseProductPage } from '../../../../src/routes/detail-route.ts/detail-parser.js';
import { loadSnapshot } from '../../utils.js';

describe('parseProductPage', () => {
    const html = loadSnapshot('product-page.html');

    it('parses a product page into ProductOutput', () => {
        // Act
        const result = parseProductPage(html);

        // Assert
        expect(result).not.toBeNull();
    });

    it('has required fields', () => {
        // Act
        const result = parseProductPage(html)!;

        // Assert
        expect(result.name).toBe('Case Axisflying for DJI O4 Air Unit');
        expect(result.url).toBe('https://fpvua.com/en/nabir-keisiv-axisflying-dlia-dji-o4-air-unit/');
        expect(result.priceCurrency).toBe('UAH');
        expect(typeof result.price).toBe('number');
        expect(result.price).toBeGreaterThan(0);
    });

    it('maps availability from schema.org URL to short string', () => {
        // Act
        const result = parseProductPage(html)!;

        // Assert
        expect(result.availability).toBe('InStock');
    });

    it('extracts specifications as name/value pairs', () => {
        // Act
        const result = parseProductPage(html)!;

        // Assert
        expect(result.specifications.length).toBeGreaterThan(0);
        for (const spec of result.specifications) {
            expect(typeof spec.name).toBe('string');
            expect(typeof spec.value).toBe('string');
        }
    });
});
