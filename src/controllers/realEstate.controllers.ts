import { Request, Response } from 'express';
import { IRealEstate } from '../interfaces/realEstate.interfaces';
import createRealEstateService from '../services/realEstate/createRealEstate.service';
import listRealEstateService from '../services/realEstate/listRealEstates.service';


const createRealEstateController = async ( req: Request, res: Response ): Promise<Response> => {
    const addressData: IRealEstate    = req.body.address
    const category                    = Number(req.body.categoryId)
    let   realEstateData: IRealEstate = req.body
    const newRealEstate               = await createRealEstateService( realEstateData, addressData, category )
    return res.status(201).json(newRealEstate)
}

const listRealEstatesController = async ( req: Request, res: Response ): Promise<Response> => {
    const realEstateList = await listRealEstateService()
    return res.status(200).json(realEstateList)
}

export {
    createRealEstateController,
    listRealEstatesController
}