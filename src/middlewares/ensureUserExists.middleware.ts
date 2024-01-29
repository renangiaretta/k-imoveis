import { Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors';


const ensureUserExistsMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user                       = await userRepo.findOneBy({
        id: parseInt(req.params.id)
    })
    if(!user) {
        throw new AppError('User not found', 404)
    }
    if(user.deletedAt !== null){
        throw new AppError('deletedens', 404)
    }
    return next()
}


export default ensureUserExistsMiddleware