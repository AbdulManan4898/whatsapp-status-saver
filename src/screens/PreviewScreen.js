// src/screens/PreviewScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

const PreviewScreen = ({ route, navigation }) => {
  const { colors, isDarkMode } = useTheme();
  const { status } = route.params || {};

  const handleDownload = () => {
    console.log('Download:', status);
  };

  const handleShare = () => {
    console.log('Share:', status);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Preview
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Media Preview Area */}
      <View style={styles.mediaContainer}>
        <View style={[styles.placeholder, { backgroundColor: colors.border }]}>
          <Icon 
            name={status?.type === 'video' ? 'play-circle' : 'image'} 
            size={80} 
            color={colors.textSecondary} 
          />
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
            {status?.filename || 'No media selected'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={[styles.actionBar, { borderTopColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={handleDownload}
        >
          <Icon name="download" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.secondary }]}
          onPress={handleShare}
        >
          <Icon name="share" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 32,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholder: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  placeholderText: {
    marginTop: 16,
    fontSize: 16,
  },
  actionBar: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PreviewScreen;
