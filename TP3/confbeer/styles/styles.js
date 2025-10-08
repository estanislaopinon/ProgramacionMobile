import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Estilos para ConferenceListScreen
  contenedorLista: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1a1a1a',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    margin: 10,
    fontSize: 16,
  },
  resultados: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imagen: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  titulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  disertante: {
    color: '#ccc',
    fontSize: 14,
  },
  hora: {
    color: '#8a2be2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botonMapa: {
    backgroundColor: '#8a2be2',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Estilos para ConferenceDetailScreen
  contenedorDetalle: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  cargando: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
  },
  imagenDetalle: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  descripcion: { // Movido desde ConferenceDetailScreen.js
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },

  // Estilos para MapScreen
  contenedorMapa: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  mapa: {
    flex: 1,
  },
  botonVolver: {
    backgroundColor: '#8a2be2',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
  },
});