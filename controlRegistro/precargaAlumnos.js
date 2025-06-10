// Precarga de alumnos
if (!localStorage.getItem('alumnos')) {
    const alumnos = [
        { 
            nombre: 'agus', 
            password: '1234', 
            email: 'juan@hotmail.com', 
            materias: [],
            entregas: []
        },
        { 
            nombre: 'cami', 
            password: 'abcd', 
            email: 'ana@gmail.com', 
            materias: ['Historia'],
            entregas: []
        },
        { 
            nombre: 'eugueniamaneiros', 
            password: '1234', 
            email: 'eugue@gmail.com', 
            materias: ['Historia'],
            entregas: [
                {
                    titulo: 'Revolución de Mayo',
                    materia: 'Historia',
                    estado: 'Entregado',
                    fecha: '2025-05-22',
                    archivo: 'revolucion.pdf',
                    calificacion: 9 // <--- calificación precargada
                }
            ]
        },
        { 
            nombre: 'jhonparton', 
            password: 'abcd', 
            email: 'jhon@hotmail.com', 
            materias: ['Literatura'],
            entregas: [
                {
                    titulo: 'Análisis de poema',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-05-23',
                    archivo: 'poema.pdf',
                    calificacion: 8 // <--- calificación precargada
                }
            ]
        },
        { 
            nombre: 'lucasmartinez', 
            password: 'lucas1', 
            email: 'lucas@gmail.com', 
            materias: ['Matemática'],
            entregas: [
                {
                    titulo: 'Fracciones equivalentes',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-24',
                    archivo: 'fracciones.pdf',
                    calificacion: 8
                },
                {
                    titulo: 'División con decimales',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-25',
                    archivo: 'division_lucas.pdf',
                    calificacion: 7
                },
                {
                    titulo: 'Propiedades de la multiplicación',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-26',
                    archivo: 'multiplicacion_lucas.pdf',
                    calificacion: 9
                }
            ]
        },
        { 
            nombre: 'mariaperez', 
            password: 'maria2', 
            email: 'maria@gmail.com', 
            materias: ['Historia', 'Literatura'],
            entregas: [
                {
                    titulo: 'Primera Junta',
                    materia: 'Historia',
                    estado: 'Entregado',
                    fecha: '2025-05-25',
                    archivo: 'junta.pdf'
                },
                {
                    titulo: 'Redacción creativa',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-05-26',
                    archivo: 'cuento.pdf'
                }
            ]
        },
        { 
            nombre: 'sofiagomez', 
            password: 'sofia3', 
            email: 'sofia@gmail.com', 
            materias: ['Matemática'],
            entregas: [
                {
                    titulo: 'Ángulos y triángulos',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-27',
                    archivo: 'angulos.pdf',
                    calificacion: 10
                },
                {
                    titulo: 'Problema de trenes',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-28',
                    archivo: 'trenes_sofia.pdf',
                    calificacion: 8
                }
            ]
        },
        { 
            nombre: 'carlosdiaz', 
            password: 'carlos4', 
            email: 'carlos@gmail.com', 
            materias: ['Literatura'],
            entregas: [
                {
                    titulo: 'Autores argentinos',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-05-28',
                    archivo: 'autores.pdf',
                    calificacion: 9
                },
                {
                    titulo: 'Análisis de poema',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-05-29',
                    archivo: 'poema_carlos.pdf',
                    calificacion: 8
                }
            ]
        },
        { 
            nombre: 'martinlopez',
            password: 'martin123',
            email: 'martin@gmail.com',
            materias: ['Matemática', 'Historia'],
            entregas: [
                {
                    titulo: 'Ecuaciones básicas',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-29',
                    archivo: 'ecuaciones.pdf',
                    calificacion: 10
                },
                {
                    titulo: 'Resumen capítulo 3',
                    materia: 'Historia',
                    estado: 'Entregado',
                    fecha: '2025-05-29',
                    archivo: 'resumen.pdf',
                    calificacion: 7
                }
            ]
        },
        { 
            nombre: 'florenciagomez',
            password: 'flor123',
            email: 'florencia@gmail.com',
            materias: ['Literatura', 'Matemática'],
            entregas: [
                {
                    titulo: 'Análisis de poema',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-05-29',
                    archivo: 'poema_flor.pdf',
                    calificacion: 9
                },
                {
                    titulo: 'Problema de trenes',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-30',
                    archivo: 'trenes_flor.pdf',
                    calificacion: 8
                }
            ]
        },
        { 
            nombre: 'sofiarodriguez',
            password: 'sofia2025',
            email: 'sofia@gmail.com',
            materias: ['Historia', 'Literatura'],
            entregas: [
                {
                    titulo: 'Independencia Argentina',
                    materia: 'Historia',
                    estado: 'Entregado',
                    fecha: '2025-05-28',
                    archivo: 'independencia.pdf',
                    calificacion: 10
                },
                {
                    titulo: 'Redacción creativa',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-05-28',
                    archivo: 'cuento_sofia.pdf',
                    calificacion: 9
                }
            ]
        },
        { 
            nombre: 'lucasfernandez',
            password: 'lucas321',
            email: 'lucas@gmail.com',
            materias: ['Matemática'],
            entregas: [
                {
                    titulo: 'División con decimales',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-27',
                    archivo: 'division_lucas.pdf',
                    calificacion: 7
                }
            ]
        },
        { 
            nombre: 'valentinapaz',
            password: 'valen2025',
            email: 'valen@gmail.com',
            materias: ['Historia', 'Matemática'],
            entregas: [
                {
                    titulo: 'Problema de porcentajes',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-05-31',
                    archivo: 'porcentajes_valen.pdf',
                    calificacion: 8
                },
                {
                    titulo: 'División con decimales',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-06-01',
                    archivo: 'division_valen.pdf',
                    calificacion: 7
                }
            ]
        },
        { 
            nombre: 'emilianoruiz',
            password: 'emi2025',
            email: 'emiliano@gmail.com',
            materias: ['Literatura'],
            entregas: [
                {
                    titulo: 'Opinión sobre un libro',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-06-01',
                    archivo: 'opinion_emi.pdf',
                    calificacion: 10
                }
            ]
        },
        { 
            nombre: 'paulagonzalez',
            password: 'paula2025',
            email: 'paula@gmail.com',
            materias: ['Matemática', 'Historia', 'Literatura'],
            entregas: [
                {
                    titulo: 'División con decimales',
                    materia: 'Matemática',
                    estado: 'Entregado',
                    fecha: '2025-06-01',
                    archivo: 'division_paula.pdf',
                    calificacion: 7
                },
                {
                    titulo: 'Primera Junta',
                    materia: 'Historia',
                    estado: 'Entregado',
                    fecha: '2025-06-01',
                    archivo: 'junta_paula.pdf',
                    calificacion: 8
                },
                {
                    titulo: 'Redacción creativa',
                    materia: 'Literatura',
                    estado: 'Entregado',
                    fecha: '2025-06-01',
                    archivo: 'cuento_paula.pdf',
                    calificacion: 9
                }
            ]
        },
        { 
            nombre: 'federicoramos',
            password: 'fede2025',
            email: 'fede@gmail.com',
            materias: ['Historia'],
            entregas: [
                {
                    titulo: 'Independencia Argentina',
                    materia: 'Historia',
                    estado: 'Entregado',
                    fecha: '2025-06-02',
                    archivo: 'independencia_fede.pdf',
                    calificacion: 6
                }
            ]
        },
        {
            nombre: 'marianafisica',
            password: 'fisica1',
            email: 'mariana@alumnos.com',
            materias: ['Física'],
            entregas: [
                {
                    titulo: 'Movimiento rectilíneo',
                    materia: 'Física',
                    estado: 'Entregado',
                    fecha: '2025-06-05',
                    archivo: 'mru_mruv.pdf',
                    calificacion: 8
                }
            ]
        },
        {
            nombre: 'lucasgeo',
            password: 'geo1',
            email: 'lucasgeo@alumnos.com',
            materias: ['Geografía'],
            entregas: [
                {
                    titulo: 'Continentes y océanos',
                    materia: 'Geografía',
                    estado: 'Entregado',
                    fecha: '2025-06-06',
                    archivo: 'mapa_continentes.pdf',
                    calificacion: 9
                }
            ]
        },
        {
            nombre: 'sofiaingles',
            password: 'ingles1',
            email: 'sofiaingles@alumnos.com',
            materias: ['Inglés'],
            entregas: [
                {
                    titulo: 'Present Simple',
                    materia: 'Inglés',
                    estado: 'Entregado',
                    fecha: '2025-06-07',
                    archivo: 'present_simple.pdf',
                    calificacion: 10
                }
            ]
        }
    ];
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}
