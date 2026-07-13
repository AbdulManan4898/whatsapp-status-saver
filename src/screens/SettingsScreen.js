import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import StorageManager from '../modules/StorageManager';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [storageUsage, setStorageUsage] = useState({ size: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  
  const storageManager = new StorageManager();

  useEffect(() => {
    loadStorageInfo();
  }, []);

  const loadStorageInfo = async () => {
    try {
      await storageManager.initialize();
      const usage = await storageManager.getStorageUsage();
      setStorageUsage(usage);
    } catch (error) {
      console.error('Error loading storage info:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will delete all downloaded statuses. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageManager.clearAllData();
              await loadStorageInfo();
              Alert.alert('Success', 'Cache cleared successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache');
            }
          },
        },
      ]
    );
  };

  const renderSettingItem = ({ icon, title, subtitle, action }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View>{action}</View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        {renderSettingItem({
          icon: '🌙',
          title: 'Dark Mode',
          subtitle: 'Toggle dark theme',
          action: (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D0D0D0', true: '#25D366' }}
              thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
            />
          ),
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        {renderSettingItem({
          icon: '💾',
          title: 'Storage Usage',
          subtitle: loading ? 'Loading...' : 
            `${formatSize(storageUsage.size)} • ${storageUsage.count} items`,
          action: null,
        })}
        {renderSettingItem({
          icon: '🗑️',
          title: 'Clear Cache',
          subtitle: 'Delete all downloaded statuses',
          action: (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearCache}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          ),
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        {renderSettingItem({
          icon: '📱',
          title: 'App Version',
          subtitle: '1.0.0',
          action: null,
        })}
        {renderSettingItem({
          icon: 'ℹ️',
          title: 'Developer',
          subtitle: 'Abdul Manan',
          action: null,
        })}
        {renderSettingItem({
          icon: '🔒',
          title: 'Privacy Policy',
          subtitle: 'All data stays on your device',
          action: null,
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ using React Native
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginVertical: 8,
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
});

export default SettingsScreen;
