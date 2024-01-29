import { Router } from 'express';
import {
    createUserController,
    deleteUserController,
    listUsersController,
    updateUserController
} from '../controllers/users.controllers';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureTokenIsValidMiddleware from '../middlewares/ensureTokenIsValid.middleware';
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin.middleware';
import { updateUserSchema, userSchema } from '../schemas/users.schemas';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware';


const userRoutes: Router = Router()

userRoutes.post('', ensureDataIsValidMiddleware(userSchema), createUserController)
userRoutes.get('', ensureIsAdminMiddleware, listUsersController)
userRoutes.patch('/:id', ensureDataIsValidMiddleware(updateUserSchema), ensureTokenIsValidMiddleware, updateUserController)
userRoutes.delete('/:id', ensureUserExistsMiddleware, ensureIsAdminMiddleware, deleteUserController)





export default userRoutes