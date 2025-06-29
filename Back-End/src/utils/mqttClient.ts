import mqtt, { MqttClient } from 'mqtt';

interface GateStatus {
  status: 'open' | 'closed';
  timestamp: Date;
}

interface GarageGateStatus {
  [garageId: string]: GateStatus;
}

class MQTTClient {
  private client: MqttClient | null = null;
  private garageGateStatus: GarageGateStatus = {};
  private readonly brokerUrl =
    process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
  private readonly statusTopic = process.env.MQTT_STATUS_TOPIC || 'gate/status';
  private readonly commandTopic =
    process.env.MQTT_COMMAND_TOPIC || 'gate/command';
  private isConnecting = false;
  private retryCount = 0;
  private readonly maxRetries = 5;
  private readonly retryDelay = 5000; // 5 seconds
  private autoCloseTimers: { [garageId: string]: NodeJS.Timeout } = {};
  private readonly autoCloseDelay = 15000; // 15 seconds

  constructor() {
    console.log(`MQTT client initialized for multi-garage support`);
    console.log(`MQTT Broker URL: ${this.brokerUrl}`);
    console.log(`Status Topic: ${this.statusTopic}`);
    console.log(`Command Topic: ${this.commandTopic}`);
    this.connect();
  }

  private connect(): void {
    if (this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    try {
      console.log('Attempting to connect to MQTT broker...');
      this.client = mqtt.connect(this.brokerUrl, {
        reconnectPeriod: 0, // Disable automatic reconnection, we'll handle it manually
        connectTimeout: 10000, // 10 second timeout
        clean: true,
      });

      this.client.on('connect', () => {
        console.log('MQTT connected successfully');
        this.isConnecting = false;
        this.retryCount = 0;
        this.subscribe();
      });

      this.client.on('message', (topic, message) => {
        this.handleMessage(topic, message);
      });

      this.client.on('error', (error) => {
        console.error('MQTT connection error:', error.message);
        this.isConnecting = false;

        // Don't retry on certain errors
        if (error.message.includes('ECONNREFUSED')) {
          console.log(
            'MQTT broker not available. Server will continue without MQTT functionality.',
          );
          console.log(
            'To enable MQTT, start an MQTT broker (e.g., Mosquitto) on localhost:1883',
          );
        }
      });

      this.client.on('close', () => {
        console.log('MQTT connection closed');
        this.isConnecting = false;

        // Retry connection if not manually disconnected
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          console.log(
            `Retrying MQTT connection in ${this.retryDelay / 1000} seconds... (Attempt ${this.retryCount}/${this.maxRetries})`,
          );
          setTimeout(() => {
            this.connect();
          }, this.retryDelay);
        } else {
          console.log(
            'Max MQTT retry attempts reached. Server will continue without MQTT functionality.',
          );
        }
      });

      this.client.on('reconnect', () => {
        console.log('MQTT reconnecting...');
      });
    } catch (error) {
      console.error('Failed to create MQTT client:', error);
      this.isConnecting = false;
    }
  }

  private subscribe(): void {
    if (!this.client) {
      console.error('MQTT client not initialized');
      return;
    }

    // Subscribe to garage-specific status topics
    this.client.subscribe(`${this.statusTopic}/+`, (error) => {
      if (error) {
        console.error('Failed to subscribe to status topics:', error);
      } else {
        console.log(
          `Subscribed to ${this.statusTopic}/+ (all garage status topics)`,
        );
      }
    });
  }

  private handleMessage(topic: string, message: Buffer): void {
    // Handle garage-specific status topics: gate/status/{garageId}
    if (topic.startsWith(this.statusTopic + '/')) {
      const garageId = topic.split('/')[2]; // Extract garage ID from topic

      try {
        const status = message.toString().trim().toLowerCase();

        if (status === 'open' || status === 'closed') {
          this.garageGateStatus[garageId] = {
            status: status as 'open' | 'closed',
            timestamp: new Date(),
          };

          console.log(`Gate status updated for garage ${garageId}: ${status}`);

          // If gate is opened, start auto-close timer
          if (status === 'open') {
            this.startAutoCloseTimer(garageId);
          } else if (status === 'closed') {
            this.clearAutoCloseTimer(garageId);
          }
        } else {
          console.warn(
            `Invalid gate status received for garage ${garageId}: ${status}`,
          );
        }
      } catch (error) {
        console.error(
          `Error processing gate status message for garage ${garageId}:`,
          error,
        );
      }
    }
  }

