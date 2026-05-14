# Dev Notes — El Lame

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

### Estrella fugaz (`controlRegistro/shootingStar.js`)
- Dibujada en Canvas para que la cola se genere en tiempo real detrás de la cabeza (no como un div que se desplaza).
- Aparece cada 9–19 segundos en posición aleatoria, cruza la pantalla diagonalmente y se desvanece.
- Cabeza con gradiente radial violeta/blanco. Cola con opacidad y grosor progresivos.
- Script compartido incluido en las 4 páginas públicas.
