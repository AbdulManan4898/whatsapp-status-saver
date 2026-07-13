import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: isDark ? 'moon' : 'sunny',
          label: 'Dark Mode',
          type: 'switch',
          value: isDark,
          onPress: toggleTheme,
        },
      ],
    },
    {
      title: 'Storage',
      items: [
        {
          icon: 'folder-open',
          label: 'Storage Path',
          type: 'button',
          subtitle: 'Default',
          onPress: () => console.log('Change storage path'),
        },
        {
          icon: 'trash-bin',
          label: 'Clear Cache',
          type: 'button',
          subtitle: 'Clear temporary files',
          onPress: () => console.log('Clear cache'),
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: 'information-circle',
          label: 'Version',
          type: 'info',
          subtitle: '1.0.0',
        },
        {
          icon: 'chatbubble',
          label: 'Privacy Policy',
          type: 'button',
          onPress: () => Linking.openURL('https://example.com/privacy'),
        },
        {
          icon: 'mail',
          label: 'Contact Support',
          type: 'button',
          onPress: () => Linking.openURL('mailto:support@example.com'),
        },
      ],
    },
  ];

  const renderSettingItem = (item, index) => {
    switch (item.type) {
      case 'switch':
        return (
          <View key={index} style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <Icon name={item.icon} size={24} color={theme.primary} />
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                {item.label}
              </Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onPress}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        );
      case 'button':
        return (
          <TouchableOpacity
            key={index}
            style={[styles.settingItem, { borderBottomColor: theme.border }]}
            onPress={item.onPress}
          >
            <View style={styles.settingLeft}>
              <Icon name={item.icon} size={24} color={theme.primary} />
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                {item.label}
              </Text>
            </View>
            <View style={styles.settingRight}>
              {item.subtitle && (
                <Text style={[styles.settingSubtitle, { color: theme.textLight }]}>
                  {item.subtitle}
                </Text>
              )}
              <Icon name="chevron-forward" size={20} color={theme.textLight} />
            </View>
          </TouchableOpacity>
        );
      case 'info':
        return (
          <View key={index} style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <View style={styles.settingLeft}>
              <Icon name={item.icon} size={24} color={theme.primary} />
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                {item.label}
              </Text>
            </View>
            <Text style={[styles.settingSubtitle, { color: theme.textLight }]}>
              {item.subtitle}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Settings
        </Text>
      </View>

      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            {section.title}
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: theme.backgroundCard }]}>
            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textLight }]}>
          Status Downloader v1.0.0
        </Text>
        <Text style={[styles.footerSubtext, { color: theme.textLight }]}>
          Made with ❤️
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingSubtitle: {
    fontSize: 14,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
  },
});

export default SettingsScreen;
