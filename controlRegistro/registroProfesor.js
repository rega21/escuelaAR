document.getElementById('registroProfeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const password = document.getElementById('passwordProfe').value.trim();
    const email = document.getElementById('emailProfe').value.trim();

    if (!nombre || !password || !email) {
        document.getElementById('mensajeProfe').textContent = 'Por favor, completa todos los campos.';
        return;
    }

    // Validar duplicado consultando la API
    const profesores = await profesoresAPI.getAll();
    if (profesores.some(p => p.nombre === nombre)) {
        document.getElementById('mensajeProfe').textContent = 'El nombre ya está registrado.';
        return;
    }

    // POST a MockAPI
    await profesoresAPI.create({ nombre, password, email });

    document.getElementById('mensajeProfe').textContent = '¡Registro exitoso! Redirigiendo al login...';
    document.getElementById('registroProfeForm').reset();

    setTimeout(function() {
        window.location.href = 'login.html';
    }, 2000);
});
