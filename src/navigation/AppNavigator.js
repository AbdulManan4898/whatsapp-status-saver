import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MediaPreviewScreen from '../screens/MediaPreviewScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Bar Icon Component
const TabIcon = ({ focused, icon, label }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 24 }}>{icon}</Text>
    <Text
      style={{
        fontSize: 10,
        color: focused ? '#25D366' : '#999',
        marginTop: 2,
      }}
    >
      {label}
    </Text>
  </View>
);

// Home Stack Navigator
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FFFFFF',
      },
      headerTitleStyle: {
        fontWeight: '600',
        color: '#333',
      },
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: 'Status Downloader', headerShown: false }}
    />
    <Stack.Screen
      name="MediaPreview"
      component={MediaPreviewScreen}
      options={{ title: 'Preview' }}
    />
  </Stack.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#25D366',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="🏠" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="💾" label="Saved" />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="⚙️" label="Settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
