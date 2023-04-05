import { Router } from 'express'
import { regiterUser, getUsers } from '../controllers/user.controller'
import { validateRegister } from '../middlewares/validateRegister'
import { userValidateSchema } from '../validations/createUserValidation'


const router = Router()



router.post('/', validateRegister(userValidateSchema),regiterUser)

router.get('/', getUsers)

export default router