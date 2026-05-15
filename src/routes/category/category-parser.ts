import { load } from 'cheerio';

import { extractJsonLdOfType } from '../../parsers.js';
import { type ItemList, ItemListSchema } from '../../schemas.js';

const SELECTORS = {
    NEXT_LINK: '.pagination li.next a',
    ACTIVE_PAGE: '.pagination li.active a',
} as const;

export type CategoryPageData = {
    itemList: ItemList;
    nextPageUrl: string | null;
};

export function parseCategoryPage(html: string): CategoryPageData | null {
    const itemList = extractJsonLdOfType(html, 'ItemList', ItemListSchema);
    if (!itemList) return null;

    const nextPageUrl = extractNextPageUrl(html);
    return { itemList, nextPageUrl };
}

function extractNextPageUrl(html: string): string | null {
    const $ = load(html);

    const nextLink = $(SELECTORS.NEXT_LINK).first().attr('href');
    return nextLink ?? null;
}
