import { z } from 'zod';



const schedulesSchema = z.object({
    date        : z.string(),
    hour        : z.string(),
    realEstateId: z.number()
})

const schedulesReturnSchema = schedulesSchema.extend({
    id    : z.number(),
    userId: z.number()
})


export {
    schedulesSchema,
    schedulesReturnSchema
}