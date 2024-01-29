import { Request, Response } from 'express';
import { ICategory, ICategoryList, ICategoryReturn } from '../interfaces/categories.interfaces';
import createCategoryService from '../services/categories/createCategory.service';
import listCategoriesService from '../services/categories/listCategories.service';
import listRealEstatesFromCategoryService from '../services/categories/listRealEstatesFromCategory.service';


const createCategoryController = async ( req: Request, res: Response ): Promise<Response> => {
    const categoryData: ICategory = req.body
    const newCategory: ICategoryReturn = await createCategoryService( categoryData )
    return res.status(201).json(newCategory)
}

const listCategoriesController = async ( req: Request, res: Response ): Promise<Response> => {
    const categoryList: ICategoryList = await listCategoriesService()
    return res.status(200).json(categoryList)
}

const listRealEstatesFromCategoryController = async ( req: Request, res: Response ): Promise<Response> => {
    const list = await listRealEstatesFromCategoryService( Number(req.params.id) )
    return res.status(200).json(list)
}

export {
    createCategoryController,
    listCategoriesController,
    listRealEstatesFromCategoryController
}