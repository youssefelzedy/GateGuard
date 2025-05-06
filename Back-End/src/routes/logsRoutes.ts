import express from 'express';
import logsController from '../controllers/logsController';


const router = express.Router({ mergeParams: true });

router.get('/', logsController.getAllLogs);
router.get('/:id', logsController.getLog);

export default router;
