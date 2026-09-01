import axios from 'axios';

const defaultBase = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: defaultBase,
  withCredentials: true,
  timeout: 8000,
});
