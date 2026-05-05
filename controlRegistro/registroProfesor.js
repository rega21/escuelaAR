document.getElementById('registroProfeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const password = document.getElementById('passwordProfe').value.trim();
    const email = document.getElementById('emailProfe').value.trim();
    const materia = document.getElementById('materiaProfe').value;

    if (!nombre || !password || !email || !materia) {
        document.getElementById('mensajeProfe').textContent = 'Por favor, completa todos los campos.';
        return;
    }

    const profesores = await profesoresAPI.getAll();
    if (profesores.some(p => p.nombre === nombre)) {
        document.getElementById('mensajeProfe').textContent = 'El nombre ya está registrado.';
        return;
    }

    await profesoresAPI.create({ nombre, password, email, materia });

    document.getElementById('mensajeProfe').textContent = '¡Registro exitoso! Redirigiendo al login...';
    document.getElementById('registroProfeForm').reset();

    setTimeout(function() {
        window.location.href = 'login.html';
    }, 2000);
});

(async () => {
    const materias = await materiasAPI.getAll();
    const select = document.getElementById('materiaProfe');
    materias.forEach(m => {
        const option = document.createElement('option');
        option.value = m.nombre;
        option.textContent = m.nombre;
        select.appendChild(option);
    });
})();
