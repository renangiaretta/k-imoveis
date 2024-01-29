import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { IUserReturnWithoutPassword } from '../../interfaces/users.interfaces'
import {
    updateUserSchemaWithoutEmail,
    userReturnWithoutPasswordSchema
} from '../../schemas/users.schemas'


const updateUserService = async ( userId: number, userData:any, userEmail: string, userAdmin: boolean ): Promise<IUserReturnWithoutPassword> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const userToUpdate: User | null  = await userRepo.findOneBy({
        id: userId
    })
    if(userToUpdate === null) {
        throw new AppError('User not found', 404)
    }
    if(userToUpdate!.email === userEmail){
        updateUserSchemaWithoutEmail.parse(userToUpdate)
    }
    if(userAdmin === false && userToUpdate!.admin === true ){
        throw new AppError('Insufficient permission', 403)
    }
    const updateUser = userRepo.create({
        ...userToUpdate,
        ...userData
    })
    await userRepo.save(updateUser)
    const returnUpdatedUser: IUserReturnWithoutPassword = userReturnWithoutPasswordSchema.parse(updateUser)

    return returnUpdatedUser
}


export default updateUserService