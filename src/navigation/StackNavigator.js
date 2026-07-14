import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../styles/colors';

import HomeScreen from '../screens/HomeScreen';
import MediaPreviewScreen from '../screens/MediaPreviewScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { theme, isDark } = useTheme();
  const colors = COLORS[theme];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          color: colors.text,
          fontSize: 18,
          fontWeight: '600',
        },
        headerTintColor: colors.text,
        headerBackTitle: 'Back',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Statuses',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MediaPreview"
        component={MediaPreviewScreen}
        options={{
          title: 'Media Preview',
          headerTransparent: true,
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
