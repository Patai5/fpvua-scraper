import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');

export function loadSnapshot(name: string): string {
    return readFileSync(join(fixturesDir, name), 'utf-8');
}
