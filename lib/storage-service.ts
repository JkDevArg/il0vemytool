import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Storage Service - Persistencia de datos con AsyncStorage
 */

export interface StoredScan {
  id: string;
  type: "wifi" | "bluetooth" | "ports" | "audit";
  timestamp: number;
  data: any;
  summary: string;
}

export interface ScanHistory {
  scans: StoredScan[];
}

class StorageService {
  private readonly SCANS_KEY = "@il0vemytool:scans";
  private readonly SETTINGS_KEY = "@il0vemytool:settings";
  private readonly PLUGINS_KEY = "@il0vemytool:plugins";

  /**
   * Guardar un nuevo escaneo
   */
  async saveScan(scan: StoredScan): Promise<void> {
    try {
      const history = await this.getScanHistory();
      history.scans.unshift(scan); // Agregar al inicio

      // Mantener solo los últimos 100 escaneos
      if (history.scans.length > 100) {
        history.scans = history.scans.slice(0, 100);
      }

      await AsyncStorage.setItem(
        this.SCANS_KEY,
        JSON.stringify(history)
      );
    } catch (error) {
      console.error("Error saving scan:", error);
    }
  }

  /**
   * Obtener historial de escaneos
   */
  async getScanHistory(): Promise<ScanHistory> {
    try {
      const data = await AsyncStorage.getItem(this.SCANS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return { scans: [] };
    } catch (error) {
      console.error("Error getting scan history:", error);
      return { scans: [] };
    }
  }

  /**
   * Obtener escaneos por tipo
   */
  async getScansByType(type: string): Promise<StoredScan[]> {
    try {
      const history = await this.getScanHistory();
      return history.scans.filter((scan) => scan.type === type);
    } catch (error) {
      console.error("Error getting scans by type:", error);
      return [];
    }
  }

  /**
   * Obtener un escaneo específico
   */
  async getScan(id: string): Promise<StoredScan | null> {
    try {
      const history = await this.getScanHistory();
      return history.scans.find((scan) => scan.id === id) || null;
    } catch (error) {
      console.error("Error getting scan:", error);
      return null;
    }
  }

  /**
   * Eliminar un escaneo
   */
  async deleteScan(id: string): Promise<void> {
    try {
      const history = await this.getScanHistory();
      history.scans = history.scans.filter((scan) => scan.id !== id);
      await AsyncStorage.setItem(
        this.SCANS_KEY,
        JSON.stringify(history)
      );
    } catch (error) {
      console.error("Error deleting scan:", error);
    }
  }

  /**
   * Limpiar todo el historial
   */
  async clearScanHistory(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.SCANS_KEY, JSON.stringify({ scans: [] }));
    } catch (error) {
      console.error("Error clearing scan history:", error);
    }
  }

  /**
   * Guardar configuración
   */
  async saveSettings(settings: Record<string, any>): Promise<void> {
    try {
      await AsyncStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }

  /**
   * Obtener configuración
   */
  async getSettings(): Promise<Record<string, any>> {
    try {
      const data = await AsyncStorage.getItem(this.SETTINGS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return {};
    } catch (error) {
      console.error("Error getting settings:", error);
      return {};
    }
  }

  /**
   * Guardar estado de plugins
   */
  async savePluginState(
    pluginId: string,
    enabled: boolean
  ): Promise<void> {
    try {
      const plugins = await this.getPluginState();
      plugins[pluginId] = enabled;
      await AsyncStorage.setItem(this.PLUGINS_KEY, JSON.stringify(plugins));
    } catch (error) {
      console.error("Error saving plugin state:", error);
    }
  }

  /**
   * Obtener estado de plugins
   */
  async getPluginState(): Promise<Record<string, boolean>> {
    try {
      const data = await AsyncStorage.getItem(this.PLUGINS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return {};
    } catch (error) {
      console.error("Error getting plugin state:", error);
      return {};
    }
  }

  /**
   * Exportar todos los datos
   */
  async exportAllData(): Promise<string> {
    try {
      const scans = await this.getScanHistory();
      const settings = await this.getSettings();
      const plugins = await this.getPluginState();

      return JSON.stringify(
        {
          scans,
          settings,
          plugins,
          exportedAt: new Date().toISOString(),
        },
        null,
        2
      );
    } catch (error) {
      console.error("Error exporting data:", error);
      return "";
    }
  }

  /**
   * Importar datos
   */
  async importData(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData);

      if (data.scans) {
        await AsyncStorage.setItem(this.SCANS_KEY, JSON.stringify(data.scans));
      }
      if (data.settings) {
        await AsyncStorage.setItem(
          this.SETTINGS_KEY,
          JSON.stringify(data.settings)
        );
      }
      if (data.plugins) {
        await AsyncStorage.setItem(
          this.PLUGINS_KEY,
          JSON.stringify(data.plugins)
        );
      }

      return true;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  }

  /**
   * Obtener estadísticas de almacenamiento
   */
  async getStorageStats(): Promise<{
    totalScans: number;
    wifiScans: number;
    bluetoothScans: number;
    portScans: number;
    auditScans: number;
  }> {
    try {
      const history = await this.getScanHistory();
      return {
        totalScans: history.scans.length,
        wifiScans: history.scans.filter((s) => s.type === "wifi").length,
        bluetoothScans: history.scans.filter((s) => s.type === "bluetooth")
          .length,
        portScans: history.scans.filter((s) => s.type === "ports").length,
        auditScans: history.scans.filter((s) => s.type === "audit").length,
      };
    } catch (error) {
      console.error("Error getting storage stats:", error);
      return {
        totalScans: 0,
        wifiScans: 0,
        bluetoothScans: 0,
        portScans: 0,
        auditScans: 0,
      };
    }
  }
}

export const storageService = new StorageService();
