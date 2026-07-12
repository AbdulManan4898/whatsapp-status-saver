export const APP_NAME = 'Status Saver';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  THEME: '@status_saver_theme',
  SAVED_STATUSES: '@status_saver_saved',
};

export const WHATSAPP_PATHS = {
  // Android WhatsApp status folder paths
  ANDROID_10_PLUS: '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses',
  ANDROID_9_BELOW: '/storage/emulated/0/WhatsApp/Media/.Statuses',
};

export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  VIDEO: ['mp4', '3gp', 'mkv', 'avi'],
};

export const TAB_ROUTES = {
  HOME: 'Home',
  SAVED: 'Saved',
  SETTINGS: 'Settings',
} as const;

export type TabRoute = typeof TAB_ROUTES[keyof typeof TAB_ROUTES];
