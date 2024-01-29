import { Router } from 'express';
import { createScheduleController, listSchedulesByRealEstateIdController } from '../controllers/schedules.controllers';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import { schedulesSchema } from '../schemas/schedules.schemas';


const schedulesRoutes: Router = Router()

schedulesRoutes.post('', ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(schedulesSchema), createScheduleController)
schedulesRoutes.get('/realEstate/:id', ensureIsAdminMiddleware, listSchedulesByRealEstateIdController)


export default schedulesRoutes