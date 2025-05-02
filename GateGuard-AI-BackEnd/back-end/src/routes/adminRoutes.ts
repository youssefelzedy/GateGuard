import express from 'express';
import adminController from '../controllers/adminController';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.get(
  '/',
  authController.restrictTo('Owner'),
  adminController.getAllAdmins,
);

router.get('/me', adminController.getMe, adminController.getAdmin);
router.get('/:id', adminController.getAdmin);

// Image upload route - need both middleware functions
router.post(
  '/uploadImage',
  adminController.uploadAdminPhoto,
  adminController.uploadImage,
);

export default router;
