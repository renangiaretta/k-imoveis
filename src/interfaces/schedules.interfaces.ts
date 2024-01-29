import { z } from 'zod';
import { schedulesReturnSchema, schedulesSchema } from '../schemas/schedules.schemas';



type ISchedules       = z.infer<typeof schedulesSchema>
type ISchedulesReturn = z.infer<typeof schedulesReturnSchema>


export {
    ISchedules,
    ISchedulesReturn
}