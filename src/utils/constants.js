export const WHATSAPP_STATUS_PATH = '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses';

export const APP_NAME = 'Status Downloader';
export const APP_VERSION = '1.0.0';

export const STORAGE_PERMISSION = 'android.permission.READ_EXTERNAL_STORAGE';

export const FILE_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
};

export const FILE_EXTENSIONS = {
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
  VIDEO: ['.mp4', '.3gp', '.mkv', '.avi', '.mov'],
};

export const MAX_VIDEO_DURATION = 60; // seconds

export const CACHE_CONFIG = {
  maxAge: 3600000, // 1 hour
  maxItems: 100,
};
