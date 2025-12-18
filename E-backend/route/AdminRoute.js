import express from "express"
const router = express.Router()
import { adminAuth } from "../middleware/adminAuth.js"
import * as adminController from "../controller/adminController.js"

import upload from "../middleware/upload.js"

router.post('/admin/login', adminController.adminLogin);

router.get('/admin/products', adminAuth, adminController.getAllProducts);
router.post('/admin/product', adminAuth, upload.single('image'), adminController.createProduct);
router.put('/admin/product/:id', adminAuth, upload.single('image'), adminController.updateProduct);
router.delete('/admin/product/:id', adminAuth, adminController.deleteProduct)

router.post('/admin/categories', adminAuth, adminController.createCategory);
router.get('/admin/categories', adminAuth, adminController.getCategory);
router.put('/admin/categories/:id', adminAuth, adminController.updateCategory);
router.delete('/admin/categories/:id', adminAuth, adminController.deleteCategory);

router.get('/admin/users', adminAuth, adminController.getAllUsers);
router.delete('/admin/users/:id', adminAuth, adminController.deleteUser);
router.put('/admin/users/:id/toggle', adminAuth, adminController.toggleUserStatus);

router.get('/admin/check', adminController.checkSession);
router.get('/admin/orders', adminAuth, adminController.getAllOrders);
router.put('/admin/orders/:id/status', adminAuth, adminController.updateOrderStatus);
router.delete('/admin/orders/:id', adminAuth, adminController.deleteOrder);


export default router