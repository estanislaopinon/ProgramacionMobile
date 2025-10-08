import React, { useState, useEffect } from 'react';
  import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
  import { BarCodeScanner } from 'expo-barcode-scanner';
  import { useNavigation } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
      setScanned(true);
      await saveScanToHistory(data);
      Alert.alert({ title: 'Escaneado', message: `Contenido: ${data}` });
      navigation.navigate('Historial' as never);
    };

    const saveScanToHistory = async (data: string) => {
      try {
        const history = await AsyncStorage.getItem('scanHistory');
        const historyArray = history ? JSON.parse(history) : [];
        const newHistory = [{ data, timestamp: new Date().toISOString() }, ...historyArray].slice(0, 10);
        await AsyncStorage.setItem('scanHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving scan history:', error);
      }
    };

    if (hasPermission === null) {
      return <View style={styles.container}><Text>Solicitando permisos de cámara...</Text></View>;
    }
    if (hasPermission === false) {
      return <View style={styles.container}><Text>No se concedieron permisos para la cámara.</Text></View>;
    }

    return (
      <View style={styles.container}>
        {!scanned ? (
          <View>
            <Text style={styles.label}>Presiona Escanear para abrir la cámara</Text>
            <Button title="Escanear QR" onPress={() => setScanned(true)} />
          </View>
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
      textAlign: 'center',
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
  });