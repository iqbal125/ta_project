import axios from 'axios';
import { API_URL } from '../utils/constants';

const axiosClient = axios.create({
  baseURL: API_URL
});

export default axiosClient;
