import { extractJsonLdOfType } from '../../parsers.js';
import { ProductJsonLdSchema, type ProductOutput, ProductOutputSchema } from '../../schemas.js';

export function parseProductPage(html: string): ProductOutput | null {
    const product = extractJsonLdOfType(html, 'Product', ProductJsonLdSchema);
    if (!product) return null;

    const output: ProductOutput = {
        url: product.url,
        name: product.name,
        category: product.category ?? null,
        brand: product.brand?.name ?? null,
        manufacturer: product.manufacturer ?? null,
        model: product.model ?? null,
        sku: product.sku ?? null,
        description: product.description ?? null,
        price: parseFloat(product.offers.price) || null,
        priceCurrency: product.offers.priceCurrency,
        availability: mapAvailability(product.offers.availability),
        image: product.image ?? null,
        specifications: (product.additionalProperty ?? []).map(({ name, value }) => ({ name, value })),
    };

    return ProductOutputSchema.parse(output);
}

function mapAvailability(schemaUrl: string): string {
    const map: Record<string, string> = {
        'https://schema.org/InStock': 'InStock',
        'https://schema.org/OutOfStock': 'OutOfStock',
        'https://schema.org/PreOrder': 'PreOrder',
        'https://schema.org/Discontinued': 'Discontinued',
    };
    return map[schemaUrl] ?? schemaUrl;
}
