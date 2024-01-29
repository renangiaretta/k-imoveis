import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Address, Category, RealEstate } from '../../entities'
import { AppError } from '../../errors'
import { addressSchema } from '../../schemas/address.schemas'



const createRealEstateService = async ( realEstateData: any, addressData:any, category: number ) => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressRepo: Repository<Address>       = AppDataSource.getRepository(Address)
    const categoryRepo: Repository<Category>     = AppDataSource.getRepository(Category)
    const addressExists                          = await addressRepo.findOneBy({
        street: addressData.street
    })
    if(addressExists){
            throw new AppError('Address already exists', 409)
        }
    const validatedAddressData = addressSchema.parse(addressData)
    const createAddress        = addressRepo.create(validatedAddressData)
    await addressRepo.save(createAddress)
          realEstateData.address = createAddress
    const category22             = await categoryRepo.findOneBy({
        id: category
    })
          realEstateData.category = category22
    const createRealEstate        = realEstateRepo.create(realEstateData)
    await realEstateRepo.save(createRealEstate)
    const returnRealEstate = await realEstateRepo.find({
        where: {
            value  : realEstateData.value,
            size   : realEstateData.size,
            sold   : realEstateData.sold,
            address: addressData
        },
        relations: {
            category: true,
            address : true
        }
    })
    const returnRealEstateWithoutNumber = await realEstateRepo.find({
        where: {
            value  : realEstateData.value,
            size   : realEstateData.size,
            sold   : realEstateData.sold,
            address: addressData
        },
        relations: {
            category: true
        }
    })
    if(!addressData.number){
        return returnRealEstateWithoutNumber[0]
    }

    return returnRealEstate[0]
}


export default createRealEstateService