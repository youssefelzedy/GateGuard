import express from 'express';
import adminController from '../controllers/adminController';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.get('/', adminController.getAllAdmins);

router.use(authController.protect);
router.get('/me', adminController.getMe, adminController.getAdmin);
router.get('/:id', adminController.getAdmin);
router.post('/uploadImage', adminController.uploadImage);

export default router;
