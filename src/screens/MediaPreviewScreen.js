import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import StorageManager from '../modules/StorageManager';
import StatusModel from '../modules/StatusModel';

const { width, height } = Dimensions.get('window');

const MediaPreviewScreen = ({ route, navigation }) => {
  const { status: statusData } = route.params;
  const [status] = useState(new StatusModel(statusData));
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const storageManager = new StorageManager();

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    try {
      await storageManager.initialize();
      const saved = storageManager.isStatusSaved(status);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await storageManager.initialize();
      
      const savedStatus = await storageManager.saveStatus(status);
      setIsSaved(true);
      
      Alert.alert('Success', 'Status saved successfully!');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save status');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    // Share implementation will be in Phase 4
    Alert.alert('Share', 'Share feature coming soon!');
  };

  const renderImage = () => (
    <Image
      source={{ uri: `file://${status.path}` }}
      style={styles.media}
      resizeMode="contain"
      onLoad={() => setIsLoading(false)}
    />
  );

  const renderVideo = () => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: `file://${status.path}` }}
        style={styles.media}
        controls={true}
        resizeMode="contain"
        onLoad={() => setIsLoading(false)}
        paused={false}
        repeat={true}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25D366" />
          <Text style={styles.loadingText}>Loading media...</Text>
        </View>
      )}
      
      <View style={styles.mediaContainer}>
        {status.isImage() ? renderImage() : renderVideo()}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Text style={styles.filename} numberOfLines={1}>
            {status.filename}
          </Text>
          <Text style={styles.fileInfo}>
            {status.getFormattedSize()} • {status.type.charAt(0).toUpperCase() + status.type.slice(1)}
          </Text>
        </View>
        
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, isSaved && styles.savedButton]}
            onPress={handleDownload}
            disabled={isDownloading || isSaved}
          >
            {isDownloading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.actionButtonText}>
                {isSaved ? 'Saved ✓' : 'Download'}
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}
          >
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 10,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 14,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: width,
    height: height * 0.7,
  },
  videoContainer: {
    width: width,
    height: height * 0.7,
  },
  footer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 16,
    paddingBottom: 32,
  },
  infoContainer: {
    marginBottom: 12,
  },
  filename: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  fileInfo: {
    color: '#999999',
    fontSize: 12,
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#25D366',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedButton: {
    backgroundColor: '#4CAF50',
  },
  shareButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MediaPreviewScreen;
