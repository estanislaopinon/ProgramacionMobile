import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRGenerator = ({ inputText }) => (
  <View style={styles.qrContainer}>
    <Text style={styles.qrTitle}>Código QR</Text>
    {inputText ? (
      <QRCode value={inputText} size={200} />
    ) : (
      <Text style={styles.qrPlaceholder}>Ingresa un texto para generar el QR</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  qrContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  qrPlaceholder: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default QRGenerator;