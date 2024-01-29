import { z } from 'zod'
import { loginSchema } from '../schemas/login.schemas';


type ILoginUser = z.infer<typeof loginSchema>


export { ILoginUser }