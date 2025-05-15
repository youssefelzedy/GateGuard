import express from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.use(authController.restrictTo('Owner','Observer'));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

router.use(authController.restrictTo('Owner'));

router.patch('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);


export default router;
