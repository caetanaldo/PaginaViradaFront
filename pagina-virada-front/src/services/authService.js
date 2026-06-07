import api from "./api.js";

const authService = {
    cadastrar: (dados) => api.post("/auth/cadastrar", dados),
    login: (dados) => api.post("/auth/login", dados),
};

export default authService;