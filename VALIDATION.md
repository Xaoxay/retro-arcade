# Validación de Compatibilidad Móvil (Android & iPhone)

## 📱 1. Compatibilidad Verificada para Android e iOS

| Aspecto | Implementación / Comprobación | Estado |
|---|---|---|
| **Safe Areas (Notch / Isla Dinámica / Barra Inferior)** | CSS adaptado con `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, `env(safe-area-inset-left)`, `env(safe-area-inset-right)`. Los botones virtuales de Tetris, Pac-Man y Snake nunca quedan cubiertos por la barra de inicio de iPhone o barras de navegación de Android. | ✅ Verificado |
| **Viewport & Altura Dinámica (100dvh)** | Se utiliza `height: 100dvh`, `overscroll-behavior: none` y `-webkit-overflow-scrolling: auto`. Previene el molesto rebote (rubber-banding) de iOS Safari y el "pull-to-refresh" accidental de Android Chrome durante las partidas. | ✅ Verificado |
| **Gestos y Zoom Táctil** | Configurado `user-scalable=no`, `viewport-fit=cover`, `-webkit-touch-callout: none` y `touch-action: none` en áreas de juego. Elimina el retardo de 300ms de pulsación en pantallas táctiles y desactiva menús contextuales en pulsaciones largas. | ✅ Verificado |
| **Desbloqueo de Audio (Web Audio API en iOS / Android)** | Escuchadores en `touchstart`, `touchend`, `pointerdown` y `click` que reanudan el `AudioContext` en el primer toque, cumpliendo la estricta política de reproducción automática de Apple WebKit y Google Chrome. | ✅ Verificado |
| **Vibración y Haptics** | Soporte dual: utiliza `@capacitor/haptics` para el motor Taptic Engine nativo en iOS y vibración en Android. En entorno web clásico degrada automáticamente a `navigator.vibrate(12)` de forma segura sin excepciones. | ✅ Verificado |
| **Persistencia de Récords** | Almacenamiento local mediante `localStorage` para guardar las mejores puntuaciones de forma permanente en cada dispositivo. | ✅ Verificado |

---

## 🧪 2. Pruebas Automatizadas (Unit Tests)

Se ejecutaron 8 pruebas unitarias con Node.js (`npm test`), validando:
- **Tetris**: Los 7 tetrominós oficiales (I, J, L, O, S, T, Z) de 4 bloques cada uno, algoritmo de rotación 90° horario, detección y eliminación de filas completas con desplazamiento de matriz.
- **Pac-Man**: Simetría del mapa 19x21, teletransporte en túnel lateral (salida en fila 10 entre extremos izquierdo y derecho), y multiplicador progresivo al devorar fantasmas (200, 400, 800, 1600 pts).
- **Snake**: Bloqueo de marcha atrás de 180° para evitar suicidio accidental, detección de colisión contra el propio cuerpo, generación de comida dentro del tablero.
- **Entorno Móvil**: Existencia de etiquetas meta para móviles (`viewport-fit=cover`, `user-scalable=no`), Web Audio API y almacenamiento persistente.

---

## 📦 3. Compilación Nativa y CI/CD en GitHub

- **Capacitor 8**: Proyectos nativos sincronizados en `./android` y `./ios`.
- **GitHub Actions (`.github/workflows/android.yml`)**: Compila automáticamente el APK de depuración para Android en cada `git push` a `main` con JDK 21 y Android SDK 36, dejando el archivo `.apk` disponible como artefacto descargable.
