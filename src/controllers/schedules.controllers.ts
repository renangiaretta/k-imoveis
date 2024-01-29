import { Request, Response } from 'express'
import createSchedulesService from '../services/schedules/createSchedules.service'
import listSchedulesByRealEstateIdService from '../services/schedules/listSchedules.service'



const createScheduleController = async ( req: Request, res: Response ): Promise<Response> => {
    const scheduleData = req.body
    const userId: number = Number(req.user.id)
    const newSchedule = await createSchedulesService( scheduleData, userId )
    return res.status(201).json(newSchedule)
}

const listSchedulesByRealEstateIdController = async ( req: Request, res: Response ): Promise<Response> => {
    const realEstateId = Number(req.params.id)
    const list = await listSchedulesByRealEstateIdService( realEstateId )
    return res.status(200).json(list)
}


export {
    createScheduleController,
    listSchedulesByRealEstateIdController
}