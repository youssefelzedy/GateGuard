import express from 'express';
import gateController from '../controllers/gateController';

const router = express.Router();

// GET /api/gate/status/:garageId - Get current gate status for specific garage
router.get('/status/:garageId', gateController.getGateStatus);

// POST /api/gate/open/:garageId - Open the gate for specific garage (auto-closes after 15 seconds)
router.post('/open/:garageId', gateController.openGate);

// GET /api/gate/all - Get all garage gate statuses
router.get('/all', gateController.getAllGarageGateStatuses);

// GET /api/gate/connection - Get MQTT connection status
router.get('/connection', gateController.getConnectionStatus);

export default router;
