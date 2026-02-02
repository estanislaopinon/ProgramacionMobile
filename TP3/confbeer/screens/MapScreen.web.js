import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { conferences } from '../data';

const MapScreen = ({ navigation, route }) => {
  const mapRef = useRef(null);
  const { latitude, longitude, address } = route.params || {
    latitude: -32.48455,
    longitude: -58.23206,
    address: 'Concepción del Uruguay, Entre Ríos',
  };

  useEffect(() => {
    if (mapRef.current && typeof window !== 'undefined') {
      // Cargar Leaflet desde CDN
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        setTimeout(() => {
          const L = window.L;
          const map = L.map(mapRef.current).setView([latitude, longitude], 10);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(map);

          // Agregar marcadores de conferencias
          conferences.forEach((conference) => {
            L.marker([conference.location.latitude, conference.location.longitude])
              .bindPopup(`<b>${conference.title}</b><br>${conference.location.address}`)
              .addTo(map);
          });

          // Agregar marcador de ubicación seleccionada
          L.marker([latitude, longitude], {
            icon: L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            }),
          })
            .bindPopup(`<b>Ubicación Seleccionada</b><br>${address}`)
            .addTo(map);
        }, 100);
      };
      document.head.appendChild(script);
    }
  }, [latitude, longitude, address]);

  return (
    <View style={styles.contenedorMapa}>
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '90%', 
          borderRadius: 12,
        }} 
      />
      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate('Lista')}>
        <Text style={styles.botonTexto}>Volver a la Lista</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;

