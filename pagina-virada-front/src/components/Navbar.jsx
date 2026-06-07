import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { usuario, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    return (
        <nav className="nav">
            <Link to="/" className="nav-logo">📖 Página Virada</Link>

            <div className="nav-links">
                <Link to="/">Catálogo</Link>

                {!usuario && <>
                    <Link to="/login">Entrar</Link>
                    <Link to="/cadastro">Cadastrar</Link>
                </>}

                {usuario && usuario.tipo === 'cliente' && <>
                    <Link to="/minhas-reservas">Minhas Reservas</Link>
                    <span>Olá, {usuario.nome}</span>
                    <button onClick={handleLogout}>Sair</button>
                </>}

                {usuario && usuario.tipo === 'admin' && <>
                    <Link to="/admin">Painel Admin</Link>
                    <span>Olá, {usuario.nome}</span>
                    <button onClick={handleLogout}>Sair</button>
                </>}
            </div>
        </nav>
    )
}