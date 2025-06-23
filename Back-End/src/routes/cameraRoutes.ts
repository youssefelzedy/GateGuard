import express from 'express';
import cameraController from '../controllers/cameraController';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

// All camera routes require authentication
// router.use(authController.protect);

// Routes for camera management
router.post('/', cameraController.createCamera);
router.get('/', cameraController.getAllCameras);
router.get('/:id', cameraController.getCamera);
router.patch('/:id/status', cameraController.updateCameraStatus);
// router.delete(
//   '/:id',
//   authController.restrictTo('Owner'),
//   cameraController.deleteCamera,
// );

export default router;
