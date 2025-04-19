import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/signupAndCreate', authController.signupAndCreate);
router.post('/login', authController.login);

export default router;
