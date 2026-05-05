document.getElementById('registroForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const password = document.getElementById('passwordAlumno').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!nombre || !password || !email) {
        document.getElementById('mensaje').textContent = 'Por favor, completa todos los campos.';
        return;
    }

    // Validar duplicado consultando la API
    const alumnos = await alumnosAPI.getAll();
    if (alumnos.some(a => a.nombre === nombre)) {
        document.getElementById('mensaje').textContent = 'El nombre ya está registrado.';
        return;
    }

    // POST a MockAPI
    await alumnosAPI.create({ nombre, password, email, materias: [], entregas: [] });

    document.getElementById('mensaje').textContent = '¡Registro exitoso! Redirigiendo al login...';
    document.getElementById('registroForm').reset();

    setTimeout(function() {
        window.location.href = 'login.html';
    }, 2000);
});

