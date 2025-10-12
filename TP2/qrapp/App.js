import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';
import ScannedDataDisplay from './components/ScannedDataDisplay';
import ScanHistory from './components/ScanHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles';

export default function App() {
  const [qrValue, setQrValue] = useState('');
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
    loadHistory();
  }, [permission, requestPermission]);

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('scanHistory');
      if (history) setScanHistory(JSON.parse(history));
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveToHistory = async (data) => {
    try {
      const newHistory = [{ data, timestamp: new Date().toISOString() }, ...scanHistory].slice(0, 10);
      setScanHistory(newHistory);
      await AsyncStorage.setItem('scanHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const handleBarCodeScanned = (scanningResult) => {
    console.log('App received scan result:', scanningResult.data);
    setScannedData(scanningResult.data);
    saveToHistory(scanningResult.data);
  };

  const handleScannerClose = () => {
    setScanned(false);
  };

  const openHistoryModal = () => {
    setIsHistoryModalVisible(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalVisible(false);
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
          <QRGenerator 
            qrValue={qrValue} 
            setQrValue={setQrValue} 
            setScanned={setScanned} 
            openHistoryModal={openHistoryModal}
          />
          <ScannedDataDisplay scannedData={scannedData} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={isHistoryModalVisible}
            onRequestClose={closeHistoryModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={closeHistoryModal}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
                <ScanHistory history={scanHistory} />
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <QRScanner 
          onBarcodeScanned={handleBarCodeScanned} 
          scanned={scanned} 
          setScanned={handleScannerClose}
        />
      )}
    </View>
  );
}