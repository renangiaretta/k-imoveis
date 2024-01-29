import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule, User } from '../../entities'
import { AppError } from '../../errors'
import { schedulesSchema } from '../../schemas/schedules.schemas'
import { ISchedules } from '../../interfaces/schedules.interfaces'

const transformHour = (hour: string) => {
    const pos0: string            = hour.split('')[0]
    const pos1: string            = hour.split('')[1]
    const pos3: string            = hour.split('')[3]
    const pos4: string            = hour.split('')[4]
    const transformedHour: string = pos0 + pos1 + pos3 + pos4
    return Number(transformedHour)
}

const createSchedulesService = async ( scheduleData: ISchedules, userId: number ) => {
    const schedulesRepo: Repository<Schedule>    = AppDataSource.getRepository(Schedule)
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const userRepo: Repository<User>             = AppDataSource.getRepository(User)
    const reqData                                = schedulesSchema.parse(scheduleData)
    const realEstateId: number                   = reqData.realEstateId
    const newDate: Date                          = new Date(reqData.date)
    const newDate2: string                       = reqData.date
    const hour: string                           = reqData.hour

    if (newDate.getUTCDay() === 0 || newDate.getUTCDay() === 6){
        throw new AppError('Invalid date, work days are monday to friday', 400)
    }

    if(
        transformHour(hour) < transformHour('08:00') || transformHour(hour) > transformHour('18:00')
    ){
        throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
    }
    const user = await userRepo.findOne({
        where: {
            id: userId
        }
    })
    if(!user){
        throw new AppError('User not found', 404)
    }
    const realEstate = await realEstateRepo.findOne({
        where: {
            id: realEstateId
        }
    })

    if(realEstate === null) {
        throw new AppError('RealEstate not found', 404)
    }

    const scheduleAlreadyExists = await realEstateRepo.createQueryBuilder('real_estate')
    .leftJoinAndSelect('real_estate.schedules', 'schedules')
    .where('schedules.date = :date', {
        date: newDate2
    })
    .andWhere('schedules.hour = :hour', {
        hour: hour
    })
    .andWhere('real_estate.id = :idRealEstate', {
        idRealEstate: realEstateId
    })
    .getOne()

    if(scheduleAlreadyExists){
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

    const userAlreadyHaveSchedule = await userRepo.createQueryBuilder('users')
    .leftJoinAndSelect('users.schedules', 'schedules')
    .where('users.id = :idUser', {
        idUser: userId
    })
    .andWhere('schedules.date = :date', {
        date: newDate2
    })
    .andWhere('schedules.hour = :hour', {
        hour: hour
    })
    .getOne()

    if(userAlreadyHaveSchedule) {
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }
    const newSchedule = schedulesRepo.create({
        date      : newDate2,
        hour      : hour,
        user      : user,
        realEstate: realEstate
    })

    await schedulesRepo.save(newSchedule)

    return {
        message: 'Schedule created'
    }
}


export default createSchedulesService