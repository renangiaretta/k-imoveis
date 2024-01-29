import { DeepPartial } from 'typeorm'
import { z } from 'zod'
import { returnMultipleUsersWithoutPasswordSchema, updateUserSchema, userReturnSchema, userReturnWithoutPasswordSchema, userSchema } from '../schemas/users.schemas'


type IUser                                     = z.infer<typeof userSchema>
type IUserReturn                               = z.infer<typeof userReturnSchema>
type IUserReturnWithoutPassword                = z.infer<typeof userReturnWithoutPasswordSchema>
type IReturnMultipleUsersWithoutPasswordSchema = z.infer<typeof returnMultipleUsersWithoutPasswordSchema>
type IUpdateUser                               = DeepPartial<z.infer<typeof updateUserSchema>>




export {
    IUser,
    IUserReturn,
    IUserReturnWithoutPassword,
    IReturnMultipleUsersWithoutPasswordSchema,
    IUpdateUser
}