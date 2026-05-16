function mostrarToast(mensaje, callback) {
    const toast = document.getElementById('toastBaja');
    toast.textContent = mensaje;
    toast.className = 'toast-visible';
    setTimeout(() => {
        toast.className = '';
        if (callback) callback();
    }, 2500);
}

// Datos cargados desde MockAPI — sin localStorage para alumnos, tareas ni materias
let alumnoActual = null;
let tareasCache = [];
let materiasCache = [];

async function cargarDatosAlumno() {
    const nombre = localStorage.getItem('alumnoLogueado');
    const [todos, tareas, materias] = await Promise.all([
        alumnosAPI.getAll(),
        tareasAPI.getAll(),
        materiasAPI.getAll()
    ]);
    alumnoActual = todos.find(a => a.nombre === nombre) || null;
    tareasCache = tareas;
    materiasCache = materias;
}

document.addEventListener('DOMContentLoaded', async function() {
    await cargarDatosAlumno();

    const nombreAlumno = alumnoActual ? alumnoActual.nombre : 'Alumno';
    document.getElementById('bienvenidaAlumno').textContent = `Estudiante, ${nombreAlumno}`;

    const promedio = alumnoActual && alumnoActual.promedio !== undefined ? alumnoActual.promedio : 'N/A';
    document.getElementById('promedioAlumno').textContent = `Promedio: ${promedio}`;

    document.getElementById('contenidoAlumno').style.display = 'none';
    mostrarModalMaterias();
    document.getElementById('btnMenuAlumno').style.display = 'none';
    document.getElementById('cerrSesionAlumno').style.display = '';
});

let tareaActual = null;

function mostrarSelectMaterias() {
    const materias = alumnoActual ? alumnoActual.materias || [] : [];
    const select = document.getElementById('selectMateriaAlumno');
    select.innerHTML = '';
    materias.forEach(m => {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = m;
        select.appendChild(option);
    });
    select.onchange = function() {
        mostrarTareasDeMateria();
        mostrarEntregas();
        mostrarBotonBajaMateria();
    };
    mostrarBotonBajaMateria();
}

