import express from 'express';
import logsController from '../controllers/logsController';

const router = express.Router({ mergeParams: true });

// Standard routes
router.get('/', logsController.getAllLogs);
router.get('/:id', logsController.getLog);

// Hardware-specific routes (no authentication required for hardware devices)
router.get('/hardware/check-latest', logsController.checkLatestLogForHardware);
router.post('/hardware/mark-processed', logsController.markLogAsProcessed);

export default router;
