import { compare } from 'bcryptjs'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import jwt from 'jsonwebtoken'
import { Repository } from 'typeorm'
import { ILoginUser } from '../../interfaces/login.interfaces'


const loginService = async ( loginData: ILoginUser ) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const loggedUser: User | null    = await userRepo.findOneBy({
        email: loginData.email
    })
    if(!loggedUser){
        throw new AppError('Invalid credentials', 401)
    }
    if(loggedUser.deletedAt){
        throw new AppError('A', 405)
    }
    const verifyPassword = await compare(loginData.password, loggedUser.password)
    if(!verifyPassword) {
        throw new AppError('Invalid credentials', 401)
    }
    const token: string = jwt.sign(
        {
            email: loggedUser.email,
            admin: loggedUser.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject  : String(loggedUser.id)
        }
    )
    return {token:token}
}


export { loginService }