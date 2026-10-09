import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para injetar headers de sessão/autenticação se necessário
api.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem('nft_session_id');
    if (sessionId && config.headers) {
      config.headers['X-Session-ID'] = sessionId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento global de erros da API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[API Error ${error.response.status}]:`, error.response.data);
    } else {
      console.error('[API Error]: Falha na conexão com o servidor', error.message);
    }
    return Promise.reject(error);
  }
);