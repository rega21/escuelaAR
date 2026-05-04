const BASE_URL = 'https://69f8cbdcf7044aa0103e800c.mockapi.io';

const alumnosAPI = {
    // GET /alumnos — trae todos los alumnos
    getAll: async () => {
        const res = await fetch(`${BASE_URL}/alumnos`);
        return res.json();
    },

    // POST /alumnos — crea un alumno nuevo
    create: async (alumno) => {
        const res = await fetch(`${BASE_URL}/alumnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(alumno)
        });
        return res.json();
    },

    // PUT /alumnos/:id — actualiza un alumno existente
    update: async (id, datos) => {
        const res = await fetch(`${BASE_URL}/alumnos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return res.json();
    },

    // DELETE /alumnos/:id — elimina un alumno
    delete: async (id) => {
        const res = await fetch(`${BASE_URL}/alumnos/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    }
};
