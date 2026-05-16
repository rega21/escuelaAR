# Dev Notes — Galaxy School

Registro de cambios y decisiones técnicas del proyecto.

---

## [2026-05-14]

### Panel de simulación (`publicWeb/demo.html`)
- Página separada (no linkeable desde la nav) con un botón **▶ Simular** que genera datos de prueba en MockAPI automáticamente: toma la primera materia existente, crea un profesor, 3 alumnos, 2 tareas y simula entregas con calificaciones.
- Botón **✕ Limpiar** para eliminar los datos demo generados (usa los IDs guardados en memoria de la sesión).
- Los registros demo se marcan con el prefijo `[DEMO]` para distinguirlos de datos reales.

### Rediseño visual — tema espacial
- Fondo: imagen `controlRegistro/img/intro.png` (escena alien/espacio) fija en toda la app.
- Tarjeta (`.container`): glass morphism oscuro con `backdrop-filter: blur`, borde violeta sutil y sombra púrpura.
- Textos e inputs adaptados a fondo oscuro (blanco/violeta claro).
- Botones cambiados a violeta (`#7c3aed`) para combinar con la paleta de la imagen.
- Header institucional agregado y luego removido — no quedaba bien sobre el fondo espacial.

### Partículas (`particles.js`)
- CDN: `cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js`
- 140 partículas en blanco, violeta, celeste y rosa que se mueven lentamente simulando estrellas.
- Al pasar el mouse se agrandan (modo `bubble`).
- Aplicado en: `index.html`, `login.html`, `registroAlumno.html`, `registroProfesor.html`.

---

## [2026-05-16]

### Panel alumno — rediseño UX
- Checkboxes de materias reemplazados por **pills** (grid 3 columnas, igual ancho). Usan CSS `:has()` para cambiar color según estado: transparente (disponible), morado (seleccionado), azul (inscripto con ✓).
- Selector de avatar eliminado. Reemplazado por indicador **● En línea** (dot verde con glow) en el header.
- Botón "Darse de baja de la materia" reemplazado por ícono 🗑️ compacto al lado del selector de materia en el heading.
- "Panel de tareas" renombrado a **"Ir a mis tareas →"** con estilo outline secundario para que "Guardar materias" quede como acción principal.
- Separador visual (`hr` con borde morado) entre sección Tareas y sección Mis Entregas.
- Container mobile reducido a `82%` de ancho. `box-sizing: border-box` agregado a inputs para evitar overflow.
- Typo corregido: "Contraseñaa" → "Contraseña" en `login.html`.

### Panel profesor — rediseño UX
- Interfaz dividida en **dos tabs**: *Tareas* (formulario + lista) y *Alumnos* (tabla + historial). Evita el scroll largo con contenido mezclado.
- `textarea` y `input[readonly/disabled]` con dark glass theme (antes tenían fondo blanco/gris).
- Tabla de alumnos: separadores sutiles, hover violeta, botones "Ver historial" compactos.
- Tabla de historial: CSS dark theme con clases `.aprobado` / `.reprobado` (verde/rojo suave) en vez de estilos inline. Select de calificación estilizado.
- Indicador **● En línea** agregado al header del profesor (igual que alumno).

### Imagen mobile (`controlRegistro/img/intro-mobile.png`)
- Nueva imagen en proporción 9:16 para pantallas portrait.
- Se activa automáticamente vía media query `@media (max-width: 600px)`.

### Estrella fugaz (`controlRegistro/shootingStar.js`)
- Dibujada en Canvas para que la cola se genere en tiempo real detrás de la cabeza (no como un div que se desplaza).
- Aparece cada 9–19 segundos en posición aleatoria, cruza la pantalla diagonalmente y se desvanece.
- Cabeza con gradiente radial violeta/blanco. Cola con opacidad y grosor progresivos.
- Script compartido incluido en las 4 páginas públicas.
