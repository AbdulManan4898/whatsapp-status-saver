import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { ThemeProvider, useTheme } from './theme/theme';
import RootNavigator from './navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppContent: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.statusBar}
      />
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
