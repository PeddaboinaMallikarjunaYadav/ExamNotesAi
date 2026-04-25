import  express  from 'express'
import { googleAuth, logOut } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/google', googleAuth) // To create a user and store info in the database
authRouter.post('/logout', logOut) // For logging out the user

export default authRouter

