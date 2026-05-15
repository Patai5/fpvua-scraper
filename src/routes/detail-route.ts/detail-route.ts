import type { CheerioCrawlingContext } from '@crawlee/cheerio';
import { Actor } from 'apify';

import { parseProductPage } from './detail-parser.js';

export async function productDetailHandler(context: CheerioCrawlingContext) {
    const { body, request, log } = context;

    log.info('Processing product page', { url: request.loadedUrl });

    const product = parseProductPage(body.toString());
    if (!product) throw new Error('No Product JSON-LD found');

    await Actor.pushData(product);
    log.info('Saved product', { product: product.name });
}
