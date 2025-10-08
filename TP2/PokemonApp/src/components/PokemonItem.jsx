import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../styles/theme.jsx';

const PokemonItem = ({ name, url }) => {
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    const fetchSprite = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSprite(data.sprites.front_default);
      } catch (err) {
        console.warn(`Error fetching sprite for ${name}`);
      }
    };
    fetchSprite();
  }, [url]);

  return (
    <View style={styles.card}>
      {sprite && <Image source={{ uri: sprite }} style={styles.image} />}
      <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    ...theme.shadow,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: theme.spacing.medium,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.colors.text,
  },
});

export default PokemonItem;