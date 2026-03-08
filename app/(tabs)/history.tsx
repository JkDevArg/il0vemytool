import { ScrollView, Text, View, FlatList, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { storageService, type StoredScan } from "@/lib/storage-service";
import { useState, useEffect } from "react";

export default function HistoryScreen() {
  const colors = useColors();
  const [scans, setScans] = useState<StoredScan[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    wifiScans: 0,
    bluetoothScans: 0,
    portScans: 0,
    auditScans: 0,
  });
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    const history = await storageService.getScanHistory();
    setScans(history.scans);

    const storageStats = await storageService.getStorageStats();
    setStats(storageStats);
  };

  const handleDeleteScan = async (id: string) => {
    await storageService.deleteScan(id);
    await loadScans();
  };

  const handleClearHistory = async () => {
    await storageService.clearScanHistory();
    await loadScans();
  };

  const filteredScans = selectedType
    ? scans.filter((s) => s.type === selectedType)
    : scans;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "wifi":
        return "wifi";
      case "bluetooth":
        return "bluetooth";
      case "ports":
        return "network";
      case "audit":
        return "shield.fill";
      default:
        return "doc.text";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "wifi":
        return colors.primary;
      case "bluetooth":
        return colors.accent;
      case "ports":
        return colors.highlight;
      case "audit":
        return colors.warning;
      default:
        return colors.muted;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;

    return date.toLocaleDateString();
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
            <Text className="text-2xl font-bold text-foreground">History</Text>
            <Text className="text-sm text-muted">
              View your scan history and statistics
            </Text>
          </View>

          {/* Statistics */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Statistics
            </Text>
            <View className="flex-row gap-2">
              <Card className="flex-1">
                <View className="items-center gap-1">
                  <Text className="text-xl font-bold text-primary">
                    {stats.totalScans}
                  </Text>
                  <Text className="text-xs text-muted text-center">
                    Total Scans
                  </Text>
                </View>
              </Card>
              <Card className="flex-1">
                <View className="items-center gap-1">
                  <Text className="text-xl font-bold text-accent">
                    {stats.wifiScans}
                  </Text>
                  <Text className="text-xs text-muted text-center">WiFi</Text>
                </View>
              </Card>
              <Card className="flex-1">
                <View className="items-center gap-1">
                  <Text className="text-xl font-bold text-highlight">
                    {stats.bluetoothScans}
                  </Text>
                  <Text className="text-xs text-muted text-center">BLE</Text>
                </View>
              </Card>
            </View>
          </View>

          {/* Type Filter */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Filter by Type
            </Text>
            <View className="flex-row gap-2 flex-wrap">
              <Pressable
                onPress={() => setSelectedType(null)}
                className={`px-4 py-2 rounded-full ${
                  selectedType === null
                    ? "bg-primary"
                    : "bg-surface border border-border"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    selectedType === null
                      ? "text-background"
                      : "text-foreground"
                  }`}
                >
                  All
                </Text>
              </Pressable>

              {["wifi", "bluetooth", "ports", "audit"].map((type) => (
                <Pressable
                  key={type}
                  onPress={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full ${
                    selectedType === type
                      ? "bg-accent"
                      : "bg-surface border border-border"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedType === type
                        ? "text-background"
                        : "text-foreground"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Scans List */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Scans ({filteredScans.length})
              </Text>
              {scans.length > 0 && (
                <Button
                  size="sm"
                  variant="danger"
                  onPress={handleClearHistory}
                >
                  <Text className="text-xs font-semibold text-background">
                    Clear All
                  </Text>
                </Button>
              )}
            </View>

            {filteredScans.length === 0 ? (
              <Card>
                <Text className="text-sm text-muted text-center">
                  {scans.length === 0
                    ? "No scans yet. Start scanning to build your history."
                    : "No scans of this type."}
                </Text>
              </Card>
            ) : (
              <FlatList
                scrollEnabled={false}
                data={filteredScans}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Card className="mb-3">
                    <CardHeader>
                      <View className="flex-row items-center justify-between gap-3">
                        <View className="flex-row items-center gap-3 flex-1">
                          <View
                            className="w-10 h-10 rounded-lg items-center justify-center"
                            style={{
                              backgroundColor: `${getTypeColor(item.type)}20`,
                            }}
                          >
                            <IconSymbol
                              name={getTypeIcon(item.type) as any}
                              size={20}
                              color={getTypeColor(item.type)}
                            />
                          </View>
                          <View className="flex-1">
                            <Text className="text-sm font-semibold text-foreground">
                              {item.summary}
                            </Text>
                            <Text className="text-xs text-muted">
                              {formatDate(item.timestamp)}
                            </Text>
                          </View>
                        </View>
                        <Badge variant={item.type as any}>
                          {item.type}
                        </Badge>
                      </View>
                    </CardHeader>
                    <CardContent>
                      <View className="flex-row gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                        >
                          <Text className="text-xs font-semibold text-background">
                            View
                          </Text>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                        >
                          <Text className="text-xs font-semibold text-primary">
                            Export
                          </Text>
                        </Button>
                        <Pressable
                          onPress={() => handleDeleteScan(item.id)}
                          className="px-3 py-2 rounded-lg bg-error/10 border border-error"
                        >
                          <IconSymbol
                            name="chevron.right"
                            size={16}
                            color={colors.error}
                          />
                        </Pressable>
                      </View>
                    </CardContent>
                  </Card>
                )}
              />
            )}
          </View>

          {/* Storage Info */}
          <Card>
            <CardHeader>
              <Text className="text-sm font-semibold text-foreground">
                Storage Information
              </Text>
            </CardHeader>
            <CardContent className="gap-2">
              <Text className="text-xs text-muted leading-relaxed">
                Your scan history is stored locally on your device. You can
                export scans as reports and share them with others.
              </Text>
              <Text className="text-xs text-muted mt-2">
                • Automatic cleanup: Scans older than 30 days are removed
              </Text>
              <Text className="text-xs text-muted">
                • Maximum storage: 100 recent scans
              </Text>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
