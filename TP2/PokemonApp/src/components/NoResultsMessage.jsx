import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme.jsx';

const NoResultsMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sin resultados</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NoResultsMessage;