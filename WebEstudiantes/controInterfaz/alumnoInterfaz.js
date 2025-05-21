document.addEventListener('DOMContentLoaded', function() {
    // Mostrar nombre del alumno
    const nombreAlumno = localStorage.getItem('alumnoLogueado') || 'Alumno';
    document.getElementById('bienvenidaAlumno').textContent = `Bienvenido, ${nombreAlumno}`;

    // Mostrar promedio del alumno
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    const promedio = alumno && alumno.promedio !== undefined ? alumno.promedio : 'N/A';
    document.getElementById('promedioAlumno').textContent = `Promedio: ${promedio}`;

    // Si el alumno no tiene materias, mostrar el modal
    if (!alumno.materias || alumno.materias.length === 0) {
        document.getElementById('contenidoAlumno').style.display = 'none';
        mostrarModalMaterias();
    } else {
        document.getElementById('modalMaterias').style.display = 'none';
        document.getElementById('contenidoAlumno').style.display = 'block';
        mostrarSelectMaterias();
        mostrarTareasDeMateria();
        mostrarEntregas();
    }
});

let tareaActual = null;

function mostrarSelectMaterias() {
    const alumno = JSON.parse(localStorage.getItem('alumnos')).find(a => a.nombre === localStorage.getItem('alumnoLogueado'));
    const materias = alumno.materias || [];
    const select = document.getElementById('selectMateriaAlumno');
    select.innerHTML = '';
    materias.forEach(m => {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = m;
        select.appendChild(option);
    });
    // Cambia esto:
    // select.onchange = mostrarTareasDeMateria;
    // Por esto:
    select.onchange = function() {
        mostrarTareasDeMateria();
        mostrarEntregas();
        mostrarBotonBajaMateria(); // <-- Agrega esto aquí
    };
    mostrarBotonBajaMateria(); // <-- Y también aquí, para el primer render
}

