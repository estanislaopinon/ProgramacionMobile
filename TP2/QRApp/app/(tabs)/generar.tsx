import React, { useState } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
  import QRCode from 'react-native-qrcode-svg';
  import { useNavigation } from '@react-navigation/native';
  import * as Clipboard from 'expo-clipboard';

  export default function GeneratorScreen() {
    const [qrValue, setQrValue] = useState('');
    const navigation = useNavigation();

    const handlePaste = async () => {
      try {
        const text = await Clipboard.getStringAsync();
        if (text) {
          setQrValue(text);
        } else {
          Alert.alert({ title: 'Error', message: 'No hay texto en el portapapeles' });
        }
      } catch (error) {
        Alert.alert({ title: 'Error', message: 'No se pudo acceder al portapapeles' });
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Pega un link o ingresa texto para generar QR:</Text>
        <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
          <Text style={styles.pasteButtonText}>Pegar desde portapapeles</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={qrValue}
          onChangeText={setQrValue}
          placeholder="Pega o escribe aquí..."
          multiline
        />
        {qrValue ? (
          <QRCode
            value={qrValue}
            size={200}
            color="black"
            backgroundColor="white"
          />
        ) : (
          <Text style={styles.placeholder}>Pega un link para generar el QR</Text>
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
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      width: '80%',
      marginBottom: 20,
      borderRadius: 5,
      textAlignVertical: 'top',
      height: 100,
    },
    placeholder: {
      fontSize: 16,
      color: '#888',
      marginVertical: 20,
    },
    pasteButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    pasteButtonText: {
      color: 'white',
      textAlign: 'center',
    },
  });