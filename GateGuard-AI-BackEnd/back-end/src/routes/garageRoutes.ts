import express from 'express';
import garageController from '../controllers/garageController';
import adminRouter from './adminRoutes';
import userRouter from './userRoutes';
// const authController = require('../controllers/authController');

const router = express.Router();

// GET /garages/234fad4/admins
// GET /garages/234fad4/admins/56fd12s

router.use('/:garageId/admins', adminRouter);
router.use('/:garageId/users', userRouter);

// Public routes
router.get('/', garageController.getAllGarages);
router.get('/:id', garageController.getGarage);

// Protected routes
// router.use(authController.protect);

// // Routes only for garage owners
// router.use(authController.restrictTo('Owner'));
// router.delete('/:id', garageController.deleteGarage);

export default router;
