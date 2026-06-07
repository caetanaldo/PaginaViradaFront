import api from './api.js'

const livroService = {
    listar: () => api.get('/livro'),
    buscarPorId: (id) => api.get(`/livro/${id}`),
    criar: (dados) => api.post('/livro', dados),
    atualizar: (id, dados) => api.put(`/livro/${id}`, dados),
    deletar: (id) => api.delete(`/livro/${id}`)
}

export default livroService