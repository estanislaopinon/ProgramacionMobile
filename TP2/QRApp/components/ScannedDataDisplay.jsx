import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ScannedDataDisplay = ({ scannedData, handleCopyToClipboard }) => {
  if (!scannedData) return null;

  const isPaymentFormat = scannedData.data.startsWith('PAY:');
  let parsedData = null;
  if (isPaymentFormat) {
    const [, id, amount, currency] = scannedData.data.split('|');
    parsedData = { id, amount, currency };
  }

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>Último valor escaneado:</Text>
      <Text style={styles.dataText}>{scannedData.data}</Text>
      {isPaymentFormat && parsedData && (
        <View style={styles.parsedData}>
          <Text style={styles.parsedText}>ID: {parsedData.id}</Text>
          <Text style={styles.parsedText}>Monto: {parsedData.amount}</Text>
          <Text style={styles.parsedText}>Moneda: {parsedData.currency}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.copyButton}
        onPress={() => handleCopyToClipboard(scannedData.data)}
      >
        <Text style={styles.copyButtonText}>Copiar al portapapeles</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataText: {
    fontSize: 16,
    marginTop: 4,
  },
  parsedData: {
    marginTop: 8,
  },
  parsedText: {
    fontSize: 14,
  },
  copyButton: {
    marginTop: 8,
    backgroundColor: '#1D4ED8',
    padding: 8,
    borderRadius: 4,
  },
  copyButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ScannedDataDisplay;