import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { conferences } from '../data';
import styles from '../styles/styles';

const ConferenceDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [conference, setConference] = useState(null);

  useEffect(() => {
    const selectedConference = conferences.find(c => c.id === id);
    setConference(selectedConference);
  }, [id]);

  if (!conference) return <Text style={styles.cargando}>Cargando...</Text>;

  return (
    <ScrollView style={styles.contenedorDetalle}>
      <Image source={conference.image} style={styles.imagenDetalle} />
      <Text style={styles.titulo}>{conference.title}</Text>
      <Text style={styles.disertante}>Disertante: {conference.speaker}</Text>
      <Text style={styles.hora}>Hora: {conference.time}</Text>
      <Text style={styles.descripcion}>{conference.fullDescription}</Text>
      <TouchableOpacity
        style={styles.botonMapa}
        onPress={() =>
          navigation.navigate('Mapa', {
            latitude: conference.location.latitude,
            longitude: conference.location.longitude,
            address: conference.location.address,
          })
        }
      >
        <Text style={styles.botonTexto}>Ver Mapa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConferenceDetailScreen;