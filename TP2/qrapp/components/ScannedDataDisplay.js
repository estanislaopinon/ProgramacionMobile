import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function ScannedDataDisplay({ scannedData }) {
  if (!scannedData) return null;

  return (
    <View style={styles.scannedDataContainer}>
      <Text style={styles.scannedDataText}>Último escaneado: {scannedData}</Text>
    </View>
  );
}