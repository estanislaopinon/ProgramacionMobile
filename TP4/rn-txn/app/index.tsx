import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Platform } from 'react-native';

export default function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [status, setStatus] = useState('Esperando transacción...');
  const txId = "TX-123"; // Debe ser igual al de simulate_txn.js

  useEffect(() => {
    // Si pruebas en el navegador usa localhost, si es móvil usa tu IP
    const socketUrl = `ws://localhost:8080?transactionId=${txId}`;
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => setStatus('Conectado - Escuchando eventos...');
    
    ws.onmessage = (e) => {
      const newEvent = JSON.parse(e.data);
      setEvents((prev) => [newEvent, ...prev]); // El más reciente arriba
    };

    ws.onerror = () => setStatus('Error: ¿El Gateway (puerto 8080) está corriendo?');
    ws.onclose = () => setStatus('Desconectado.');

    return () => ws.close();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Banca Eventos 💳</Text>
      <Text style={styles.status}>{status}</Text>
      
      <ScrollView style={styles.timeline}>
        {events.length === 0 && (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.emptyText}>No hay eventos para la transacción {txId}</Text>
          </View>
        )}
        
        {events.map((event, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.type}>{event.type}</Text>
            <Text style={styles.timestamp}>{new Date(event.ts).toLocaleTimeString()}</Text>
            <View style={styles.payloadBox}>
              <Text style={styles.payloadText}>{JSON.stringify(event.payload, null, 2)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6', paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center' },
  status: { textAlign: 'center', color: '#666', marginBottom: 30, fontSize: 14 },
  timeline: { flex: 1 },
  emptyText: { textAlign: 'center', marginTop: 10, color: '#999' },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15,
    borderLeftWidth: 6,
    borderLeftColor: '#3498db',
    ...Platform.select({
      web: { boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
      default: { elevation: 3 }
    })
  },
  type: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  timestamp: { fontSize: 12, color: '#bdc3c7', marginBottom: 10 },
  payloadBox: { backgroundColor: '#f8f9fa', padding: 10, borderRadius: 8 },
  payloadText: { fontSize: 13, color: '#34495e', fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier' }
});