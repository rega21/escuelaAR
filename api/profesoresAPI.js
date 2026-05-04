const BASE_URL_PROF = 'https://69f8cbdcf7044aa0103e800c.mockapi.io';

const profesoresAPI = {
    // GET /profesores — trae todos los profesores
    getAll: async () => {
        const res = await fetch(`${BASE_URL_PROF}/profesores`);
        return res.json();
    },

    // POST /profesores — crea un profesor nuevo
    create: async (profesor) => {
        const res = await fetch(`${BASE_URL_PROF}/profesores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profesor)
        });
        return res.json();
    },

    // PUT /profesores/:id — actualiza un profesor existente
    update: async (id, datos) => {
        const res = await fetch(`${BASE_URL_PROF}/profesores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return res.json();
    },

    // DELETE /profesores/:id — elimina un profesor
    delete: async (id) => {
        const res = await fetch(`${BASE_URL_PROF}/profesores/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    }
};
