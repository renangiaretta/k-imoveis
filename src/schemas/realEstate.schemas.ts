import { z } from 'zod';
import { addressSchema } from './address.schemas';


const realEstateSchema = z.object({
    value: z.string().or(z.number())
    .default(0).transform((val) => {
        if (typeof val === 'string') {
            return val
        }
        return val.toFixed(2)
    }),
    size: z.number().positive(),
    address: addressSchema,
    categoryId: z.number(),
    sold: z.boolean().default(false)
})

const realEstateReturnSchema = realEstateSchema.extend({
    id: z.number(),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
})

const realEstateListSchema = realEstateReturnSchema.array()


export {
    realEstateSchema,
    realEstateReturnSchema,
    realEstateListSchema
}