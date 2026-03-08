# IL0veMyTool - Network Auditor & Security Scanner

Una aplicación móvil moderna para auditoría de redes WiFi, análisis de dispositivos Bluetooth, escaneo de puertos y detección de vulnerabilidades de seguridad.

## Características Principales

### WiFi Scanner
Detecta y analiza redes WiFi disponibles con información técnica detallada:
- Escaneo de redes disponibles
- Información de seguridad (WPA3, WPA2, Open)
- Intensidad de señal y canal
- Animación de escaneo tipo radar
- Badges de estado de seguridad

### Bluetooth Scanner
Descubre dispositivos Bluetooth cercanos:
- Detección de dispositivos
- Clasificación por tipo (Phone, Laptop, Smartwatch, etc.)
- Intensidad de señal (RSSI)
- Dirección MAC
- Información de emparejamiento

### Network Audit
Análisis completo de la red conectada:
- Información de red local (IP, Gateway, DNS)
- Lista de dispositivos conectados
- Escaneo de puertos abiertos
- Detección de servicios
- Badges de riesgo (Crítico, Alto, Medio, Bajo)

### Plugin System
Sistema extensible de plugins para funcionalidades personalizadas:
- Port Scanner Pro
- Vulnerability Detector
- Device Fingerprinter
- Network Mapper
- Packet Analyzer
- Soporte para plugins personalizados

## Diseño & UX

La aplicación sigue un diseño técnico moderno inspirado en herramientas de ciberseguridad profesionales:

- **Estética**: Dark mode por defecto con light mode opcional
- **Colores**: Cyan (#00E5FF), Violeta (#7C4DFF), Verde Cyber (#00FFA3)
- **Componentes**: Cards, Badges, Buttons, Toggles, Stats
- **Animaciones**: Escaneos suaves, transiciones elegantes
- **Iconografía**: Minimalista y futurista

## Estructura del Proyecto

```
app/
  (tabs)/
    index.tsx           # Home Dashboard
    wifi.tsx            # WiFi Scanner
    bluetooth.tsx       # Bluetooth Scanner
    audit.tsx           # Network Audit
    plugins.tsx         # Plugins Manager
    _layout.tsx         # Tab Navigation

components/
  ui/
    button.tsx          # Componente Button
    card.tsx            # Componente Card
    badge.tsx           # Componente Badge
    toggle.tsx          # Componente Toggle
    stat.tsx            # Componente Stat
    spinner.tsx         # Componente Spinner
    tech-info.tsx       # Componente Tech Info
    icon-symbol.tsx     # Mapeo de iconos

hooks/
  use-colors.ts         # Hook para colores del tema
  use-theme-toggle.ts   # Hook para cambio de tema
  use-scan-animation.ts # Hook para animaciones de escaneo

lib/
  network-service.ts    # Servicio de red simulado
  utils.ts              # Utilidades (cn)
  _core/
    theme.ts            # Construcción del tema

theme.config.js         # Configuración de colores
tailwind.config.js      # Configuración de Tailwind
app.config.ts           # Configuración de Expo
```

## Instalación & Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Escanear QR en Expo Go
# O abrir en navegador: https://8081-...

# Ejecutar tests
pnpm test

# Verificar tipos
pnpm check

# Formatear código
pnpm format
```

## Paleta de Colores

### Dark Mode (Principal)
| Color | Valor |
|-------|-------|
| Background | #0B0F14 |
| Surface | #121821 |
| Secondary | #1A2330 |
| Primary (Cyan) | #00E5FF |
| Accent (Violeta) | #7C4DFF |
| Highlight (Verde) | #00FFA3 |
| Foreground | #E6EDF3 |
| Muted | #8B949E |

### Light Mode (Secundario)
| Color | Valor |
|-------|-------|
| Background | #F5F7FA |
| Surface | #FFFFFF |
| Secondary | #E9EEF5 |
| Primary | #0066FF |
| Accent | #6C3BFF |
| Highlight | #00C896 |
| Foreground | #111827 |
| Muted | #6B7280 |

## Componentes UI

### Button
Botones con variantes: primary, secondary, accent, danger, outline
```tsx
<Button variant="primary" size="lg">
  Start Scan
</Button>
```

### Card
Contenedor para información con header, content, footer
```tsx
<Card>
  <CardHeader>Título</CardHeader>
  <CardContent>Contenido</CardContent>
</Card>
```

### Badge
Indicadores de estado: secure, vulnerable, critical, warning, unknown
```tsx
<Badge variant="secure">WPA3</Badge>
```

### Toggle
Switch para activar/desactivar funciones
```tsx
<Toggle value={enabled} onValueChange={setEnabled} />
```

### Stat
Mostrar estadísticas con etiqueta y valor
```tsx
<Stat label="WiFi Networks" value={5} unit="found" />
```

## Animaciones

- **Escaneo WiFi**: Ondas radiales expandiéndose (250ms)
- **Detección Bluetooth**: Fade in con stagger
- **Carga**: Spinner rotatorio
- **Press Feedback**: Scale 0.97 + haptic light

## Servicios

### Network Service
Proporciona métodos para simular operaciones de red:
- `scanWiFiNetworks()` - Detecta redes WiFi
- `scanBluetoothDevices()` - Detecta dispositivos Bluetooth
- `scanNetworkDevices()` - Descubre dispositivos en red
- `scanPorts()` - Escanea puertos abiertos
- `analyzeSecurityRisk()` - Analiza riesgos de seguridad

## Notas de Desarrollo

- La aplicación utiliza datos simulados para demostración
- En producción, integrar con módulos nativos para acceso real a redes
- Todos los datos de red son generados localmente
- No se recopila ni transmite información personal
- Compatible con iOS, Android y Web

## Próximos Pasos

- [ ] Integración con módulos nativos para acceso real a redes
- [ ] Persistencia de datos con AsyncStorage
- [ ] Exportación de reportes de auditoría
- [ ] Historial de escaneos
- [ ] Notificaciones de seguridad
- [ ] Soporte para plugins personalizados
- [ ] Sincronización en la nube

## Licencia

Propietario - IL0veMyTool

## Contacto

Para más información y soporte, visita la documentación del proyecto.
