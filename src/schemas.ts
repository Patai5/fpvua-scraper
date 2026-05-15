import { z } from 'zod';

export const BrandSchema = z.object({
    '@type': z.literal('Brand'),
    name: z.string(),
});

export const PropertyValueSchema = z.object({
    '@type': z.literal('PropertyValue'),
    name: z.string(),
    value: z.string(),
});

const MonetaryAmountSchema = z.object({
    '@type': z.literal('MonetaryAmount'),
    value: z.number(),
    currency: z.string(),
});

const QuantitativeValueSchema = z.object({
    '@type': z.literal('QuantitativeValue'),
    minValue: z.number(),
    maxValue: z.number(),
    unitCode: z.string(),
});

const ShippingDeliveryTimeSchema = z.object({
    '@type': z.literal('ShippingDeliveryTime'),
    handlingTime: QuantitativeValueSchema.optional(),
    transitTime: QuantitativeValueSchema.optional(),
});

const OfferShippingDetailsSchema = z.object({
    '@type': z.literal('OfferShippingDetails'),
    shippingRate: MonetaryAmountSchema.optional(),
    shippingDestination: z.object({ '@type': z.literal('DefinedRegion'), addressCountry: z.string() }).optional(),
    deliveryTime: ShippingDeliveryTimeSchema.optional(),
});

const MerchantReturnPolicySchema = z.object({
    '@type': z.string(),
    applicableCountry: z.string().optional(),
    returnPolicyCategory: z.string().optional(),
    merchantReturnDays: z.string().optional(),
    returnMethod: z.string().optional(),
    returnFees: z.string().optional(),
});

export const OfferSchema = z.object({
    '@type': z.literal('Offer'),
    availability: z.string(),
    price: z.string(),
    priceValidUntil: z.string().optional(),
    url: z.string().url(),
    priceCurrency: z.string(),
    shippingDetails: OfferShippingDetailsSchema.optional(),
    hasMerchantReturnPolicy: MerchantReturnPolicySchema.optional(),
    itemCondition: z.string().optional(),
});

export const ProductJsonLdSchema = z.object({
    '@context': z.string(),
    '@type': z.literal('Product'),
    url: z.string().url(),
    category: z.string().optional(),
    image: z.string().url().optional(),
    brand: BrandSchema.optional(),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    mpn: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    name: z.string(),
    offers: OfferSchema,
    additionalProperty: z.array(PropertyValueSchema).optional(),
});

export const ItemListItemSchema = z.object({
    '@type': z.literal('ListItem'),
    position: z.number(),
    url: z.string().url(),
});

export const ItemListSchema = z.object({
    '@context': z.string(),
    '@type': z.literal('ItemList'),
    itemListElement: z.array(ItemListItemSchema),
});

export const ProductOutputSchema = z.object({
    url: z.string().url(),
    name: z.string(),
    category: z.string().nullable(),
    brand: z.string().nullable(),
    manufacturer: z.string().nullable(),
    model: z.string().nullable(),
    sku: z.string().nullable(),
    description: z.string().nullable(),
    price: z.number().nullable(),
    priceCurrency: z.string(),
    availability: z.string(),
    image: z.string().nullable(),
    specifications: z.array(PropertyValueSchema.pick({ name: true, value: true })),
});

export const InputSchema = z.object({
    startUrls: z.array(z.object({ url: z.string().url() })),
});

export type ProductOutput = z.infer<typeof ProductOutputSchema>;
export type ProductJsonLd = z.infer<typeof ProductJsonLdSchema>;
export type ItemList = z.infer<typeof ItemListSchema>;
export type Input = z.infer<typeof InputSchema>;
