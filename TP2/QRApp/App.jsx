import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import ScannedDataDisplay from './components/ScannedDataDisplay';
import Clipboard from '@react-native-clipboard/clipboard';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await import('expo-barcode-scanner').then(module => module.BarCodeScanner.requestPermissionsAsync());
      setHasPermission(status === 'granted');
    })();
    loadScanHistory();
  }, []);

  const loadScanHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('scanHistory');
      if (history) {
        setScanHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error al cargar el historial:', error);
    }
  };

  const saveScanHistory = async (newData) => {
    try {
      const newHistory = [...scanHistory, { data: newData, timestamp: new Date().toISOString() }];
      await AsyncStorage.setItem('scanHistory', JSON.stringify(newHistory));
      setScanHistory(newHistory);
    } catch (error) {
      console.error('Error al guardar el historial:', error);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData({ data, timestamp: new Date().toISOString() });
    saveScanHistory(data);
    Alert.alert('Código escaneado', `Valor: ${data}`);
  };

  const handleCopyToClipboard = async (text) => {
    await Clipboard.setString(text);
    Alert.alert('Copiado', 'El valor escaneado se copió al portapapeles');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QRApp</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el texto para el QR"
        value={inputText}
        onChangeText={setInputText}
      />
      <QRGenerator inputText={inputText} />
      <QRScanner
        hasPermission={hasPermission}
        scanned={scanned}
        handleBarCodeScanned={handleBarCodeScanned}
        setScanned={setScanned}
      />
      <ScannedDataDisplay scannedData={scannedData} handleCopyToClipboard={handleCopyToClipboard} />
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de escaneos:</Text>
        {scanHistory.length > 0 ? (
          scanHistory.map((item, index) => (
            <Text key={index} style={styles.historyItem}>
              {item.timestamp}: {item.data}
            </Text>
          ))
        ) : (
          <Text style={styles.historyPlaceholder}>No hay escaneos previos</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  historyContainer: {
    marginTop: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyItem: {
    fontSize: 14,
  },
  historyPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
  },
});