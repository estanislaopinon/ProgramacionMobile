import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import theme from '../styles/theme.jsx';

const SkeletonLoader = ({ count = 5 }) => {
  const shimmerAnim = new Animated.Value(0);

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const shimmerStyle = {
    transform: [
      {
        translateX: shimmerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-styles.card.width, styles.card.width],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.textPlaceholder}>
            <View style={styles.line1} />
            <View style={styles.line2} />
          </View>
          <Animated.View style={[styles.shimmer, shimmerStyle]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.small,
    ...theme.shadow,
    position: 'relative',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.background,
    borderRadius: 25,
    marginRight: theme.spacing.medium,
  },
  textPlaceholder: {
    flex: 1,
  },
  line1: {
    width: '70%',
    height: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 4,
    marginBottom: 4,
  },
  line2: {
    width: '50%',
    height: 12,
    backgroundColor: theme.colors.background,
    borderRadius: 4,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius.medium,
    opacity: 0.1,
  },
});

export default SkeletonLoader;