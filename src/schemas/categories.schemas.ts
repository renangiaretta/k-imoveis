import { z } from 'zod';


const categorySchema = z.object({
    name: z.string().max(45)
})

const categoryReturnSchema = categorySchema.extend({
    id: z.number()
})

const categoryListSchema = categoryReturnSchema.array()

export {
    categorySchema,
    categoryReturnSchema,
    categoryListSchema
}