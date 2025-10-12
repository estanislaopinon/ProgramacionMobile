import React, { useState, useRef, useCallback } from 'react';
import { View, Button, Text, StyleSheet, Dimensions } from 'react-native';
import { CameraView } from 'expo-camera';
import styles from '../styles/styles';

export default function QRScanner({ onBarcodeScanned, scanned, setScanned }) {
  const [isScanning, setIsScanning] = useState(true);
  const [scanComplete, setScanComplete] = useState(false);
  const hasScannedRef = useRef(false);

  const handleBarcodeScanned = useCallback((scanningResult) => {
    if (hasScannedRef.current || !isScanning) {
      return;
    }

    console.log('Barcode detected:', scanningResult.data);
    hasScannedRef.current = true;
    setIsScanning(false);
    setScanComplete(true);
    onBarcodeScanned(scanningResult);
    
    setTimeout(() => {
      setScanned(true);
    }, 100);
  }, [isScanning, onBarcodeScanned, setScanned]);

  const handleClose = () => {
    hasScannedRef.current = true;
    setIsScanning(false);
    setScanComplete(false);
    setScanned(false); // Regresa al inicio
  };

  React.useEffect(() => {
    if (!scanned) {
      hasScannedRef.current = false;
      setIsScanning(true);
      setScanComplete(false);
    }
  }, [scanned]);

  return (
    <View style={styles.scannerContainer}>
      {/* Fondo oscuro semi-transparente */}
      <View style={localStyles.overlay} />
      {/* Área de la cámara centrada */}
      <View style={localStyles.cameraContainer}>
        <CameraView
          style={localStyles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={hasScannedRef.current ? undefined : handleBarcodeScanned}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Cerrar" 
          color="#FFFFFF"
          onPress={handleClose}
        />
        {scanComplete && (
          <Text style={styles.scanMessage}>¡Código detectado exitosamente!</Text>
        )}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro semi-transparente
  },
  cameraContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  camera: {
    width: 300,
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3B82F6', // Borde azul para guiar al usuario
  },
});