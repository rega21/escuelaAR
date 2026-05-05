# Postman - Guía de uso

Postman es una herramienta para probar APIs sin necesidad de tener una app frontend. Permite enviar requests HTTP y ver las respuestas del servidor.

---

## Métodos HTTP

| Método | Uso |
|--------|-----|
| `GET` | Obtener datos |
| `POST` | Crear un nuevo recurso |
| `PUT` | Reemplazar un recurso (en MockAPI funciona como PATCH) |
| `PATCH` | Modificar campos específicos sin tocar el resto |
| `DELETE` | Eliminar un recurso |
| `HEAD` | Igual que GET pero sin body — solo devuelve headers |
| `OPTIONS` | Consulta qué métodos acepta el endpoint (usado en CORS) |

---

## Estructura de una request

### GET — Traer todos los alumnos
```
GET https://xxx.mockapi.io/alumnos
```

### GET con filtro (Query Params)
```
GET https://xxx.mockapi.io/alumnos?nombre=juan
```
El `?` indica el inicio de los query params. Se usan para filtrar resultados.

### POST — Crear un nuevo recurso
```
POST https://xxx.mockapi.io/alumnos
```
Body (raw - JSON):
```json
{
    "nombre": "nuevoAlumno",
    "password": "1234",
    "email": "alumno@correo.com",
    "materias": [],
    "entregas": []
}
```
> El campo `id` lo asigna el servidor automáticamente — no hace falta incluirlo.

### PATCH — Modificar un campo específico
```
PATCH https://xxx.mockapi.io/alumnos/1
```
Body:
```json
{
    "nombre": "nuevoNombre"
}
```
Solo modifica los campos enviados, el resto queda intacto. Puede modificar múltiples campos a la vez.

### DELETE — Eliminar un recurso
```
DELETE https://xxx.mockapi.io/alumnos/1
```
No requiere body. El `id` va en la URL. Sin `id` devuelve `400 Bad Request`.

---

## Reglas importantes

- El body siempre debe estar en **raw → JSON** (no Text)
- JSON no soporta comentarios (`//`) — rompen la sintaxis
- El `id` en el body de POST/PUT es ignorado por MockAPI
- Para DELETE y GET no se usa body

---

## Códigos de respuesta

| Código | Significado |
|--------|-------------|
| `200 OK` | Request exitosa |
| `201 Created` | Recurso creado correctamente |
| `204 No Content` | Exitosa sin contenido (común en OPTIONS) |
| `400 Bad Request` | Error en la sintaxis del body o faltan campos |
| `404 Not Found` | El recurso no existe |
| `405 Method Not Allowed` | El endpoint no acepta ese método |

---

## Variables de entorno

Permiten reutilizar la URL base en todas las requests sin repetirla.

1. Ir al dropdown **"No environment"** (arriba a la derecha)
2. Crear un nuevo environment
3. Agregar una variable:
   - **Variable**: `baseUrl`
   - **Value**: `https://xxx.mockapi.io`
4. Seleccionar el environment en el dropdown (si no está activo, la variable no se resuelve)
5. En las URLs usar: `{{baseUrl}}/alumnos`

### Problema conocido: `ENOTFOUND` al usar variable

Si al enviar la request aparece `Error: getaddrinfo ENOTFOUND {{nombreVariable}}` significa que la variable no se está resolviendo. Posibles causas:

- El environment no está seleccionado en el dropdown (aparece "No environment")
- El nombre de la variable en la URL no coincide exactamente con el definido en el environment (mayúsculas, espacios)
- El environment no fue guardado correctamente (Ctrl+S)

Verificar que el nombre entre `{{ }}` sea idéntico al campo **Variable** del environment.

---

## CORS

CORS (Cross-Origin Resource Sharing) controla qué dominios tienen permiso para hacer requests a una API.

- `access-control-allow-origin: *` → acepta cualquier origen
- `access-control-allow-methods` → lista los métodos permitidos
- El browser envía un `OPTIONS` automático antes de cada request cross-origin para verificar permisos

MockAPI tiene CORS abierto (`*`), por eso no hay problemas al consumirla desde cualquier dominio.

---

## MockAPI vs JSONPlaceholder

| | MockAPI | JSONPlaceholder |
|--|---------|-----------------|
| Persiste datos | ✅ Sí | ❌ No (fake) |
| Rate limit | ❌ No | ✅ 1000 requests |
| Auth | ❌ No | ❌ No |
| CORS | `*` | Abierto con credenciales |
| Server | Heroku + Express | Cloudflare + Express |
