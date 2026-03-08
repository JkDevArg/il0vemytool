import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

interface BluetoothDevice {
  id: string;
  name: string;
  mac: string;
  type: "phone" | "laptop" | "smartwatch" | "unknown";
  signal: number;
}

export default function BluetoothScannerScreen() {
  const colors = useColors();
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([
    {
      id: "1",
      name: "iPhone 15",
      mac: "AA:BB:CC:DD:EE:FF",
      type: "phone",
      signal: -35,
    },
    {
      id: "2",
      name: "MacBook Pro",
      mac: "11:22:33:44:55:66",
      type: "laptop",
      signal: -55,
    },
    {
      id: "3",
      name: "Apple Watch",
      mac: "77:88:99:AA:BB:CC",
      type: "smartwatch",
      signal: -45,
    },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "phone":
        return "iphone";
      case "laptop":
        return "laptopcomputer";
      case "smartwatch":
        return "applewatch";
      default:
        return "questionmark.circle";
    }
  };

  const getSignalStrength = (signal: number) => {
    if (signal > -40) return "Strong";
    if (signal > -60) return "Good";
    if (signal > -80) return "Fair";
    return "Weak";
  };

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Bluetooth Scanner
            </Text>
            <Text className="text-sm text-muted">
              Discover nearby Bluetooth devices
            </Text>
          </View>

          {/* Scan Button */}
          <Button
            size="lg"
            onPress={handleScan}
            disabled={isScanning}
            className="w-full"
          >
            <View className="flex-row items-center gap-2">
              <IconSymbol
                name={isScanning ? "stop.fill" : "play.fill"}
                size={20}
                color={colors.background}
              />
              <Text className="text-lg font-bold text-background">
                {isScanning ? "Scanning..." : "Scan Devices"}
              </Text>
            </View>
          </Button>

          {/* Scanning Indicator */}
          {isScanning && (
            <Card className="items-center justify-center py-8">
              <View className="w-24 h-24 border-2 border-accent rounded-full items-center justify-center">
                <View className="w-16 h-16 border-2 border-accent/50 rounded-full items-center justify-center">
                  <IconSymbol
                    name="bluetooth"
                    size={32}
                    color={colors.accent}
                  />
                </View>
              </View>
              <Text className="text-sm text-muted mt-4">
                Scanning for devices...
              </Text>
            </Card>
          )}

          {/* Devices List */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Devices Found ({devices.length})
              </Text>
            </View>

            <FlatList
              scrollEnabled={false}
              data={devices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    // Navigate to device analysis
                  }}
                  className="mb-3"
                >
                  <Card className="active:opacity-70">
                    <CardHeader>
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-accent/20 rounded-lg items-center justify-center">
                          <IconSymbol
                            name={getDeviceIcon(item.type) as any}
                            size={20}
                            color={colors.accent}
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-foreground">
                            {item.name}
                          </Text>
                          <Text className="text-xs text-muted font-mono">
                            {item.mac}
                          </Text>
                        </View>
                      </View>
                    </CardHeader>
                    <CardContent className="gap-2">
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                          <IconSymbol
                            name="signal.medium"
                            size={16}
                            color={colors.muted}
                          />
                          <Text className="text-xs text-muted">
                            {getSignalStrength(item.signal)}
                          </Text>
                        </View>
                        <Text className="text-xs font-mono text-foreground">
                          {item.signal} dBm
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </Pressable>
              )}
            />
          </View>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <Text className="text-sm font-semibold text-foreground">
                Device Types
              </Text>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row items-center gap-2 mb-2">
                <IconSymbol
                  name="iphone"
                  size={16}
                  color={colors.accent}
                />
                <Text className="text-xs text-muted">Phones & Tablets</Text>
              </View>
              <View className="flex-row items-center gap-2 mb-2">
                <IconSymbol
                  name="laptopcomputer"
                  size={16}
                  color={colors.accent}
                />
                <Text className="text-xs text-muted">Computers</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <IconSymbol
                  name="applewatch"
                  size={16}
                  color={colors.accent}
                />
                <Text className="text-xs text-muted">Wearables</Text>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
