const BASE_URL_TAREAS = 'https://69f8cbdcf7044aa0103e800c.mockapi.io';

const tareasAPI = {
    // GET /tareas — trae todas las tareas
    getAll: async () => {
        const res = await fetch(`${BASE_URL_TAREAS}/tareas`);
        return res.json();
    },

    // POST /tareas — crea una tarea nueva
    create: async (tarea) => {
        const res = await fetch(`${BASE_URL_TAREAS}/tareas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarea)
        });
        return res.json();
    },

    // PUT /tareas/:id — actualiza una tarea existente
    update: async (id, datos) => {
        const res = await fetch(`${BASE_URL_TAREAS}/tareas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return res.json();
    },

    // DELETE /tareas/:id — elimina una tarea
    delete: async (id) => {
        const res = await fetch(`${BASE_URL_TAREAS}/tareas/${id}`, {
            method: 'DELETE'
        });
        return res.json();
    }
};
