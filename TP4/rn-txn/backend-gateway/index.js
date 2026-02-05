const { Kafka } = require('kafkajs');
const { WebSocketServer } = require('ws');

const kafka = new Kafka({ clientId: 'gateway', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'gateway-group' });
const wss = new WebSocketServer({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const txId = params.get('transactionId');
    if (txId) {
        clients.set(txId, ws);
        console.log("App conectada a TX: " + txId);
    }
    ws.on('close', () => clients.delete(txId));
});

const start = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'txn.events', fromBeginning: false });
    await consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value.toString());
            const ws = clients.get(event.transactionId);
            if (ws) {
                ws.send(JSON.stringify(event));
                console.log("Evento enviado a la App: " + event.type);
            }
        },
    });
};

start().catch(console.error);
console.log('Gateway WS escuchando en puerto 8080');
