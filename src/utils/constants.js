import { Platform } from 'react-native';

// WhatsApp status folder paths for different Android versions
export const WHATSAPP_PATHS = {
  // Primary WhatsApp media path
  primary: '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/.Statuses',
  
  // Alternative paths (fallback)
  alternative1: '/storage/emulated/0/WhatsApp/Media/.Statuses',
  alternative2: '/storage/self/primary/Android/media/com.whatsapp/WhatsApp/Media/.Statuses',
  alternative3: '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/Statuses',
};

// Supported media file extensions
export const MEDIA_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
  VIDEO: ['mp4', '3gp', 'mkv', 'avi', 'mov', 'webm'],
};

// App folder name for saved statuses
export const APP_FOLDER_NAME = 'StatusDownloader';

// Cache timeout (30 minutes)
export const CACHE_TIMEOUT = 30 * 60 * 1000;

// API endpoints (if any)
export const API_ENDPOINTS = {};

export const STATUS_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
};
