import axios from 'axios'

const api = axios.create({
   baseURL: 'http://localhost/rede-industrial/1_api/public/api',
   timeout: 15000,
});

export default api;