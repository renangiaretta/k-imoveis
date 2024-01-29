import { z } from 'zod';
import {
    categoryListSchema,
    categoryReturnSchema,
    categorySchema
} from '../schemas/categories.schemas';


type ICategory       = z.infer<typeof categorySchema>
type ICategoryReturn = z.infer<typeof categoryReturnSchema>
type ICategoryList   = z.infer<typeof categoryListSchema>

export {
    ICategory,
    ICategoryReturn,
    ICategoryList
}