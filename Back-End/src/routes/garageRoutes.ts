import express from 'express';
import garageController from '../controllers/garageController';
import authController from '../controllers/authController';
import adminRouter from './adminRoutes';
import userRouter from './userRoutes';
import logsRouter from './logsRoutes';
import cameraRouter from './cameraRoutes';

const router = express.Router();

// GET /garages/234fad4/admins
// GET /garages/234fad4/admins/56fd12s

router.use('/:garageId/admins', adminRouter);
router.use('/:garageId/users', userRouter);
router.use('/:garageId/logs', logsRouter);
router.use('/:garageId/cameras', cameraRouter);

// Public routes
router.get('/', garageController.getAllGarages);
router.get('/:id', garageController.getGarage);

// Protected routes

// Routes only for garage owners
router.use(authController.protect);
router.use(authController.restrictTo('Owner'));
router.delete('/:id', garageController.deleteGarage);
router.patch('/:id', garageController.editGarage);

export default router;
