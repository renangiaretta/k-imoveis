import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { AppError } from '../../errors'



const listRealEstatesFromCategoryService = async ( categoryId: number ) => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)
    const listRealEstatesFromCategory = await categoryRepo.find({
        where: {
            id: categoryId
        },
        relations: {
            realEstate: true
        }
    })
    const categoryExists = await categoryRepo.findOneBy({
        id: categoryId
    })

    if(categoryExists === null) {
        throw new AppError('Category not found', 404)
    }
    const list = listRealEstatesFromCategory[0]
    return list
}

export default listRealEstatesFromCategoryService