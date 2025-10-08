import React, { useState, useEffect } from 'react';
  import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import * as Clipboard from 'expo-clipboard';

  // Tipo para el historial
  interface ScanHistoryItem {
    data: string;
    timestamp: string;
  }

  // Tipo para datos de pago
  interface PaymentData {
    id: string;
    amount: number;
    currency: string;
  }

  export default function HistoryScreen() {
    const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);

    useEffect(() => {
      loadScanHistory();
    }, []);

    const loadScanHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('scanHistory');
        if (history) {
          setScanHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading scan history:', error);
      }
    };

    const copyToClipboard = async (data: string) => {
      try {
        await Clipboard.setStringAsync(data);
        Alert.alert({ title: 'Copiado', message: 'El valor se copió al portapapeles' });
      } catch (error) {
        Alert.alert({ title: 'Error', message: 'No se pudo copiar al portapapeles' });
      }
    };

    const parsePaymentData = (data: string): PaymentData | null => {
      const paymentRegex = /^PAY:([^|]+)\|(\d+\.?\d*)\|ARS$/;
      const match = data.match(paymentRegex);
      if (match) {
        return {
          id: match[1],
          amount: parseFloat(match[2]),
          currency: 'ARS',
        };
      }
      return null;
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Historial de QR escaneados:</Text>
        <FlatList
          data={scanHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const paymentInfo = parsePaymentData(item.data);
            return (
              <View style={styles.historyItem}>
                <Text style={styles.scannedText}>{item.data}</Text>
                {paymentInfo && (
                  <View style={styles.paymentInfo}>
                    <Text>ID: {paymentInfo.id}</Text>
                    <Text>Monto: {paymentInfo.amount} {paymentInfo.currency}</Text>
                  </View>
                )}
                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
                <TouchableOpacity onPress={() => copyToClipboard(item.data)}>
                  <Text style={styles.copyText}>Copiar</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          style={styles.historyList}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 18,
      marginVertical: 10,
      textAlign: 'center',
    },
    historyList: {
      width: '100%',
      marginTop: 20,
    },
    historyItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 10,
    },
    scannedText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 5,
    },
    paymentInfo: {
      marginBottom: 5,
    },
    timestamp: {
      fontSize: 12,
      color: '#666',
      marginBottom: 5,
    },
    copyText: {
      color: 'blue',
      fontSize: 14,
      textDecorationLine: 'underline',
    },
  });