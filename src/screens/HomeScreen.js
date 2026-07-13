import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import FileScanner from '../modules/FileScanner';
import StorageManager from '../modules/StorageManager';
import StatusModel from '../modules/StatusModel';
import { checkAndRequestPermissions } from '../modules/PermissionModule';

const { width } = Dimensions.get('window');
const numColumns = 3;
const itemSize = width / numColumns;

const HomeScreen = ({ navigation }) => {
  const [statuses, setStatuses] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'images', 'videos'
  const [scanError, setScanError] = useState(null);

  const fileScanner = new FileScanner();
  const storageManager = new StorageManager();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await checkAndRequestPermissions();
      await storageManager.initialize();
      await loadStatuses();
    } catch (error) {
      console.error('Initialization error:', error);
      setScanError('Failed to initialize app');
    } finally {
      setLoading(false);
    }
  };

  const loadStatuses = async () => {
    try {
      setLoading(true);
      setScanError(null);
      
      const scannedStatuses = await fileScanner.scanStatuses();
      setStatuses(scannedStatuses);
      applyFilter(scannedStatuses, selectedFilter);
      
      if (scannedStatuses.length === 0) {
        setScanError('No statuses found. Make sure WhatsApp is installed and has statuses.');
      }
    } catch (error) {
      console.error('Error loading statuses:', error);
      setScanError(error.message || 'Failed to load statuses');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStatuses();
    setRefreshing(false);
  };

  const applyFilter = (statusList, filter) => {
    let filtered = statusList;
    
    if (filter === 'images') {
      filtered = statusList.filter(s => s.isImage());
    } else if (filter === 'videos') {
      filtered = statusList.filter(s => s.isVideo());
    }
    
    setFilteredStatuses(filtered);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    applyFilter(statuses, filter);
  };

  const handleStatusPress = (status) => {
    navigation.navigate('MediaPreview', { status: status.toJSON() });
  };

  const renderStatusItem = ({ item }) => {
    const isImage = item.isImage();
    const isVideo = item.isVideo();
    
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleStatusPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.imageWrapper}>
          {isImage ? (
            <Image
              source={{ uri: `file://${item.path}` }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : isVideo ? (
            <View style={styles.videoPlaceholder}>
              <Image
                source={{ uri: `file://${item.path}` }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.videoOverlay}>
                <Text style={styles.videoIcon}>▶</Text>
              </View>
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>📁</Text>
            </View>
          )}
          
          {item.isDownloaded && (
            <View style={styles.downloadedBadge}>
              <Text style={styles.badgeText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>WhatsApp Statuses</Text>
      <Text style={styles.subtitle}>
        {filteredStatuses.length} statuses found
      </Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'all' && styles.filterActive]}
          onPress={() => handleFilterChange('all')}
        >
          <Text style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'images' && styles.filterActive]}
          onPress={() => handleFilterChange('images')}
        >
          <Text style={[styles.filterText, selectedFilter === 'images' && styles.filterTextActive]}>
            Images
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'videos' && styles.filterActive]}
          onPress={() => handleFilterChange('videos')}
        >
          <Text style={[styles.filterText, selectedFilter === 'videos' && styles.filterTextActive]}>
            Videos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={styles.loadingText}>Scanning for statuses...</Text>
        <Text style={styles.loadingSubtext}>This may take a moment</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredStatuses}
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No Statuses Found</Text>
            <Text style={styles.emptyText}>
              {scanError || 'Make sure WhatsApp has statuses available'}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadStatuses}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
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
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 4,
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
  filterContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: '#25D366',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    width: itemSize,
    height: itemSize,
    padding: 1,
  },
  imageWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  videoPlaceholder: {
    flex: 1,
    position: 'relative',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  videoIcon: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  placeholderText: {
    fontSize: 30,
  },
  downloadedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#25D366',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#25D366',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
