import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const CARD_SIZE = width / NUM_COLUMNS - 12;

const SavedScreen = () => {
  const { theme, isDark } = useTheme();
  const [savedItems, setSavedItems] = useState([]);

  // Mock saved items
  const mockSavedItems = [
    { id: '1', type: 'image', uri: 'https://via.placeholder.com/150/25D366/FFFFFF?text=Saved+1', date: '2 hours ago' },
    { id: '2', type: 'image', uri: 'https://via.placeholder.com/150/128C7E/FFFFFF?text=Saved+2', date: 'Yesterday' },
    { id: '3', type: 'video', uri: 'https://via.placeholder.com/150/80868B/FFFFFF?text=Saved+Video+1', date: '2 days ago' },
  ];

  const renderSavedItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          width: CARD_SIZE,
          height: CARD_SIZE,
          margin: 4,
          backgroundColor: theme.backgroundCard,
        },
      ]}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      {item.type === 'video' && (
        <View style={styles.videoOverlay}>
          <Icon name="play-circle" size={28} color="#FFFFFF" />
        </View>
      )}
      <View style={styles.cardOverlay}>
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="close-circle" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {savedItems.length > 0 || mockSavedItems.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
              Saved Statuses
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textLight }]}>
              {mockSavedItems.length} items saved
            </Text>
          </View>
          <FlatList
            data={mockSavedItems}
            renderItem={renderSavedItem}
            keyExtractor={item => item.id}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={styles.gridContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            name="save-outline"
            size={64}
            color={theme.textLight}
            style={styles.emptyIcon}
          />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No saved statuses
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textLight }]}>
            Download statuses to save them here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  gridContainer: {
    padding: 4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
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
  cardOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  deleteButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SavedScreen;
