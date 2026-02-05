import { useState, useEffect } from 'react';

export const useTransactionEvents = (transactionId) => {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    if (!transactionId) return;

    // IP de tu servidor (usa tu IP local si pruebas en móvil físico)
    const socketUrl = `ws://localhost:8080?transactionId=${transactionId}`;
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => setStatus('connected');
    
    ws.onmessage = (e) => {
      const eventEnvelope = JSON.parse(e.data);
      // Validamos contra el contrato: id, type, version, ts, payload [cite: 54, 58, 59, 61, 66]
      setEvents((prev) => [...prev, eventEnvelope]);
    };

    ws.onerror = (e) => setStatus('error');
    ws.onclose = () => setStatus('disconnected');

    return () => ws.close();
  }, [transactionId]);

  return { events, status };
};