import React from 'react';
import PropTypes from 'prop-types';

// Simple SVG spinner component
const Spinner = ({ size = 40, color = '#007AFF' }) => {
  const strokeWidth = size / 8;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        animation: 'spin 0.8s linear infinite',
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={Math.PI * (size - strokeWidth)}
        strokeDashoffset={Math.PI * (size - strokeWidth) * 0.75}
      />
    </svg>
  );
};

const LoadingSpinner = ({
  size = 'large',
  message = 'Loading...',
  theme = {
    colors: {
      primary: '#007AFF',
      textSecondary: '#6C757D',
    },
    typography: {
      body2: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '1.5',
      },
    },
  },
}) => {
  const { colors, typography } = theme;

  // Map size to pixel values
  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 40;
      default:
        return 40;
    }
  };

  const containerStyle = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '200px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const messageStyle = {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: '16px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <Spinner size={getSpinnerSize()} color={colors.primary} />
      {message && (
        <p style={messageStyle}>{message}</p>
      )}
    </div>
  );
};

// Add CSS for spin animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  message: PropTypes.string,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
      textSecondary: PropTypes.string,
    }),
    typography: PropTypes.shape({
      body2: PropTypes.object,
    }),
  }),
};

export default LoadingSpinner;
