import { useState, useEffect } from 'react'
import reservaService from '../../services/reservaService'

export default function GerenciarReservas() {
    const [reservas, setReservas] = useState([])
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        carregarReservas()
    }, [])

    async function carregarReservas() {
        try {
            const res = await reservaService.todas()
            setReservas(res.data)
        } catch {
            setErro('Erro ao carregar reservas')
        }
    }

    async function handleCancelar(id) {
        if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return
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
        <div className="admin-container">
            <h2>Gerenciar Reservas</h2>

            {mensagem && <p className="sucesso">{mensagem}</p>}
            {erro && <p className="erro">{erro}</p>}

            {reservas.length === 0 ? (
                <p>Nenhuma reserva encontrada.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Livro</th>
                            <th>Status</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map(reserva => (
                            <tr key={reserva.id}>
                                <td>{reserva.usuario?.nome}</td>
                                <td>{reserva.usuario?.email}</td>
                                <td>{reserva.livro?.titulo}</td>
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
    )
}