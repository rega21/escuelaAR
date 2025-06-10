document.addEventListener('DOMContentLoaded', function() {
    // Mostrar nombre del alumno
    const nombreAlumno = localStorage.getItem('alumnoLogueado') || 'Alumno';
    document.getElementById('bienvenidaAlumno').textContent = `Estudiante, ${nombreAlumno}`;

    // Obtener datos del alumno
    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);

    // Mostrar avatar guardado o por defecto
    let avatar = alumno && alumno.avatar ? alumno.avatar : 'gato.png';
    document.getElementById('selectAvatarAlumno').value = avatar;

    // Cambiar avatar al seleccionar otro
    document.getElementById('selectAvatarAlumno').addEventListener('change', function(e) {
        const nuevoAvatar = e.target.value;
        // Guardar avatar en localStorage
        let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
        const alumno = alumnos.find(a => a.nombre === nombreAlumno);
        if (alumno) {
            alumno.avatar = nuevoAvatar;
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
        }
    });

    // Mostrar promedio del alumno
    const promedio = alumno && alumno.promedio !== undefined ? alumno.promedio : 'N/A';
    document.getElementById('promedioAlumno').textContent = `Promedio: ${promedio}`;

    // SIEMPRE mostrar el menú de materias al ingresar
    document.getElementById('contenidoAlumno').style.display = 'none';
    mostrarModalMaterias();
    document.getElementById('btnMenuAlumno').style.display = 'none'; // Oculta el botón Menú
    document.getElementById('cerrSesionAlumno').style.display = ''; // Mostrar cerrar sesión al ingresar al menú

    // Si permites foto personalizada además del avatar, descomenta esto:
    /*
    document.getElementById('inputFotoPerfil').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
            const alumno = alumnos.find(a => a.nombre === nombreAlumno);
            if (alumno) {
                alumno.avatar = evt.target.result;
                localStorage.setItem('alumnos', JSON.stringify(alumnos));
                document.getElementById('fotoPerfilAlumno').src = evt.target.result;
                document.getElementById('selectAvatarAlumno').value = ''; // Si quieres limpiar el select
            }
        };
        reader.readAsDataURL(file);
    });
    */
});

let tareaActual = null;

function mostrarSelectMaterias() {
    // Actualiza el selector de materias en el panel de tareas
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
    select.onchange = function() {
        mostrarTareasDeMateria();
        mostrarEntregas();
        mostrarBotonBajaMateria();
    };
    mostrarBotonBajaMateria();
}

function mostrarTareasDeMateria() {
    // Muestra las tareas de la materia seleccionada
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
    // Muestra el menú de materias y actualiza los checkboxes según inscripción
    const materias = JSON.parse(localStorage.getItem('materias') || '[]');
    const cont = document.getElementById('materiasBtns');
    cont.innerHTML = '';

    // Obtener materias ya inscriptas del alumno
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    const alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    const materiasInscriptas = alumno.materias || [];

    materias.forEach(m => {
        const yaIncripto = materiasInscriptas.includes(m.nombre);
        cont.innerHTML += `
            <label style="margin-right:15px;">
                <input type="checkbox" value="${m.nombre}" class="materiaCheck" ${yaIncripto ? 'checked disabled' : ''}> ${m.nombre}
                ${yaIncripto ? '<span style="color: #1976d2; font-size: 0.95em;">(inscripto)</span>' : ''}
            </label>
        `;
    });

    document.getElementById('modalMaterias').style.display = 'block';

    // Controlar el botón "Ir al panel de tareas"
    const btnPanel = document.getElementById('btnIrPanelAlumno');
    if (btnPanel) {
        btnPanel.style.display = '';
        btnPanel.disabled = !alumno.materias || alumno.materias.length === 0;
    }
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
    // Lógica para confirmar la entrega de una tarea
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
        materia: materia,
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
    // Guarda las materias elegidas y actualiza el menú
    const checks = document.querySelectorAll('.materiaCheck:checked');
    const materiasElegidas = Array.from(checks).map(c => c.value);

    let alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
    const nombreAlumno = localStorage.getItem('alumnoLogueado');
    const alumno = alumnos.find(a => a.nombre === nombreAlumno);
    const materiasAnteriores = alumno.materias || [];
    alumno.materias = materiasElegidas;
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    // Mostrar mensaje de confirmación solo si hay materias nuevas
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
        mostrarModalMaterias(); // Refresca los checkboxes
    } else {
        mensaje.textContent = 'No seleccionaste ninguna materia.';
        mensaje.style.color = 'red';
        document.getElementById('btnIrPanelAlumno').disabled = true;
    }
};

