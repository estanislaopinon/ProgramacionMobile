import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScanner = ({ hasPermission, scanned, handleBarCodeScanned, setScanned }) => {
  if (hasPermission === null) {
    return <Text style={styles.permissionText}>Solicitando permisos de cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.errorText}>No se otorgaron permisos para la cámara</Text>;
  }
  return (
    <View style={styles.scannerContainer}>
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <Button
          title="Volver a escanear"
          onPress={() => setScanned(false)}
          color="#1D4ED8"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scannerContainer: {
    width: '100%',
    height: 256,
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#EF4444',
  },
});

export default QRScanner;