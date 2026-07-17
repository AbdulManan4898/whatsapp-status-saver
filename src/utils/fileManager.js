import RNFS from 'react-native-fs';
import { Alert, Platform } from 'react-native';
import { addSavedStatus, removeSavedStatus, loadStatuses } from './storage';

// We'll save to a folder on external storage
const SAVED_DIR = `${RNFS.ExternalDirectoryPath}/StatusSaver`;

const ensureDirectory = async () => {
  const exists = await RNFS.exists(SAVED_DIR);
  if (!exists) {
    await RNFS.mkdir(SAVED_DIR);
  }
};

export const downloadStatus = async (sourcePath, filename, type) => {
  try {
    await ensureDirectory();

    const extension = type === 'image' ? '.jpg' : '.mp4';
    const destPath = `${SAVED_DIR}/${filename}${extension}`;

    // Check if already exists physically
    const fileExists = await RNFS.exists(destPath);
    if (fileExists) {
      const saved = await loadStatuses();
      const alreadySaved = saved.some(item => item.path === destPath);
      if (alreadySaved) {
        return { success: false, message: 'Already downloaded' };
      }
      // Edge case: file exists but not in storage – add it
      await addSavedStatus({
        filename: filename + extension,
        path: destPath,
        type,
        date_saved: new Date().toISOString(),
      });
      return { success: true, message: 'File exists, added to saved list' };
    }

    // Copy file
    await RNFS.copyFile(sourcePath, destPath);

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

export const deleteSavedStatus = async (id, filePath) => {
  try {
    const exists = await RNFS.exists(filePath);
    if (exists) {
      await RNFS.unlink(filePath);
    }
    const updated = await removeSavedStatus(id);
    return { success: true, data: updated };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, message: error.message };
  }
};

export const getSavedStatuses = async () => {
  return await loadStatuses();
};

export const isStatusSaved = async (path) => {
  const saved = await loadStatuses();
  return saved.some(item => item.path === path);
};
