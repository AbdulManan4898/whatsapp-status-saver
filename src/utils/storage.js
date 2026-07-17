import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_STATUSES_KEY = '@saved_statuses';

// Save the whole list
export const saveStatuses = async (statuses) => {
  try {
    await AsyncStorage.setItem(SAVED_STATUSES_KEY, JSON.stringify(statuses));
  } catch (error) {
    console.error('Failed to save statuses:', error);
  }
};

// Load the list
export const loadStatuses = async () => {
  try {
    const data = await AsyncStorage.getItem(SAVED_STATUSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load statuses:', error);
    return [];
  }
};

// Add a single status
export const addSavedStatus = async (status) => {
  const current = await loadStatuses();
  // Prevent duplicate by checking path or filename
  const exists = current.some(item => item.path === status.path);
  if (exists) return false;
  const updated = [...current, { ...status, id: Date.now().toString() }];
  await saveStatuses(updated);
  return true;
};

// Remove a status by id
export const removeSavedStatus = async (id) => {
  const current = await loadStatuses();
  const updated = current.filter(item => item.id !== id);
  await saveStatuses(updated);
  return updated;
};
