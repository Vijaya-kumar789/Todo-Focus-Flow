import userController from "../Controllers/userController.js";
import express from 'express'
import auth from "../middlewares/Auth.js";
const userRoute = express.Router()

userRoute.post('/user/register', userController.register)
userRoute.post('/user/login', userController.login)

userRoute.get('/user/logout',auth.isAuth, userController.logout)



export default userRoute