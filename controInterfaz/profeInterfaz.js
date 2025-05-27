document.addEventListener('DOMContentLoaded', function() {
    const nombreProfe = localStorage.getItem('profeLogueado') || 'Profesor';
    document.getElementById('bienvenidaProfe').textContent = `Bienvenido, ${nombreProfe}`; //NOMBRE PROFE

    const formTarea = document.getElementById('formTarea');
    const listaTareas = document.getElementById('listaTareas');
    const mensajeTarea = document.getElementById('mensajeTarea');

    // Mostrar tareas al cargar la página
    mostrarTareas();

    // Publicar nueva tarea
    formTarea.addEventListener('submit', function(e) {
        e.preventDefault();
        const titulo = document.getElementById('tituloTarea').value.trim();
        const descripcion = document.getElementById('descripcionTarea').value.trim();
        const materia = document.getElementById('materiaTarea').value;

        if (!titulo || !descripcion) {
            mensajeTarea.textContent = 'Completa todos los campos.';
            return;
        }

        let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
        tareas.push({
            titulo,
            descripcion,
            materia
        });
        localStorage.setItem('tareas', JSON.stringify(tareas));

        mensajeTarea.textContent = '¡Tarea publicada!';
        formTarea.reset();

        // Cambia esta línea:
        // mostrarTareas();
        // Por esta:
        mostrarTareasYAlumnosMateria(materia);
    });

    // Función para mostrar tareas
    function mostrarTareas() {
        const listaTareas = document.getElementById('listaTareasProfe'); // <-- usa el id correcto
        listaTareas.innerHTML = '';
        let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
        if (tareas.length === 0) {
            listaTareas.innerHTML = '<li>No hay tareas publicadas.</li>';
            return;
        }
        tareas.forEach(function(tarea, idx) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>Tarea ${idx + 1}:</strong> ${tarea.titulo}<br>${tarea.descripcion}`;
            listaTareas.appendChild(li);
        });
    }

    mostrarAlumnos();
    mostrarAlumnosMateriaEnTabla();
});

function mostrarAlumnos() {
    const tabla = document.getElementById('tablaAlumnos').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    alumnos.forEach(alumno => {
        const promedio = alumno.promedio !== undefined ? alumno.promedio : 'N/A';
        const row = `<tr>
            <td>${alumno.nombre}</td>
            <td>${alumno.email}</td>
            <td>${promedio}</td>
            <td><button onclick="verHistorial('${alumno.nombre}')">Ver historial</button></td>
        </tr>`;
        tabla.innerHTML += row;
    });
}

window.verHistorial = function(nombreAlumno) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const nombreProfe = localStorage.getItem('profeLogueado');
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    const profesor = profesores.find(p => p.nombre === nombreProfe);
    if (!profesor) return;

    const alumno = alumnos.find(a => a.nombre === nombreAlumno);

    if (!alumno) {
        document.getElementById('historialAlumno').innerHTML = `<p>No existe el alumno ${nombreAlumno}.</p>`;
        return;
    }

    // Filtrar solo tareas de la materia del profesor
    const tareasMateria = tareas.filter(t => t.materia === profesor.materia);

    let html = `<h4>Historial de entregas de ${alumno.nombre} en ${profesor.materia}</h4>
    <table border="1" style="width:100%;text-align:left;">
        <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Calificación</th>
            <th>Adjunto</th>
        </tr>`;

    tareasMateria.forEach((tarea, idx) => {
        const entrega = alumno.entregas ? alumno.entregas.find(e => e.titulo === tarea.titulo) : null;
        const estado = entrega ? entrega.estado : 'Pendiente';
        const fecha = entrega && entrega.fecha ? entrega.fecha : '---';
        const calificacion = entrega && entrega.calificacion ? entrega.calificacion : '';
        const disabled = (estado === 'Pendiente') ? 'disabled' : '';
        const adjunto = entrega && entrega.archivo ? entrega.archivo : '';
        // Color según calificación
        let style = '';
        if (calificacion) {
            if (Number(calificacion) >= 6) {
                style = 'background-color:#d4f7d4;'; // verde claro
            } else {
                style = 'background-color:#ffd6d6;'; // rojo suave
            }
        }
        html += `<tr style="${style}">
            <td>${tarea.titulo}</td>
            <td>${estado}</td>
            <td>${fecha}</td>
            <td>
                <select onchange="calificarEntrega('${alumno.nombre}', '${tarea.titulo}', this.value)" ${disabled}>
                    <option value="">Sin calificar</option>
                    ${[...Array(10)].map((_,i) => {
                        const val = i+1;
                        return `<option value="${val}"${calificacion == val ? ' selected' : ''}>${val}</option>`;
                    }).join('')}
                </select>
            </td>
            <td>${adjunto}</td>
        </tr>`;
    });

    html += `</table>
    <button onclick="guardarPromedio('${alumno.nombre}')">Guardar</button>`;
    document.getElementById('historialAlumno').innerHTML = html;
   
}

// Modifica calificarEntrega para buscar por título de tarea
window.calificarEntrega = function(nombreAlumno, tituloTarea, valor) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    if (!alumno) return;
    if (!alumno.entregas) alumno.entregas = [];
    let entrega = alumno.entregas.find(e => e.titulo === tituloTarea);
    if (!entrega) {
        entrega = { titulo: tituloTarea, estado: "Pendiente", fecha: "---" };
        alumno.entregas.push(entrega);
    }
    entrega.calificacion = valor ? Number(valor) : undefined;
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    // Refresca el historial para actualizar el color
    verHistorial(nombreAlumno);
}

// Función para guardar el promedio
window.guardarPromedio = function(nombreAlumno) {
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    if (alumno && alumno.entregas) {
        // Filtra solo las entregas calificadas
        const calificadas = alumno.entregas.filter(e => typeof e.calificacion === 'number');
        if (calificadas.length > 0) {
            const suma = calificadas.reduce((acc, e) => acc + e.calificacion, 0);
            const promedio = (suma / calificadas.length).toFixed(2);
            alumno.promedio = Number(promedio);
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
            mostrarAlumnosMateriaEnTabla(); // <-- Solo alumnos de la materia
        }
    }
    // No mostrar mensaje
}

// Mostrar tareas asignadas en la interfaz del profesor
function mostrarTareasProfe() {
    const nombreProfe = localStorage.getItem('profeLogueado');
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    const profesor = profesores.find(p => p.nombre === nombreProfe);

    // Mostrar solo tareas de la materia del profesor
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]')
        .filter(t => t.materia === profesor.materia);

    // Aquí muestras las tareas en el HTML, por ejemplo:
    const lista = document.getElementById('listaTareasProfe');
    lista.innerHTML = '';
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${tarea.titulo}</strong>: ${tarea.descripcion}`;
        lista.appendChild(li);
    });

    // Si tienes un formulario para agregar tareas, fuerza la materia:
    document.getElementById('materiaTarea').value = profesor.materia;
    document.getElementById('materiaTarea').disabled = true;
}

// Mostrar tareas y alumnos en la interfaz del profesor al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const nombreProfe = localStorage.getItem('profeLogueado');
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    const profesor = profesores.find(p => p.nombre === nombreProfe);
    document.getElementById('bienvenidaProfe').textContent = `Bienvenido, ${nombreProfe}`;
    document.getElementById('infoMateriaProfe').textContent = `Profesor de ${profesor.materia}`;

    mostrarTareasYAlumnosMateria(profesor.materia); // Solo tareas de la materia
    mostrarAlumnosMateriaEnTabla(); // Solo alumnos de la materia

    // Si tienes un formulario para agregar tareas, fuerza la materia:
    const materiaInput = document.getElementById('materiaTarea');
    if (materiaInput) {
        materiaInput.value = profesor.materia;
        materiaInput.disabled = true;
    }
});

function mostrarTareasYAlumnosMateria(materia) {
    // Mostrar solo tareas de la materia del profesor
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]')
        .filter(t => t.materia === materia);

    const lista = document.getElementById('listaTareasProfe');
    lista.innerHTML = '';
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${tarea.titulo}</strong>: ${tarea.descripcion}`;
        lista.appendChild(li);
    });
}

// Mostrar solo alumnos anotados en la materia del profesor logueado
function mostrarAlumnosMateriaEnTabla() {
    const alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreProfe = localStorage.getItem('profeLogueado');
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    const profesor = profesores.find(p => p.nombre === nombreProfe);
    if (!profesor) return;

    const alumnosMateria = alumnos.filter(al => (al.materias || []).includes(profesor.materia));
    const tbody = document.querySelector('#tablaAlumnos tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    alumnosMateria.forEach(al => {
        const promedio = calcularPromedioMateria(al, profesor.materia);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${al.nombre}</td>
            <td>${al.email}</td>
            <td>${promedio !== undefined ? promedio : '-'}</td>
            <td>
                <button onclick="verHistorial('${al.nombre}')">Ver historial</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Llama a esta función en tu DOMContentLoaded:
document.addEventListener('DOMContentLoaded', function() {
    // ...tu código...
    mostrarAlumnosMateriaEnTabla();
    // ...tu código...
});

function calcularPromedioAlumno(alumno) {
    if (!alumno.entregas || alumno.entregas.length === 0) return 'N/A';
    // Filtra solo entregas con calificación numérica
    const calificaciones = alumno.entregas
        .map(e => e.calificacion)
        .filter(c => typeof c === 'number');
    if (calificaciones.length === 0) return 'N/A';
    const suma = calificaciones.reduce((acc, val) => acc + val, 0);
    return Math.round(suma / calificaciones.length); // Solo entero
}

function calcularPromedioMateria(alumno, materia) {
    if (!alumno.entregas || alumno.entregas.length === 0) return 'N/A';
    // Solo entregas de la materia y con calificación numérica
    const calificaciones = alumno.entregas
        .filter(e => e.materia === materia && typeof e.calificacion === 'number')
        .map(e => e.calificacion);
    if (calificaciones.length === 0) return 'N/A';
    const suma = calificaciones.reduce((acc, val) => acc + val, 0);
    return Math.round(suma / calificaciones.length);
}