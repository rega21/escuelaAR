// Precarga de profesores
if (!localStorage.getItem('profesores')) {
    const profesores = [
        { nombre: 'prof1', password: '123', email: 'garcia@correo.com', materia: 'Matemática' },
        { nombre: 'prof2', password: '12345', email: 'ruiz@correo.com', materia: 'Historia' },
        { nombre: 'prof3', password: 'lit2024', email: 'literatura@correo.com', materia: 'Literatura' },
        { nombre: 'fisicoperez', password: 'fisica2025', email: 'fisica@escuela.com', materia: 'Física' },
        { nombre: 'geografialopez', password: 'geo2025', email: 'geografia@escuela.com', materia: 'Geografía' },
        { nombre: 'inglesmartin', password: 'ingles2025', email: 'ingles@escuela.com', materia: 'Inglés' }
    ];
    localStorage.setItem('profesores', JSON.stringify(profesores));
}

// Precarga de tareas
if (!localStorage.getItem('tareas')) {
    const tareas = [
        // Matemática
        {
            titulo: 'Ecuaciones básicas',
            descripcion: 'Resuelve: 2x + 5 = 13. Explica cada paso que realizas y verifica tu resultado reemplazando la incógnita en la ecuación original.',
            materia: 'Matemática'
        },
        {
            titulo: 'Problema de trenes',
            descripcion: 'Si un tren viaja a 80 km/h, ¿cuánto tarda en recorrer 240 km? Explica el procedimiento y la fórmula utilizada. ¿Qué pasaría si el tren reduce su velocidad a la mitad?',
            materia: 'Matemática'
        },
        {
            titulo: 'Fracciones equivalentes',
            descripcion: 'Explica qué son las fracciones equivalentes y da dos ejemplos. Luego, representa gráficamente una fracción y su equivalente usando dibujos o diagramas.',
            materia: 'Matemática'
        },
        {
            titulo: 'Ángulos y triángulos',
            descripcion: 'Dibuja un triángulo y marca sus ángulos. ¿Cuánto suman? Explica por qué la suma de los ángulos internos de un triángulo siempre es la misma. Incluye un ejemplo con diferentes tipos de triángulos.',
            materia: 'Matemática'
        },
        {
            titulo: 'Problema de porcentajes',
            descripcion: 'Si tienes $200 y gastas el 15%, ¿cuánto te queda? Explica cómo calculaste el porcentaje y da un ejemplo con otro valor a elección.',
            materia: 'Matemática'
        },
        {
            titulo: 'División con decimales',
            descripcion: 'Resuelve: 15,75 ÷ 2,5. Explica el procedimiento y redondea el resultado a dos decimales.',
            materia: 'Matemática'
        },
        {
            titulo: 'Propiedades de la multiplicación',
            descripcion: 'Enumera y explica las propiedades de la multiplicación. Da un ejemplo de cada una.',
            materia: 'Matemática'
        },

        // Historia
        {
            titulo: 'Resumen capítulo 3',
            descripcion: 'Lee el capítulo 3 de historia y realiza un resumen de al menos 200 palabras. Incluye los conceptos principales, personajes destacados y tu opinión personal sobre el tema tratado.',
            materia: 'Historia'
        },
        {
            titulo: 'Revolución de Mayo',
            descripcion: 'Investiga sobre la Revolución de Mayo y escribe los hechos principales. Menciona las causas, los protagonistas y las consecuencias para el país. Agrega una imagen o dibujo alusivo.',
            materia: 'Historia'
        },
        {
            titulo: 'Independencia Argentina',
            descripcion: '¿En qué año se declaró la independencia argentina? Explica el contexto histórico, los principales actores y la importancia de este hecho para la historia nacional.',
            materia: 'Historia'
        },
        {
            titulo: 'Primera Junta',
            descripcion: '¿Quiénes formaron la Primera Junta? Enuméralos y describe brevemente el rol de al menos dos de sus integrantes. ¿Por qué fue importante la creación de la Junta?',
            materia: 'Historia'
        },
        {
            titulo: 'La conquista de América',
            descripcion: 'Describe brevemente el proceso de conquista de América. ¿Qué pueblos habitaban el continente antes de la llegada de los europeos? ¿Cuáles fueron las consecuencias para las culturas originarias?',
            materia: 'Historia'
        },

        // Literatura
        {
            titulo: 'Análisis de poema',
            descripcion: 'Lee el poema "Martín Fierro" y escribe un análisis breve. Explica el tema principal, los recursos literarios que encuentres y tu interpretación personal del mensaje del poema.',
            materia: 'Literatura'
        },
        {
            titulo: 'Redacción creativa',
            descripcion: 'Redacta un cuento corto de tema libre. Debe tener al menos una introducción, un desarrollo y un desenlace. Puedes agregar diálogos y descripciones para enriquecer la narración.',
            materia: 'Literatura'
        },
        {
            titulo: 'Autores argentinos',
            descripcion: 'Nombra tres autores argentinos y una obra de cada uno. Investiga brevemente sobre la vida de uno de ellos y comparte un dato curioso.',
            materia: 'Literatura'
        },
        {
            titulo: 'Géneros literarios',
            descripcion: 'Explica la diferencia entre poesía, narrativa y teatro. Da un ejemplo de cada género y menciona un autor representativo.',
            materia: 'Literatura'
        },
        {
            titulo: 'Opinión sobre un libro',
            descripcion: 'Escribe tu opinión sobre un libro que hayas leído recientemente. ¿Qué te gustó y qué no? ¿Recomendarías su lectura a tus compañeros? Justifica tu respuesta.',
            materia: 'Literatura'
        },

        // Física
        {
            titulo: 'Movimiento rectilíneo',
            descripcion: 'Explica con tus palabras qué es el Movimiento Rectilíneo Uniforme (MRU) y el Movimiento Rectilíneo Uniformemente Variado (MRUV). Da un ejemplo de cada uno, indicando la fórmula utilizada para calcular la velocidad o aceleración. Realiza un dibujo o esquema que represente ambos movimientos y explica las diferencias principales entre ellos.',
            materia: 'Física'
        },
        {
            titulo: 'Energía y trabajo',
            descripcion: 'Define qué es la energía y cuáles son sus principales formas (cinética, potencial, térmica, etc.). Explica el concepto de trabajo en física y su relación con la energía. Realiza un ejercicio práctico donde calcules el trabajo realizado al mover un objeto y describe en qué situaciones cotidianas se observa la transformación de energía.',
            materia: 'Física'
        },

        // Geografía
        {
            titulo: 'Continentes y océanos',
            descripcion: 'Ubica en un mapa los seis continentes y los principales océanos del mundo. Investiga y escribe una breve descripción de cada continente, mencionando su tamaño, población y alguna característica geográfica destacada. Adjunta un mapa coloreado y señala al menos tres países de cada continente.',
            materia: 'Geografía'
        },
        {
            titulo: 'Climas del mundo',
            descripcion: 'Describe los principales tipos de climas del mundo (ecuatorial, tropical, templado, polar, etc.). Explica cómo influyen la latitud, altitud y proximidad al mar en el clima de una región. Elige dos países con climas diferentes y compara sus características climáticas, flora y fauna.',
            materia: 'Geografía'
        },

        // Inglés
        {
            titulo: 'Present Simple',
            descripcion: 'Realiza una serie de ejercicios utilizando el tiempo verbal Present Simple. Escribe oraciones afirmativas, negativas e interrogativas sobre rutinas diarias. Luego, redacta un breve párrafo sobre tu día típico usando este tiempo verbal y subraya los verbos principales.',
            materia: 'Inglés'
        },
        {
            titulo: 'Reading comprehension',
            descripcion: 'Lee el texto proporcionado por el profesor y responde a las preguntas de comprensión lectora. Identifica las ideas principales y secundarias, y escribe un resumen en inglés de al menos 80 palabras. Explica el significado de cinco palabras nuevas que hayas encontrado en el texto.',
            materia: 'Inglés'
        }
    ];
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Precarga de materias
if (!localStorage.getItem('materias')) {
    const materias = [
        { nombre: 'Matemática' },
        { nombre: 'Historia' },
        { nombre: 'Literatura' },
        { nombre: 'Física' },
        { nombre: 'Geografía' },
        { nombre: 'Inglés' }
    ];
    localStorage.setItem('materias', JSON.stringify(materias));
}
