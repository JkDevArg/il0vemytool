import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { nativeBluetoothService, type NativeBluetoothDevice } from "@/lib/native-bluetooth-service";
import { useState } from "react";

export default function BluetoothScannerScreen() {
  const colors = useColors();
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<NativeBluetoothDevice[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);
    try {
      const scannedDevices = await nativeBluetoothService.scanBluetoothDevices();
      setDevices(scannedDevices);
    } catch (err) {
      setError("Error scanning Bluetooth devices");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const getDeviceIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("iphone") || lowerName.includes("android")) {
      return "iphone";
    }
    if (lowerName.includes("macbook") || lowerName.includes("windows")) {
      return "laptopcomputer";
    }
    if (lowerName.includes("watch")) {
      return "applewatch";
    }
    return "questionmark.circle";
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
                    Scan Devices
                  </Text>
                </>
              )}
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

          {/* Error Message */}
          {error && (
            <Card className="bg-error/10 border border-error">
              <Text className="text-sm text-error">{error}</Text>
            </Card>
          )}

          {/* Devices List */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Devices Found ({devices.length})
              </Text>
            </View>

            {devices.length === 0 && !isScanning ? (
              <Card>
                <Text className="text-sm text-muted text-center">
                  No devices found. Tap "Scan Devices" to start scanning.
                </Text>
              </Card>
            ) : (
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
                              name={getDeviceIcon(item.name) as any}
                              size={20}
                              color={colors.accent}
                            />
                          </View>
                          <View className="flex-1">
                            <Text className="text-sm font-semibold text-foreground">
                              {item.name}
                            </Text>
                            <Text className="text-xs text-muted font-mono">
                              {item.id}
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
                              {getSignalStrength(item.rssi)}
                            </Text>
                          </View>
                          <Text className="text-xs font-mono text-foreground">
                            {item.rssi} dBm
                          </Text>
                        </View>
                        {item.isConnectable !== undefined && (
                          <View className="flex-row items-center gap-2">
                            <View
                              className={`w-2 h-2 rounded-full ${
                                item.isConnectable
                                  ? "bg-highlight"
                                  : "bg-muted"
                              }`}
                            />
                            <Text className="text-xs text-muted">
                              {item.isConnectable
                                ? "Connectable"
                                : "Not Connectable"}
                            </Text>
                          </View>
                        )}
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
