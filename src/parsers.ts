import * as cheerio from 'cheerio';
import type { z } from 'zod';

const SELECTORS = {
    JSON_LD: 'script[type="application/ld+json"]',
} as const;

export function extractJsonLdOfType<T>(html: string, type: string, schema: z.ZodSchema<T>): T | null {
    const $ = cheerio.load(html);
    let result: T | null = null;

    $(SELECTORS.JSON_LD).each((_, el) => {
        if (result !== null) return;
        try {
            const raw = $(el).html();
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data['@type'] === type) {
                result = schema.parse(data);
            }
        } catch {
            // ignore malformed or non-matching JSON-LD blocks
        }
    });

    return result;
}
