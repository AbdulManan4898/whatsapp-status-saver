import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from './colors';

export const createThemeStyles = (theme) => {
  const colors = COLORS[theme];

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    screenContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    header: {
      fontSize: FONT_SIZES.xxl,
      fontWeight: '700',
      color: colors.text,
    },
    subHeader: {
      fontSize: FONT_SIZES.lg,
      fontWeight: '600',
      color: colors.text,
    },
    bodyText: {
      fontSize: FONT_SIZES.md,
      color: colors.text,
    },
    bodyTextSecondary: {
      fontSize: FONT_SIZES.md,
      color: colors.textSecondary,
    },
    bodyTextLight: {
      fontSize: FONT_SIZES.sm,
      color: colors.textLight,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.xl,
      backgroundColor: colors.background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex: {
      flex: 1,
    },
    padding: {
      padding: SPACING.md,
    },
    paddingHorizontal: {
      paddingHorizontal: SPACING.md,
    },
    paddingVertical: {
      paddingVertical: SPACING.md,
    },
    margin: {
      margin: SPACING.md,
    },
    marginHorizontal: {
      marginHorizontal: SPACING.md,
    },
    marginVertical: {
      marginVertical: SPACING.md,
    },
  });
};
