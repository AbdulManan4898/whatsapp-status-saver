import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/theme';
import AppButton from '../components/common/AppButton';

// This is a placeholder UI for Phase 1
// Phase 2 will implement actual status detection
const HomeScreen: React.FC = () => {
  const { colors, typography } = useTheme();
  const [statuses, setStatuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Placeholder for Phase 2
  const scanStatuses = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[typography.headline2, styles.title, { color: colors.text }]}>
          WhatsApp Statuses
        </Text>
        <TouchableOpacity onPress={scanStatuses} style={styles.refreshButton}>
          <Icon name="refresh" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {statuses.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
            <Icon name="photo-library" size={64} color={colors.primary} />
          </View>
          <Text style={[typography.headline3, styles.emptyTitle, { color: colors.text }]}>
            No Statuses Found
          </Text>
          <Text style={[typography.body2, styles.emptySubtitle, { color: colors.textSecondary }]}>
            Make sure WhatsApp is installed and there are statuses available.
          </Text>
          <AppButton
            title="Scan Now"
            onPress={scanStatuses}
            style={styles.scanButton}
          />
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={[typography.body2, { color: colors.textSecondary }]}>
            Scanning for statuses...
          </Text>
        </View>
      )}

      {statuses.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Phase 3 will implement the actual grid view */}
          {statuses.map((_, index) => (
            <View key={index} style={[styles.gridItem, { backgroundColor: colors.surface }]}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Status {index + 1}
              </Text>
            </View>
          ))}
        </ScrollView>
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
  refreshButton: {
    padding: 8,
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
    marginBottom: 24,
  },
  scanButton: {
    minWidth: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  gridItem: {
    height: 120,
    borderRadius: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
