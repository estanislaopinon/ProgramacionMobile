import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme.jsx';

const ErrorMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
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
    color: theme.colors.error,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ErrorMessage;