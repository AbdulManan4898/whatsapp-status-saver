import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/theme';

interface SavedItem {
  id: string;
  filename: string;
  type: 'image' | 'video';
  dateSaved: string;
}

const SavedScreen: React.FC = () => {
  const { colors, typography } = useTheme();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  // Placeholder data for Phase 1
  const placeholderItems: SavedItem[] = [
    {
      id: '1',
      filename: 'Status_2024_01.jpg',
      type: 'image',
      dateSaved: '2024-01-15',
    },
    {
      id: '2',
      filename: 'Status_2024_02.mp4',
      type: 'video',
      dateSaved: '2024-01-16',
    },
  ];

  const renderItem = ({ item }: { item: SavedItem }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: colors.surface }]}
      onPress={() => {}}
    >
      <View style={styles.itemIcon}>
        <Icon
          name={item.type === 'image' ? 'image' : 'videocam'}
          size={32}
          color={colors.primary}
        />
      </View>
      <View style={styles.itemInfo}>
        <Text style={[typography.body1, styles.itemName, { color: colors.text }]}>
          {item.filename}
        </Text>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {item.dateSaved}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Icon name="delete-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[typography.headline2, styles.title, { color: colors.text }]}>
          Saved Statuses
        </Text>
        {savedItems.length > 0 && (
          <TouchableOpacity>
            <Text style={[typography.caption, { color: colors.primary }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {savedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
            <Icon name="download-done" size={64} color={colors.primary} />
          </View>
          <Text style={[typography.headline3, styles.emptyTitle, { color: colors.text }]}>
            No Saved Statuses
          </Text>
          <Text style={[typography.body2, styles.emptySubtitle, { color: colors.textSecondary }]}>
            Statuses you download will appear here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    marginBottom: 2,
  },
  deleteButton: {
    padding: 8,
  },
});

export default SavedScreen;
