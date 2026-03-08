import { ScrollView, Text, View, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stat } from "@/components/ui/stat";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

export default function HomeScreen() {
  const colors = useColors();
  const [wifiCount, setWifiCount] = useState(0);
  const [bluetoothCount, setBluetoothCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const recentScans = [
    { id: "1", name: "WiFi Scan", time: "2 min ago", status: "completed" },
    { id: "2", name: "Bluetooth Scan", time: "5 min ago", status: "completed" },
    { id: "3", name: "Network Audit", time: "1 hour ago", status: "completed" },
  ];

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-8 pb-8">
          {/* Header */}
          <View className="gap-2">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-primary rounded-lg items-center justify-center">
                <IconSymbol
                  name="shield.fill"
                  size={24}
                  color={colors.background}
                />
              </View>
              <View>
                <Text className="text-3xl font-bold text-foreground">
                  IL0veMyTool
                </Text>
                <Text className="text-xs text-muted">Network Auditor</Text>
              </View>
            </View>
          </View>

          {/* Primary Action Button */}
          <Button size="lg" className="w-full">
            <View className="flex-row items-center gap-2">
              <IconSymbol name="play.fill" size={20} color={colors.background} />
              <Text className="text-lg font-bold text-background">Start Scan</Text>
            </View>
          </Button>

          {/* Stats Grid */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Quick Stats
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Stat
                  label="WiFi Networks"
                  value={wifiCount}
                  icon={
                    <IconSymbol
                      name="wifi"
                      size={16}
                      color={colors.primary}
                    />
                  }
                />
              </View>
              <View className="flex-1">
                <Stat
                  label="Bluetooth Devices"
                  value={bluetoothCount}
                  icon={
                    <IconSymbol
                      name="bluetooth"
                      size={16}
                      color={colors.primary}
                    />
                  }
                />
              </View>
            </View>
          </View>

          {/* Connection Status */}
          <Card>
            <CardHeader>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">
                  Network Status
                </Text>
                <Badge variant={isConnected ? "secure" : "unknown"}>
                  {isConnected ? "Connected" : "Disconnected"}
                </Badge>
              </View>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">IP Address</Text>
                <Text className="text-sm font-mono text-foreground">
                  {isConnected ? "192.168.1.100" : "—"}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">Gateway</Text>
                <Text className="text-sm font-mono text-foreground">
                  {isConnected ? "192.168.1.1" : "—"}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">Signal Strength</Text>
                <Text className="text-sm font-mono text-foreground">
                  {isConnected ? "-45 dBm" : "—"}
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Recent Scans */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Recent Activity
            </Text>
            <FlatList
              scrollEnabled={false}
              data={recentScans}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card className="mb-2">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">
                        {item.name}
                      </Text>
                      <Text className="text-xs text-muted">{item.time}</Text>
                    </View>
                    <Badge variant="secure">Done</Badge>
                  </View>
                </Card>
              )}
            />
          </View>

          {/* Feature Highlights */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Features
            </Text>
            <View className="gap-2">
              <Card className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-primary/20 rounded-lg items-center justify-center">
                  <IconSymbol
                    name="wifi"
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    WiFi Scanner
                  </Text>
                  <Text className="text-xs text-muted">
                    Detect & analyze networks
                  </Text>
                </View>
              </Card>

              <Card className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-accent/20 rounded-lg items-center justify-center">
                  <IconSymbol
                    name="bluetooth"
                    size={16}
                    color={colors.accent}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    Bluetooth Scanner
                  </Text>
                  <Text className="text-xs text-muted">
                    Find nearby devices
                  </Text>
                </View>
              </Card>

              <Card className="flex-row items-center gap-3">
                <View className="w-8 h-8 bg-highlight/20 rounded-lg items-center justify-center">
                  <IconSymbol
                    name="network"
                    size={16}
                    color={colors.highlight}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-foreground">
                    Network Audit
                  </Text>
                  <Text className="text-xs text-muted">
                    Analyze connected IPs
                  </Text>
                </View>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
