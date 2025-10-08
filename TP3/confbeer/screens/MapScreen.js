import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { conferences } from '../data';
import styles from '../styles/styles';

const MapScreen = ({ navigation, route }) => {
  const { latitude, longitude, address } = route.params || {
    latitude: -32.48455,
    longitude: -58.23206,
    address: 'Concepción del Uruguay, Entre Ríos',
  };

  return (
    <View style={styles.contenedorMapa}>
      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01, // Zoom más cercano para centrarse en la ubicación específica
          longitudeDelta: 0.01,
        }}
      >
        {conferences.map((conference) => (
          <Marker
            key={conference.id}
            coordinate={{
              latitude: conference.location.latitude,
              longitude: conference.location.longitude,
            }}
            title={conference.title}
            description={conference.location.address}
          />
        ))}
        <Marker
          coordinate={{ latitude, longitude }}
          title="Ubicación Seleccionada"
          description={address}
          pinColor="#8a2be2" // Color distintivo para la ubicación seleccionada
        />
      </MapView>
      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate('Lista')}>
        <Text style={styles.botonTexto}>Volver a la Lista</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;