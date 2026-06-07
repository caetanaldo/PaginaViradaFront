import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import MinhasReservas from './pages/MinhasReservas'
import Dashboard from './pages/admin/Dashboard'
import GerenciarLivros from './pages/admin/GerenciarLivros'
import GerenciarReservas from './pages/admin/GerenciarReservas'
import Navbar from './components/Navbar'

function PrivateRoute({ children }) {
    const { usuario } = useAuth()
    return usuario ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
    const { usuario } = useAuth()
    if (!usuario) return <Navigate to="/login" />
    if (usuario.tipo !== 'admin') return <Navigate to="/" />
    return children
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />

                    <Route path="/minhas-reservas" element={
                        <PrivateRoute><MinhasReservas /></PrivateRoute>
                    } />

                    <Route path="/admin" element={
                        <AdminRoute><Dashboard /></AdminRoute>
                    } />
                    <Route path="/admin/livros" element={
                        <AdminRoute><GerenciarLivros /></AdminRoute>
                    } />
                    <Route path="/admin/reservas" element={
                        <AdminRoute><GerenciarReservas /></AdminRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App