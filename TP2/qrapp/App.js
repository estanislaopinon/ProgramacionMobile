import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import ScannedDataDisplay from './components/ScannedDataDisplay';
import styles from './styles/styles';

export default function App() {
  const [qrValue, setQrValue] = useState('');
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = (scanningResult) => {
    console.log('App received scan result:', scanningResult.data);
    setScannedData(scanningResult.data);
    // No setear scanned aquí, que lo maneje QRScanner
  };

  const handleScannerClose = () => {
    setScanned(false); // Esto se llamará desde QRScanner cuando cierre
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permiso para la cámara...</Text>
      </View>
    );
  }
  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text>Sin acceso a la cámara. Por favor, otorga permisos en la configuración.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <>
          <QRGenerator qrValue={qrValue} setQrValue={setQrValue} setScanned={setScanned} />
          <ScannedDataDisplay scannedData={scannedData} />
        </>
      ) : (
        <QRScanner 
          onBarcodeScanned={handleBarCodeScanned} 
          scanned={scanned} 
          setScanned={setScanned}
        />
      )}
    </View>
  );
}