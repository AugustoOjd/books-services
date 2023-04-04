import { Router } from 'express'
import { regiterUser } from '../controllers/user.controller'
import { validateRegister } from '../middlewares/validateRegister'
import { userValidateSchema } from '../validations/createUserValidation'


const router = Router()



router.post('', validateRegister(userValidateSchema),regiterUser)


export default router