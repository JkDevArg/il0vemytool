import { ScrollView, Text, View, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useState } from "react";

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  category: "scanner" | "analyzer" | "utility";
}

export default function PluginsScreen() {
  const colors = useColors();
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: "1",
      name: "Port Scanner Pro",
      description: "Advanced port scanning and service detection",
      version: "2.1.0",
      enabled: true,
      category: "scanner",
    },
    {
      id: "2",
      name: "Vulnerability Detector",
      description: "Identify security vulnerabilities in your network",
      version: "1.5.2",
      enabled: true,
      category: "analyzer",
    },
    {
      id: "3",
      name: "Device Fingerprinter",
      description: "Identify device types and operating systems",
      version: "1.2.0",
      enabled: false,
      category: "analyzer",
    },
    {
      id: "4",
      name: "Network Mapper",
      description: "Visualize network topology and connections",
      version: "1.8.5",
      enabled: true,
      category: "utility",
    },
    {
      id: "5",
      name: "Packet Analyzer",
      description: "Deep packet inspection and protocol analysis",
      version: "2.0.1",
      enabled: false,
      category: "analyzer",
    },
  ]);

  const togglePlugin = (id: string) => {
    setPlugins(
      plugins.map((p) =>
        p.id === id ? { ...p, enabled: !p.enabled } : p
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "scanner":
        return "wifi";
      case "analyzer":
        return "shield.fill";
      case "utility":
        return "gear";
      default:
        return "puzzle.piece";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "scanner":
        return colors.primary;
      case "analyzer":
        return colors.accent;
      case "utility":
        return colors.highlight;
      default:
        return colors.muted;
    }
  };

  const enabledCount = plugins.filter((p) => p.enabled).length;
  const installedCount = plugins.length;

  return (
    <ScreenContainer className="p-6 bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Plugins</Text>
            <Text className="text-sm text-muted">
              Manage and customize your tools
            </Text>
          </View>

          {/* Plugin Stats */}
          <View className="flex-row gap-3">
            <Card className="flex-1">
              <View className="items-center gap-2">
                <Text className="text-2xl font-bold text-primary">
                  {enabledCount}
                </Text>
                <Text className="text-xs text-muted text-center">
                  Active
                </Text>
              </View>
            </Card>
            <Card className="flex-1">
              <View className="items-center gap-2">
                <Text className="text-2xl font-bold text-accent">
                  {installedCount}
                </Text>
                <Text className="text-xs text-muted text-center">
                  Installed
                </Text>
              </View>
            </Card>
          </View>

          {/* Installed Plugins */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Installed Plugins
            </Text>

            <FlatList
              scrollEnabled={false}
              data={plugins}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card className="mb-3">
                  <CardHeader>
                    <View className="flex-row items-start justify-between gap-3">
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2 mb-1">
                          <View
                            className="w-6 h-6 rounded-lg items-center justify-center"
                            style={{
                              backgroundColor: `${getCategoryColor(item.category)}20`,
                            }}
                          >
                            <IconSymbol
                              name={getCategoryIcon(item.category) as any}
                              size={14}
                              color={getCategoryColor(item.category)}
                            />
                          </View>
                          <Text className="text-sm font-semibold text-foreground">
                            {item.name}
                          </Text>
                        </View>
                        <Text className="text-xs text-muted">
                          v{item.version}
                        </Text>
                      </View>
                      <Toggle
                        value={item.enabled}
                        onValueChange={() => togglePlugin(item.id)}
                      />
                    </View>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-xs text-muted leading-relaxed">
                      {item.description}
                    </Text>
                  </CardContent>
                </Card>
              )}
            />
          </View>

          {/* Available Plugins */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">
              Available Plugins
            </Text>

            <Card>
              <CardHeader>
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-highlight/20 rounded-lg items-center justify-center">
                    <IconSymbol
                      name="plus.circle"
                      size={20}
                      color={colors.highlight}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">
                      Custom Plugin Loader
                    </Text>
                    <Text className="text-xs text-muted">
                      Load your own plugins
                    </Text>
                  </View>
                </View>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">
                  <Text className="text-sm font-semibold text-primary">
                    Browse & Install
                  </Text>
                </Button>
              </CardContent>
            </Card>
          </View>

          {/* Plugin Development */}
          <Card>
            <CardHeader>
              <Text className="text-sm font-semibold text-foreground">
                Plugin Development
              </Text>
            </CardHeader>
            <CardContent className="gap-2">
              <Text className="text-xs text-muted leading-relaxed">
                Create custom plugins to extend IL0veMyTool functionality. Access
                our plugin SDK for advanced network analysis capabilities.
              </Text>
              <Button size="sm" variant="secondary" className="w-full mt-3">
                <Text className="text-sm font-semibold text-background">
                  View Documentation
                </Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
