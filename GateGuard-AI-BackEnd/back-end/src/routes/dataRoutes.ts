import express from 'express';
import dataController from '../controllers/dataController';

const router = express.Router();

router.post('/', dataController.receiveData);
router.get('/', dataController.getData);

export default router;
