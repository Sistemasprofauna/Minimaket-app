import axios from 'axios';
import { useAuth } from '../components/AuthProvider';

let token = localStorage.getItem('token') ? localStorage.getItem('token') : undefined;

const _instance = axios.create()

_instance.defaults.headers.common['Authorization'] = token;

export const axiosCustom = _instance;