import { ErrorRequestHandler, request, response ,NextFunction } from "express"

// const validateRegiste2 = (error: ErrorRequestHandler, req =request, res= response, next: NextFunction) =>{

// }

export const validateRegister = (schema: any) => async (req =request, res= response, next: NextFunction) => {
    
    const body = req.body
    
    try {
      await schema.validate(body);
      return next();
    } catch (error) {
      return res.status(400).json({error})
    }
  }