# 📖 Página Virada — Frontend

Interface web da Livraria Independente "Página Virada", desenvolvida com React e CSS puro.

## 🚀 Tecnologias

- React (Vite)
- React Router DOM
- Axios
- CSS puro (arquivo global)

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── Navbar.jsx
├── contexts/
│   └── AuthContext.jsx      # Contexto global de autenticação
├── pages/
│   ├── Home.jsx             # Catálogo público de livros
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── MinhasReservas.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       ├── GerenciarLivros.jsx
│       └── GerenciarReservas.jsx
├── services/
│   ├── api.js               # Instância do Axios com interceptor JWT
│   ├── authService.js
│   ├── livroService.js
│   └── reservaService.js
├── App.jsx
├── App.css                  # Estilos globais
└── main.jsx
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

Em produção, substitua pela URL do backend no Render.

## ▶️ Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📌 Funcionalidades

### Cliente
- Visualizar catálogo de livros
- Criar conta e fazer login
- Reservar livros disponíveis
- Consultar e cancelar próprias reservas

### Administrador
- Acessar painel administrativo
- Cadastrar e deletar livros
- Visualizar e cancelar todas as reservas

## 🔐 Rotas Protegidas

- `/minhas-reservas` — requer login como cliente
- `/admin`, `/admin/livros`, `/admin/reservas` — requer login como administrador

## 🌐 Deploy

Frontend hospedado na [Vercel](https://vercel.com).