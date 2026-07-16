import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Animated,
  PanResponder,
} from 'react-native';
import Video from 'react-native-video';
import { useTheme } from '../context/ThemeContext';
import { COLORS, SPACING, FONT_SIZES } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatFileSize } from '../utils/fileUtils';

const { width, height } = Dimensions.get('window');

const MediaPreviewScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const colors = COLORS[theme];
  
  const { media, mediaList, currentIndex = 0 } = route.params || {};
  const [currentMedia, setCurrentMedia] = useState(media);
  const [currentIndexState, setCurrentIndexState] = useState(currentIndex);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const panResponder = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mediaList && mediaList.length > 0) {
      setCurrentMedia(mediaList[currentIndexState] || media);
    }
  }, [currentIndexState, mediaList, media]);

  // Setup pan responder for swipe
  useEffect(() => {
    panResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50 && currentIndexState > 0) {
          // Swipe right - previous
          translateX.setValue(width);
          setCurrentIndexState(currentIndexState - 1);
          translateX.setValue(0);
        } else if (gestureState.dx < -50 && currentIndexState < mediaList.length - 1) {
          // Swipe left - next
          translateX.setValue(-width);
          setCurrentIndexState(currentIndexState + 1);
          translateX.setValue(0);
        } else {
          // Reset
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }, [currentIndexState, mediaList, translateX]);

  const handleBack = () => {
    navigation.goBack();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoProgress = (data) => {
    setProgress(data.currentTime / duration);
  };

  const handleVideoLoad = (data) => {
    setDuration(data.duration);
    setLoading(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    videoRef.current?.seek(0);
  };

  const renderMedia = () => {
    if (!currentMedia) {
      return (
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={64} color={colors.textLight} />
          <Text style={[styles.errorText, { color: colors.text }]}>Media not found</Text>
        </View>
      );
    }

    const isVideo = currentMedia.type === 'video';

    if (isVideo) {
      return (
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: `file://${currentMedia.path}` }}
            style={styles.video}
            paused={!isPlaying}
            onProgress={handleVideoProgress}
            onLoad={handleVideoLoad}
            onEnd={handleVideoEnd}
            resizeMode="contain"
            repeat={false}
            volume={1.0}
            muted={false}
          />
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
          <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
            <Icon
              name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'}
              size={64}
              color="rgba(255,255,255,0.9)"
            />
          </TouchableOpacity>
          {!loading && (
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
          )}
        </View>
      );
    }

    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `file://${currentMedia.path}` }}
          style={styles.image}
          resizeMode="contain"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
    );
  };

  const renderControls = () => {
    const isVideo = currentMedia?.type === 'video';
    return (
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleBack}>
          <Icon name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.fileName} numberOfLines={1}>
            {currentMedia?.name || 'Media'}
          </Text>
          <Text style={styles.fileSize}>
            {currentMedia?.size ? formatFileSize(currentMedia.size) : ''}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              // Share will be implemented in Phase 4
              console.log('Share pressed');
            }}
          >
            <Icon name="share" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.downloadButton]}
            onPress={() => {
              // Download will be implemented in Phase 4
              console.log('Download pressed');
            }}
          >
            <Icon name="file-download" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCounter = () => {
    if (mediaList && mediaList.length > 1) {
      return (
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {currentIndexState + 1} / {mediaList.length}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000000' }]}>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.current?.panHandlers}
      >
        {renderMedia()}
        {renderControls()}
        {renderCounter()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.xl + 20,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlButton: {
    padding: SPACING.sm,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: SPACING.md,
  },
  fileName: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
  fileSize: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: FONT_SIZES.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  downloadButton: {
    backgroundColor: '#25D366',
    borderRadius: 20,
    paddingHorizontal: SPACING.sm,
  },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#25D366',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.lg,
  },
  counterContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.sm,
  },
});

export default MediaPreviewScreen;
