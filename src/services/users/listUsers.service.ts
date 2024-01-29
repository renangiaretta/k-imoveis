import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { IReturnMultipleUsersWithoutPasswordSchema } from '../../interfaces/users.interfaces'
import { returnMultipleUsersWithoutPasswordSchema } from '../../schemas/users.schemas'


const listUsersService = async (): Promise<IReturnMultipleUsersWithoutPasswordSchema> => {
    const userRepo: Repository<User>                                         = AppDataSource.getRepository(User)
    const userList: Array<User>                                              = await userRepo.find()
    const userListWithoutPassword: IReturnMultipleUsersWithoutPasswordSchema = returnMultipleUsersWithoutPasswordSchema.parse(userList)

    return userListWithoutPassword
}


export default listUsersService