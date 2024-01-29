import { Router } from 'express';
import { createRealEstateController, listRealEstatesController } from '../controllers/realEstate.controllers';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware';
import { realEstateSchema } from '../schemas/realEstate.schemas';


const realEstateRoutes: Router = Router()

realEstateRoutes.post('', ensureIsAdminMiddleware, ensureDataIsValidMiddleware(realEstateSchema),  createRealEstateController)
realEstateRoutes.get('', listRealEstatesController)


export default realEstateRoutes