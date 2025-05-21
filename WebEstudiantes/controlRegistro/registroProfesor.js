document.getElementById('registroProfeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProfe').value.trim();
    const password = document.getElementById('passwordProfe').value.trim();
    const email = document.getElementById('emailProfe').value.trim();

    if (!nombre || !password || !email) {
        document.getElementById('mensajeProfe').textContent = 'Por favor, completa todos los campos.';
        return;
    }

    // Guardar en localStorage (puedes cambiar esto por una llamada a tu backend)
    let profesores = JSON.parse(localStorage.getItem('profesores') || '[]');
    profesores.push({ nombre, password, email });
    localStorage.setItem('profesores', JSON.stringify(profesores));

    document.getElementById('mensajeProfe').textContent = '¡Registro exitoso! Redirigiendo al login...';
    document.getElementById('registroProfeForm').reset();

    setTimeout(function() {
        window.location.href = 'login.html';
    }, 2000);
});