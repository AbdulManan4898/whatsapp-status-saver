import RNFS from 'react-native-fs';
import StatusModel from './StatusModel';
import { WHATSAPP_PATHS } from '../utils/constants';
import { checkPermissionsStatus } from './PermissionModule';
import { Platform } from 'react-native';

/**
 * File Scanner class to detect and scan WhatsApp statuses
 */
class FileScanner {
  constructor() {
    this.statuses = [];
    this.isScanning = false;
    this.scanError = null;
    this.whatsappPath = null;
  }

  /**
   * Main method to scan for WhatsApp statuses
   */
  async scanStatuses() {
    try {
      this.isScanning = true;
      this.scanError = null;

      // Check permissions first
      const hasPermissions = await checkPermissionsStatus();
      if (!hasPermissions) {
        throw new Error('Storage permissions not granted');
      }

      // Find the WhatsApp status folder
      const statusFolder = await this.findWhatsAppStatusFolder();
      if (!statusFolder) {
        throw new Error('WhatsApp status folder not found');
      }

      this.whatsappPath = statusFolder;

      // Scan files in the folder
      const files = await this.scanFolder(statusFolder);
      
      // Filter and process status files
      const statuses = await this.processFiles(files);
      
      // Sort by timestamp (newest first)
      statuses.sort((a, b) => b.timestamp - a.timestamp);
      
      this.statuses = statuses;
      this.isScanning = false;
      
      return this.statuses;
    } catch (error) {
      console.error('Scan error:', error);
      this.scanError = error.message;
      this.isScanning = false;
      throw error;
    }
  }

  /**
   * Find WhatsApp status folder using multiple paths
   */
  async findWhatsAppStatusFolder() {
    const pathsToCheck = [
      WHATSAPP_PATHS.primary,
      WHATSAPP_PATHS.alternative1,
      WHATSAPP_PATHS.alternative2,
      WHATSAPP_PATHS.alternative3,
    ];

    for (const path of pathsToCheck) {
      try {
        const exists = await RNFS.exists(path);
        if (exists) {
          console.log('Found WhatsApp status folder:', path);
          return path;
        }
      } catch (error) {
        console.log('Path not accessible:', path);
      }
    }

    // Try to find using SAF (Storage Access Framework) for Android 11+
    if (Platform.Version >= 30) {
      try {
        const safPath = await this.findViaSAF();
        if (safPath) {
          return safPath;
        }
      } catch (error) {
        console.log('SAF path not found:', error);
      }
    }

    return null;
  }

  /**
   * Attempt to find status folder using SAF (Android 11+)
   */
  async findViaSAF() {
    // This is a placeholder for SAF implementation
    // In a real implementation, you'd use the Storage Access Framework
    // to let the user select the WhatsApp folder
    console.log('Attempting SAF path detection...');
    
    // For Android 11+, we might need to use DocumentFile API
    // This would require a native module or React Native bridge
    
    // Return null for now - will be implemented in full version
    return null;
  }

  /**
   * Scan folder for files
   */
  async scanFolder(folderPath) {
    try {
      const files = await RNFS.readDir(folderPath);
      return files;
    } catch (error) {
      console.error('Error scanning folder:', error);
      throw new Error('Unable to read status folder');
    }
  }

  /**
   * Process files and create StatusModel objects
   */
  async processFiles(files) {
    const statuses = [];

    for (const file of files) {
      try {
        // Skip directories
        if (file.isDirectory()) continue;

        // Skip hidden files
        if (file.name.startsWith('.')) continue;

        // Check if it's a media file
        const status = new StatusModel({
          filename: file.name,
          path: file.path,
          size: file.size || 0,
          timestamp: file.mtime ? new Date(file.mtime).getTime() : Date.now(),
        });

        // Only add if it's a valid media type
        if (status.isImage() || status.isVideo()) {
          statuses.push(status);
        }
      } catch (error) {
        console.error('Error processing file:', file.name, error);
      }
    }

    return statuses;
  }

  /**
   * Get all statuses
   */
  getStatuses() {
    return this.statuses;
  }

  /**
   * Get only image statuses
   */
  getImageStatuses() {
    return this.statuses.filter(status => status.isImage());
  }

  /**
   * Get only video statuses
   */
  getVideoStatuses() {
    return this.statuses.filter(status => status.isVideo());
  }

  /**
   * Get status by ID
   */
  getStatusById(id) {
    return this.statuses.find(status => status.id === id);
  }

  /**
   * Get status by path
   */
  getStatusByPath(path) {
    return this.statuses.find(status => status.path === path);
  }

  /**
   * Check if statuses need refresh
   */
  needsRefresh() {
    // Check if last scan was more than 5 minutes ago
    const lastScanTime = this.lastScanTime || 0;
    const currentTime = Date.now();
    return (currentTime - lastScanTime) > 5 * 60 * 1000;
  }

  /**
   * Clear cached statuses
   */
  clearCache() {
    this.statuses = [];
    this.whatsappPath = null;
    this.lastScanTime = null;
  }
}

export default FileScanner;
