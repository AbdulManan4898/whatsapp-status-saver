import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { COLORS, SPACING } from '../styles/colors';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 20) / 3;

const LoadingSkeleton = () => {
  const { theme } = useTheme();
  const colors = COLORS[theme];

  const renderSkeletonItem = () => (
    <View
      style={[
        styles.skeletonCard,
        {
          backgroundColor: colors.surface,
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header skeleton */}
      <View style={styles.headerSkeleton}>
        <View style={[styles.tabSkeleton, { backgroundColor: colors.surface }]} />
        <View style={[styles.tabSkeleton, { backgroundColor: colors.surface }]} />
        <View style={[styles.tabSkeleton, { backgroundColor: colors.surface }]} />
      </View>
      {/* Grid skeleton */}
      <View style={styles.grid}>
        {[...Array(9)].map((_, index) => (
          <React.Fragment key={index}>
            {renderSkeletonItem()}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.sm,
  },
  headerSkeleton: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  tabSkeleton: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  skeletonCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 2,
    borderRadius: 4,
  },
});

export default LoadingSkeleton;
