import { Router } from 'express';
import { createCategoryController, listCategoriesController, listRealEstatesFromCategoryController } from '../controllers/categories.controllers';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware';
import { categorySchema } from '../schemas/categories.schemas';



const categoryRoutes: Router = Router()

categoryRoutes.post('', ensureDataIsValidMiddleware(categorySchema), ensureIsAdminMiddleware, createCategoryController)
categoryRoutes.get('', listCategoriesController)
categoryRoutes.get('/:id/realEstate', listRealEstatesFromCategoryController)


export default categoryRoutes