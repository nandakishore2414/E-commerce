import express from "express"
const UserRouter = express.Router()
import { userAuth } from "../middleware/userAuth.js"
import * as authController from "../controller/authController.js"

UserRouter.post('/register', authController.register);
UserRouter.post('/login', authController.userLogin);
UserRouter.delete('/logout', authController.logout);
UserRouter.get('/check-auth', authController.checkAuth);

UserRouter.get('/products', authController.getProducts);
UserRouter.get('/categories', authController.getCategories);

UserRouter.post('/cart', userAuth, authController.addToCart)
UserRouter.get('/cart', userAuth, authController.getCart)
UserRouter.put('/cart/:id', userAuth, authController.updateQuantity)
UserRouter.delete('/cart/:id', userAuth, authController.removeFromCart)

UserRouter.post('/orders', userAuth, authController.createOrder);
UserRouter.get('/orders', userAuth, authController.getUserOrders);
UserRouter.delete('/order/:id', userAuth, authController.cancelOrder)


export default UserRouter