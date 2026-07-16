import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { checkStoragePermission } from './permissionUtils';

// WhatsApp status folder paths
const getWhatsAppPaths = () => {
  if (Platform.OS === 'android') {
    const basePath = RNFS.ExternalDirectoryPath;
    const androidDataPath = `${basePath}/Android/media/com.whatsapp`;
    const internalWhatsAppPath = `${basePath}/WhatsApp`;
    
    // Possible WhatsApp status paths
    const paths = [
      // Primary path for newer Android versions
      `${androidDataPath}/WhatsApp/Media/.Statuses`,
      // Alternative path for some devices
      `${internalWhatsAppPath}/Media/.Statuses`,
      // Legacy path
      `${internalWhatsAppPath}/Media/Statuses`,
      // Another possible path
      `${androidDataPath}/.Statuses`,
      // Root WhatsApp data path
      `${androidDataPath}/WhatsApp/Media/Statuses`,
    ];

    // For Android 11+, the path might be different
    if (Platform.Version >= 30) {
      paths.unshift(`${androidDataPath}/WhatsApp/Media/.Statuses`);
      paths.unshift(`${androidDataPath}/WhatsApp/Media/Statuses`);
    }

    return paths;
  }
  return [];
};

export const getWhatsAppStatusPath = async () => {
  try {
    const paths = getWhatsAppPaths();
    
    // Try each path until we find one that exists
    for (const path of paths) {
      const exists = await RNFS.exists(path);
      if (exists) {
        console.log('Found WhatsApp status folder at:', path);
        return path;
      }
    }
    
    console.warn('Could not find WhatsApp status folder');
    return null;
  } catch (error) {
    console.error('Error finding WhatsApp status folder:', error);
    return null;
  }
};

export const getStatusFiles = async (statusPath) => {
  try {
    if (!statusPath) {
      return [];
    }

    const files = await RNFS.readDir(statusPath);
    
    // Filter and sort files
    const statusFiles = files
      .filter(file => {
        const fileName = file.name.toLowerCase();
        // Skip system files and non-media
        if (fileName.startsWith('.') || fileName.startsWith('thumb')) {
          return false;
        }
        // Check if it's an image or video
        const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => fileName.endsWith(ext));
        const isVideo = ['.mp4', '.mkv', '.3gp', '.avi', '.mov'].some(ext => fileName.endsWith(ext));
        return isImage || isVideo;
      })
      .map(file => {
        const fileName = file.name.toLowerCase();
        const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => fileName.endsWith(ext));
        return {
          id: file.name + '_' + file.mtime,
          name: file.name,
          path: file.path,
          type: isImage ? 'image' : 'video',
          size: file.size,
          mtime: file.mtime,
          ctime: file.ctime,
          timestamp: file.mtime || Date.now(),
        };
      })
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); // Newest first

    return statusFiles;
  } catch (error) {
    console.error('Error reading status files:', error);
    return [];
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
