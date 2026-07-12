import { TextStyle } from 'react-native';

export const typography = {
  headline1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  } as TextStyle,
  headline2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  } as TextStyle,
  headline3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  } as TextStyle,
  body1: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  } as TextStyle,
  body2: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  } as TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  } as TextStyle,
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  } as TextStyle,
};

export type Typography = typeof typography;
