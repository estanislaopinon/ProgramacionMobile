import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/styles';

export default function ScanHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de Escaneos</Text>
        <Text style={styles.historyItem}>No hay escaneos aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Historial de Escaneos</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            {item.data} - {new Date(item.timestamp).toLocaleString()}
          </Text>
        )}
      />
    </View>
  );
}