import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Platform } from 'react-native';
import { Image } from 'expo-image';
import { conferences } from '../data';
import styles from '../styles/styles';

const webStyles = Platform.OS === 'web' ? {
  item: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    margin: 8,
    padding: 8,
    width: 'calc(50% - 16px)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imagen: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  titulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 2,
  },
  disertante: {
    color: '#ccc',
    fontSize: 10,
  },
  hora: {
    color: '#8a2be2',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    overflow: 'auto',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  }
} : styles;

const ConferenceListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filteredConferences = conferences.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.speaker.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={Platform.OS === 'web' ? webStyles.item : styles.item}
      onPress={() => navigation.navigate('Detalle', { id: item.id })}
    >
      <Image source={item.image} style={Platform.OS === 'web' ? webStyles.imagen : styles.imagen} /> 
      <Text style={Platform.OS === 'web' ? webStyles.titulo : styles.titulo}>{item.title}</Text>
      <Text style={Platform.OS === 'web' ? webStyles.disertante : styles.disertante}>Disertante: {item.speaker}</Text>
      <Text style={Platform.OS === 'web' ? webStyles.hora : styles.hora}>Hora: {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.contenedorLista}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar conferencias..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />
      <Text style={styles.resultados}>{filteredConferences.length} conferencias encontradas</Text>
      
      {Platform.OS === 'web' ? (
        <View style={webStyles.scrollContainer}>
          {filteredConferences.map(item => renderItem(item))}
        </View>
      ) : (
        <FlatList
          data={filteredConferences}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
        />
      )}
      
      <TouchableOpacity style={styles.botonMapa} onPress={() => navigation.navigate('Mapa')}>
        <Text style={styles.botonTexto}>Ver Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConferenceListScreen;