// Profesor y alumnos cargados desde MockAPI — no se usa localStorage para estos datos
let profesorActual = null;
let alumnosCache = [];

async function cargarDatos() {
    const nombre = localStorage.getItem('profeLogueado');
    const [profesores, alumnos] = await Promise.all([
        profesoresAPI.getAll(),
        alumnosAPI.getAll()
    ]);
    profesorActual = profesores.find(p => p.nombre === nombre) || null;
    alumnosCache = alumnos;
}

document.addEventListener('DOMContentLoaded', async function() {
    await cargarDatos();

    if (!profesorActual) return;

    document.getElementById('bienvenidaProfe').textContent = `Bienvenido, ${profesorActual.nombre}`;
    document.getElementById('infoMateriaProfe').textContent = `Profesor de ${profesorActual.materia}`;

    mostrarTareasYAlumnosMateria(profesorActual.materia);
    mostrarAlumnosMateriaEnTabla();

    const materiaInput = document.getElementById('materiaTarea');
    if (materiaInput) {
        materiaInput.value = profesorActual.materia;
        materiaInput.disabled = true;
    }

    // Publicar nueva tarea
    document.getElementById('formTarea').addEventListener('submit', function(e) {
        e.preventDefault();
        const titulo = document.getElementById('tituloTarea').value.trim();
        const descripcion = document.getElementById('descripcionTarea').value.trim();
        const materia = document.getElementById('materiaTarea').value;

        if (!titulo || !descripcion) {
            document.getElementById('mensajeTarea').textContent = 'Completa todos los campos.';
            return;
        }

        let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
        tareas.push({ titulo, descripcion, materia });
        localStorage.setItem('tareas', JSON.stringify(tareas));

        document.getElementById('mensajeTarea').textContent = '¡Tarea publicada!';
        document.getElementById('formTarea').reset();
        mostrarTareasYAlumnosMateria(materia);
    });
});

function mostrarTareasYAlumnosMateria(materia) {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]').filter(t => t.materia === materia);
    const lista = document.getElementById('listaTareasProfe');
    lista.innerHTML = '';

    const oldCounter = document.getElementById('contadorTareasProfe');
    if (oldCounter) oldCounter.remove();
    const oldH3 = lista.parentNode.querySelector('h3.titulo-seccion');
    if (oldH3) oldH3.remove();

    const h3 = document.createElement('h3');
    h3.className = 'titulo-seccion';
    h3.textContent = 'Tareas asignadas a tus alumnos';
    lista.parentNode.insertBefore(h3, lista);

    tareas.forEach((tarea, i) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="numero-tarea">${i + 1}.</span> <strong>${tarea.titulo}</strong>: ${tarea.descripcion}`;
        lista.appendChild(li);
    });

    const contador = document.createElement('div');
    contador.id = 'contadorTareasProfe';
    contador.className = 'contador-tareas';
    contador.textContent = `Tareas asignadas: ${tareas.length}`;
    lista.parentNode.insertBefore(contador, lista.nextSibling);
}

function mostrarAlumnosMateriaEnTabla() {
    if (!profesorActual) return;
    const alumnosMateria = alumnosCache.filter(al => (al.materias || []).includes(profesorActual.materia));
    const tabla = document.getElementById('tablaAlumnos');
    tabla.innerHTML = '';
    tabla.appendChild(crearTheadTablaAlumnos());

    const tbody = document.createElement('tbody');
    alumnosMateria.forEach(al => {
        const promedio = calcularPromedioMateria(al, profesorActual.materia);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${al.nombre}</td>
            <td>${al.email}</td>
            <td>${promedio !== undefined ? promedio : '-'}</td>
            <td><button onclick="verHistorial('${al.nombre}')">Ver historial</button></td>
        `;
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
}

