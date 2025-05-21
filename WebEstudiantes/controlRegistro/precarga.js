// Precarga de alumnos
if (!localStorage.getItem('alumnos')) {
    const alumnos = [
        { 
            nombre: 'Agus', 
            password: '1234', 
            email: 'juan@hotmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'Cami', 
            password: 'abcd', 
            email: 'ana@gmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'EugueniaManeiros', 
            password: '1234', 
            email: 'eugue@gmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'JhonParton', 
            password: 'abcd', 
            email: 'jhon@hotmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'LucasMartinez', 
            password: 'lucas1', 
            email: 'lucas@gmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'MariaPerez', 
            password: 'maria2', 
            email: 'maria@gmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'SofiaGomez', 
            password: 'sofia3', 
            email: 'sofia@gmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'CarlosDiaz', 
            password: 'carlos4', 
            email: 'carlos@gmail.com', 
            materias: [],
            entregas: []
        }
    ];
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Precarga de profesores
if (!localStorage.getItem('profesores')) {
    const profesores = [
        { nombre: 'prof1', password: '123', email: 'garcia@correo.com', materia: 'Matemática' },
        { nombre: 'prof2', password: '12345', email: 'ruiz@correo.com', materia: 'Historia' },
        { nombre: 'prof3', password: 'lit2024', email: 'literatura@correo.com', materia: 'Literatura' }
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
        }
    ];
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Precarga de materias
if (!localStorage.getItem('materias')) {
    const materias = [
        { nombre: 'Matemática' },
        { nombre: 'Historia' },
        { nombre: 'Literatura' }
    ];
    localStorage.setItem('materias', JSON.stringify(materias));
}
