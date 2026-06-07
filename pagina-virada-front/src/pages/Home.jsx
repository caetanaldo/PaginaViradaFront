import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import livroService from '../services/livroService'
import reservaService from '../services/reservaService'

export default function Home() {
    const [livros, setLivros] = useState([])
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')
    const { usuario } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        livroService.listar()
            .then(res => setLivros(res.data))
            .catch(() => setErro('Erro ao carregar livros'))
    }, [])

    async function handleReservar(livroId) {
        if (!usuario) {
            navigate('/login')
            return
        }
        try {
            await reservaService.criar(livroId)
            setMensagem('Reserva realizada com sucesso!')
            const res = await livroService.listar()
            setLivros(res.data)
            setTimeout(() => setMensagem(''), 3000)
        } catch (err) {
            setErro(err.response?.data?.erro || 'Erro ao reservar')
            setTimeout(() => setErro(''), 3000)
        }
    }

    return (
        <>
            <div className="pagina">
                <h2>Catálogo de Livros</h2>

                {mensagem && <p style={{ color: 'green', margin: '1rem 0' }}>{mensagem}</p>}
                {erro && <p className="erro">{erro}</p>}

                <div className="grid-livros">
                    {livros.map(livro => (
                        <div key={livro.id} className="card-livro">
                            {livro.capa && (
                                <img src={livro.capa} alt={livro.titulo} />
                            )}
                            <div className="card-livro-info">
                                <h3>{livro.titulo}</h3>
                                <p>{livro.autor}</p>
                                <p>{livro.descricao}</p>
                                <p className="preco">R$ {Number(livro.preco).toFixed(2)}</p>
                                <p style={{ fontSize: '0.8rem', color: livro.estoque > 0 ? 'green' : 'red' }}>
                                    {livro.estoque > 0 ? `${livro.estoque} disponíveis` : 'Indisponível'}
                                </p>
                                <button
                                    onClick={() => handleReservar(livro.id)}
                                    disabled={livro.estoque <= 0}
                                >
                                    {livro.estoque > 0 ? 'Reservar' : 'Indisponível'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}