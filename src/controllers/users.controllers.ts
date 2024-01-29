import { Request, Response } from 'express';
import { IUpdateUser, IUserReturnWithoutPassword } from '../interfaces/users.interfaces';
import createUserService from '../services/users/createUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import listUsersService from '../services/users/listUsers.service';
import updateUserService from '../services/users/updateUser.service';


const createUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userData                            = req.body
    const newUser: IUserReturnWithoutPassword = await createUserService( userData )
    return res.status(201).json(newUser)
}

const listUsersController = async ( req: Request, res: Response ): Promise<Response> => {
    const userList = await listUsersService()
    return res.status(200).json(userList)
}

const updateUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number        = parseInt(req.params.id)
    const userData: IUpdateUser = req.body
    const userEmail: string     = req.body.email
    const userAdmin: boolean    = req.user.admin
    const updatedUser = await updateUserService( userId, userData, userEmail, userAdmin )
    return res.status(200).json(updatedUser)
}

const deleteUserController = async ( req: Request, res: Response ): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    await deleteUserService( userId )
    return res.status(204).json()
}


export {
    createUserController,
    listUsersController,
    updateUserController,
    deleteUserController
}