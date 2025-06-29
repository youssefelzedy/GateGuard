import mqtt, { MqttClient } from 'mqtt';

interface GateStatus {
  status: 'open' | 'closed';
  timestamp: Date;
}

class MQTTClient {
  private client: MqttClient | null = null;
  private gateStatus: GateStatus | null = {
    status: 'closed',
    timestamp: new Date(),
  };
  private readonly brokerUrl =
    process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
  private readonly statusTopic = process.env.MQTT_STATUS_TOPIC || 'gate/status';
  private readonly commandTopic =
    process.env.MQTT_COMMAND_TOPIC || 'gate/command';
  private isConnecting = false;
  private retryCount = 0;
  private readonly maxRetries = 5;
  private readonly retryDelay = 5000; // 5 seconds
  private autoCloseTimer: NodeJS.Timeout | null = null;
  private readonly autoCloseDelay = 15000; // 15 seconds

  constructor() {
    console.log(`MQTT client initialized with default gate status: closed`);
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

    this.client.subscribe(this.statusTopic, (error) => {
      if (error) {
        console.error('Failed to subscribe to status topic:', error);
      } else {
        console.log('Subscribed to gate/status');
      }
    });
  }

  private handleMessage(topic: string, message: Buffer): void {
    if (topic === this.statusTopic) {
      try {
        const status = message.toString().trim().toLowerCase();

        if (status === 'open' || status === 'closed') {
          this.gateStatus = {
            status: status as 'open' | 'closed',
            timestamp: new Date(),
          };

          console.log(`Gate status updated: ${status}`);

          // If gate is opened, start auto-close timer
          if (status === 'open') {
            this.startAutoCloseTimer();
          } else if (status === 'closed') {
            this.clearAutoCloseTimer();
          }
        } else {
          console.warn(`Invalid gate status received: ${status}`);
        }
      } catch (error) {
        console.error('Error processing gate status message:', error);
      }
    }
  }

  private startAutoCloseTimer(): void {
    // Clear any existing timer
    this.clearAutoCloseTimer();

    console.log(
      `Auto-close timer started. Gate will close in ${this.autoCloseDelay / 1000} seconds.`,
    );

    this.autoCloseTimer = setTimeout(() => {
      console.log('Auto-close timer expired. Sending close command...');
      this.sendCommand('close');

      // Update status immediately to "closed" for better UX
      this.gateStatus = {
        status: 'closed',
        timestamp: new Date(),
      };
      console.log('Gate status updated to closed (auto-close timer)');

      this.autoCloseTimer = null;
    }, this.autoCloseDelay);
  }

  private clearAutoCloseTimer(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
      console.log('Auto-close timer cleared.');
    }
  }

  private sendCommand(command: string): boolean {
    if (!this.client || !this.client.connected) {
      console.error('Cannot send command: MQTT not connected');
      return false;
    }

    try {
      this.client.publish(this.commandTopic, command, (error) => {
        if (error) {
          console.error('Failed to send command:', error);
        } else {
          console.log(`Command sent: ${command}`);
        }
      });
      return true;
    } catch (error) {
      console.error('Error sending command:', error);
      return false;
    }
  }

  public openGate(): boolean {
    console.log('Opening gate...');
    const success = this.sendCommand('open');

    if (success) {
      // Update status immediately for better UX
      this.gateStatus = {
        status: 'open',
        timestamp: new Date(),
      };

      // Start auto-close timer when gate is opened via API
      this.startAutoCloseTimer();
    }

    return success;
  }

  public closeGate(): boolean {
    console.log('Closing gate...');
    this.clearAutoCloseTimer(); // Clear timer when manually closing
    return this.sendCommand('close');
  }

  public getGateStatus(): GateStatus | null {
    return this.gateStatus;
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

  public isAutoCloseTimerActive(): boolean {
    return this.autoCloseTimer !== null;
  }

  public disconnect(): void {
    this.clearAutoCloseTimer();
    if (this.client) {
      this.client.end();
      this.client = null;
    }
  }
}

// Create a singleton instance
const mqttClient = new MQTTClient();

export default mqttClient;
