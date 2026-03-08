import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

interface WiFiNetwork {
  id: string;
  ssid: string;
  signal: number;
  security: "WPA3" | "WPA2" | "Open";
  channel: number;
  frequency: string;
}

export default function WiFiScannerScreen() {
  const colors = useColors();
  const [isScanning, setIsScanning] = useState(false);
  const [networks, setNetworks] = useState<WiFiNetwork[]>([
    {
      id: "1",
      ssid: "HomeNetwork",
      signal: -45,
      security: "WPA3",
      channel: 6,
      frequency: "2.4 GHz",
    },
    {
      id: "2",
      ssid: "GuestWiFi",
      signal: -65,
      security: "WPA2",
      channel: 11,
      frequency: "2.4 GHz",
    },
    {
      id: "3",
      ssid: "OpenNetwork",
      signal: -75,
      security: "Open",
      channel: 1,
      frequency: "2.4 GHz",
    },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const getSecurityBadgeVariant = (security: string) => {
    if (security === "Open") return "vulnerable";
    if (security === "WPA2") return "warning";
    return "secure";
  };

  const getSignalStrength = (signal: number) => {
    if (signal > -50) return "Excellent";
    if (signal > -60) return "Good";
    if (signal > -70) return "Fair";
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
            <Text className="text-2xl font-bold text-foreground">WiFi Scanner</Text>
            <Text className="text-sm text-muted">
              Scan and analyze nearby WiFi networks
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
                {isScanning ? "Scanning..." : "Scan Networks"}
              </Text>
            </View>
          </Button>

          {/* Radar Animation */}
          {isScanning && (
            <Card className="items-center justify-center py-8">
              <View className="w-32 h-32 border-2 border-primary rounded-full items-center justify-center">
                <View className="w-24 h-24 border-2 border-primary/50 rounded-full items-center justify-center">
                  <View className="w-16 h-16 border-2 border-primary/30 rounded-full items-center justify-center">
                    <View className="w-4 h-4 bg-primary rounded-full" />
                  </View>
                </View>
              </View>
              <Text className="text-sm text-muted mt-4">
                Scanning for networks...
              </Text>
            </Card>
          )}

          {/* Networks List */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Networks Found ({networks.length})
              </Text>
            </View>

            <FlatList
              scrollEnabled={false}
              data={networks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    // Navigate to WiFi analysis
                  }}
                  className="mb-3"
                >
                  <Card className="active:opacity-70">
                    <CardHeader>
                      <View className="flex-row items-center justify-between gap-2">
                        <View className="flex-1">
                          <Text className="text-sm font-semibold text-foreground">
                            {item.ssid}
                          </Text>
                        </View>
                        <Badge variant={getSecurityBadgeVariant(item.security)}>
                          {item.security}
                        </Badge>
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
                      <View className="flex-row items-center justify-between">
                        <Text className="text-xs text-muted">
                          Channel {item.channel} • {item.frequency}
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
                Security Tips
              </Text>
            </CardHeader>
            <CardContent className="gap-2">
              <Text className="text-xs text-muted leading-relaxed">
                • Use WPA3 or WPA2 encryption for your networks
              </Text>
              <Text className="text-xs text-muted leading-relaxed">
                • Avoid Open networks for sensitive data
              </Text>
              <Text className="text-xs text-muted leading-relaxed">
                • Regularly update your router firmware
              </Text>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
