import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import mqttClient from '../utils/mqttClient';
import { Garage } from '../models/garageModel';

const gateController = {
  getGateStatus: expressAsyncHandler(async (req: Request, res: Response) => {
    const { garageId } = req.params;
    const gateStatus = mqttClient.getGateStatus(garageId);
    const connectionStatus = mqttClient.getConnectionStatus();

    // gateStatus will never be null now due to default status
    const isDefaultStatus =
      connectionStatus !== 'connected' ||
      !mqttClient.getAllGateStatuses()[garageId];
    const message = isDefaultStatus
      ? 'Using default gate status (MQTT not connected or no status received yet)'
      : 'Gate status from ESP device';

    res.status(200).json({
      status: 'success',
      connectionStatus: connectionStatus,
      message: message,
      data: {
        garageId: garageId,
        status: gateStatus.status,
        timestamp: gateStatus.timestamp,
        autoCloseTimerActive: mqttClient.isAutoCloseTimerActive(garageId),
        isDefaultStatus: isDefaultStatus,
      },
    });
  }),

  openGate: expressAsyncHandler(async (req: Request, res: Response) => {
    const { garageId } = req.params;
    const connectionStatus = mqttClient.getConnectionStatus();

    if (connectionStatus !== 'connected') {
      res.status(503).json({
        status: 'error',
        message: `Cannot open gate: MQTT connection status is ${connectionStatus}`,
        connectionStatus: connectionStatus,
      });
      return;
    }

    // Check if garage exists
    const garage = await Garage.findById(garageId);
    if (!garage) {
      res.status(404).json({
        status: 'error',
        message: 'Garage not found',
      });
      return;
    }

    const currentStatus = mqttClient.getGateStatus(garageId);
    if (currentStatus && currentStatus.status === 'open') {
      res.status(400).json({
        status: 'error',
        message: 'Gate is already open',
        data: {
          garageId: garageId,
          currentStatus: currentStatus.status,
          timestamp: currentStatus.timestamp,
        },
      });
      return;
    }

    const success = mqttClient.openGate(garageId);

    if (success) {
      // Update garage model in database
      await Garage.findByIdAndUpdate(garageId, {
        gateStatus: 'Open',
      });

      res.status(200).json({
        status: 'success',
        message:
          'Gate opening command sent. Gate will automatically close in 15 seconds.',
        data: {
          garageId: garageId,
          garageName: garage.garageName,
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

  closeGate: expressAsyncHandler(async (req: Request, res: Response) => {
    const { garageId } = req.params;
    const connectionStatus = mqttClient.getConnectionStatus();

    if (connectionStatus !== 'connected') {
      res.status(503).json({
        status: 'error',
        message: `Cannot close gate: MQTT connection status is ${connectionStatus}`,
        connectionStatus: connectionStatus,
      });
      return;
    }

    // Check if garage exists
    const garage = await Garage.findById(garageId);
    if (!garage) {
      res.status(404).json({
        status: 'error',
        message: 'Garage not found',
      });
      return;
    }

    const success = mqttClient.closeGate(garageId);

    if (success) {
      // Update garage model in database
      await Garage.findByIdAndUpdate(garageId, {
        gateStatus: 'Closed',
      });

      res.status(200).json({
        status: 'success',
        message: 'Gate closing command sent',
        data: {
          garageId: garageId,
          garageName: garage.garageName,
          command: 'close',
          timestamp: new Date(),
        },
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Failed to send close command to gate',
      });
    }
  }),

  getConnectionStatus: expressAsyncHandler(
    async (req: Request, res: Response) => {
      const connectionStatus = mqttClient.getConnectionStatus();

      res.status(200).json({
        status: 'success',
        data: {
          connectionStatus: connectionStatus,
          autoCloseTimerActive: mqttClient.isAnyAutoCloseTimerActive(),
        },
      });
    },
  ),

  // New method to get all garage gate statuses
  getAllGarageGateStatuses: expressAsyncHandler(
    async (req: Request, res: Response) => {
      const garages = await Garage.find({ active: true });
      const connectionStatus = mqttClient.getConnectionStatus();

      const garageStatuses = garages.map((garage) => {
        const mqttStatus = mqttClient.getGateStatus(garage._id.toString());
        return {
          garageId: garage._id,
          garageName: garage.garageName,
          location: garage.location,
          databaseStatus: garage.gateStatus,
          mqttStatus: mqttStatus ? mqttStatus.status : null,
          mqttTimestamp: mqttStatus ? mqttStatus.timestamp : null,
          autoCloseTimerActive: mqttStatus
            ? mqttClient.isAutoCloseTimerActive(garage._id.toString())
            : false,
        };
      });

      res.status(200).json({
        status: 'success',
        connectionStatus: connectionStatus,
        data: {
          garages: garageStatuses,
        },
      });
    },
  ),
};

export default gateController;
