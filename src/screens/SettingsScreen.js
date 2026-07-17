import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Linking,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createThemeStyles } from '../styles/theme';
import { COLORS, SPACING, BORDER_RADIUS } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const colors = COLORS[theme];
  const styles = createThemeStyles(theme);

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: 'dark-mode',
          label: 'Dark Mode',
          type: 'switch',
          value: isDark,
          onToggle: toggleTheme,
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: 'info',
          label: 'Version',
          value: '1.0.0',
          type: 'info',
        },
        {
          icon: 'privacy-tip',
          label: 'Privacy Policy',
          type: 'link',
          onPress: () => Linking.openURL('https://your-privacy-policy.com'),
        },
        {
          icon: 'code',
          label: 'Developer',
          value: 'Abdul Manan',
          type: 'info',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'email',
          label: 'Contact Support',
          type: 'link',
          onPress: () => Linking.openURL('mailto:support@example.com'),
        },
        {
          icon: 'rate-review',
          label: 'Rate App',
          type: 'link',
          onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=your.app.id'),
        },
        {
          icon: 'share',
          label: 'Share App',
          type: 'link',
          onPress: () => {
            // Share implementation
            console.log('Share app');
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    switch (item.type) {
      case 'switch':
        return (
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={styles.row}>
              <Icon name={item.icon} size={24} color={colors.icon} />
              <Text style={[styles.bodyText, { marginLeft: SPACING.md }]}>
                {item.label}
              </Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        );
      case 'info':
        return (
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <View style={styles.row}>
              <Icon name={item.icon} size={24} color={colors.icon} />
              <Text style={[styles.bodyText, { marginLeft: SPACING.md }]}>
                {item.label}
              </Text>
            </View>
            <Text style={[styles.bodyTextSecondary]}>{item.value}</Text>
          </View>
        );
      case 'link':
        return (
          <TouchableOpacity
            style={[styles.row, { justifyContent: 'space-between' }]}
            onPress={item.onPress}
          >
            <View style={styles.row}>
              <Icon name={item.icon} size={24} color={colors.icon} />
              <Text style={[styles.bodyText, { marginLeft: SPACING.md }]}>
                {item.label}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={[styles.screenContainer, { paddingHorizontal: SPACING.md }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { padding: SPACING.md, marginTop: SPACING.md }]}>
        <View style={styles.row}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SPACING.md,
            }}
          >
            <Icon name="file-download" size={32} color="#FFFFFF" />
          </View>
          <View>
            <Text style={[styles.header, { fontSize: 18 }]}>Status Saver</Text>
            <Text style={[styles.bodyTextSecondary, { fontSize: 12 }]}>
              Version 1.0.0
            </Text>
          </View>
        </View>
      </View>

      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={{ marginTop: SPACING.lg }}>
          <Text
            style={[
              styles.bodyTextSecondary,
              {
                fontSize: 12,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: SPACING.sm,
                paddingHorizontal: SPACING.xs,
              },
            ]}
          >
            {section.title}
          </Text>
          <View
            style={[
              styles.card,
              {
                paddingVertical: SPACING.sm,
                paddingHorizontal: SPACING.md,
                backgroundColor: colors.card,
              },
            ]}
          >
            {section.items.map((item, itemIndex) => (
              <View key={itemIndex}>
                {renderSettingItem(item)}
                {itemIndex < section.items.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.border,
                      marginVertical: SPACING.sm,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      <View style={{ marginVertical: SPACING.xl, alignItems: 'center' }}>
        <Text style={[styles.bodyTextLight, { fontSize: 12 }]}>
          Made with ❤️ using React Native
        </Text>
        <Text style={[styles.bodyTextLight, { fontSize: 10, marginTop: SPACING.xs }]}>
          © 2024 Status Saver. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
