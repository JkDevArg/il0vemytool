/**
 * Network Service - Simulates network scanning and analysis
 * In production, this would integrate with native modules for actual network access
 */

export interface WiFiNetwork {
  id: string;
  ssid: string;
  bssid: string;
  signal: number;
  security: "WPA3" | "WPA2" | "WEP" | "Open";
  channel: number;
  frequency: string;
  bandwidth: string;
}

export interface BluetoothDevice {
  id: string;
  name: string;
  mac: string;
  type: "phone" | "laptop" | "smartwatch" | "headphones" | "unknown";
  signal: number;
  paired: boolean;
}

export interface NetworkDevice {
  ip: string;
  mac: string;
  hostname: string;
  vendor: string;
  lastSeen: Date;
}

export interface OpenPort {
  port: number;
  protocol: "TCP" | "UDP";
  service: string;
  state: "open" | "closed" | "filtered";
  banner?: string;
}

class NetworkService {
  /**
   * Simulates WiFi network scanning
   */
  async scanWiFiNetworks(): Promise<WiFiNetwork[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return [
      {
        id: "1",
        ssid: "HomeNetwork",
        bssid: "00:1A:2B:3C:4D:5E",
        signal: -45,
        security: "WPA3",
        channel: 6,
        frequency: "2.4 GHz",
        bandwidth: "40 MHz",
      },
      {
        id: "2",
        ssid: "GuestWiFi",
        bssid: "00:1A:2B:3C:4D:5F",
        signal: -65,
        security: "WPA2",
        channel: 11,
        frequency: "2.4 GHz",
        bandwidth: "20 MHz",
      },
      {
        id: "3",
        ssid: "OpenNetwork",
        bssid: "00:1A:2B:3C:4D:60",
        signal: -75,
        security: "Open",
        channel: 1,
        frequency: "2.4 GHz",
        bandwidth: "20 MHz",
      },
      {
        id: "4",
        ssid: "OfficeNetwork",
        bssid: "00:1A:2B:3C:4D:61",
        signal: -55,
        security: "WPA3",
        channel: 36,
        frequency: "5 GHz",
        bandwidth: "80 MHz",
      },
    ];
  }

  /**
   * Simulates Bluetooth device scanning
   */
  async scanBluetoothDevices(): Promise<BluetoothDevice[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
      {
        id: "1",
        name: "iPhone 15",
        mac: "AA:BB:CC:DD:EE:FF",
        type: "phone",
        signal: -35,
        paired: true,
      },
      {
        id: "2",
        name: "MacBook Pro",
        mac: "11:22:33:44:55:66",
        type: "laptop",
        signal: -55,
        paired: true,
      },
      {
        id: "3",
        name: "Apple Watch",
        mac: "77:88:99:AA:BB:CC",
        type: "smartwatch",
        signal: -45,
        paired: true,
      },
      {
        id: "4",
        name: "AirPods Pro",
        mac: "DD:EE:FF:00:11:22",
        type: "headphones",
        signal: -50,
        paired: false,
      },
      {
        id: "5",
        name: "Unknown Device",
        mac: "33:44:55:66:77:88",
        type: "unknown",
        signal: -75,
        paired: false,
      },
    ];
  }

  /**
   * Simulates network device discovery
   */
  async scanNetworkDevices(): Promise<NetworkDevice[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        ip: "192.168.1.1",
        mac: "00:11:22:33:44:55",
        hostname: "Router",
        vendor: "TP-Link",
        lastSeen: new Date(),
      },
      {
        ip: "192.168.1.50",
        mac: "AA:BB:CC:DD:EE:FF",
        hostname: "iPhone-User",
        vendor: "Apple",
        lastSeen: new Date(),
      },
      {
        ip: "192.168.1.75",
        mac: "11:22:33:44:55:66",
        hostname: "MacBook-Pro",
        vendor: "Apple",
        lastSeen: new Date(),
      },
      {
        ip: "192.168.1.100",
        mac: "77:88:99:AA:BB:CC",
        hostname: "Desktop-PC",
        vendor: "Dell",
        lastSeen: new Date(),
      },
    ];
  }

  /**
   * Simulates port scanning
   */
  async scanPorts(host: string = "localhost"): Promise<OpenPort[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    return [
      {
        port: 22,
        protocol: "TCP",
        service: "SSH",
        state: "open",
        banner: "OpenSSH_8.0",
      },
      {
        port: 80,
        protocol: "TCP",
        service: "HTTP",
        state: "open",
        banner: "Apache/2.4.41",
      },
      {
        port: 443,
        protocol: "TCP",
        service: "HTTPS",
        state: "open",
        banner: "nginx/1.18.0",
      },
      {
        port: 3306,
        protocol: "TCP",
        service: "MySQL",
        state: "open",
        banner: "MySQL 8.0.23",
      },
      {
        port: 5432,
        protocol: "TCP",
        service: "PostgreSQL",
        state: "open",
      },
      {
        port: 8080,
        protocol: "TCP",
        service: "HTTP-Proxy",
        state: "open",
      },
      {
        port: 21,
        protocol: "TCP",
        service: "FTP",
        state: "closed",
      },
      {
        port: 25,
        protocol: "TCP",
        service: "SMTP",
        state: "filtered",
      },
    ];
  }

  /**
   * Analyzes security risk of a network
   */
  analyzeSecurityRisk(
    networks: WiFiNetwork[],
    devices: NetworkDevice[],
    ports: OpenPort[]
  ) {
    let criticalCount = 0;
    let highCount = 0;
    let mediumCount = 0;

    // Check for open networks
    networks.forEach((net) => {
      if (net.security === "Open") {
        criticalCount++;
      } else if (net.security === "WEP") {
        highCount++;
      }
    });

    // Check for critical ports
    ports.forEach((port) => {
      if ([22, 3306, 5432].includes(port.port) && port.state === "open") {
        criticalCount++;
      } else if ([80, 443].includes(port.port) && port.state === "open") {
        mediumCount++;
      }
    });

    return {
      critical: criticalCount,
      high: highCount,
      medium: mediumCount,
      riskLevel:
        criticalCount > 0 ? "critical" : highCount > 0 ? "high" : "medium",
    };
  }
}

export const networkService = new NetworkService();
