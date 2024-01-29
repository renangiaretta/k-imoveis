import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';


const deleteUserService = async ( userId: number ): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const userToDelete = await userRepo.findOneBy({
        id: Number(userId)
    })
    await userRepo.softRemove(userToDelete!)
}


export default deleteUserService