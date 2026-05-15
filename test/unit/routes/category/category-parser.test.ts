import { describe, expect, it } from 'vitest';

import { parseCategoryPage } from '../../../../src/routes/category/category-parser.js';
import { loadSnapshot } from '../../utils.js';

describe('parseCategoryPage', () => {
    describe('page 1 (has next page)', () => {
        const html = loadSnapshot('category-page.html');

        it('extracts product URLs from ItemList JSON-LD', () => {
            // Act
            const result = parseCategoryPage(html);

            // Assert
            expect(result).not.toBeNull();
            expect(result!.itemList.itemListElement.length).toBeGreaterThan(0);
        });

        it('product URLs are absolute HTTPS URLs', () => {
            // Act
            const result = parseCategoryPage(html)!;

            // Assert
            for (const item of result.itemList.itemListElement) {
                expect(item.url).toMatch(/^https:\/\/fpvua\.com\//);
            }
        });

        it('extracts next page URL', () => {
            // Act
            const result = parseCategoryPage(html)!;

            // Assert
            expect(result.nextPageUrl).toBe('https://fpvua.com/en/komplektuiuchi/?page=2');
        });
    });

    describe('last page (no next page)', () => {
        const html = loadSnapshot('category-page-last.html');

        it('returns null for nextPageUrl', () => {
            // Act
            const result = parseCategoryPage(html)!;

            // Assert
            expect(result.nextPageUrl).toBeNull();
        });
    });
});
