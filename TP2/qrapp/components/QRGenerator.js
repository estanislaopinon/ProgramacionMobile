import React from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from '../styles/styles';

export default function QRGenerator({ qrValue, setQrValue, setScanned }) {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.title}>Aplicación de accesos por QR</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa texto para el QR"
        placeholderTextColor="#666666"
        value={qrValue}
        onChangeText={setQrValue}
      />
      {qrValue ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={300} />
        </View>
      ) : null}
      <Button
        title="Escanear QR"
        color="#2ECC71"
        onPress={() => setScanned(true)}
      />
      <TouchableOpacity style={styles.historyButton} onPress={() => {}}>
        <Text style={styles.historyButtonText}>Historial de Escaneos</Text>
      </TouchableOpacity>
    </View>
  );
}