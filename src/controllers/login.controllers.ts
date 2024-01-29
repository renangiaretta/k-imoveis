import { Request, Response } from 'express';
import { ILoginUser } from '../interfaces/login.interfaces';
import { loginService } from '../services/login/login.service';


const loginController = async ( req: Request, res: Response ): Promise<Response> => {
    const loginData: ILoginUser = req.body
    const token                 = await loginService( loginData )
    return res.status(200).json(
        token
    )
}


export { loginController }