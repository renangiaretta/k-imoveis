import  jwt  from 'jsonwebtoken';
import { AppError } from '../errors';
import 'dotenv/config'
import {
    NextFunction,
    Request,
    Response
} from 'express';


const ensureIsAdminMiddleware = ( req: Request, res: Response, next: NextFunction ): Response | void => {
    let token = req.headers.authorization
    if(!token) {
        throw new AppError('Missing bearer token', 401)
    }
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error) {
            throw new AppError(error.message, 401)
        }
        if(decoded.admin !== true){
            throw new AppError('Insufficient permission', 403)
        }
        req.user = {
            id   : Number(decoded.sub),
            email: decoded.email,
            admin: decoded.admin
        }
        return next()
    })
}


export default ensureIsAdminMiddleware