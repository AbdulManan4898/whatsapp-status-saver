import React from 'react';
import PropTypes from 'prop-types';

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  theme = {
    colors: {
      primary: '#007AFF',
      secondary: '#6C757D',
    },
    typography: {
      button: {
        fontSize: 16,
        fontWeight: '600',
      },
    },
  },
}) => {
  const { colors, typography } = theme;

  const getButtonStyle = () => {
    const baseStyle = {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      borderWidth: 1,
      borderStyle: 'solid',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          borderColor: colors.primary,
          color: '#FFFFFF',
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
          color: '#FFFFFF',
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: colors.primary,
          color: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: colors.primary };
      default:
        return { color: '#FFFFFF' };
    }
  };

  const buttonStyles = {
    ...getButtonStyle(),
    ...style,
  };

  const textStyles = {
    ...typography.button,
    textAlign: 'center',
    margin: 0,
    ...getTextStyle(),
    ...textStyle,
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onPress) {
      onPress(e);
    }
  };

  // Simple loading spinner
  const LoadingSpinner = () => (
    <div
      style={{
        display: 'inline-block',
        width: '20px',
        height: '20px',
        border: '2px solid #ffffff',
        borderTop: '2px solid transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );

  return (
    <button
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && icon}
          <span style={textStyles}>{title}</span>
        </>
      )}
    </button>
  );
};

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  icon: PropTypes.node,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
    }),
    typography: PropTypes.shape({
      button: PropTypes.object,
    }),
  }),
};

// Add CSS for spinner animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AppButton;
