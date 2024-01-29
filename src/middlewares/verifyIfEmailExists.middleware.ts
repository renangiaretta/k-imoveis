import {
    NextFunction,
    Request,
    Response
} from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../errors';


const verfyIfEmailExistsMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const verifyEmail                = await userRepo.findOneBy({
        email: req.body.email
    })
    if(verifyEmail) {
        throw new AppError('Email already exists', 409)
    }
}


export default verfyIfEmailExistsMiddleware