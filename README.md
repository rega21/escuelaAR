# escuelaAR

Plataforma educativa web para la gestión de alumnos, profesores, materias y tareas. Proyecto académico desarrollado con HTML, CSS y JavaScript vanilla.

**Deploy:** https://escuela-ar-zeta.vercel.app

---

## Tecnologías

- HTML / CSS / JavaScript vanilla (sin frameworks)
- [MockAPI](https://mockapi.io) — API REST mock para persistencia de datos
- [Vercel](https://vercel.com) — hosting estático con deploy automático desde GitHub

---

## Arquitectura

### Fuente de datos

| Recurso | Almacenamiento |
|---|---|
| Alumnos | MockAPI (`/alumnos`) |
| Profesores | MockAPI (`/profesores`) |
| Tareas | MockAPI (`/tareas`) |
| Materias | MockAPI (`/materias`) |
| Sesión activa | localStorage (`alumnoLogueado`, `profeLogueado`) |

### Capa API (`api/`)

```
api/
├── alumnosAPI.js     → GET, POST, PUT, DELETE /alumnos
├── profesoresAPI.js  → GET, POST, PUT, DELETE /profesores
├── tareasAPI.js      → GET, POST, PUT, DELETE /tareas
└── materiasAPI.js    → GET, POST, PUT, DELETE /materias
```

Todos los métodos son `async` y devuelven el JSON de la respuesta.

### Endpoints MockAPI

```
Base URL: https://69f8cbdcf7044aa0103e800c.mockapi.io

GET    /alumnos           → Lista todos los alumnos
POST   /alumnos           → Crea un alumno nuevo
PUT    /alumnos/:id       → Actualiza un alumno
DELETE /alumnos/:id       → Elimina un alumno

GET    /profesores        → Lista todos los profesores
POST   /profesores        → Crea un profesor nuevo
PUT    /profesores/:id    → Actualiza un profesor
DELETE /profesores/:id    → Elimina un profesor

GET    /tareas            → Lista todas las tareas
POST   /tareas            → Crea una tarea nueva
PUT    /tareas/:id        → Actualiza una tarea
DELETE /tareas/:id        → Elimina una tarea

GET    /materias          → Lista todas las materias
POST   /materias          → Crea una materia nueva
PUT    /materias/:id      → Actualiza una materia
DELETE /materias/:id      → Elimina una materia
```

---

## Estructura del proyecto

```
WebEstudiantes/
├── api/
│   ├── alumnosAPI.js          → CRUD alumnos contra MockAPI
│   ├── profesoresAPI.js       → CRUD profesores contra MockAPI
│   ├── tareasAPI.js           → CRUD tareas contra MockAPI
│   └── materiasAPI.js         → CRUD materias contra MockAPI
├── controInterfaz/
│   ├── alumnoInterfaz.js      → Lógica del panel del alumno
│   └── profeInterfaz.js       → Lógica del panel del profesor
├── controlRegistro/
│   ├── loginUnico.js          → Autenticación via MockAPI
│   ├── precargaAlumnos.js     → Seed inicial de alumnos en MockAPI
│   ├── precargaProfesor.js    → Seed inicial de profesores, tareas y materias en MockAPI
│   ├── registroAlumno.js      → Registro de alumno via POST
│   └── registroProfesor.js    → Registro de profesor via POST
├── css/
│   └── estilos.css
├── interfaz/
│   ├── alumnoInterfaz.html    → Panel del alumno
│   └── profeInterfaz.html     → Panel del profesor
├── publicWeb/
│   ├── index.html             → Pantalla de bienvenida (dispara seed)
│   ├── login.html             → Login
│   ├── registroAlumno.html    → Registro de alumno
│   └── registroProfesor.html  → Registro de profesor
└── vercel.json                → Rewrites para routing en Vercel
```

---

## Flujo de datos

```
index.html carga
  → GET /alumnos    (vacío → POST x19 alumnos iniciales)
  → GET /profesores (vacío → POST x6 profesores iniciales)
  → GET /tareas     (vacío → POST x23 tareas iniciales)
  → GET /materias   (vacío → POST x6 materias iniciales)

login.html
  → GET /alumnos    → busca alumno por nombre+password
  → GET /profesores → busca profesor por nombre+password
  → guarda nombre en localStorage (sesión)

alumnoInterfaz.html
  → GET /alumnos + GET /tareas + GET /materias → carga todo en memoria
  → cambios (materias, entregas, avatar) → PUT /alumnos/:id

profeInterfaz.html
  → GET /profesores + GET /alumnos + GET /tareas + GET /materias → carga todo en memoria
  → nueva tarea → POST /tareas
  → calificar / guardar promedio → PUT /alumnos/:id
```

---

## Credenciales de prueba

### Alumnos
| Nombre | Contraseña |
|---|---|
| agus | 1234 |
| cami | abcd |
| lucasmartinez | lucas1 |
| mariaperez | maria2 |

### Profesores
| Nombre | Contraseña | Materia |
|---|---|---|
| prof1 | 123 | Matemática |
| prof2 | 12345 | Historia |
| prof3 | lit2024 | Literatura |
| fisicoperez | fisica2025 | Física |
| geografialopez | geo2025 | Geografía |
| inglesmartin | ingles2025 | Inglés |

---

## Correr localmente

Abrí `publicWeb/index.html` desde un servidor local (Live Server en VS Code, por ejemplo). No abrir con `file://` ya que puede causar problemas con los `fetch` a MockAPI.

## Deploy

El proyecto se deploya automáticamente en Vercel con cada push a `main`. El `vercel.json` maneja el routing para que las rutas relativas funcionen correctamente.