function mostrarTareasDeMateria() {
    const materia = document.getElementById('selectMateriaAlumno').value;
    const tareas = tareasCache.filter(t => t.materia === materia);
    const entregas = alumnoActual ? alumnoActual.entregas || [] : [];
    const lista = document.getElementById('listaTareasMateria');
    lista.innerHTML = '';
    if (tareas.length === 0) {
        lista.innerHTML = '<li>No hay tareas para esta materia.</li>';
        return;
    }
    tareas.forEach(tarea => {
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
    const cont = document.getElementById('materiasBtns');
    cont.innerHTML = '';

    const materiasInscriptas = alumnoActual ? alumnoActual.materias || [] : [];

    materiasCache.forEach(m => {
        const yaIncripto = materiasInscriptas.includes(m.nombre);
        cont.innerHTML += `
            <label>
                <input type="checkbox" value="${m.nombre}" class="materiaCheck" ${yaIncripto ? 'checked disabled' : ''}>
                ${yaIncripto ? '✓ ' : ''}${m.nombre}
            </label>
        `;
    });

    document.getElementById('modalMaterias').style.display = 'block';

    const btnPanel = document.getElementById('btnIrPanelAlumno');
    if (btnPanel) {
        btnPanel.style.display = '';
        btnPanel.disabled = !alumnoActual || !alumnoActual.materias || alumnoActual.materias.length === 0;
    }
}

window.abrirModalEntrega = function(tituloTarea) {
    tareaActual = tituloTarea;
    document.getElementById('tituloEntrega').textContent = `Entregar: ${tituloTarea}`;
    document.getElementById('respuestaEntrega').value = '';
    document.getElementById('entregaModal').style.display = 'block';
};

window.cerrarModalEntrega = function() {
    document.getElementById('entregaModal').style.display = 'none';
};

window.confirmarEntrega = async function() {
    const respuesta = document.getElementById('respuestaEntrega').value.trim();

    if (!respuesta) {
        alert('Debes escribir una respuesta para entregar la tarea.');
        return;
    }

    const materia = document.getElementById('selectMateriaAlumno').value;
    const tareaValida = tareasCache.find(t => t.titulo === tareaActual && t.materia === materia);
    if (!tareaValida) {
        alert('La tarea seleccionada no corresponde a la materia actual.');
        return;
    }

    if (!Array.isArray(alumnoActual.entregas)) alumnoActual.entregas = [];
    alumnoActual.entregas.push({
        titulo: tareaActual,
        materia,
        estado: 'Entregado',
        fecha: new Date().toISOString().slice(0, 10),
        respuesta
    });

    await alumnosAPI.update(alumnoActual.id, alumnoActual); // PUT
    cerrarModalEntrega();
    mostrarEntregas();
    mostrarTareasDeMateria();
};

window.guardarMateriasElegidas = async function() {
    const checks = document.querySelectorAll('.materiaCheck:checked');
    const materiasElegidas = Array.from(checks).map(c => c.value);
    const materiasAnteriores = alumnoActual.materias || [];
    alumnoActual.materias = materiasElegidas;

    await alumnosAPI.update(alumnoActual.id, alumnoActual); // PUT

    const mensaje = document.getElementById('mensajeMaterias');
    const nuevasMaterias = materiasElegidas.filter(m => !materiasAnteriores.includes(m));
    if (materiasElegidas.length > 0) {
        if (nuevasMaterias.length > 0) {
            mensaje.textContent = '¡Te has anotado en: ' + nuevasMaterias.join(', ') + '!';
            mensaje.style.color = 'green';
        } else {
            mensaje.textContent = '';
        }
        document.getElementById('btnIrPanelAlumno').disabled = false;
        mostrarModalMaterias();
    } else {
        mensaje.textContent = 'No seleccionaste ninguna materia.';
        mensaje.style.color = 'red';
        document.getElementById('btnIrPanelAlumno').disabled = true;
    }
};

function mostrarEntregas() {
    const lista = document.getElementById('listaEntregas');
    if (!lista) return;
    lista.innerHTML = '';
    if (!alumnoActual || !alumnoActual.entregas || alumnoActual.entregas.length === 0) {
        lista.innerHTML = '<li>No hay entregas registradas.</li>';
        return;
    }
    const materiaSeleccionada = document.getElementById('selectMateriaAlumno').value;
    const entregasMateria = alumnoActual.entregas.filter(e => e.materia === materiaSeleccionada);

    if (entregasMateria.length === 0) {
        lista.innerHTML = '<li>No hay entregas registradas para esta materia.</li>';
        return;
    }

    entregasMateria.forEach(entrega => {
        lista.innerHTML += `<li><strong>${entrega.titulo}</strong> - Estado: ${entrega.estado} - Fecha: ${entrega.fecha}${entrega.respuesta ? `<br><em>${entrega.respuesta}</em>` : ''}</li>`;
    });
}

window.darseDeBajaMateria = async function() {
    const materia = document.getElementById('selectMateriaAlumno').value;
    if (!confirm(`¿Seguro que deseas darte de baja de ${materia}? Se eliminarán tus entregas de esta materia.`)) return;

    alumnoActual.materias = alumnoActual.materias.filter(m => m !== materia);
    alumnoActual.entregas = (alumnoActual.entregas || []).filter(e => e.materia !== materia);

    await alumnosAPI.update(alumnoActual.id, alumnoActual); // PUT

    const mensaje = document.getElementById('mensajeMaterias');

    if (alumnoActual.materias.length === 0) {
        mostrarToast('Te has dado de baja de todas las materias. Elegí nuevas materias para continuar.', () => {
            document.getElementById('contenidoAlumno').style.display = 'none';
            document.getElementById('modalMaterias').style.display = 'block';
            document.getElementById('cerrSesionAlumno').style.display = '';
            mostrarModalMaterias();
            mostrarBotonBajaMateria();
            mostrarBotonEliminarCuenta();
            let btnMenu = document.getElementById('btnMenuAlumno');
            if (btnMenu) btnMenu.style.display = 'none';
        });
    } else {
        mostrarToast(`Te diste de baja de ${materia}.`, () => {
            document.getElementById('modalMaterias').style.display = 'none';
            document.getElementById('contenidoAlumno').style.display = 'block';
            mostrarSelectMaterias();
            mostrarTareasDeMateria();
            mostrarEntregas();
            mostrarBotonBajaMateria();
            if (mensaje) {
                mensaje.textContent = 'Puedes anotarte en nuevas materias.';
                mensaje.style.color = '';
            }
            abrirMenuAlumno();
        });
    }
};

function mostrarBotonBajaMateria() {
    const btn = document.getElementById('btnBajaMateria');
    if (!btn) return;
    const tieneMateria = alumnoActual && alumnoActual.materias && alumnoActual.materias.length > 0;
    btn.style.display = tieneMateria ? '' : 'none';
}

window.eliminarCuenta = async function() {
    if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción eliminará todas tus entregas y no se puede deshacer.')) return;

    await alumnosAPI.delete(alumnoActual.id); // DELETE

    localStorage.removeItem('alumnoLogueado');
    alert('Tu cuenta ha sido eliminada correctamente.');
    window.location.href = 'index.html';
};

function mostrarBotonEliminarCuenta() {
    let btn = document.getElementById('btnEliminarCuenta');
    if (btn) btn.remove();

    if (alumnoActual && (!alumnoActual.materias || alumnoActual.materias.length === 0)) {
        btn = document.createElement('button');
        btn.id = 'btnEliminarCuenta';
        btn.title = 'Eliminar cuenta';
        btn.className = 'btn-eliminar-cuenta-icono';
        btn.innerHTML = '🗑️';
        btn.onclick = eliminarCuenta;
        document.body.appendChild(btn);
    }
}

window.abrirMenuAlumno = function() {
    document.getElementById('contenidoAlumno').style.display = 'none';
    document.getElementById('btnMenuAlumno').style.display = 'none';
    document.getElementById('cerrSesionAlumno').style.display = '';

    let btn = document.getElementById('btnBajaMateria');
    if (btn) btn.remove();

    mostrarModalMaterias();
};

window.volverAlPanelAlumno = function() {
    document.getElementById('modalMaterias').style.display = 'none';
    document.getElementById('contenidoAlumno').style.display = 'block';
    document.getElementById('entregaModal').style.display = 'none';
    mostrarSelectMaterias();
    mostrarTareasDeMateria();
    mostrarEntregas();
    mostrarBotonBajaMateria();
    document.getElementById('btnMenuAlumno').style.display = '';
    document.getElementById('cerrSesionAlumno').style.display = 'none';
};
