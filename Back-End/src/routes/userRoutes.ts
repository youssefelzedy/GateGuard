import express from 'express';
import userController from '../controllers/userController';

const router = express.Router({ mergeParams: true });

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

export default router;
