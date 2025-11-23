// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'star.fill': 'star',
  'checkmark.circle.fill': 'check-circle',
  'triangle.fill': 'change-history',
  'flag.fill': 'flag',
  'bell.fill': 'notifications',
  'film.fill': 'movie',
  'person.fill': 'person',
  'questionmark.circle.fill': 'help',
  'binoculars.fill': 'visibility',
  'play.circle.fill': 'play-circle',
  'checkmark.circle': 'check-circle',
  'bookmark': 'bookmark',
  'person': 'person',
  'chevron.left': 'chevron-left',
  'line.horizontal.3': 'menu',
  'info.circle.fill': 'info',
  'exclamationmark.triangle.fill': 'warning',
  'circle.slash': 'cancel',
  'line.horizontal.3.decrease': 'zoom-out',
  'circle.fill': 'circle',
  'smileyface': 'sentiment-satisfied',
  'smileyface.fill': 'sentiment-satisfied',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // Use mapped icon or try to use the name directly as fallback
  const iconName = MAPPING[name] || (name as any);
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
