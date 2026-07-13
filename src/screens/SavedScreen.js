// src/screens/SavedScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

// Mock saved data
const mockSaved = [
  { id: '1', filename: 'saved1.jpg', type: 'image', date: '2024-01-15' },
  { id: '2', filename: 'saved2.mp4', type: 'video', date: '2024-01-14' },
];

const SavedScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [savedItems, setSavedItems] = useState(mockSaved);

  const handleDelete = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleShare = (item) => {
    // Share functionality will be added in Phase 4
    console.log('Share:', item);
  };

  const renderSavedItem = ({ item }) => (
    <View style={[styles.savedCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.thumbnailContainer}>
        <View style={[styles.placeholder, { backgroundColor: colors.border }]}>
          <Icon 
            name={item.type === 'video' ? 'play-circle' : 'image'} 
            size={30} 
            color={colors.primary} 
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.filename, { color: colors.text }]} numberOfLines={1}>
          {item.filename}
        </Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>
          {item.date}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { borderColor: colors.border }]}
          onPress={() => handleShare(item)}
        >
          <Icon name="share-outline" size={20} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { borderColor: colors.border }]}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          renderItem={renderSavedItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="download-outline" size={80} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No saved statuses
          </Text>
          <Text style={[styles.emptySubText, { color: colors.textSecondary }]}>
            Downloaded statuses will appear here
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  thumbnailContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  filename: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    marginTop: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SavedScreen;
