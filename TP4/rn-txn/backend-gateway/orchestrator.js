const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

const kafka = new Kafka({ clientId: 'orchestrator', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'orchestrator-group' });
const producer = kafka.producer();

const sendEvent = async (type, transactionId, userId, payload) => {
    const event = {
        id: uuidv4(),
        type: type,
        version: 1,
        ts: Date.now(),
        transactionId,
        userId,
        payload
    };
    await producer.send({
        topic: 'txn.events',
        messages: [{ key: transactionId, value: JSON.stringify(event) }],
    });
    console.log(`📡 Evento emitido: ${type} para ${transactionId}`);
};

const run = async () => {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({ topic: 'txn.commands', fromBeginning: false });

    console.log('🧠 Orquestador iniciado y esperando comandos...');

    await consumer.run({
        eachMessage: async ({ message }) => {
            const command = JSON.parse(message.value.toString());
            const { transactionId, userId } = command;

            console.log(`\n📥 Procesando transacción: ${transactionId}`);

            // 1. Simular Reserva de Fondos 
            await sendEvent("txn.Funds Reserved", transactionId, userId, { ok: true, amount: command.payload.amount });
            await new Promise(r => setTimeout(r, 2000));

            // 2. Simular Chequeo de Fraude 
            const risk = Math.random() > 0.1 ? 'LOW' : 'HIGH'; // 90% éxito
            await sendEvent("txn.Fraud Checked", transactionId, userId, { risk });
            await new Promise(r => setTimeout(r, 2000));

            if (risk === 'LOW') {
                // 3. Éxito: Committed 
                await sendEvent("txn.Committed", transactionId, userId, { ledgerTxId: uuidv4() });
            } else {
                // 3. Fallo: Reversed [cite: 13]
                await sendEvent("txn.Reversed", transactionId, userId, { reason: "Riesgo de fraude elevado" });
            }
            await new Promise(r => setTimeout(r, 2000));

            // 4. Notificación 
            await sendEvent("txn.Notified", transactionId, userId, { channels: ["push", "web"] });
        },
    });
};

run().catch(console.error);