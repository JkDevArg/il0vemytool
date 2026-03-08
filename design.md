# IL0veMyTool - Design Plan

## Visión General

Aplicación móvil de auditoría de redes y dispositivos Bluetooth con interfaz técnica moderna, inspirada en herramientas de ciberseguridad profesionales. Diseño minimalista con estética "hacker" elegante.

---

## Paleta de Colores

### Dark Mode (Principal)
- **Background**: `#0B0F14`
- **Surface/Cards**: `#121821`
- **Paneles secundarios**: `#1A2330`
- **Primario (Cyan)**: `#00E5FF`
- **Secundario (Violeta)**: `#7C4DFF`
- **Highlight (Verde Cyber)**: `#00FFA3`
- **Warning**: `#FFB020`
- **Error**: `#FF4D4D`
- **Texto principal**: `#E6EDF3`
- **Texto secundario**: `#8B949E`

### Light Mode (Secundario)
- **Background**: `#F5F7FA`
- **Cards**: `#FFFFFF`
- **Paneles**: `#E9EEF5`
- **Primario**: `#0066FF`
- **Secundario**: `#6C3BFF`
- **Highlight**: `#00C896`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`
- **Texto principal**: `#111827`
- **Texto secundario**: `#6B7280`

---

## Pantallas Principales

### 1. Home Dashboard
**Propósito**: Centro de control principal

**Contenido**:
- Header con logo y nombre "IL0veMyTool"
- Botón principal "Start Scan"
- Cards de resumen:
  - WiFi Networks Found (número + indicador)
  - Bluetooth Devices (número + indicador)
  - Connected Network Status (estado actual)
- Barra de navegación inferior con 4 secciones:
  - Home
  - WiFi Scanner
  - Bluetooth Scanner
  - Network Audit
  - Plugins

**Funcionalidad**:
- Mostrar estado actual de conexiones
- Acceso rápido a escaneos
- Indicadores visuales de seguridad

---

### 2. WiFi Scanner
**Propósito**: Escaneo y detección de redes WiFi

**Contenido**:
- Botón "Scan Networks" con animación de radar
- Lista de redes detectadas con:
  - SSID
  - Intensidad de señal (dBm)
  - Tipo de seguridad (WPA2/WPA3/Open)
  - Canal
  - Badges de estado (Seguro/Vulnerable)
- Animación de escaneo tipo pulso/radar

**Funcionalidad**:
- Detectar redes WiFi disponibles
- Mostrar información técnica
- Indicadores visuales de seguridad
- Tap en red → Pantalla de análisis detallado

---

### 3. WiFi Analysis Screen
**Propósito**: Análisis técnico detallado de red WiFi

**Contenido**:
- Información de red:
  - SSID
  - BSSID (MAC address)
  - Seguridad (WPA2/WPA3/Open)
  - Canal y frecuencia
  - Intensidad de señal
  - Tipo de cifrado
- Botones de acción:
  - Audit Network
  - Scan Devices
  - Port Scan
  - Connected IPs
- Resultados en cards técnicas estilo terminal

**Funcionalidad**:
- Mostrar detalles técnicos de red
- Auditoría de seguridad
- Escaneo de dispositivos conectados
- Escaneo de puertos abiertos

---

### 4. Bluetooth Scanner
**Propósito**: Detección y análisis de dispositivos Bluetooth

**Contenido**:
- Botón "Scan Devices"
- Lista de dispositivos con:
  - Nombre del dispositivo
  - MAC address
  - Tipo (Phone, Laptop, Smartwatch, Unknown)
  - Intensidad de señal (RSSI)
  - Icono según tipo
- Botón "Analyze Device" por cada dispositivo

**Funcionalidad**:
- Detectar dispositivos Bluetooth cercanos
- Mostrar información técnica
- Análisis individual de dispositivos

---

### 5. Network Audit Panel
**Propósito**: Dashboard de auditoría de red conectada

**Contenido**:
- Información de red local:
  - IP local
  - Gateway
  - Máscara de subred
  - DNS
- Tabla de IPs conectadas:
  - IP address
  - MAC address
  - Nombre del dispositivo
  - Estado
- Puertos abiertos:
  - Puerto
  - Servicio detectado
  - Estado (Abierto/Cerrado)
- Badges de riesgo (Crítico/Alto/Medio/Bajo)

**Funcionalidad**:
- Mostrar dispositivos conectados a red
- Listar puertos abiertos
- Análisis de servicios
- Indicadores de riesgo

---

### 6. Plugins/Módulos
**Propósito**: Marketplace técnico de plugins personalizados

**Contenido**:
- Plugins instalados:
  - Nombre
  - Descripción
  - Estado (Activo/Inactivo)
  - Toggle de activación
- Plugins disponibles:
  - Cards modulares
  - Opción de instalar
- Interfaz tipo "developer tools"

**Funcionalidad**:
- Ver plugins instalados
- Activar/desactivar plugins
- Instalar nuevos plugins
- Cargar plugins personalizados

---

## Componentes UI

### Botones
- Botones primarios: Cyan (#00E5FF) con efecto hover
- Botones secundarios: Violeta (#7C4DFF)
- Botones de acción: Verde Cyber (#00FFA3)
- Botones de peligro: Rojo (#FF4D4D)

### Cards
- Fondo: Surface (#121821)
- Borde sutil: 1px border con color border
- Sombra suave: shadow-sm
- Bordes redondeados: rounded-lg

### Badges
- Seguro: Verde (#00FFA3)
- Vulnerable: Naranja (#FFB020)
- Crítico: Rojo (#FF4D4D)
- Desconocido: Gris (#8B949E)

### Listas
- FlatList para rendimiento
- Separadores sutiles
- Indicadores de carga

### Animaciones
- Escaneo WiFi: Ondas radiales (200-350ms)
- Detección de dispositivos: Fade in suave
- Carga de análisis: Skeleton loading
- Cambio de tema: Transición suave

---

## Tipografía

- **Fuente principal**: Inter / Sora / SF Pro / Space Grotesk
- **Tamaños**:
  - Títulos grandes: 32px (bold)
  - Títulos: 24px (bold)
  - Subtítulos: 18px (semibold)
  - Cuerpo: 16px (regular)
  - Pequeño: 14px (regular)
  - Muy pequeño: 12px (regular)

---

## Iconografía

- Estilo: Outline futurista, minimal tech
- Iconos sugeridos:
  - WiFi radar
  - Bluetooth
  - Network nodes
  - Terminal/código
  - Shield (seguridad)
  - Plugin/módulos
  - Dispositivos (phone, laptop, watch)

---

## Microinteracciones

- **Escaneo WiFi**: Ondas radiales expandiéndose (250ms)
- **Detección de dispositivos**: Fade in con stagger
- **Carga de análisis**: Skeleton loading o spinner
- **Cambio dark/light**: Transición suave (200ms)
- **Press feedback**: Scale 0.97 + haptic light
- **Toggles**: Animación suave de transición

---

## Sensación General

La aplicación debe sentirse como:
- Herramienta de ciberseguridad profesional
- Network analyzer técnico
- Dashboard futurista y moderno

**Características**:
- Potente y moderna
- Interfaz técnica clara
- Navegación rápida
- Estética "hacker" elegante
- Glassmorphism ligero o neumorphism sutil
