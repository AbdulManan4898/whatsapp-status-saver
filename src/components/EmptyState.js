import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmptyState = ({ 
  title = 'No Data', 
  message = 'Nothing to show here', 
  iconName = 'error-outline',
  onRetry,
  buttonText = 'Refresh',
}) => {
  const { theme } = useTheme();
  const colors = COLORS[theme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Icon name={iconName} size={64} color={colors.textLight} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  message: {
    fontSize: FONT_SIZES.md,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  button: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: FONT_SIZES.md,
  },
});

export default EmptyState;
