import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme.jsx';

const PaginationControls = ({ prevUrl, nextUrl, onPrev, onNext }) => {
  return (
    <View style={styles.pagination}>
      {prevUrl && (
        <TouchableOpacity style={styles.button} onPress={onPrev}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      )}
      {nextUrl && (
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.medium,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    ...theme.shadow,
  },
  buttonText: {
    color: theme.colors.card,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PaginationControls;