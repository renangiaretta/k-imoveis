import { z } from 'zod'


const userSchema = z.object({
    name: z.string().min(2).max(45),
    email: z.string().max(45).email(),
    admin: z.boolean().default(false),
    password: z.string().min(4).max(120)
})

const userReturnSchema = userSchema.extend({
    id       : z.number(),
    createdAt: z.date().or(z.string()),
    updatedAt: z.date().or(z.string()),
    deletedAt: z.date().or(z.string()).nullable(),
})

const userReturnWithoutPasswordSchema = userReturnSchema.omit({
    password: true
})

const returnMultipleUsersWithoutPasswordSchema = userReturnWithoutPasswordSchema.array()

const updateUserSchema = userSchema.omit({
    admin: true
}).partial()

const updateUserSchemaWithoutEmail = updateUserSchema.omit({
    email: true
})

export {
    userSchema,
    userReturnSchema,
    userReturnWithoutPasswordSchema,
    returnMultipleUsersWithoutPasswordSchema,
    updateUserSchema,
    updateUserSchemaWithoutEmail
}