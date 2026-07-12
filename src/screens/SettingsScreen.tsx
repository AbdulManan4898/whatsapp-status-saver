import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme/theme';
import { APP_NAME, APP_VERSION } from '../utils/constants';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  danger?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  isSwitch = false,
  switchValue = false,
  onSwitchChange,
  danger = false,
}) => {
  const { colors, typography } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={isSwitch}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <Icon name={icon} size={22} color={danger ? colors.error : colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={[typography.body1, styles.settingTitle, { color: danger ? colors.error : colors.text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[typography.caption, styles.settingSubtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={colors.textLight} />
      )}
    </TouchableOpacity>
  );
};

const SettingsScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();

  const handleClearCache = () => {
    // Phase 4: implement cache clearing
    console.log('Clear cache');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://example.com/privacy');
  };

  const handleContactUs = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: 'dark-mode',
          title: 'Dark Mode',
          subtitle: isDark ? 'Enabled' : 'Disabled',
          isSwitch: true,
          switchValue: isDark,
          onSwitchChange: toggleTheme,
        },
      ],
    },
    {
      title: 'Storage',
      items: [
        {
          icon: 'storage',
          title: 'Clear Cache',
          subtitle: 'Clear temporary files',
          onPress: handleClearCache,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'privacy-tip',
          title: 'Privacy Policy',
          onPress: handlePrivacyPolicy,
        },
        {
          icon: 'contact-support',
          title: 'Contact Us',
          subtitle: 'support@example.com',
          onPress: handleContactUs,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.appName, { color: colors.text }]}>
            {APP_NAME}
          </Text>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
            Version {APP_VERSION}
          </Text>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContainer, { backgroundColor: colors.surface }]}>
              {section.items.map((item, itemIndex) => (
                <SettingItem
                  key={itemIndex}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  onPress={item.onPress}
                  isSwitch={item.isSwitch}
                  switchValue={item.switchValue}
                  onSwitchChange={item.onSwitchChange}
                  danger={item.danger}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textLight }]}>
            Made with ❤️ by Abdul Manan
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContainer: {
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
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
  },
  settingSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
  },
});

export default SettingsScreen;
