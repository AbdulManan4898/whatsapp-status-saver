// No import needed in JS for type annotations

// RootStackParamList as a plain object
export const RootStackParamList = {
  Splash: undefined,
  MainTabs: undefined // NavigatorScreenParams would be handled at runtime
};

// TabParamList as a plain object
export const TabParamList = {
  Home: undefined,
  Saved: undefined,
  Settings: undefined
};

// HomeStackParamList as a plain object
export const HomeStackParamList = {
  HomeScreen: undefined,
  MediaPreview: { mediaId: '' }
};

// OR if you need to check param presence at runtime, you can use classes:

/**
 * RootStackParamList class
 */
export class RootStackParamList {
  static Splash = undefined;
  static MainTabs = undefined;
}

/**
 * TabParamList class
 */
export class TabParamList {
  static Home = undefined;
  static Saved = undefined;
  static Settings = undefined;
}

/**
 * HomeStackParamList class
 */
export class HomeStackParamList {
  static HomeScreen = undefined;
  static MediaPreview = { mediaId: '' };
}
