import { useState, useEffect } from 'react'
import livroService from '../../services/livroService'

export default function GerenciarLivros() {
    const [livros, setLivros] = useState([])
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [modalAberto, setModalAberto] = useState(false)
    const [form, setForm] = useState({
        titulo: '', autor: '', descricao: '', preco: '', estoque: '', capa: ''
    })

    useEffect(() => {
        carregarLivros()
    }, [])

    async function carregarLivros() {
        try {
            const res = await livroService.listar()
            setLivros(res.data)
        } catch {
            setErro('Erro ao carregar livros')
        }
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleCriar(e) {
        e.preventDefault()
        try {
            await livroService.criar(form)
            setMensagem('Livro cadastrado com sucesso!')
            setModalAberto(false)
            setForm({ titulo: '', autor: '', descricao: '', preco: '', estoque: '', capa: '' })
            carregarLivros()
            setTimeout(() => setMensagem(''), 3000)
        } catch (err) {
            setErro(err.response?.data?.erro || 'Erro ao cadastrar livro')
            setTimeout(() => setErro(''), 3000)
        }
    }

    async function handleDeletar(id) {
        if (!confirm('Tem certeza que deseja deletar este livro?')) return
        try {
            await livroService.deletar(id)
            setMensagem('Livro deletado com sucesso!')
            carregarLivros()
            setTimeout(() => setMensagem(''), 3000)
        } catch (err) {
            setErro(err.response?.data?.erro || 'Erro ao deletar livro')
            setTimeout(() => setErro(''), 3000)
        }
    }

    return (
        <div className="admin-container">
            <h2>Gerenciar Livros</h2>

            {mensagem && <p className="sucesso">{mensagem}</p>}
            {erro && <p className="erro">{erro}</p>}

            <button className="btn-primary" onClick={() => setModalAberto(true)}>
                + Novo Livro
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map(livro => (
                        <tr key={livro.id}>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>R$ {Number(livro.preco).toFixed(2)}</td>
                            <td>{livro.estoque}</td>
                            <td>
                                <button
                                    className="btn-danger"
                                    onClick={() => handleDeletar(livro.id)}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalAberto && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Novo Livro</h3>
                        <form onSubmit={handleCriar}>
                            <input name="titulo" placeholder="Título *" value={form.titulo} onChange={handleChange} required />
                            <input name="autor" placeholder="Autor *" value={form.autor} onChange={handleChange} required />
                            <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
                            <input name="preco" placeholder="Preço *" type="number" step="0.01" value={form.preco} onChange={handleChange} required />
                            <input name="estoque" placeholder="Estoque" type="number" value={form.estoque} onChange={handleChange} />
                            <input name="capa" placeholder="URL da capa" value={form.capa} onChange={handleChange} />
                            <div className="modal-botoes">
                                <button type="button" className="btn-secundario" onClick={() => setModalAberto(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}