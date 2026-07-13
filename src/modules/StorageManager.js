import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import StatusModel from './StatusModel';
import { APP_FOLDER_NAME } from '../utils/constants';

/**
 * Storage Manager for handling saved statuses and app data
 */
class StorageManager {
  constructor() {
    this.STORAGE_KEY = 'saved_statuses';
    this.APP_FOLDER = `${RNFS.DownloadDirectoryPath}/${APP_FOLDER_NAME}`;
    this.savedStatuses = [];
    this.isInitialized = false;
  }

  /**
   * Initialize storage
   */
  async initialize() {
    try {
      await this.createAppFolder();
      await this.loadSavedStatuses();
      this.isInitialized = true;
    } catch (error) {
      console.error('Storage initialization error:', error);
      throw error;
    }
  }

  /**
   * Create app folder for downloads
   */
  async createAppFolder() {
    try {
      const exists = await RNFS.exists(this.APP_FOLDER);
      if (!exists) {
        await RNFS.mkdir(this.APP_FOLDER);
        console.log('App folder created:', this.APP_FOLDER);
      }
      return true;
    } catch (error) {
      console.error('Error creating app folder:', error);
      return false;
    }
  }

  /**
   * Load saved statuses from AsyncStorage
   */
  async loadSavedStatuses() {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.savedStatuses = parsed.map(item => StatusModel.fromJSON(item));
      } else {
        this.savedStatuses = [];
      }
      return this.savedStatuses;
    } catch (error) {
      console.error('Error loading saved statuses:', error);
      this.savedStatuses = [];
      return [];
    }
  }

  /**
   * Save statuses to AsyncStorage
   */
  async saveStatusesToStorage() {
    try {
      const data = JSON.stringify(this.savedStatuses.map(s => s.toJSON()));
      await AsyncStorage.setItem(this.STORAGE_KEY, data);
      return true;
    } catch (error) {
      console.error('Error saving statuses:', error);
      return false;
    }
  }

  /**
   * Save a status to device storage
   */
  async saveStatus(status) {
    try {
      // Check if already saved
      if (this.isStatusSaved(status)) {
        throw new Error('Status already saved');
      }

      // Generate unique filename
      const timestamp = Date.now();
      const ext = status.getExtension();
      const newFilename = `${timestamp}_${status.filename}`;
      const destinationPath = `${this.APP_FOLDER}/${newFilename}`;

      // Copy file
      await RNFS.copyFile(status.path, destinationPath);

      // Update status
      const savedStatus = new StatusModel({
        ...status.toJSON(),
        isDownloaded: true,
        downloadedPath: destinationPath,
        dateSaved: new Date().toISOString(),
      });

      // Add to saved list
      this.savedStatuses.push(savedStatus);
      await this.saveStatusesToStorage();

      return savedStatus;
    } catch (error) {
      console.error('Error saving status:', error);
      throw error;
    }
  }

  /**
   * Delete a saved status
   */
  async deleteSavedStatus(statusId) {
    try {
      const index = this.savedStatuses.findIndex(s => s.id === statusId);
      if (index === -1) {
        throw new Error('Status not found');
      }

      const status = this.savedStatuses[index];
      
      // Delete file
      if (status.downloadedPath) {
        const exists = await RNFS.exists(status.downloadedPath);
        if (exists) {
          await RNFS.unlink(status.downloadedPath);
        }
      }

      // Remove from list
      this.savedStatuses.splice(index, 1);
      await this.saveStatusesToStorage();

      return true;
    } catch (error) {
      console.error('Error deleting status:', error);
      throw error;
    }
  }

  /**
   * Get all saved statuses
   */
  getSavedStatuses() {
    return [...this.savedStatuses];
  }

  /**
   * Get saved status by ID
   */
  getSavedStatusById(id) {
    return this.savedStatuses.find(s => s.id === id);
  }

  /**
   * Check if a status is already saved
   */
  isStatusSaved(status) {
    return this.savedStatuses.some(s => s.path === status.path || s.id === status.id);
  }

  /**
   * Clear all saved data
   */
  async clearAllData() {
    try {
      // Delete all files
      for (const status of this.savedStatuses) {
        if (status.downloadedPath) {
          const exists = await RNFS.exists(status.downloadedPath);
          if (exists) {
            await RNFS.unlink(status.downloadedPath);
          }
        }
      }

      // Clear storage
      this.savedStatuses = [];
      await AsyncStorage.removeItem(this.STORAGE_KEY);

      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  /**
   * Get storage usage
   */
  async getStorageUsage() {
    try {
      const exists = await RNFS.exists(this.APP_FOLDER);
      if (!exists) return { size: 0, count: 0 };

      const files = await RNFS.readDir(this.APP_FOLDER);
      let totalSize = 0;
      
      for (const file of files) {
        if (!file.isDirectory()) {
          totalSize += file.size || 0;
        }
      }

      return {
        size: totalSize,
        count: this.savedStatuses.length,
      };
    } catch (error) {
      console.error('Error getting storage usage:', error);
      return { size: 0, count: 0 };
    }
  }
}

export default StorageManager;
