import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { check, request, RESULTS, PERMISSIONS } from 'react-native-permissions';

export const checkStoragePermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      // Android 13+
      const readMedia = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      const readVideo = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
      return readMedia === RESULTS.GRANTED && readVideo === RESULTS.GRANTED;
    } else {
      const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      return result === RESULTS.GRANTED;
    }
  }
  return true;
};

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        // Android 13+ - separate permissions for images and videos
        const imageResult = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        const videoResult = await request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        
        if (imageResult === RESULTS.GRANTED && videoResult === RESULTS.GRANTED) {
          return true;
        }
        
        // If user denied, try to show rationale
        Alert.alert(
          'Permission Required',
          'This app needs storage permission to access WhatsApp statuses. Please grant permission in settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      } else {
        const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (result === RESULTS.GRANTED) {
          return true;
        }
        Alert.alert(
          'Permission Required',
          'This app needs storage permission to access WhatsApp statuses.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const requestWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        // Android 13+ - write permissions are not needed for media, we use MediaStore
        return true;
      } else {
        const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        return result === RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};
