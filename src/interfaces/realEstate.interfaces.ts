import { z } from "zod";
import { realEstateListSchema, realEstateReturnSchema, realEstateSchema } from "../schemas/realEstate.schemas";



type IRealEstate       = z.infer<typeof realEstateSchema>
type IRealEstateList   = z.infer<typeof realEstateListSchema>
type IRealEstateReturn = z.infer<typeof realEstateReturnSchema>


export {
    IRealEstateList,
    IRealEstate,
    IRealEstateReturn
}