window.verHistorial = function(nombreAlumno) {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const alumno = alumnosCache.find(a => a.nombre === nombreAlumno);
    if (!alumno) {
        document.getElementById('historialAlumno').innerHTML = `<p>No existe el alumno ${nombreAlumno}.</p>`;
        return;
    }

    const tareasMateria = tareas.filter(t => t.materia === profesorActual.materia);

    let html = `<h4 class="titulo-seccion">Historial de entregas de ${alumno.nombre} en ${profesorActual.materia}</h4>
    <table border="1" style="width:100%;text-align:left;">
        <tr><th>Tarea</th><th>Estado</th><th>Fecha</th><th>Calificación</th><th>Adjunto</th></tr>`;

    tareasMateria.forEach(tarea => {
        const entrega = alumno.entregas ? alumno.entregas.find(e => e.titulo === tarea.titulo) : null;
        const estado = entrega ? entrega.estado : 'Pendiente';
        const fecha = entrega && entrega.fecha ? entrega.fecha : '---';
        const calificacion = entrega && entrega.calificacion ? entrega.calificacion : '';
        const disabled = estado === 'Pendiente' ? 'disabled' : '';
        const adjunto = entrega && entrega.archivo ? entrega.archivo : '';
        let style = '';
        if (calificacion) {
            style = Number(calificacion) >= 6 ? 'background-color:#d4f7d4;' : 'background-color:#ffd6d6;';
        }
        html += `<tr style="${style}">
            <td>${tarea.titulo}</td>
            <td>${estado}</td>
            <td>${fecha}</td>
            <td>
                <select onchange="calificarEntrega('${alumno.nombre}', '${tarea.titulo}', this.value)" ${disabled}>
                    <option value="">Sin calificar</option>
                    ${[...Array(10)].map((_, i) => {
                        const val = i + 1;
                        return `<option value="${val}"${calificacion == val ? ' selected' : ''}>${val}</option>`;
                    }).join('')}
                </select>
            </td>
            <td>${adjunto}</td>
        </tr>`;
    });

    html += `</table><button onclick="guardarPromedio('${alumno.nombre}')">Actualizar promedio</button>`;
    document.getElementById('historialAlumno').innerHTML = html;
};

window.calificarEntrega = async function(nombreAlumno, tituloTarea, valor) {
    const alumno = alumnosCache.find(a => a.nombre === nombreAlumno);
    if (!alumno) return;
    if (!alumno.entregas) alumno.entregas = [];
    let entrega = alumno.entregas.find(e => e.titulo === tituloTarea);
    if (!entrega) {
        entrega = { titulo: tituloTarea, estado: 'Pendiente', fecha: '---' };
        alumno.entregas.push(entrega);
    }
    entrega.calificacion = valor ? Number(valor) : undefined;
    await alumnosAPI.update(alumno.id, alumno); // PUT
    verHistorial(nombreAlumno);
};

window.guardarPromedio = async function(nombreAlumno) {
    const alumno = alumnosCache.find(a => a.nombre === nombreAlumno);
    if (!alumno || !alumno.entregas) return;

    const calificadas = alumno.entregas.filter(e => typeof e.calificacion === 'number');
    if (calificadas.length > 0) {
        const suma = calificadas.reduce((acc, e) => acc + e.calificacion, 0);
        alumno.promedio = Number((suma / calificadas.length).toFixed(2));
        await alumnosAPI.update(alumno.id, alumno); // PUT
        mostrarAlumnosMateriaEnTabla();
        verHistorial(nombreAlumno);
        const msg = document.createElement('div');
        msg.style.color = 'green';
        msg.textContent = 'Promedio guardado correctamente.';
        document.getElementById('historialAlumno').appendChild(msg);
    }
};

function calcularPromedioMateria(alumno, materia) {
    if (!alumno.entregas || alumno.entregas.length === 0) return 'N/A';
    const calificaciones = alumno.entregas
        .filter(e => e.materia === materia && typeof e.calificacion === 'number')
        .map(e => e.calificacion);
    if (calificaciones.length === 0) return 'N/A';
    const suma = calificaciones.reduce((acc, val) => acc + val, 0);
    return Math.round(suma / calificaciones.length);
}

function crearTheadTablaAlumnos() {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    ['Nombre', 'Email', 'Promedio', 'Acciones'].forEach(texto => {
        const th = document.createElement('th');
        const span = document.createElement('span');
        span.textContent = texto;
        th.appendChild(span);
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    return thead;
}
