import { Request, Response, NextFunction} from 'express'

export const validateExistsEmail = (req:Request, res: Response, next: NextFunction)=>{

    try {
        

        next()
    } catch (error) {
        next(error)
    }
}