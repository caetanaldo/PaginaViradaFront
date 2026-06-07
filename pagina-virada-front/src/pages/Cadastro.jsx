import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setErro('')
        try {
            await authService.cadastrar({ nome, email, senha })
            navigate('/login')
        } catch (err) {
            setErro(err.response?.data?.erro || 'Erro ao cadastrar')
        }
    }

    return (
        <div className="form-container">
            <h2>Criar Conta</h2>
            {erro && <p className="erro">{erro}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />
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
                <button type="submit">Cadastrar</button>
            </form>
            <p>Já tem conta? <Link to="/login">Entrar</Link></p>
        </div>
    )
}