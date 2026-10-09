# 🕹️ Retro Arcade 3-en-1 (Tetris • Pac-Man • La Viborita)

Una aplicación móvil y web retro arcade que incluye tres de los juegos más populares de todos los tiempos:
1. **Tetris Pro**: Con rotación suave, Hold, Ghost Piece, niveles y caída rápida.
2. **Pac-Man Arcade**: Con laberinto simétrico 19x21, Blinky, Pinky, Inky y Clyde, píldoras de poder y modo asustado.
3. **La Viborita (Neon Snake)**: Con manzanas rojas, bonus dorado temporal, ojos reactivos y velocidad progresiva.

Optimizado al 100% para **Android**, **iPhone (iOS)** y navegadores de escritorio.

---

## 📱 Ejecución en Android e iOS (Nativo & Web)

### En Android:
- **Nativo (Capacitor)**: Abre el proyecto en Android Studio con `npm run android` o compila el APK con `./gradlew assembleDebug` en la carpeta `android`.
- **Compilación Automática en GitHub**: Cada subida a la rama `main` compila automáticamente el APK de depuración en GitHub Actions (`.github/workflows/android.yml`), listo para descargar e instalar.
- **Navegador móvil (Chrome / PWA)**: Abre la URL en el navegador de tu teléfono; cuenta con soporte offline y vibración.

### En iPhone (iOS):
- **Nativo (Capacitor)**: Ejecuta `npm run ios` para abrir el proyecto en Xcode y probar en el Simulador o iPhone físico.
- **Safari móvil**: Totalmente adaptado a las zonas seguras (Safe Areas) de la Isla Dinámica, Notch y la barra de inicio inferior (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
- **Desbloqueo de Audio**: Diseñado para eludir las restricciones de reproducción automática de Apple WebKit desde el primer toque en pantalla.

---

## 🚀 Cómo jugar y ejecutar localmente

### Opción 1: Desarrollo local rápido con Vite
```bash
npm install
npm run dev
```
Abre `http://localhost:3000` en tu navegador.

### Opción 2: Servidor estático
```bash
npx serve dist
```
O directamente con Python:
```bash
python -m http.server 8080
```

---

## 🎮 Controles

### En Celular / Móvil / Pantallas táctiles:
- **Tetris**: Botones táctiles virtuales ergonómicos (`◀`, `▶`, `▼ Caída`, `🔄 Rotar`, `Drop`, `Hold`) y soporte para gestos táctiles deslizando el dedo en pantalla.
- **Pac-Man**: Cruceta táctil D-Pad (Arriba, Abajo, Izquierda, Derecha) y soporte para gestos swipe.
- **La Viborita**: Cruceta táctil D-Pad y soporte para gestos swipe.

### En PC / Escritorio:
- **Tetris**:
  - `←` / `→` o `A` / `D`: Mover a los lados
  - `↑` o `W`: Rotar pieza
  - `↓` o `S`: Caída suave
  - `Espacio`: Caída dura instantánea (Hard Drop)
  - `C` o `Shift`: Guardar pieza (Hold)
- **Pac-Man y Viborita**:
  - `↑`, `↓`, `←`, `→` o teclas `W`, `A`, `S`, `D`: Dirección
- **Pausa general**: Tecla `P` o `Escape` / Botón `⏸️` en pantalla.

---

## 🧪 Pruebas Automatizadas
Ejecuta la suite de pruebas unitarias con:
```bash
npm test
```

---

## 🔊 Sonido y Visuales
- Sintetizador de audio chiptune real utilizando la Web Audio API (no requiere archivos de audio externos ni conexión a internet).
- Efecto CRT Scanlines alternable para emular el monitor de una máquina arcade de salón retro.
- Guardado automático de récords (High Scores) en el almacenamiento local (`localStorage`).
