import React from 'react';
import PropTypes from 'prop-types';

// Simple back arrow icon component
const BackIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const AppHeader = ({
  title,
  showBack = false,
  onBack,
  rightComponent,
  theme = {
    colors: {
      primary: '#007AFF',
    },
    typography: {
      headline2: {
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '1.2',
      },
    },
  },
}) => {
  const { colors, typography } = theme;

  const containerStyle = {
    paddingTop: '44px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    width: '100%',
    boxSizing: 'border-box',
  };

  const leftContainerStyle = {
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  const titleStyle = {
    ...typography.headline2,
    color: '#FFFFFF',
    flex: '1',
    textAlign: 'center',
    margin: 0,
    padding: '0 8px',
  };

  const rightContainerStyle = {
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };

  const backButtonStyle = {
    padding: '4px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease',
  };

  const handleBackClick = (e) => {
    if (onBack) {
      onBack(e);
    }
  };

  return (
    <header style={containerStyle}>
      <div style={leftContainerStyle}>
        {showBack && (
          <button
            onClick={handleBackClick}
            style={backButtonStyle}
            aria-label="Go back"
          >
            <BackIcon size={24} color="#FFFFFF" />
          </button>
        )}
      </div>
      <h1 style={titleStyle}>{title}</h1>
      <div style={rightContainerStyle}>
        {rightComponent}
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
  rightComponent: PropTypes.node,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
    }),
    typography: PropTypes.shape({
      headline2: PropTypes.object,
    }),
  }),
};

export default AppHeader;
