import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  Home: undefined;
  Saved: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  MediaPreview: { mediaId: string };
};
