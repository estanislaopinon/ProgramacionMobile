import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Platform } from 'react-native';

export default function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [status, setStatus] = useState('Esperando transacción...');
  const txId = "TX-123"; 

  useEffect(() => {
  
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
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a', // Fondo azul muy oscuro (Slate 900)
    paddingTop: 60, 
    paddingHorizontal: 20 
  },
  header: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#f8fafc', 
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 5
  },
  status: { 
    textAlign: 'center', 
    color: '#94a3b8', 
    marginBottom: 30, 
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  timeline: { flex: 1 },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 20, 
    color: '#64748b',
    fontSize: 16
  },
  card: { 
    backgroundColor: '#1e293b', // Fondo Slate 800
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    // Efecto de sombra para Web
    ...Platform.select({
      web: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' },
      default: { elevation: 5 }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  type: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#38bdf8', // Azul brillante para el tipo
    letterSpacing: 0.5
  },
  timestamp: { 
    fontSize: 11, 
    color: '#64748b', 
    fontWeight: '600'
  },
  payloadBox: { 
    backgroundColor: '#0f172a', 
    padding: 12, 
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#38bdf8' 
  },
  payloadText: { 
    fontSize: 12, 
    color: '#cbd5e1', 
    lineHeight: 18,
    fontFamily: Platform.OS === 'web' ? 'monospace' : 'Courier' 
  }
});