/**
 * Typography Configuration
 * Status Saver Mobile App
 * 
 * @description Centralized typography styles for consistent UI
 * @version 1.0.0
 */

// ============================================
// TYPOGRAPHY STYLES
// ============================================

export const typography = {
  headline1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: 0.25,
    fontFamily: 'System', // Will be overridden by custom fonts if available
  },
  headline2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.15,
    fontFamily: 'System',
  },
  headline3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    letterSpacing: 0.15,
    fontFamily: 'System',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    fontFamily: 'System',
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0.1,
    fontFamily: 'System',
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: 'System',
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: 'System',
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    fontFamily: 'System',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: 'System',
    textTransform: 'uppercase', // Optional for buttons
  },
  overline: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 1.5,
    fontFamily: 'System',
    textTransform: 'uppercase',
  },
};

// ============================================
// TYPOGRAPHY VARIANTS FOR SPECIFIC USE CASES
// ============================================

/**
 * Status saver specific typography variants
 */
export const statusTypography = {
  // For status cards/previews
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    color: '#1A1A1A',
  },
  statusTime: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#666666',
  },
  statusCount: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#4A4A4A',
  },
  // For media preview
  mediaInfo: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  // For empty states
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: '#666666',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#999999',
    textAlign: 'center',
  },
};

// ============================================
// CUSTOM FONT CONFIGURATION
// ============================================

export const fontConfig = {
  // For custom fonts (if you add them)
  family: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  // Size scale
  scale: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a typography style with custom overrides
 * @param {string} baseStyle - Base typography key (e.g., 'body1', 'headline1')
 * @param {Object} overrides - Custom style overrides
 * @returns {Object} Combined typography style
 */
export const createTypography = (baseStyle, overrides = {}) => {
  const base = typography[baseStyle];
  if (!base) {
    console.warn(`Typography style "${baseStyle}" not found`);
    return overrides;
  }
  return { ...base, ...overrides };
};

/**
 * Combines multiple typography styles with priority to later ones
 * @param {...Object} styles - Typography style objects to merge
 * @returns {Object} Merged typography style
 */
export const mergeTypography = (...styles) => {
  return Object.assign({}, ...styles);
};

/**
 * Gets typography style with platform-specific adjustments
 * @param {string} styleKey - Typography style key
 * @param {Object} platformOverrides - Platform-specific overrides
 * @returns {Object} Platform-adjusted typography style
 */
export const getPlatformTypography = (styleKey, platformOverrides = {}) => {
  const base = typography[styleKey];
  if (!base) {
    console.warn(`Typography style "${styleKey}" not found`);
    return platformOverrides;
  }
  
  // Platform-specific adjustments
  const platformStyles = {
    ios: {
      // iOS specific adjustments
    },
    android: {
      // Android specific adjustments (e.g., different font weights)
      fontWeight: base.fontWeight === '700' ? 'bold' : base.fontWeight,
    },
    default: {},
  };
  
  // Merge base, platform styles, and overrides
  const platform = Platform?.OS || 'default';
  const platformStyle = platformStyles[platform] || platformStyles.default;
  
  return { ...base, ...platformStyle, ...platformOverrides };
};

// ============================================
// EXPORT CONFIGURATIONS
// ============================================

export default {
  typography,
  statusTypography,
  fontConfig,
  createTypography,
  mergeTypography,
  getPlatformTypography,
};
