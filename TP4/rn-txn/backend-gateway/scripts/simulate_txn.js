const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'orchestrator-sim', brokers: ['localhost:9092'] });
const producer = kafka.producer();

const txId = "TX-123"; // Debe coincidir con tu App Expo

const sendEvent = async (type, payload) => {
    const event = {
        id: Math.random().toString(36).substring(7),
        type: type,
        version: 1,
        ts: Date.now(),
        transactionId: txId,
        userId: "USER-01",
        payload: payload
    };
    
    await producer.send({
        topic: 'txn.events',
        messages: [{ key: txId, value: JSON.stringify(event) }],
    });
    console.log(`✅ Evento enviado: ${type}`);
};

const run = async () => {
    await producer.connect();
    console.log("🚀 Iniciando simulación de ciclo de vida...");

    // 1. Fondos Reservados [cite: 12, 70]
    await sendEvent("txn.Funds Reserved", { ok: true, holdId: "H-99", amount: 5000 });
    await new Promise(r => setTimeout(r, 2000));

    // 2. Antifraude [cite: 8, 71]
    await sendEvent("txn.Fraud Checked", { risk: 'LOW' });
    await new Promise(r => setTimeout(r, 2000));

    // 3. Commit [cite: 12, 72]
    await sendEvent("txn.Committed", { ledgerTxId: "TX-OK-2025" });
    await new Promise(r => setTimeout(r, 2000));

    // 4. Notificación [cite: 12, 74]
    await sendEvent("txn.Notified", { channels: ["email", "sms"] });

    await producer.disconnect();
    console.log("🏁 Simulación finalizada.");
};

run().catch(console.error);