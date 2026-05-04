// Precarga de profesores, tareas y materias
// Seedea MockAPI si está vacía. No usa localStorage.

const profesoresIniciales = [
    { nombre: 'prof1', password: '123', email: 'garcia@correo.com', materia: 'Matemática' },
    { nombre: 'prof2', password: '12345', email: 'ruiz@correo.com', materia: 'Historia' },
    { nombre: 'prof3', password: 'lit2024', email: 'literatura@correo.com', materia: 'Literatura' },
    { nombre: 'fisicoperez', password: 'fisica2025', email: 'fisica@escuela.com', materia: 'Física' },
    { nombre: 'geografialopez', password: 'geo2025', email: 'geografia@escuela.com', materia: 'Geografía' },
    { nombre: 'inglesmartin', password: 'ingles2025', email: 'ingles@escuela.com', materia: 'Inglés' }
];

const tareasIniciales = [
    { titulo: 'Ecuaciones básicas', descripcion: 'Resuelve: 2x + 5 = 13. Explica cada paso que realizas y verifica tu resultado reemplazando la incógnita en la ecuación original.', materia: 'Matemática' },
    { titulo: 'Problema de trenes', descripcion: 'Si un tren viaja a 80 km/h, ¿cuánto tarda en recorrer 240 km? Explica el procedimiento y la fórmula utilizada. ¿Qué pasaría si el tren reduce su velocidad a la mitad?', materia: 'Matemática' },
    { titulo: 'Fracciones equivalentes', descripcion: 'Explica qué son las fracciones equivalentes y da dos ejemplos. Luego, representa gráficamente una fracción y su equivalente usando dibujos o diagramas.', materia: 'Matemática' },
    { titulo: 'Ángulos y triángulos', descripcion: 'Dibuja un triángulo y marca sus ángulos. ¿Cuánto suman? Explica por qué la suma de los ángulos internos de un triángulo siempre es la misma.', materia: 'Matemática' },
    { titulo: 'Problema de porcentajes', descripcion: 'Si tienes $200 y gastas el 15%, ¿cuánto te queda? Explica cómo calculaste el porcentaje y da un ejemplo con otro valor a elección.', materia: 'Matemática' },
    { titulo: 'División con decimales', descripcion: 'Resuelve: 15,75 ÷ 2,5. Explica el procedimiento y redondea el resultado a dos decimales.', materia: 'Matemática' },
    { titulo: 'Propiedades de la multiplicación', descripcion: 'Enumera y explica las propiedades de la multiplicación. Da un ejemplo de cada una.', materia: 'Matemática' },
    { titulo: 'Resumen capítulo 3', descripcion: 'Lee el capítulo 3 de historia y realiza un resumen de al menos 200 palabras. Incluye los conceptos principales, personajes destacados y tu opinión personal.', materia: 'Historia' },
    { titulo: 'Revolución de Mayo', descripcion: 'Investiga sobre la Revolución de Mayo y escribe los hechos principales. Menciona las causas, los protagonistas y las consecuencias para el país.', materia: 'Historia' },
    { titulo: 'Independencia Argentina', descripcion: '¿En qué año se declaró la independencia argentina? Explica el contexto histórico, los principales actores y la importancia de este hecho.', materia: 'Historia' },
    { titulo: 'Primera Junta', descripcion: '¿Quiénes formaron la Primera Junta? Enuméralos y describe brevemente el rol de al menos dos de sus integrantes.', materia: 'Historia' },
    { titulo: 'La conquista de América', descripcion: 'Describe brevemente el proceso de conquista de América. ¿Qué pueblos habitaban el continente antes de la llegada de los europeos?', materia: 'Historia' },
    { titulo: 'Análisis de poema', descripcion: 'Lee el poema "Martín Fierro" y escribe un análisis breve. Explica el tema principal, los recursos literarios y tu interpretación personal.', materia: 'Literatura' },
    { titulo: 'Redacción creativa', descripcion: 'Redacta un cuento corto de tema libre con introducción, desarrollo y desenlace. Puedes agregar diálogos y descripciones.', materia: 'Literatura' },
    { titulo: 'Autores argentinos', descripcion: 'Nombra tres autores argentinos y una obra de cada uno. Investiga brevemente sobre la vida de uno de ellos.', materia: 'Literatura' },
    { titulo: 'Géneros literarios', descripcion: 'Explica la diferencia entre poesía, narrativa y teatro. Da un ejemplo de cada género y menciona un autor representativo.', materia: 'Literatura' },
    { titulo: 'Opinión sobre un libro', descripcion: 'Escribe tu opinión sobre un libro que hayas leído recientemente. ¿Lo recomendarías? Justifica tu respuesta.', materia: 'Literatura' },
    { titulo: 'Movimiento rectilíneo', descripcion: 'Explica el MRU y el MRUV con ejemplos. Incluye las fórmulas y un esquema que represente ambos movimientos.', materia: 'Física' },
    { titulo: 'Energía y trabajo', descripcion: 'Define energía y sus formas principales. Explica el concepto de trabajo en física y realiza un ejercicio práctico.', materia: 'Física' },
    { titulo: 'Continentes y océanos', descripcion: 'Ubica en un mapa los seis continentes y los principales océanos. Escribe una breve descripción de cada continente.', materia: 'Geografía' },
    { titulo: 'Climas del mundo', descripcion: 'Describe los principales tipos de climas. Elige dos países con climas diferentes y compara sus características.', materia: 'Geografía' },
    { titulo: 'Present Simple', descripcion: 'Escribe oraciones afirmativas, negativas e interrogativas sobre rutinas diarias usando Present Simple.', materia: 'Inglés' },
    { titulo: 'Reading comprehension', descripcion: 'Lee el texto del profesor y responde las preguntas. Escribe un resumen en inglés de al menos 80 palabras.', materia: 'Inglés' }
];

const materiasIniciales = [
    { nombre: 'Matemática' },
    { nombre: 'Historia' },
    { nombre: 'Literatura' },
    { nombre: 'Física' },
    { nombre: 'Geografía' },
    { nombre: 'Inglés' }
];

window.profesoresCargados = (async () => {
    try {
        const profesores = await profesoresAPI.getAll();
        if (profesores.length === 0) {
            for (const profesor of profesoresIniciales) {
                await profesoresAPI.create(profesor);
            }
        }
    } catch (e) {
        console.error('Error al cargar profesores:', e);
    }
})();

window.tareasCargadas = (async () => {
    try {
        const tareas = await tareasAPI.getAll();
        if (tareas.length === 0) {
            for (const tarea of tareasIniciales) {
                await tareasAPI.create(tarea);
            }
        }
    } catch (e) {
        console.error('Error al cargar tareas:', e);
    }
})();

window.materiasCargadas = (async () => {
    try {
        const materias = await materiasAPI.getAll();
        if (materias.length === 0) {
            for (const materia of materiasIniciales) {
                await materiasAPI.create(materia);
            }
        }
    } catch (e) {
        console.error('Error al cargar materias:', e);
    }
})();
