import { MEDIA_TYPES } from '../utils/constants';

/**
 * Status Model class to represent a WhatsApp status
 */
class StatusModel {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.filename = data.filename || '';
    this.path = data.path || '';
    this.type = data.type || this.detectType(data.filename);
    this.size = data.size || 0;
    this.timestamp = data.timestamp || Date.now();
    this.thumbnail = data.thumbnail || null;
    this.duration = data.duration || null; // For videos
    this.isDownloaded = data.isDownloaded || false;
    this.downloadedPath = data.downloadedPath || null;
    this.dateSaved = data.dateSaved || null;
  }

  /**
   * Generate a unique ID for the status
   */
  generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Detect media type based on file extension
   */
  detectType(filename) {
    if (!filename) return 'unknown';
    
    const ext = filename.split('.').pop().toLowerCase();
    
    if (MEDIA_TYPES.IMAGE.includes(ext)) {
      return 'image';
    } else if (MEDIA_TYPES.VIDEO.includes(ext)) {
      return 'video';
    }
    
    return 'unknown';
  }

  /**
   * Check if the status is an image
   */
  isImage() {
    return this.type === 'image';
  }

  /**
   * Check if the status is a video
   */
  isVideo() {
    return this.type === 'video';
  }

  /**
   * Get file extension
   */
  getExtension() {
    return this.filename.split('.').pop().toLowerCase();
  }

  /**
   * Format file size
   */
  getFormattedSize() {
    const bytes = this.size;
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Check if the file exists
   */
  async fileExists() {
    try {
      const RNFS = require('react-native-fs');
      return await RNFS.exists(this.path);
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  }

  /**
   * Create from JSON data
   */
  static fromJSON(data) {
    return new StatusModel(data);
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      filename: this.filename,
      path: this.path,
      type: this.type,
      size: this.size,
      timestamp: this.timestamp,
      thumbnail: this.thumbnail,
      duration: this.duration,
      isDownloaded: this.isDownloaded,
      downloadedPath: this.downloadedPath,
      dateSaved: this.dateSaved,
    };
  }
}

export default StatusModel;
