import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import mqttClient from '../utils/mqttClient';

const gateController = {
  getGateStatus: expressAsyncHandler(async (req: Request, res: Response) => {
    const gateStatus = mqttClient.getGateStatus();
    const connectionStatus = mqttClient.getConnectionStatus();

    if (!gateStatus) {
      res.status(404).json({
        status: 'error',
        message: 'Gate status not available',
        connectionStatus: connectionStatus,
        data: null,
      });
      return;
    }

    // If MQTT is not connected, indicate that this is a default status
    const isDefaultStatus = connectionStatus !== 'connected';
    const message = isDefaultStatus
      ? 'Using default gate status (MQTT not connected)'
      : 'Gate status from ESP device';

    res.status(200).json({
      status: 'success',
      connectionStatus: connectionStatus,
      message: message,
      data: {
        status: gateStatus.status,
        timestamp: gateStatus.timestamp,
      },
    });
  }),

  openGate: expressAsyncHandler(async (req: Request, res: Response) => {
    const connectionStatus = mqttClient.getConnectionStatus();

    if (connectionStatus !== 'connected') {
      res.status(503).json({
        status: 'error',
        message: `Cannot open gate: MQTT connection status is ${connectionStatus}`,
        connectionStatus: connectionStatus,
      });
      return;
    }

    const currentStatus = mqttClient.getGateStatus();
    if (currentStatus && currentStatus.status === 'open') {
      res.status(400).json({
        status: 'error',
        message: 'Gate is already open',
        data: {
          currentStatus: currentStatus.status,
          timestamp: currentStatus.timestamp,
        },
      });
      return;
    }

    const success = mqttClient.openGate();

    if (success) {
      res.status(200).json({
        status: 'success',
        message:
          'Gate opening command sent. Gate will automatically close in 15 seconds.',
        data: {
          command: 'open',
          autoCloseInSeconds: 15,
          timestamp: new Date(),
        },
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Failed to send open command to gate',
      });
    }
  }),

  getConnectionStatus: expressAsyncHandler(
    async (req: Request, res: Response) => {
      const connectionStatus = mqttClient.getConnectionStatus();
      const gateStatus = mqttClient.getGateStatus();

      res.status(200).json({
        status: 'success',
        data: {
          connectionStatus: connectionStatus,
          lastStatus: gateStatus
            ? {
                status: gateStatus.status,
                timestamp: gateStatus.timestamp,
                isDefaultStatus: connectionStatus !== 'connected',
              }
            : null,
          autoCloseTimerActive: mqttClient.isAutoCloseTimerActive(),
        },
      });
    },
  ),
};

export default gateController;
