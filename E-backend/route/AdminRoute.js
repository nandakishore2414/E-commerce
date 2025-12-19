import express from "express"
const router = express.Router()
import { adminAuth } from "../middleware/adminAuth.js"
import * as adminController from "../controller/adminController.js"

import upload from "../middleware/upload.js"

router.post('/login', adminController.adminLogin);

router.get('/products', adminAuth, adminController.getAllProducts);
router.post('/product', adminAuth, upload.single('image'), adminController.createProduct);
router.put('/product/:id', adminAuth, upload.single('image'), adminController.updateProduct);
router.delete('/product/:id', adminAuth, adminController.deleteProduct)

router.post('/categories', adminAuth, adminController.createCategory);
router.get('/categories', adminAuth, adminController.getCategory);
router.put('/categories/:id', adminAuth, adminController.updateCategory);
router.delete('/categories/:id', adminAuth, adminController.deleteCategory);

router.get('/users', adminAuth, adminController.getAllUsers);
router.delete('/users/:id', adminAuth, adminController.deleteUser);
router.put('/users/:id/toggle', adminAuth, adminController.toggleUserStatus);

router.get('/check', adminController.checkSession);
router.get('/orders', adminAuth, adminController.getAllOrders);
router.put('/orders/:id/status', adminAuth, adminController.updateOrderStatus);
router.delete('/orders/:id', adminAuth, adminController.deleteOrder);


export default router