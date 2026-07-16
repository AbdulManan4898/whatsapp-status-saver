import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createThemeStyles } from '../styles/theme';
import { COLORS, SPACING } from '../styles/colors';
import { useStatuses } from '../hooks/useStatuses';
import MediaCard from '../components/MediaCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const colors = COLORS[theme];
  const styles = createThemeStyles(theme);
  
  const { images, videos, loading, refreshing, error, refreshStatuses, statuses } = useStatuses();
  const [activeTab, setActiveTab] = useState('all');

  const getDisplayData = () => {
    switch (activeTab) {
      case 'images':
        return images;
      case 'videos':
        return videos;
      default:
        return statuses;
    }
  };

  const displayData = getDisplayData();

  const renderMediaItem = ({ item, index }) => {
    return (
      <MediaCard
        item={item}
        onPress={() => {
          navigation.navigate('MediaPreview', {
            media: item,
            mediaList: displayData,
            currentIndex: index,
          });
        }}
      />
    );
  };

  const renderHeader = () => {
    if (loading) return null;
    return (
      <View style={{ paddingHorizontal: SPACING.md, paddingBottom: SPACING.sm }}>
        <View style={{ flexDirection: 'row', marginTop: SPACING.sm }}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: SPACING.sm,
              alignItems: 'center',
              borderBottomWidth: activeTab === 'all' ? 2 : 0,
              borderBottomColor: colors.primary,
              marginRight: SPACING.sm,
            }}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.bodyText,
                {
                  fontWeight: activeTab === 'all' ? '700' : '500',
                  color: activeTab === 'all' ? colors.primary : colors.textSecondary,
                },
              ]}
            >
              All ({statuses.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: SPACING.sm,
              alignItems: 'center',
              borderBottomWidth: activeTab === 'images' ? 2 : 0,
              borderBottomColor: colors.primary,
              marginRight: SPACING.sm,
            }}
            onPress={() => setActiveTab('images')}
          >
            <Text
              style={[
                styles.bodyText,
                {
                  fontWeight: activeTab === 'images' ? '700' : '500',
                  color: activeTab === 'images' ? colors.primary : colors.textSecondary,
                },
              ]}
            >
              Images ({images.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: SPACING.sm,
              alignItems: 'center',
              borderBottomWidth: activeTab === 'videos' ? 2 : 0,
              borderBottomColor: colors.primary,
            }}
            onPress={() => setActiveTab('videos')}
          >
            <Text
              style={[
                styles.bodyText,
                {
                  fontWeight: activeTab === 'videos' ? '700' : '500',
                  color: activeTab === 'videos' ? colors.primary : colors.textSecondary,
                },
              ]}
            >
              Videos ({videos.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="error-outline" size={64} color={colors.textLight} />
          <Text style={[styles.bodyText, { marginTop: SPACING.md, textAlign: 'center' }]}>
            {error}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: SPACING.lg,
              backgroundColor: colors.primary,
              paddingHorizontal: SPACING.xl,
              paddingVertical: SPACING.md,
              borderRadius: 8,
            }}
            onPress={refreshStatuses}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (displayData.length === 0) {
      return (
        <EmptyState
          title="No Statuses Found"
          message="WhatsApp statuses will appear here. Make sure WhatsApp is installed and has statuses to view."
          iconName="photo-library"
          onRetry={refreshStatuses}
        />
      );
    }

    return (
      <FlatList
        data={displayData}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id || item.path}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: SPACING.xs,
          paddingBottom: SPACING.xl,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshStatuses}
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
    <View style={[styles.screenContainer, { paddingTop: StatusBar.currentHeight || 0 }]}>
      {renderContent()}
    </View>
  );
};

export default HomeScreen;
