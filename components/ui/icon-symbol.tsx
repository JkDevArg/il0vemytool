// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconSymbolName = 
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "wifi"
  | "wifi.exclamationmark"
  | "signal.medium"
  | "bluetooth"
  | "bluetooth.circle"
  | "network"
  | "globe"
  | "server.rack"
  | "shield.fill"
  | "shield.slash"
  | "lock.fill"
  | "lock.open"
  | "iphone"
  | "laptopcomputer"
  | "applewatch"
  | "questionmark.circle"
  | "play.fill"
  | "stop.fill"
  | "gear"
  | "plus.circle"
  | "xmark.circle"
  | "puzzle.piece"
  | "square.grid.2x2"
  | "tab.home"
  | "tab.wifi"
  | "tab.bluetooth"
  | "tab.network"
  | "tab.plugins"
  | "tab.history";

type IconMapping = Record<IconSymbolName, ComponentProps<typeof MaterialIcons>["name"]>;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  // WiFi Scanner icons
  "wifi": "wifi",
  "wifi.exclamationmark": "wifi-off",
  "signal.medium": "signal-cellular-alt",
  // Bluetooth icons
  "bluetooth": "bluetooth",
  "bluetooth.circle": "bluetooth-connected",
  // Network icons
  "network": "router",
  "globe": "public",
  "server.rack": "dns",
  // Security icons
  "shield.fill": "security",
  "shield.slash": "security",
  "lock.fill": "lock",
  "lock.open": "lock-open",
  // Device icons
  "iphone": "phone-iphone",
  "laptopcomputer": "laptop",
  "applewatch": "watch",
  "questionmark.circle": "help-outline",
  // Action icons
  "play.fill": "play-arrow",
  "stop.fill": "stop",
  "gear": "settings",
  "plus.circle": "add-circle-outline",
  "xmark.circle": "cancel",
  // Plugin icons
  "puzzle.piece": "extension",
  "square.grid.2x2": "dashboard",
  // Tab bar icons
  "tab.home": "home",
  "tab.wifi": "wifi",
  "tab.bluetooth": "bluetooth",
  "tab.network": "router",
  "tab.plugins": "extension",
  "tab.history": "history",
} as const satisfies Record<IconSymbolName, ComponentProps<typeof MaterialIcons>["name"]>;

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
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