  private startAutoCloseTimer(garageId: string): void {
    // Clear any existing timer for this garage
    this.clearAutoCloseTimer(garageId);

    console.log(
      `Auto-close timer started for garage ${garageId}. Gate will close in ${this.autoCloseDelay / 1000} seconds.`,
    );

    this.autoCloseTimers[garageId] = setTimeout(() => {
      console.log(
        `Auto-close timer expired for garage ${garageId}. Sending close command...`,
      );
      this.sendCommand(garageId, 'close');

      // Update status immediately to "closed" for better UX
      this.garageGateStatus[garageId] = {
        status: 'closed',
        timestamp: new Date(),
      };
      console.log(
        `Gate status updated to closed for garage ${garageId} (auto-close timer)`,
      );

      delete this.autoCloseTimers[garageId];
    }, this.autoCloseDelay);
  }

  private clearAutoCloseTimer(garageId: string): void {
    if (this.autoCloseTimers[garageId]) {
      clearTimeout(this.autoCloseTimers[garageId]);
      delete this.autoCloseTimers[garageId];
      console.log(`Auto-close timer cleared for garage ${garageId}.`);
    }
  }

  private sendCommand(garageId: string, command: string): boolean {
    if (!this.client || !this.client.connected) {
      console.error('Cannot send command: MQTT not connected');
      return false;
    }

    try {
      const topic = `${this.commandTopic}/${garageId}`;
      this.client.publish(topic, command, (error) => {
        if (error) {
          console.error(`Failed to send command to garage ${garageId}:`, error);
        } else {
          console.log(`Command sent to garage ${garageId}: ${command}`);
        }
      });
      return true;
    } catch (error) {
      console.error(`Error sending command to garage ${garageId}:`, error);
      return false;
    }
  }

  public openGate(garageId: string): boolean {
    console.log(`Opening gate for garage ${garageId}...`);
    const success = this.sendCommand(garageId, 'open');

    if (success) {
      // Update status immediately for better UX
      this.garageGateStatus[garageId] = {
        status: 'open',
        timestamp: new Date(),
      };

      // Start auto-close timer when gate is opened via API
      this.startAutoCloseTimer(garageId);
    }

    return success;
  }

  public closeGate(garageId: string): boolean {
    console.log(`Closing gate for garage ${garageId}...`);
    this.clearAutoCloseTimer(garageId); // Clear timer when manually closing
    return this.sendCommand(garageId, 'close');
  }

  public getGateStatus(garageId: string): GateStatus | null {
    return this.garageGateStatus[garageId] || null;
  }

  public getAllGateStatuses(): GarageGateStatus {
    return { ...this.garageGateStatus };
  }

  public getConnectionStatus(): string {
    if (!this.client) {
      return 'disconnected';
    }
    if (this.client.connected) {
      return 'connected';
    }
    if (this.isConnecting) {
      return 'connecting';
    }
    return 'disconnected';
  }

  public isAutoCloseTimerActive(garageId: string): boolean {
    return this.autoCloseTimers[garageId] !== undefined;
  }

  public isAnyAutoCloseTimerActive(): boolean {
    return Object.keys(this.autoCloseTimers).length > 0;
  }

  public disconnect(): void {
    // Clear all timers
    Object.keys(this.autoCloseTimers).forEach((garageId) => {
      this.clearAutoCloseTimer(garageId);
    });

    if (this.client) {
      this.client.end();
      this.client = null;
    }
  }
}

// Create a singleton instance
const mqttClient = new MQTTClient();

export default mqttClient;
