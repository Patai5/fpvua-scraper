import { createCheerioRouter } from '@crawlee/cheerio';

import { LABELS } from '../constants.js';
import { categoryRouteHandler } from './category/category-route.js';
import { productDetailHandler } from './detail-route.ts/detail-route.js';

export function getRouter() {
    const router = createCheerioRouter();

    router.addHandler(LABELS.CATEGORY, categoryRouteHandler);
    router.addHandler(LABELS.PRODUCT, productDetailHandler);

    return router;
}
