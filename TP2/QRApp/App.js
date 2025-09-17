import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Clipboard, FlatList, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [qrValue, setQrValue] = useState('');
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  // Solicitar permisos de cámara al montar el componente
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    // Cargar historial desde AsyncStorage
    loadScanHistory();
  }, []);

  // Cargar historial de escaneos
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

  // Guardar escaneo en historial
  const saveScanToHistory = async (data) => {
    try {
      const newHistory = [{ data, timestamp: new Date().toISOString() }, ...scanHistory].slice(0, 10); // Limitar a 10
      setScanHistory(newHistory);
      await AsyncStorage.setItem('scanHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving scan history:', error);
    }
  };

  // Manejar escaneo de QR
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    saveScanToHistory(data);
  };

  // Validar formato de pago (PAY:<id>|<monto>|ARS)
  const parsePaymentData = (data) => {
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

  // Copiar al portapapeles
  const copyToClipboard = () => {
    if (scannedData) {
      Clipboard.setString(scannedData);
      Alert.alert('Copiado', 'El valor escaneado se copió al portapapeles');
    }
  };

  // Manejar permisos de cámara
  if (hasPermission === null) {
    return <View style={styles.container}><Text>Solicitando permisos de cámara...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No se concedieron permisos para la cámara.</Text></View>;
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <Text style={styles.label}>Ingresa el valor para el QR:</Text>
          <TextInput
            style={styles.input}
            value={qrValue}
            onChangeText={setQrValue}
            placeholder="Escribe aquí..."
          />
          {qrValue ? (
            <QRCode
              value={qrValue}
              size={200}
              color="black"
              backgroundColor="white"
            />
          ) : (
            <Text style={styles.placeholder}>Escribe un valor para generar el QR</Text>
          )}
          <Button
            title="Escanear QR"
            onPress={() => setScanned(true)}
          />
          {scannedData && (
            <View style={styles.scannedContainer}>
              <Text style={styles.label}>Último valor escaneado:</Text>
              <Text style={styles.scannedText}>{scannedData}</Text>
              {parsePaymentData(scannedData) ? (
                <View>
                  <Text>ID: {parsePaymentData(scannedData).id}</Text>
                  <Text>Monto: {parsePaymentData(scannedData).amount} ARS</Text>
                </View>
              ) : null}
              <Button title="Copiar al portapapeles" onPress={copyToClipboard} />
            </View>
          )}
          <Text style={styles.label}>Historial de escaneos:</Text>
          <FlatList
            data={scanHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text>{item.data}</Text>
                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
              </View>
            )}
            style={styles.historyList}
          />
        </>
      ) : (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
    borderRadius: 5,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    marginVertical: 20,
  },
  scannedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scannedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  historyList: {
    width: '100%',
    marginTop: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});