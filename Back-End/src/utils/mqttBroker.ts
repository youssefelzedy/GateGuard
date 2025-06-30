import Aedes, { Client, Subscription, PublishPacket } from 'aedes';
import { createServer, Server } from 'net';

const broker: Aedes = new Aedes();
const server: Server = createServer(broker.handle);

const port = process.env.MQTT_BROKER_PORT || 1883;

broker.on('client', (client: Client) => {
  console.log(`MQTT Client Connected: ${client.id}`);
});

broker.on('clientDisconnect', (client: Client) => {
  console.log(`MQTT Client Disconnected: ${client.id}`);
});

broker.on('subscribe', (subscriptions: Subscription[], client: Client) => {
  console.log(
    `MQTT Client ${client.id} subscribed to topics: ${subscriptions.map((s: Subscription) => s.topic).join(', ')}`,
  );
});

broker.on('publish', (packet: PublishPacket, client: Client | null) => {
  if (client) {
    console.log(
      `MQTT Message from ${client.id} on topic ${packet.topic}: ${packet.payload.toString()}`,
    );
  }
});

export const startBroker = () => {
  server.listen(port, () => {
    console.log(`MQTT Broker started and listening on port ${port}`);
  });

  server.on('error', (err: Error) => {
    console.error('MQTT Broker error:', err);
    process.exit(1);
  });
};

export default broker;
