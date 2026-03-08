import { ScrollView, Text, View, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface ConnectedDevice {
  id: string;
  ip: string;
  mac: string;
  hostname: string;
  risk: "critical" | "high" | "medium" | "low";
}

interface OpenPort {
  id: string;
  port: number;
  service: string;
  status: "open" | "closed";
  risk: "critical" | "high" | "medium" | "low";
}

export default function NetworkAuditScreen() {
  const colors = useColors();

  const networkInfo = {
    ip: "192.168.1.100",
    gateway: "192.168.1.1",
    subnet: "255.255.255.0",
    dns: "8.8.8.8, 8.8.4.4",
  };

  const connectedDevices: ConnectedDevice[] = [
    {
      id: "1",
      ip: "192.168.1.1",
      mac: "00:11:22:33:44:55",
      hostname: "Router",
      risk: "low",
    },
    {
      id: "2",
      ip: "192.168.1.50",
      mac: "AA:BB:CC:DD:EE:FF",
      hostname: "iPhone-User",
      risk: "low",
    },
    {
      id: "3",
      ip: "192.168.1.75",
      mac: "11:22:33:44:55:66",
      hostname: "Unknown-Device",
      risk: "medium",
    },
  ];

  const openPorts: OpenPort[] = [
    {
      id: "1",
      port: 80,
      service: "HTTP",
      status: "open",
      risk: "high",
    },
    {
      id: "2",
      port: 443,
      service: "HTTPS",
      status: "open",
      risk: "low",
    },
    {
      id: "3",
      port: 22,
      service: "SSH",
      status: "open",
      risk: "critical",
    },
    {
      id: "4",
      port: 3306,
      service: "MySQL",
      status: "open",
      risk: "critical",
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "warning";
      default:
        return "secure";
    }
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
              Network Audit
            </Text>
            <Text className="text-sm text-muted">
              Analyze your network security
            </Text>
          </View>

          {/* Network Info */}
          <Card>
            <CardHeader>
              <Text className="text-sm font-semibold text-foreground">
                Network Information
              </Text>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">IP Address</Text>
                <Text className="text-sm font-mono text-foreground">
                  {networkInfo.ip}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">Gateway</Text>
                <Text className="text-sm font-mono text-foreground">
                  {networkInfo.gateway}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">Subnet Mask</Text>
                <Text className="text-sm font-mono text-foreground">
                  {networkInfo.subnet}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-xs text-muted">DNS Servers</Text>
                <Text className="text-sm font-mono text-foreground">
                  8.8.8.8
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Connected Devices */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Connected Devices ({connectedDevices.length})
              </Text>
            </View>

            <FlatList
              scrollEnabled={false}
              data={connectedDevices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card className="mb-2">
                  <CardHeader>
                    <View className="flex-row items-center justify-between gap-2">
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">
                          {item.hostname}
                        </Text>
                        <Text className="text-xs text-muted font-mono">
                          {item.ip}
                        </Text>
                      </View>
                      <Badge variant={getRiskColor(item.risk) as any}>
                        {item.risk}
                      </Badge>
                    </View>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-xs text-muted font-mono">
                      MAC: {item.mac}
                    </Text>
                  </CardContent>
                </Card>
              )}
            />
          </View>

          {/* Open Ports */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">
                Open Ports ({openPorts.length})
              </Text>
            </View>

            <FlatList
              scrollEnabled={false}
              data={openPorts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card className="mb-2">
                  <CardHeader>
                    <View className="flex-row items-center justify-between gap-2">
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">
                          Port {item.port}
                        </Text>
                        <Text className="text-xs text-muted">
                          {item.service}
                        </Text>
                      </View>
                      <Badge variant={getRiskColor(item.risk) as any}>
                        {item.risk}
                      </Badge>
                    </View>
                  </CardHeader>
                  <CardContent>
                    <View className="flex-row items-center gap-2">
                      <View className="w-2 h-2 bg-highlight rounded-full" />
                      <Text className="text-xs text-muted">
                        Status: {item.status}
                      </Text>
                    </View>
                  </CardContent>
                </Card>
              )}
            />
          </View>

          {/* Security Summary */}
          <Card>
            <CardHeader>
              <Text className="text-sm font-semibold text-foreground">
                Security Summary
              </Text>
            </CardHeader>
            <CardContent className="gap-2">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-2 h-2 bg-error rounded-full" />
                <Text className="text-xs text-muted">
                  {openPorts.filter((p) => p.risk === "critical").length} Critical
                  Issues
                </Text>
              </View>
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-2 h-2 bg-warning rounded-full" />
                <Text className="text-xs text-muted">
                  {openPorts.filter((p) => p.risk === "high").length} High Risk
                  Ports
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 bg-highlight rounded-full" />
                <Text className="text-xs text-muted">
                  {connectedDevices.length} Devices Connected
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
