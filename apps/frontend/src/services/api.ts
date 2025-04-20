import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://improved-zebra-jq4w54r77vj3496-5000.app.github.dev/api/blogs',
});