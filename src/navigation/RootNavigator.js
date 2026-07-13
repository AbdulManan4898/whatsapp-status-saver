import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useNavigate,
  useLocation,
  Outlet
} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import your screen components
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TAB_ROUTES } from '../utils/constants';

// Simple icon components
const HomeIcon = ({ focused, color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {focused ? (
      <>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </>
    ) : (
      <>
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </>
    )}
  </svg>
);

const SavedIcon = ({ focused, color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={focused ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4v16l8-4 8 4V4a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
  </svg>
);

const SettingsIcon = ({ focused, color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Tab Bar component
const TabBar = ({ activeTab, setActiveTab, theme }) => {
  const { colors } = theme;
  
  const tabs = [
    { key: TAB_ROUTES.HOME, label: 'Statuses', Icon: HomeIcon },
    { key: TAB_ROUTES.SAVED, label: 'Saved', Icon: SavedIcon },
    { key: TAB_ROUTES.SETTINGS, label: 'Settings', Icon: SettingsIcon },
  ];

  const tabBarStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.tabBar || colors.card,
    borderTop: `1px solid ${colors.border}`,
    paddingBottom: '4px',
    height: '60px',
    position: 'sticky',
    bottom: 0,
    width: '100%',
  };

  const tabStyle = (isActive) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: '8px 0',
    cursor: 'pointer',
    color: isActive ? colors.primary : colors.textSecondary,
    textDecoration: 'none',
    border: 'none',
    background: 'transparent',
  });

  const labelStyle = (isActive) => ({
    fontSize: '12px',
    fontWeight: '500',
    marginTop: '4px',
    color: isActive ? colors.primary : colors.textSecondary,
  });

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div style={tabBarStyle}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            style={tabStyle(isActive)}
            onClick={() => handleTabClick(tab.key)}
          >
            <tab.Icon 
              focused={isActive} 
              color={isActive ? colors.primary : colors.textSecondary} 
              size={24} 
            />
            <span style={labelStyle(isActive)}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Main Tabs component
const MainTabs = ({ theme }) => {
  const [activeTab, setActiveTab] = useState(TAB_ROUTES.HOME);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync active tab with URL
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (Object.values(TAB_ROUTES).includes(path)) {
      setActiveTab(path);
    }
  }, [location]);

  // Render the appropriate component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case TAB_ROUTES.HOME:
        return <HomeScreen theme={theme} />;
      case TAB_ROUTES.SAVED:
        return <SavedScreen theme={theme} />;
      case TAB_ROUTES.SETTINGS:
        return <SettingsScreen theme={theme} />;
      default:
        return <HomeScreen theme={theme} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderContent()}
      </div>
      <TabBar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          navigate(`/${tab}`);
        }} 
        theme={theme}
      />
    </div>
  );
};

// Root Navigator component
const RootNavigator = ({ 
  theme = {
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      card: '#FFFFFF',
      text: '#000000',
      textSecondary: '#6C757D',
      border: '#E0E0E0',
      tabBar: '#FFFFFF',
    },
    isDark: false,
  }
}) => {
  const { colors, isDark } = theme;

  // Navigate from splash after delay
  const SplashWithNavigation = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000);
      
      return () => clearTimeout(timer);
    }, [navigate]);

    return <SplashScreen theme={theme} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashWithNavigation />} />
        <Route path="/splash" element={<SplashWithNavigation />} />
        <Route 
          path="/home" 
          element={<MainTabs theme={theme} />} 
        />
        <Route 
          path="/saved" 
          element={<MainTabs theme={theme} />} 
        />
        <Route 
          path="/settings" 
          element={<MainTabs theme={theme} />} 
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

RootNavigator.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
      background: PropTypes.string,
      card: PropTypes.string,
      text: PropTypes.string,
      textSecondary: PropTypes.string,
      border: PropTypes.string,
      tabBar: PropTypes.string,
    }),
    isDark: PropTypes.bool,
  }),
};

export default RootNavigator;
