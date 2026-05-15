import type { CheerioCrawlingContext } from '@crawlee/cheerio';

import { LABELS } from '../../constants.js';
import { parseCategoryPage } from './category-parser.js';

export async function categoryRouteHandler(context: CheerioCrawlingContext) {
    const { body, request, enqueueLinks, log } = context;

    log.info('Processing category page', { url: request.loadedUrl });

    const data = parseCategoryPage(body.toString());
    if (!data) {
        log.warning('No ItemList JSON-LD found', { url: request.loadedUrl });
        return;
    }

    const productUrls = data.itemList.itemListElement.map((item) => item.url);
    log.info('Found products', { count: productUrls.length, url: request.loadedUrl });

    await enqueueLinks({ urls: productUrls, label: LABELS.PRODUCT });

    if (data.nextPageUrl) {
        await enqueueLinks({ urls: [data.nextPageUrl], label: LABELS.CATEGORY });
        log.info('Enqueued next page', { url: data.nextPageUrl });
    }
}
