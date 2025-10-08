import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Text, RefreshControl, TouchableOpacity } from 'react-native';
import SearchInput from '../components/SearchInput.jsx';
import PokemonItem from '../components/PokemonItem.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import NoResultsMessage from '../components/NoResultsMessage.jsx';
import SkeletonLoader from '../components/SkeletonLoader.jsx';
import theme from '../styles/theme.jsx';

const PAGE_SIZE = 10;
const TOTAL_PAGES = 5;

const PokemonListScreen = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [cache, setCache] = useState({});

  const buildUrl = (pageNumber) => {
    const offset = (pageNumber - 1) * PAGE_SIZE;
    return `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
  };

  const fetchPokemon = useCallback(async (pageNumber) => {
    setError(null);
    setLoading(true);
    const url = buildUrl(pageNumber);
    try {
      if (cache[url]) {
        const { results } = cache[url];
        setPokemonData(results);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      
      setCache(prev => ({ ...prev, [url]: data }));
      setPokemonData(data.results);
    } catch (err) {
      console.error('Error en fetch:', err);
      setError(`Error al cargar datos: ${err.message}. Tira hacia abajo o presiona Reintentar para probar de nuevo.`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [cache]);

  useEffect(() => {
    fetchPokemon(page);
  }, [page, fetchPokemon]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPokemon(page);
  }, [page, fetchPokemon]);

  const handleRetry = () => {
    fetchPokemon(page);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < TOTAL_PAGES) setPage(page + 1);
  };

  const filteredPokemon = useMemo(() => {
    if (!searchTerm) return pokemonData;
    const lowerSearch = searchTerm.toLowerCase();
    return pokemonData.filter(poke => poke.name.toLowerCase().includes(lowerSearch));
  }, [pokemonData, searchTerm]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Pokédex</Text>
        <SkeletonLoader count={10} />
        <ActivityIndicator 
          style={styles.spinnerOverlay} 
          size="large" 
          color={theme.colors.primary} 
          animating={true} 
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <ErrorMessage message={error} />
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokédex</Text>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredPokemon.length === 0 ? (
        <NoResultsMessage />
      ) : (
        <FlatList
          data={filteredPokemon}
          renderItem={({ item }) => <PokemonItem name={item.name} url={item.url} />}
          keyExtractor={item => item.name}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />}
        />
      )}
      <PaginationControls
        prevUrl={page > 1 ? true : null}
        nextUrl={page < TOTAL_PAGES ? true : null}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <Text style={{textAlign: 'center', marginTop: 8}}>Página {page} de {TOTAL_PAGES}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  retryText: {
    color: theme.colors.card,
    fontSize: 16,
    fontWeight: '500',
 },
});

export default PokemonListScreen;