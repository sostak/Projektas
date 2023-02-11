import Cookies from 'js-cookie';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import apiService from './api';

const login = async (loginData, setToken) => {
  const config = {
    headers: {'Content-Type': 'application/json'},
  };

  try{
    const response = await apiService.post(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_LOGIN}`, loginData, config);
    
    setToken(response.accessToken);
    Cookies.set('token', response.accessToken);
  }
  catch (error){
    console.error(error);
  }
};

const register = async (event, registrationData, setPasswordMismatch, setToken) => {
  event.preventDefault();
    
  if (registrationData.password !== registrationData.repeatPassword) {
    setPasswordMismatch(true);
    return;
  }
  
  // eslint-disable-next-line no-unused-vars
  const { repeatPassword, ...request } = registrationData;
    
  const config = {
    headers: {'Content-Type': 'application/json'},
  };

  try{
    const response = await apiService.post(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_REGISTER}`, request, config);
    const loginData = {
      email: request.email,
      password: request.password
    };
    
    login(loginData, setToken);
    return response;
  }
  catch (error){
    console.log(error);
    return error;
  }
};

export default {login, register};