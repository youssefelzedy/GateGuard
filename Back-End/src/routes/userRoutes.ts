import express from 'express';
import userController from '../controllers/userController';
import adminController from '../controllers/adminController';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(authController.restrictTo('Owner','Observer'));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.delete('/:id', adminController.deleteUser);

router.use(authController.restrictTo('Owner'));

router.patch('/:id', userController.editUser);


export default router;
