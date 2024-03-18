import axios from 'axios';
import { setAuthToken, setIsAuthenticated, setUserData } from '../redux/slices/authSlice';
import store from '../redux/store'
import { setModalError } from '../redux/slices/generalSlice';


const apiBase = process.env.REACT_APP_API_BASE
axios.defaults.baseURL = apiBase;


axios.interceptors.response.use(
  response => {
    return {status: response.status, data: response.data};
  },
  error => {
    if (error.response.status === 401) {
      setUnauthorizedRedirect()
    }

    return Promise.reject(error);
  }
);

const setUnauthorizedRedirect = () => {
  store.dispatch(setAuthToken(null))
  store.dispatch(setUserData(null))
  store.dispatch(setIsAuthenticated(false))
  store.dispatch(setModalError({
    open: true,
    title: 'Sesión Finalizada',
    message: 'Tu sesión ha finalizado'
  }))
};

export default axios;
