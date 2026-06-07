import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="admin-container">
            <h2>Painel Administrativo</h2>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                Bem-vindo ao painel da Livraria Página Virada.
            </p>

            <div className="admin-cards">
                <Link to="/admin/livros" className="admin-card">
                    <div className="admin-card-icone">📚</div>
                    <h3>Gerenciar Livros</h3>
                    <p>Adicionar, editar e remover livros do catálogo</p>
                </Link>

                <Link to="/admin/reservas" className="admin-card">
                    <div className="admin-card-icone">📋</div>
                    <h3>Gerenciar Reservas</h3>
                    <p>Visualizar e cancelar reservas dos clientes</p>
                </Link>
            </div>
        </div>
    )
}