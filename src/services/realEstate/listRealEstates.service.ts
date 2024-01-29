import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'


const listRealEstateService = async ( ) => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const realEstateList                         = await realEstateRepo.find({
        relations: {
            address: true
        }
    })

    return realEstateList
}


export default listRealEstateService