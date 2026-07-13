import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/**
 * Check and request storage permissions based on Android version
 */
export const checkAndRequestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      const androidVersion = Platform.Version;

      // For Android 13+ (API 33+)
      if (androidVersion >= 33) {
        return await requestAndroid13Permissions();
      } 
      // For Android 11-12 (API 30-32)
      else if (androidVersion >= 30) {
        return await requestAndroid11Permissions();
      } 
      // For Android 8-10 (API 26-29)
      else {
        return await requestLegacyPermissions();
      }
    }
    return true;
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

/**
 * Request permissions for Android 13+ (API 33+)
 */
const requestAndroid13Permissions = async () => {
  try {
    const permissions = [
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
    ];

    const results = await Promise.all(
      permissions.map(permission => request(permission))
    );

    const allGranted = results.every(result => result === RESULTS.GRANTED);
    const anyDenied = results.some(result => result === RESULTS.DENIED);

    if (!allGranted && anyDenied) {
      showPermissionDeniedDialog();
      return false;
    }

    return allGranted;
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

/**
 * Request permissions for Android 11-12 (API 30-32)
 */
const requestAndroid11Permissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    const readGranted = granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;
    const writeGranted = granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;

    if (!readGranted || !writeGranted) {
      showPermissionDeniedDialog();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

/**
 * Request permissions for Android 8-10 (API 26-29)
 */
const requestLegacyPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    const readGranted = granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;

    if (!readGranted) {
      showPermissionDeniedDialog();
      return false;
    }

    return true;
  } catch (error) {
    console.error('Permission request error:', error);
    return false;
  }
};

/**
 * Show dialog when permissions are denied
 */
const showPermissionDeniedDialog = () => {
  Alert.alert(
    'Permission Required',
    'This app needs storage permissions to access WhatsApp statuses. Please grant permissions in settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ]
  );
};

/**
 * Check if all required permissions are granted
 */
export const checkPermissionsStatus = async () => {
  if (Platform.OS === 'android') {
    const androidVersion = Platform.Version;

    if (androidVersion >= 33) {
      const imagePermission = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      const videoPermission = await check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
      return imagePermission === RESULTS.GRANTED && videoPermission === RESULTS.GRANTED;
    } else {
      const readPermission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      return readPermission === RESULTS.GRANTED;
    }
  }
  return false;
};
