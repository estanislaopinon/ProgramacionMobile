const express = require('express');
const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const kafka = new Kafka({ clientId: 'api-service', brokers: ['localhost:9092'] });
const producer = kafka.producer();

app.post('/transactions', async (req, res) => {
    // CAMBIO AQUÍ: Si viene un ID en el body, lo usamos. Si no, genera uno.
    const transactionId = req.body.transactionId || uuidv4(); 
    const { fromAccount, toAccount, amount, currency, userId } = req.body;

    const command = {
        id: uuidv4(),
        type: 'txn.TransactionInitiated',
        version: 1,
        ts: Date.now(),
        transactionId, // Ahora usará "TX-123" si lo mandas por Postman
        userId,
        payload: { fromAccount, toAccount, amount, currency, userId }
    };

    try {
        await producer.send({
            topic: 'txn.commands',
            messages: [{ key: transactionId, value: JSON.stringify(command) }],
        });
        
        console.log(`🚀 Comando enviado a Kafka: ${transactionId}`);
        res.status(202).json({ transactionId, message: "Transacción iniciada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al conectar con Kafka" });
    }
});

const start = async () => {
    await producer.connect();
    app.listen(3000, () => console.log('✅ API escuchando en http://localhost:3000'));
};

start();