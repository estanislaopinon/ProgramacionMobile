import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { conferences } from '../data';
import styles from '../styles/styles';

const ConferenceListScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const filteredConferences = conferences.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.speaker.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detalle', { id: item.id })}
    >
      <Image source={item.image} style={styles.imagen} /> 
      <Text style={styles.titulo}>{item.title}</Text>
      <Text style={styles.disertante}>Disertante: {item.speaker}</Text>
      <Text style={styles.hora}>Hora: {item.time}</Text>
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
      <FlatList
        data={filteredConferences}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={1}
      />
      <TouchableOpacity style={styles.botonMapa} onPress={() => navigation.navigate('Mapa')}>
        <Text style={styles.botonTexto}>Ver Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConferenceListScreen;