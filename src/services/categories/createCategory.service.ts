import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { categoryReturnSchema } from '../../schemas/categories.schemas'
import {
    ICategory,
    ICategoryReturn
} from '../../interfaces/categories.interfaces'
import { AppError } from '../../errors'


const createCategoryService = async ( categoryData: ICategory ): Promise<ICategoryReturn> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)
    const categoryExists = await categoryRepo.findOneBy({
        name: categoryData.name
    })
    if(categoryExists){
        throw new AppError('Category already exists', 409)
    }
    const category = categoryRepo.create(categoryData)
    await categoryRepo.save(category)
    const newCategory: ICategoryReturn = categoryReturnSchema.parse(category)

    return newCategory
}


export default createCategoryService