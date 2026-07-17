// src/screens/SavedScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { COLORS, SPACING } from '../styles/colors';
import { useSavedStatuses } from '../hooks/useSavedStatuses';
import EmptyState from '../components/EmptyState';

const SavedScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const colors = COLORS[theme];
  const { savedStatuses, loading, deleteStatus } = useSavedStatuses();

  const handleDelete = (id, path) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this saved status?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            const result = await deleteStatus(id, path);
            if (!result.success) {
              Alert.alert('Error', result.message);
            }
          },
          style: 'destructive',
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        marginHorizontal: SPACING.md,
        marginVertical: SPACING.xs,
      }}
    >
      {item.type === 'image' ? (
        <Image
          source={{ uri: `file://${item.path}` }}
          style={{ width: 60, height: 60, borderRadius: 8 }}
        />
      ) : (
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#333',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="play-arrow" size={30} color="#fff" />
        </View>
      )}
      <View style={{ flex: 1, marginLeft: SPACING.md }}>
        <Text style={{ color: colors.text, fontSize: 14, fontWeight: '500' }}>
          {item.filename}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
          {new Date(item.date_saved).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id, item.path)}>
        <Icon name="delete" size={24} color={colors.error || '#ff4444'} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: StatusBar.currentHeight || 0 }}>
      <FlatList
        data={savedStatuses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: SPACING.sm }}
        ListEmptyComponent={
          <EmptyState
            title="No Saved Statuses"
            message="Downloaded statuses will appear here."
            iconName="file-download"
          />
        }
      />
    </View>
  );
};

export default SavedScreen;
