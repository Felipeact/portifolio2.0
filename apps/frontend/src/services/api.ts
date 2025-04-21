import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-project-production-0262.up.railway.app/api',
});