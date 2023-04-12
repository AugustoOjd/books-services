import { Router } from 'express'
import { regiterUser, getUsers, updatePlus, loginUser } from '../controllers/user.controller'
import { validateRegister } from '../middlewares/validateRegister'
import { userValidateSchema } from '../validations/createUserValidation'


const router = Router()



router.post('/', validateRegister(userValidateSchema),regiterUser)

router.post('/auth', loginUser)

router.put('/plus', updatePlus)

router.get('/', getUsers)

export default router