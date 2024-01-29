import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { ICategoryList } from '../../interfaces/categories.interfaces'


const listCategoriesService = async (): Promise<ICategoryList> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category)
    const listCategories: ICategoryList = await categoryRepo.find()
    return listCategories
}


export default listCategoriesService