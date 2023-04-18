import { Router } from 'express'
import { regiterUser, getUsers, updatePlus, loginUser, updatePremium, logoutUser } from '../controllers/user.controller'
import { validateRegister } from '../middlewares/validateRegister'
import { userValidateSchema } from '../validations/createUserValidation'


const router = Router()



router.post('/', validateRegister(userValidateSchema),regiterUser)

router.post('/auth', loginUser)

router.put('/plus', updatePlus)

router.put('/premium', updatePremium)

router.post('/logout', logoutUser)

router.get('/', getUsers)

export default router