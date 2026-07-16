import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createThemeStyles } from '../styles/theme';
import { COLORS, SPACING } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MediaCard from '../components/MediaCard';
import EmptyState from '../components/EmptyState';

const SavedScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const colors = COLORS[theme];
  const styles = createThemeStyles(theme);

  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedItems = async () => {
    try {
      setLoading(true);
      const savedData = await AsyncStorage.getItem('savedStatuses');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setSavedItems(parsed);
      }
    } catch (error) {
      console.error('Error loading saved items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSavedItems();
    
    // Refresh saved items when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadSavedItems();
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    setRefreshing(true);
    loadSavedItems();
  };

  const renderSavedItem = ({ item, index }) => {
    return (
      <MediaCard
        item={item}
        onPress={() => {
          navigation.navigate('MediaPreview', {
            media: item,
            mediaList: savedItems,
            currentIndex: index,
          });
        }}
      />
    );
  };

  const renderHeader = () => {
    if (loading) return null;
    return (
      <View style={{ paddingHorizontal: SPACING.md, paddingVertical: SPACING.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.subHeader, { fontSize: 16 }]}>
            Saved Statuses ({savedItems.length})
          </Text>
          {savedItems.length > 0 && (
            <TouchableOpacity
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem('savedStatuses');
                  setSavedItems([]);
                } catch (error) {
                  console.error('Error clearing saved items:', error);
                }
              }}
            >
              <Text style={{ color: colors.primary, fontWeight: '500' }}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (savedItems.length === 0) {
      return (
        <EmptyState
          title="No Saved Statuses"
          message="Downloaded statuses will appear here. Start downloading from the Home tab."
          iconName="folder-open"
        />
      );
    }

    return (
      <FlatList
        data={savedItems}
        renderItem={renderSavedItem}
        keyExtractor={(item) => item.id || item.path}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: SPACING.xs,
          paddingBottom: SPACING.xl,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<View style={{ height: SPACING.md }} />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
        }}
      />
    );
  };

  return (
    <View style={styles.screenContainer}>
      {renderContent()}
    </View>
  );
};

export default SavedScreen;
