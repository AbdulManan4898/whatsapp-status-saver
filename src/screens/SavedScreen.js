import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import StorageManager from '../modules/StorageManager';

const SavedScreen = () => {
  const [savedStatuses, setSavedStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const storageManager = new StorageManager();

  useEffect(() => {
    loadSavedStatuses();
  }, []);

  const loadSavedStatuses = async () => {
    try {
      setLoading(true);
      await storageManager.initialize();
      const saved = storageManager.getSavedStatuses();
      setSavedStatuses(saved);
    } catch (error) {
      console.error('Error loading saved statuses:', error);
      Alert.alert('Error', 'Failed to load saved statuses');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedStatuses();
    setRefreshing(false);
  };

  const handleDelete = (statusId) => {
    Alert.alert(
      'Delete Status',
      'Are you sure you want to delete this saved status?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageManager.deleteSavedStatus(statusId);
              await loadSavedStatuses();
              Alert.alert('Success', 'Status deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete status');
            }
          },
        },
      ]
    );
  };

  const renderSavedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.savedItem}
      onLongPress={() => handleDelete(item.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: `file://${item.path}` }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.filename}
        </Text>
        <Text style={styles.itemDate}>
          Saved: {new Date(item.dateSaved).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={styles.loadingText}>Loading saved statuses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Statuses</Text>
        <Text style={styles.subtitle}>
          {savedStatuses.length} items saved
        </Text>
      </View>
      
      <FlatList
        data={savedStatuses}
        renderItem={renderSavedItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💾</Text>
            <Text style={styles.emptyTitle}>No Saved Statuses</Text>
            <Text style={styles.emptyText}>
              Download statuses from the Home tab to save them here
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    padding: 8,
  },
  savedItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 40,
  },
});

export default SavedScreen;
