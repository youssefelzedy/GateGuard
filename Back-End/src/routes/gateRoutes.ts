import express from 'express';
import gateController from '../controllers/gateController';

const router = express.Router();

// GET /api/gate/status - Get current gate status
router.get('/status', gateController.getGateStatus);

// POST /api/gate/open - Open the gate (auto-closes after 15 seconds)
router.post('/open', gateController.openGate);

// GET /api/gate/connection - Get MQTT connection status
router.get('/connection', gateController.getConnectionStatus);

export default router;
