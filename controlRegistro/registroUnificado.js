let rolActual = 'alumno';

function setRol(rol) {
    rolActual = rol;
    document.getElementById('btnAlumno').classList.toggle('activo', rol === 'alumno');
    document.getElementById('btnProfesor').classList.toggle('activo', rol === 'profesor');
    document.getElementById('campoMateria').style.display = rol === 'profesor' ? 'block' : 'none';
    document.getElementById('mensaje').textContent = '';
}

document.getElementById('registroForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre   = document.getElementById('nombre').value.trim();
    const password = document.getElementById('password').value.trim();
    const email    = document.getElementById('email').value.trim();
    const msg      = document.getElementById('mensaje');

    if (!nombre || !password || !email) {
        msg.textContent = 'Por favor, completá todos los campos.';
        return;
    }

    if (rolActual === 'alumno') {
        const alumnos = await alumnosAPI.getAll();
        if (alumnos.some(a => a.nombre === nombre)) {
            msg.textContent = 'El nombre ya está registrado.';
            return;
        }
        await alumnosAPI.create({ nombre, password, email, materias: [], entregas: [] });

    } else {
        const materia = document.getElementById('materiaProfe').value;
        if (!materia) {
            msg.textContent = 'Seleccioná una materia.';
            return;
        }
        const profesores = await profesoresAPI.getAll();
        if (profesores.some(p => p.nombre === nombre)) {
            msg.textContent = 'El nombre ya está registrado.';
            return;
        }
        await profesoresAPI.create({ nombre, password, email, materia });
    }

    msg.textContent = '¡Registro exitoso! Redirigiendo...';
    document.getElementById('registroForm').reset();
    setRol('alumno');
    setTimeout(() => { window.location.href = 'login.html'; }, 2000);
});

(async () => {
    const materias = await materiasAPI.getAll();
    const select   = document.getElementById('materiaProfe');
    materias.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.nombre;
        opt.textContent = m.nombre;
        select.appendChild(opt);
    });
})();
