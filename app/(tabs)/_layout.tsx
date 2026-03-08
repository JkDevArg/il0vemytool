import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tab.home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wifi"
        options={{
          title: "WiFi",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tab.wifi" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bluetooth"
        options={{
          title: "Bluetooth",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tab.bluetooth" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="audit"
        options={{
          title: "Audit",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tab.network" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plugins"
        options={{
          title: "Plugins",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tab.plugins" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
