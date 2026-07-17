import RNFS from 'react-native-fs';
import { Platform, PermissionsAndroid } from 'react-native';
import { addSavedStatus, removeSavedStatus, loadStatuses } from './storage';

// Base directory for saved statuses (external storage)
const SAVED_DIR = `${RNFS.ExternalDirectoryPath}/StatusSaver`;

// Ensure the directory exists
const ensureDirectory = async () => {
  const exists = await RNFS.exists(SAVED_DIR);
  if (!exists) {
    await RNFS.mkdir(SAVED_DIR);
  }
};

// Download a status (copy from WhatsApp folder to our app folder)
export const downloadStatus = async (sourcePath, filename, type) => {
  try {
    await ensureDirectory();

    // Build destination path
    const extension = type === 'image' ? '.jpg' : '.mp4';
    const destPath = `${SAVED_DIR}/${filename}${extension}`;

    // Check if already exists physically
    const fileExists = await RNFS.exists(destPath);
    if (fileExists) {
      // If exists, check if already saved in AsyncStorage to avoid duplicate entry
      const saved = await loadStatuses();
      const alreadySaved = saved.some(item => item.path === destPath);
      if (alreadySaved) {
        return { success: false, message: 'Already downloaded' };
      }
      // If exists but not in storage, add it (edge case)
      await addSavedStatus({
        filename: filename + extension,
        path: destPath,
        type,
        date_saved: new Date().toISOString(),
      });
      return { success: true, message: 'File already exists, added to saved list' };
    }

    // Copy file
    await RNFS.copyFile(sourcePath, destPath);

    // Save metadata to AsyncStorage
    await addSavedStatus({
      filename: filename + extension,
      path: destPath,
      type,
      date_saved: new Date().toISOString(),
    });

    return { success: true, message: 'Download successful' };
  } catch (error) {
    console.error('Download error:', error);
    return { success: false, message: error.message };
  }
};

// Delete a saved status (file + metadata)
export const deleteSavedStatus = async (id, filePath) => {
  try {
    // Delete the physical file
    const exists = await RNFS.exists(filePath);
    if (exists) {
      await RNFS.unlink(filePath);
    }
    // Remove from AsyncStorage
    const updated = await removeSavedStatus(id);
    return { success: true, data: updated };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, message: error.message };
  }
};

// Get list of saved statuses (from AsyncStorage)
export const getSavedStatuses = async () => {
  return await loadStatuses();
};

// Check if a file is already saved (by path)
export const isStatusSaved = async (path) => {
  const saved = await loadStatuses();
  return saved.some(item => item.path === path);
};
