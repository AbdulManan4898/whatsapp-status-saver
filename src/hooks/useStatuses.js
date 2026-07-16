import { useState, useEffect, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { requestStoragePermission, checkStoragePermission } from '../utils/permissionUtils';
import { getWhatsAppStatusPath, getStatusFiles } from '../utils/fileUtils';

export const useStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  const loadStatuses = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      // Check permission first
      const hasPermission = await checkStoragePermission();
      if (!hasPermission) {
        const granted = await requestStoragePermission();
        if (!granted) {
          setPermissionGranted(false);
          setError('Storage permission is required to view statuses');
          setLoading(false);
          return;
        }
      }
      setPermissionGranted(true);

      // Get WhatsApp status path
      const statusPath = await getWhatsAppStatusPath();
      if (!statusPath) {
        setError('WhatsApp status folder not found. Please make sure WhatsApp is installed.');
        setLoading(false);
        return;
      }

      // Scan for status files
      const files = await getStatusFiles(statusPath);
      
      // Separate images and videos
      const imageFiles = files.filter(f => f.type === 'image');
      const videoFiles = files.filter(f => f.type === 'video');

      setStatuses(files);
      setImages(imageFiles);
      setVideos(videoFiles);
    } catch (err) {
      console.error('Error loading statuses:', err);
      setError(err.message || 'Failed to load statuses');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshStatuses = useCallback(() => {
    setRefreshing(true);
    loadStatuses();
  }, [loadStatuses]);

  const getStatusById = useCallback((id) => {
    return statuses.find(s => s.id === id);
  }, [statuses]);

  // Auto refresh on mount
  useEffect(() => {
    loadStatuses();

    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      loadStatuses();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadStatuses]);

  return {
    statuses,
    images,
    videos,
    loading,
    refreshing,
    permissionGranted,
    error,
    refreshStatuses,
    getStatusById,
    loadStatuses,
  };
};