function mostrarEntregas() {
    // Muestra las entregas del alumno para la materia seleccionada
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
    // Permite al alumno darse de baja de la materia actual
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

    const mensaje = document.getElementById('mensajeMaterias');

    if (alumno.materias.length === 0) {
        alert('Te has dado de baja de todas las materias. Elige nuevas materias para continuar.');
        document.getElementById('contenidoAlumno').style.display = 'none';
        document.getElementById('modalMaterias').style.display = 'block';
        document.getElementById('cerrSesionAlumno').style.display = ''; // <-- Asegura que se vea el botón cerrar sesión
        mostrarModalMaterias();
        mostrarBotonBajaMateria();
        mostrarBotonEliminarCuenta();
        if (mensaje) {
            //mensaje.textContent = 'Selecciona materias para anotarte.';
            //mensaje.style.color = '';
        }
        // Oculta/elimina los botones que no deben verse
        let btn = document.getElementById('btnBajaMateria');
        if (btn) btn.remove();
        let btnMenu = document.getElementById('btnMenuAlumno');
        if (btnMenu) btnMenu.style.display = 'none';
    } else {
        alert(`Te has dado de baja de ${materia}.`);
        // Oculta el menú de materias y muestra solo el panel de tareas
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
    }
}

function mostrarBotonBajaMateria() {
    // Solo muestra el botón de baja si el panel de tareas está visible
    if (document.getElementById('contenidoAlumno').style.display === 'none') return;

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
        cerrarSesionBtn.parentNode.insertBefore(btn, cerrarSesionBtn.nextSibling);
    }
}

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
    // Solo muestra el botón de eliminar cuenta si el alumno no tiene materias
    let btn = document.getElementById('btnEliminarCuenta');
    if (btn) btn.remove();

    const alumno = JSON.parse(localStorage.getItem('alumnos')).find(a => a.nombre === localStorage.getItem('alumnoLogueado'));
    if (alumno && (!alumno.materias || alumno.materias.length === 0)) {
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
    // Volver al menú de materias desde el panel de tareas
    document.getElementById('contenidoAlumno').style.display = 'none';
    document.getElementById('modalMaterias').style.display = 'block';
    document.getElementById('btnMenuAlumno').style.display = 'none'; // Oculta el botón Menú en el menú
    document.getElementById('btnIrPanelAlumno').disabled = false;
    document.getElementById('cerrSesionAlumno').style.display = ''; // Mostrar cerrar sesión en el menú

    // Elimina el botón de baja de materia si existe
    let btn = document.getElementById('btnBajaMateria');
    if (btn) btn.remove();

    // Elimina el botón Menú si existe (por si acaso)
    let btnMenu = document.getElementById('btnMenuAlumno');
    if (btnMenu) btnMenu.style.display = 'none';
}

window.volverAlPanelAlumno = function() {
    // Ir al panel de tareas desde el menú de materias
    document.getElementById('modalMaterias').style.display = 'none';
    document.getElementById('contenidoAlumno').style.display = 'block';
    document.getElementById('entregaModal').style.display = 'none';
    mostrarSelectMaterias();
    mostrarTareasDeMateria();
    mostrarEntregas();
    mostrarBotonBajaMateria();
    document.getElementById('btnMenuAlumno').style.display = ''; // Mostrar el botón Menú en el panel de tareas
    document.getElementById('cerrSesionAlumno').style.display = 'none'; // Ocultar cerrar sesión en el panel de tareas
};


