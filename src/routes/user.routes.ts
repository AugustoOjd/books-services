import {Router} from 'express'
import { regiterUser } from '../controllers/userController'
import { validateRegister } from '../middlewares/validateRegister'
import { userSchema } from '../validations/createUserValidation'


const router = Router()



router.post('', validateRegister(userSchema),regiterUser)


export default router