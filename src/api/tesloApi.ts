
import axios from 'axios';

const testoApi = axios.create({
  baseURL: '/api',
});

export default testoApi;