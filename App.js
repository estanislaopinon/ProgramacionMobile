import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Platform } from 'react-native';

export default function App() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState('Esperando transacción...');
  const txId = "TX-123"; // ID de prueba para matchear con el script de Python

  useEffect(() => {
    // IMPORTANTE: Si usas celular físico, cambia 'localhost' por tu IP local (ej: 192.168.1.50)
    const socketUrl = `ws://localhost:8080?transactionId=${txId}`;
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => setStatus('Conectado al Gateway - Escuchando eventos...');
    
    ws.onmessage = (e) => {
      const newEvent = JSON.parse(e.data);
      setEvents((prev) => [newEvent, ...prev]); // Ponemos el último evento arriba
    };

    ws.onerror = (e) => setStatus('Error de conexión. ¿Está el Gateway encendido?');
    ws.onclose = () => setStatus('Desconectado.');

    return () => ws.close();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Banca Eventos 💳</Text>
      <Text style={styles.status}>{status}</Text>
      
      <ScrollView style={styles.timeline}>
        {events.length === 0 && (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>No hay eventos aún...</Text>
          </View>
        )}
        
        {events.map((event, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
            <Text style={styles.type}>{event.type.replace('txn.', '')}</Text>
            <Text style={styles.timestamp}>{new Date(event.ts).toLocaleTimeString()}</Text>
            </View>
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
  container: { flex: 1, backgroundColor: '#f0f2f5', paddingTop: 50, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  status: { textAlign: 'center', color: '#666', marginBottom: 20, fontStyle: 'italic' },
  timeline: { flex: 1 },
  card: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#2ecc71',
    ...Platform.select({
      web: { boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
      default: { elevation: 3 }
    })
  },
  type: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  timestamp: { fontSize: 12, color: '#95a5a6', marginVertical: 4 },
  payload: { fontSize: 13, color: '#34495e', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' }
});