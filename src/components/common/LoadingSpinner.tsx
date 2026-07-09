import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../theme/theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message = 'Loading...',
}) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text style={[typography.body2, styles.message, { color: colors.textSecondary }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 16,
  },
});

export default LoadingSpinner;
