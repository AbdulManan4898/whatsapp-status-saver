// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

// Mock data for UI demonstration
const mockStatuses = [
  { id: '1', type: 'image', filename: 'status1.jpg', timestamp: Date.now() },
  { id: '2', type: 'video', filename: 'status2.mp4', timestamp: Date.now() },
  { id: '3', type: 'image', filename: 'status3.jpg', timestamp: Date.now() },
  { id: '4', type: 'image', filename: 'status4.jpg', timestamp: Date.now() },
  { id: '5', type: 'video', filename: 'status5.mp4', timestamp: Date.now() },
];

const HomeScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();
  const [statuses, setStatuses] = useState(mockStatuses);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStatuses = statuses.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const renderStatusItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.statusCard, { backgroundColor: colors.statusCard }]}
      onPress={() => navigation.navigate('Preview', { status: item })}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        <View style={[styles.placeholder, { backgroundColor: colors.border }]}>
          <Icon 
            name={item.type === 'video' ? 'play-circle' : 'image'} 
            size={40} 
            color={colors.primary} 
          />
        </View>
        {item.type === 'video' && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>0:15</Text>
          </View>
        )}
      </View>
      <Text style={[styles.filename, { color: colors.text }]} numberOfLines={1}>
        {item.filename}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with filter tabs */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {['all', 'image', 'video'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && { 
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
                { borderColor: colors.border }
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === filter ? '#FFFFFF' : colors.text }
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Status Grid */}
      {filteredStatuses.length > 0 ? (
        <FlatList
          data={filteredStatuses}
          renderItem={renderStatusItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="images-outline" size={80} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No statuses found
          </Text>
          <Text style={[styles.emptySubText, { color: colors.textSecondary }]}>
            WhatsApp statuses will appear here
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
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  gridContainer: {
    padding: 8,
  },
  statusCard: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thumbnailContainer: {
    aspectRatio: 1,
    position: 'relative',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  filename: {
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    textAlign: 'center',
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

export default HomeScreen;
