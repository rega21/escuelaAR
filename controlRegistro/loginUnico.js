document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const password = document.getElementById('password').value.trim();

    // Buscar en MockAPI
    const alumnos = await alumnosAPI.getAll();
    const alumno = alumnos.find(a => a.nombre === nombre && a.password === password);

    if (alumno) {
        localStorage.setItem('alumnoLogueado', alumno.nombre);
        window.location.href = '../interfaz/alumnoInterfaz.html';
        return;
    }

    // Profesores siguen en localStorage
    const profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    const profesor = profesores.find(p => p.nombre === nombre && p.password === password);

    if (profesor) {
        localStorage.setItem('profeLogueado', profesor.nombre);
        window.location.href = '../interfaz/profeInterfaz.html';
        return;
    }

    document.getElementById('mensajeLogin').textContent = 'Nombre o contraseña incorrectos.';
});
