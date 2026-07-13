import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 3;
const CARD_SIZE = width / NUM_COLUMNS - 12;

const HomeScreen = () => {
  const { theme, isDark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [selectedTab, setSelectedTab] = useState('images');

  // Mock data for UI demonstration
  const mockStatuses = [
    { id: '1', type: 'image', uri: 'https://via.placeholder.com/150/25D366/FFFFFF?text=Status+1' },
    { id: '2', type: 'image', uri: 'https://via.placeholder.com/150/128C7E/FFFFFF?text=Status+2' },
    { id: '3', type: 'video', uri: 'https://via.placeholder.com/150/80868B/FFFFFF?text=Video+1', duration: '0:15' },
    { id: '4', type: 'image', uri: 'https://via.placeholder.com/150/25D366/FFFFFF?text=Status+3' },
    { id: '5', type: 'image', uri: 'https://via.placeholder.com/150/128C7E/FFFFFF?text=Status+4' },
    { id: '6', type: 'video', uri: 'https://via.placeholder.com/150/80868B/FFFFFF?text=Video+2', duration: '0:30' },
    { id: '7', type: 'image', uri: 'https://via.placeholder.com/150/25D366/FFFFFF?text=Status+5' },
    { id: '8', type: 'image', uri: 'https://via.placeholder.com/150/128C7E/FFFFFF?text=Status+6' },
    { id: '9', type: 'video', uri: 'https://via.placeholder.com/150/80868B/FFFFFF?text=Video+3', duration: '0:22' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderStatusItem = ({ item }) => (
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
      onPress={() => {
        // Handle status preview
        console.log('Status selected:', item.id);
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      {item.type === 'video' && (
        <View style={styles.videoOverlay}>
          <Icon name="play-circle" size={32} color="#FFFFFF" />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      )}
      <View style={styles.cardOverlay}>
        <Icon name="download-outline" size={20} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );

  const filteredStatuses = mockStatuses.filter(
    item => item.type === selectedTab.replace('s', '')
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'images' && {
              borderBottomColor: theme.primary,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setSelectedTab('images')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: selectedTab === 'images' ? theme.primary : theme.textLight,
              },
            ]}
          >
            Images
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'videos' && {
              borderBottomColor: theme.primary,
              borderBottomWidth: 3,
            },
          ]}
          onPress={() => setSelectedTab('videos')}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: selectedTab === 'videos' ? theme.primary : theme.textLight,
              },
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status Grid */}
      {filteredStatuses.length > 0 ? (
        <FlatList
          data={filteredStatuses}
          renderItem={renderStatusItem}
          keyExtractor={item => item.id}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={styles.gridContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            name="images-outline"
            size={64}
            color={theme.textLight}
            style={styles.emptyIcon}
          />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No statuses found
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textLight }]}>
            Statuses will appear here when available
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
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
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 6,
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

export default HomeScreen;
