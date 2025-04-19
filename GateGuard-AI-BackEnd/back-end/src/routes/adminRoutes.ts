import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router({ mergeParams: true });

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);

export default router;
