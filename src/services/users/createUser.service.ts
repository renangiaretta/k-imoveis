import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors';
import { IUser, IUserReturnWithoutPassword } from '../../interfaces/users.interfaces'
import { userReturnWithoutPasswordSchema } from '../../schemas/users.schemas';


const createUserService = async ( userData: IUser ): Promise<IUserReturnWithoutPassword> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const verifyEmail                = await userRepo.findOneBy({
        email: userData.email
    })
    if(verifyEmail) {
        throw new AppError('Email already exists', 409)
    }
    const user = userRepo.create(userData)
    await userRepo.save(user)
    const newUser: IUserReturnWithoutPassword = userReturnWithoutPasswordSchema.parse(user)

    return newUser
}


export default createUserService