import { ZodError } from 'zod'
import {
    NextFunction,
    Request,
    Response
} from 'express'


class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number = 201){
        super(message)
        this.statusCode = statusCode
    }
}

const handleErrors = ( err: any, req: Request, res: Response, next: NextFunction ) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }
    console.log(err)
    
    if(err instanceof ZodError) {
        return res.status(400).json({
            message: err.flatten().fieldErrors
        })
    }
    if(err instanceof Error) {
        return res.status(500).json({
            message: 'Internal Server Error.'
        })
    }
}


export {
    AppError,
    handleErrors
}