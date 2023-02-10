import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import apiService from './api';

const login = async (email, password, setToken) => {
  const data = 
  {
    'email': email,
    'password': password,
  };
  const config = {
    headers: {'Content-Type': 'application/json'},
  };

  try{
    const response = await apiService.post(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_LOGIN}`, data, config);
    
    setToken(response.accessToken);
    Cookies.set('token', response.accessToken);
  }
  catch (error){
    console.error(error);
  }
};

export default login;