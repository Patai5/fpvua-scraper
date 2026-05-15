import { CheerioCrawler } from '@crawlee/cheerio';
import { Actor } from 'apify';

import { LABELS } from './constants.js';
import { getRouter } from './routes/router.js';
import { InputSchema } from './schemas.js';

await Actor.init();

const rawInput = await Actor.getInput();
if (!rawInput) throw await Actor.fail('No input provided');

const { startUrls } = InputSchema.parse(rawInput);

const proxyConfiguration = await Actor.createProxyConfiguration({ checkAccess: true });
const router = getRouter();

const crawler = new CheerioCrawler({ proxyConfiguration, requestHandler: router });

const startRequests = startUrls.map(({ url }) => ({ url, label: LABELS.CATEGORY }));
await crawler.run(startRequests);

await Actor.exit();
