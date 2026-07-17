import { useState, useEffect, useCallback } from 'react';
import { getSavedStatuses, deleteSavedStatus } from '../utils/fileManager';

export const useSavedStatuses = () => {
  const [savedStatuses, setSavedStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = useCallback(async () => {
    setLoading(true);
    const data = await getSavedStatuses();
    setSavedStatuses(data);
    setLoading(false);
  }, []);

  const deleteStatus = useCallback(async (id, path) => {
    const result = await deleteSavedStatus(id, path);
    if (result.success) {
      setSavedStatuses(result.data);
    }
    return result;
  }, []);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  return { savedStatuses, loading, loadSaved, deleteStatus };
};
