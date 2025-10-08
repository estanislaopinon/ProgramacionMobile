import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import theme from '../styles/theme.jsx';

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="🔍 Buscar Pokémon..."
        placeholderTextColor={theme.colors.text + '80'} // 50% opacity
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.medium,
  },
  input: {
    height: 48,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.medium,
    fontSize: 16,
    color: theme.colors.text,
    ...theme.shadow,
  },
});

export default SearchInput;