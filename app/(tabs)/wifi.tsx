import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { nativeWiFiService, type NativeWiFiNetwork } from "@/lib/native-wifi-service";
import { useState } from "react";

export default function WiFiScannerScreen() {
  const colors = useColors();
  const [isScanning, setIsScanning] = useState(false);
  const [networks, setNetworks] = useState<NativeWiFiNetwork[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);
    try {
      const scannedNetworks = await nativeWiFiService.scanWiFiNetworks();
      setNetworks(scannedNetworks);
    } catch (err) {
      setError("Error scanning WiFi networks");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const getSecurityBadgeVariant = (capabilities: string) => {
    if (capabilities.includes("WPA3")) return "secure";
    if (capabilities.includes("WPA2")) return "warning";
    return "vulnerable";
  };

  const getSecurityLabel = (capabilities: string) => {
    if (capabilities.includes("WPA3")) return "WPA3";
    if (capabilities.includes("WPA2")) return "WPA2";
    if (capabilities.includes("WEP")) return "WEP";
    return "Open";
  };

  const getSignalStrength = (signal: number) => {
    if (signal > -50) return "Excellent";
    if (signal > -60) return "Good";
    if (signal > -70) return "Fair";
    return "Weak";
  };

  const getChannelFromFrequency = (frequency: number) => {
    // Convertir frecuencia MHz a canal WiFi
    if (frequency >= 2412 && frequency <= 2472) {
      return Math.round((frequency - 2407) / 5);
    }
    return Math.round((frequency - 5000) / 5);
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
              {isScanning ? (
                <>
                  <Spinner size={20} color={colors.background} />
                  <Text className="text-lg font-bold text-background">
                    Scanning...
                  </Text>
                </>
              ) : (
                <>
                  <IconSymbol
                    name="play.fill"
                    size={20}
                    color={colors.background}
                  />
                  <Text className="text-lg font-bold text-background">
                    Scan Networks
                  </Text>
                </>
              )}
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

          {/* Error Message */}
          {error && (
            <Card className="bg-error/10 border border-error">
              <Text className="text-sm text-error">{error}</Text>
            </Card>
          )}

          {/* Networks List */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Networks Found ({networks.length})
              </Text>
            </View>

            {networks.length === 0 && !isScanning ? (
              <Card>
                <Text className="text-sm text-muted text-center">
                  No networks found. Tap "Scan Networks" to start scanning.
                </Text>
              </Card>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={networks}
                keyExtractor={(item) => item.BSSID}
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
                              {item.SSID || "Hidden Network"}
                            </Text>
                          </View>
                          <Badge variant={getSecurityBadgeVariant(item.capabilities) as any}>
                            {getSecurityLabel(item.capabilities)}
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
                              {getSignalStrength(item.level)}
                            </Text>
                          </View>
                          <Text className="text-xs font-mono text-foreground">
                            {item.level} dBm
                          </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                          <Text className="text-xs text-muted font-mono">
                            {item.BSSID}
                          </Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                          <Text className="text-xs text-muted">
                            Channel {getChannelFromFrequency(item.frequency)} • {item.frequency} MHz
                          </Text>
                        </View>
                      </CardContent>
                    </Card>
                  </Pressable>
                )}
              />
            )}
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
