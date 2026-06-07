import { useState, useEffect } from 'react'
import reservaService from '../services/reservaService'

export default function MinhasReservas() {
    const [reservas, setReservas] = useState([])
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        carregarReservas()
    }, [])

    async function carregarReservas() {
        try {
            const res = await reservaService.minhas()
            setReservas(res.data)
        } catch (err) {
            setErro('Erro ao carregar reservas')
        }
    }

    async function handleCancelar(id) {
        try {
            await reservaService.cancelar(id)
            setMensagem('Reserva cancelada com sucesso!')
            carregarReservas()
            setTimeout(() => setMensagem(''), 3000)
        } catch (err) {
            setErro(err.response?.data?.erro || 'Erro ao cancelar reserva')
            setTimeout(() => setErro(''), 3000)
        }
    }

    return (
        <>
            <div className="pagina">
                <h2>Minhas Reservas</h2>

                {mensagem && <p style={{ color: 'green', margin: '1rem 0' }}>{mensagem}</p>}
                {erro && <p className="erro">{erro}</p>}

                {reservas.length === 0 ? (
                    <p style={{ marginTop: '1rem' }}>Você ainda não tem reservas.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Livro</th>
                                <th>Autor</th>
                                <th>Status</th>
                                <th>Data</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map(reserva => (
                                <tr key={reserva.id}>
                                    <td>{reserva.livro?.titulo}</td>
                                    <td>{reserva.livro?.autor}</td>
                                    <td>{reserva.status}</td>
                                    <td>{new Date(reserva.dataReserva).toLocaleDateString('pt-BR')}</td>
                                    <td>
                                        {reserva.status === 'pendente' && (
                                            <button
                                                className="btn-danger"
                                                onClick={() => handleCancelar(reserva.id)}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}