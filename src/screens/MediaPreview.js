// src/screens/MediaPreview.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { COLORS, SPACING } from '../styles/colors';
import { downloadStatus, isStatusSaved } from '../utils/fileManager';

const MediaPreview = ({ route, navigation }) => {
  const { media, mediaList, currentIndex } = route.params;
  const { theme } = useTheme();
  const colors = COLORS[theme];
  
  const [index, setIndex] = useState(currentIndex || 0);
  const [currentMedia, setCurrentMedia] = useState(media);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, [currentMedia]);

  const checkIfSaved = async () => {
    const saved = await isStatusSaved(currentMedia.path);
    setIsSaved(saved);
  };

  const handleDownload = async () => {
    setLoading(true);
    const result = await downloadStatus(
      currentMedia.path,
      currentMedia.filename,
      currentMedia.type
    );
    setLoading(false);
    if (result.success) {
      Alert.alert('Success', result.message);
      setIsSaved(true);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: 'Share Status',
        url: `file://${currentMedia.path}`,
        message: 'Check out this status!',
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const goNext = () => {
    if (index < mediaList.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
      setCurrentMedia(mediaList[newIndex]);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
      setCurrentMedia(mediaList[newIndex]);
    }
  };

  const renderMedia = () => {
    if (currentMedia.type === 'image') {
      return (
        <Image
          source={{ uri: `file://${currentMedia.path}` }}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      );
    } else {
      return (
        <Video
          source={{ uri: `file://${currentMedia.path}` }}
          style={{ width: '100%', height: '100%' }}
          controls={true}
          resizeMode="contain"
          paused={false}
          repeat={false}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Media content */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {renderMedia()}
      </View>

      {/* Top close button */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Bottom controls */}
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={handleDownload} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Icon
              name={isSaved ? 'check-circle' : 'file-download'}
              size={30}
              color={isSaved ? '#4CAF50' : '#fff'}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare}>
          <Icon name="share" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={goPrev} disabled={index === 0}>
          <Icon name="navigate-before" size={30} color={index === 0 ? '#555' : '#fff'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={goNext} disabled={index === mediaList.length - 1}>
          <Icon name="navigate-next" size={30} color={index === mediaList.length - 1 ? '#555' : '#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MediaPreview;
