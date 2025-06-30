import Aedes, { Client, Subscription, PublishPacket } from 'aedes';
import { createServer, Server } from 'net';

const broker: Aedes = new Aedes();
const server: Server = createServer(broker.handle);

const port = parseInt(process.env.MQTT_BROKER_PORT || '1883');

export const startBroker = () => {
  server.listen(port, '0.0.0.0', () => {
    console.log(`✅ MQTT Broker started and listening on 0.0.0.0:${port}`);
  });

  server.on('error', (err: Error) => {
    console.error('❌ MQTT Broker error:', err);
    process.exit(1);
  });

  // Log events
  broker.on('client', (client: Client) => {
    console.log(`MQTT Client Connected: ${client.id}`);
  });

  broker.on('clientDisconnect', (client: Client) => {
    console.log(`MQTT Client Disconnected: ${client.id}`);
  });

  broker.on('subscribe', (subscriptions: Subscription[], client: Client) => {
    console.log(
      `MQTT Client ${client.id} subscribed to: ${subscriptions
        .map((s) => s.topic)
        .join(', ')}`,
    );
  });

  broker.on('publish', (packet: PublishPacket, client: Client | null) => {
    if (client) {
      console.log(
        `MQTT Message from ${client.id} on ${packet.topic}: ${packet.payload.toString()}`,
      );
    }
  });
};

export default broker;
