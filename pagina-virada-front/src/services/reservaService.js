import api from './api.js'

const reservaService = {
    criar: (livroId) => api.post('/reserva', { livroId }),
    minhas: () => api.get('/reserva/minhas'),
    todas: () => api.get('/reserva'),
    cancelar: (id) => api.delete(`/reserva/${id}/cancelar`)
}

export default reservaService