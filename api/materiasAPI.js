const BASE_URL_MATERIAS = 'https://69f8cbdcf7044aa0103e800c.mockapi.io';

const materiasAPI = {
    // GET /materias — trae todas las materias
    getAll: async () => {
        const res = await fetch(`${BASE_URL_MATERIAS}/materias`);
        return res.json();
    },

    // POST /materias — crea una materia nueva
    create: async (materia) => {
        const res = await fetch(`${BASE_URL_MATERIAS}/materias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(materia)
        });
        return res.json();
    },

    // PUT /materias/:id — actualiza una materia existente
    update: async (id, datos) => {
        const res = await fetch(`${BASE_URL_MATERIAS}/materias/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return res.json();
    },

    // DELETE /materias/:id — elimina una materia
    delete: async (id) => {
        const res = await fetch(`${BASE_URL_MATERIAS}/materias/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    }
};
