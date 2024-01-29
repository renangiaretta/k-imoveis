import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { AppError } from '../../errors'


const listSchedulesByRealEstateIdService = async ( realEstateId: number ) => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const listSchedules = await realEstateRepo.createQueryBuilder('real_estate')
    .innerJoinAndSelect('real_estate.address', 'address')
    .innerJoinAndSelect('real_estate.category', 'category')
    .leftJoinAndSelect('real_estate.schedules', 'schedules')
    .leftJoinAndSelect('schedules.user', 'user')
    .where('real_estate.id = :userId', {userId: realEstateId})
    .getOne()

    if(!listSchedules){
        throw new AppError('RealEstate not found', 404)
    }

    return listSchedules
}


export default listSchedulesByRealEstateIdService