function mostrarTareasDeMateria() {
    const alumno = JSON.parse(localStorage.getItem('alumnos')).find(a => a.nombre === localStorage.getItem('alumnoLogueado'));
    const materia = document.getElementById('selectMateriaAlumno').value;
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]').filter(t => t.materia === materia);
    const entregas = alumno.entregas || [];
    const lista = document.getElementById('listaTareasMateria');
    lista.innerHTML = '';
    if (tareas.length === 0) {
        lista.innerHTML = '<li>No hay tareas para esta materia.</li>';
        return;
    }
    tareas.forEach(tarea => {
        // Mejor comparación: título y materia
        const yaEntregada = entregas.some(e => e.titulo === tarea.titulo && e.materia === materia);
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${tarea.titulo}</strong>: ${tarea.descripcion}
            <div style="margin-top:8px;">
                <button class="btn-entregar" onclick="abrirModalEntrega('${tarea.titulo}')" ${yaEntregada ? 'disabled' : ''}>
                    Entregar
                </button>
                ${yaEntregada ? '<span style="color:green;font-size:13px;margin-left:10px;">(Entregada)</span>' : ''}
            </div>
        `;
        lista.appendChild(li);
    });
}

function mostrarModalMaterias() {
    const materias = JSON.parse(localStorage.getItem('materias') || '[]');
    const cont = document.getElementById('materiasBtns');
    cont.innerHTML = '';
    materias.forEach(m => {
        cont.innerHTML += `
            <label style="margin-right:15px;">
                <input type="checkbox" value="${m.nombre}" class="materiaCheck"> ${m.nombre}
            </label>
        `;
    });
    document.getElementById('modalMaterias').style.display = 'block';
}

window.abrirModalEntrega = function(tituloTarea) {
    tareaActual = tituloTarea;
    document.getElementById('tituloEntrega').textContent = `Entregar: ${tituloTarea}`;
    document.getElementById('archivoEntrega').value = '';
    document.getElementById('entregaModal').style.display = 'block';
};

window.cerrarModalEntrega = function() {
    document.getElementById('entregaModal').style.display = 'none';
};

window.confirmarEntrega = function() {
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    if (!alumno.entregas) alumno.entregas = [];
    const archivoInput = document.getElementById('archivoEntrega');
    let archivo = archivoInput.files[0] ? archivoInput.files[0].name : null;

    if (!archivo) {
        alert('Debes adjuntar un archivo para entregar la tarea.');
        return;
    }

    // Obtener la materia seleccionada actualmente
    const materia = document.getElementById('selectMateriaAlumno').value;

    // Validar que la tareaActual corresponde a la materia seleccionada
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const tareaValida = tareas.find(t => t.titulo === tareaActual && t.materia === materia);
    if (!tareaValida) {
        alert('La tarea seleccionada no corresponde a la materia actual.');
        return;
    }

    alumno.entregas.push({
        titulo: tareaActual,
        materia: materia, // <-- esto es clave
        estado: "Entregado",
        fecha: new Date().toISOString().slice(0, 10),
        archivo: archivo
    });
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    cerrarModalEntrega();
    mostrarEntregas();
    mostrarTareasDeMateria();
};

window.guardarMateriasElegidas = function() {
    const checks = document.querySelectorAll('.materiaCheck:checked');
    const materiasElegidas = Array.from(checks).map(c => c.value);

    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    alumno.materias = materiasElegidas;
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    document.getElementById('modalMaterias').style.display = 'none';
    document.getElementById('contenidoAlumno').style.display = 'block';
    mostrarSelectMaterias();
    mostrarTareasDeMateria();
    mostrarEntregas();
    mostrarBotonBajaMateria(); // <-- aquí
};

function mostrarEntregas() {
    const lista = document.getElementById('listaEntregas');
    if (!lista) return;
    lista.innerHTML = '';
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    if (!alumno || !alumno.entregas || alumno.entregas.length === 0) {
        lista.innerHTML = '<li>No hay entregas registradas.</li>';
        return;
    }
    const materiaSeleccionada = document.getElementById('selectMateriaAlumno').value;

    // DEBUG
    console.log('Materia seleccionada:', materiaSeleccionada);
    console.log('Entregas del alumno:', alumno.entregas);

    // El filtro correcto:
    const entregasMateria = alumno.entregas.filter(e => e.materia === materiaSeleccionada);

    if (entregasMateria.length === 0) {
        lista.innerHTML = '<li>No hay entregas registradas para esta materia.</li>';
        return;
    }

    entregasMateria.forEach(entrega => {
        lista.innerHTML += `<li><strong>${entrega.titulo}</strong> - Estado: ${entrega.estado} - Fecha: ${entrega.fecha} ${entrega.archivo ? `- Archivo: ${entrega.archivo}` : ''}</li>`;
    });
}


window.darseDeBajaMateria = function() {
    const materia = document.getElementById('selectMateriaAlumno').value;
    if (!confirm(`¿Seguro que deseas darte de baja de ${materia}? Se eliminarán tus entregas de esta materia.`)) return;
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    if (!alumno) return;

    // Quitar la materia
    alumno.materias = alumno.materias.filter(m => m !== materia);
    // Quitar las entregas de esa materia
    alumno.entregas = (alumno.entregas || []).filter(e => e.materia !== materia);

    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    if (alumno.materias.length === 0) {
        alert('Te has dado de baja de todas las materias. Elige nuevas materias para continuar.');
        document.getElementById('contenidoAlumno').style.display = 'none';
        document.getElementById('modalMaterias').style.display = 'block';
        mostrarBotonBajaMateria();
        mostrarBotonEliminarCuenta(); // <-- aquí
    } else {
        alert(`Te has dado de baja de ${materia}.`);
        mostrarSelectMaterias();
        mostrarTareasDeMateria();
        mostrarEntregas();
        mostrarBotonBajaMateria(); // <-- aquí
    }
}

function mostrarBotonBajaMateria() {
    const cerrarSesionBtn = document.getElementById('cerrSesionAlumno');
    let btn = document.getElementById('btnBajaMateria');
    if (btn) btn.remove(); // Evita duplicados

    const alumno = JSON.parse(localStorage.getItem('alumnos')).find(a => a.nombre === localStorage.getItem('alumnoLogueado'));
    if (alumno && alumno.materias && alumno.materias.length > 0) {
        btn = document.createElement('button');
        btn.id = 'btnBajaMateria';
        btn.textContent = 'Darse de baja de la materia';
        btn.className = 'btn-baja-materia';
        btn.onclick = darseDeBajaMateria;
        // Insertar después del botón de cerrar sesión
        cerrarSesionBtn.parentNode.insertBefore(btn, cerrarSesionBtn.nextSibling);
    }
}

// Nueva función para eliminar cuenta
window.eliminarCuenta = function() {
    if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción eliminará todas tus entregas y no se puede deshacer.')) return;
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    alumnos = alumnos.filter(a => a.nombre !== nombreAlumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    localStorage.removeItem('alumnoLogueado');
    alert('Tu cuenta ha sido eliminada correctamente.');
    window.location.href = 'index.html';
}

function mostrarBotonEliminarCuenta() {
    let btn = document.getElementById('btnEliminarCuenta');
    if (btn) btn.remove();

    // Solo mostrar si el alumno está logueado y no tiene materias
    const alumno = JSON.parse(localStorage.getItem('alumnos')).find(a => a.nombre === localStorage.getItem('alumnoLogueado'));
    if (alumno && (!alumno.materias || alumno.materias.length === 0)) {
        btn = document.createElement('button');
        btn.id = 'btnEliminarCuenta';
        btn.title = 'Eliminar cuenta';
        btn.className = 'btn-eliminar-cuenta-icono';
        btn.innerHTML = '🗑️'; // Puedes usar un SVG si prefieres
        btn.onclick = eliminarCuenta;
        document.body.appendChild(btn);
    }
}

