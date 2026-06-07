import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import authService from '../services/authService'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setErro('')
        try {
            const res = await authService.login({ email, senha })
            login(res.data)
            if (res.data.tipo === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        } catch (err) {
            setErro(err.response?.data?.erro || 'Erro ao fazer login')
        }
    }

    return (
        <div className="form-container">
            <h2>Entrar</h2>
            {erro && <p className="erro">{erro}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
    )
}