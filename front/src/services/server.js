import apiService from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const fetchFilteredListings = async (filters) => {
  try {
    const listingsRequest = await apiService.get(
      `${process.env.REACT_APP_API_URL}${API_ENDPOINTS.VEHICLES_FILTER}${ filters }`
    );
    return listingsRequest;
  } 
  catch (error) {
    console.error(error);
    return error;
  }
};

const fetchListing = async (id, token, setThisUsersListing) => {
  try{
    const carResponse = await apiService.get(
      `${process.env.REACT_APP_API_URL}${API_ENDPOINTS.VEHICLE}/${id}`
    );

    if(token){
      const config = {
        headers: { 'Authorization' : `Bearer ${token}` }
      };
      const userResponse = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_GET}`, config);
      if(carResponse.result.userId === userResponse.id){
        setThisUsersListing(true);
      }
    }
    return carResponse.result;
  }
  catch(error){
    console.error(error);
    return error;
  }
};

const fetchUser = async (token) => {
  if(token){
    try{
      const config = {
        headers: { 'Authorization' : `Bearer ${token}` }
      };
      const response = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_GET}`, config);
      return response;
    }
    catch(error){
      console.error(error);
      return error;
    }
  }
  else{
    return null;
  }
};

const updatePassword = async (token, userData, setPasswordError) => {
  const config = {
    headers: { 'Authorization' : `Bearer ${token}` }
  };
  const correctPassword = await apiService.get( `${process.env.REACT_APP_API_URL}${API_ENDPOINTS.CHECK_PASSWORD}${userData.oldPassword}`, config);
  console.log(correctPassword);
  if(!correctPassword || userData.repeatPassword !== userData.newPassword){
    setPasswordError(true);
    return;
  }
  const request = 
      {
        'password': userData.newPassword
      };

  try{
    await apiService.put(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_PUT}`, request, config);
  }
  catch (error){
    console.error(error);
    return error;
  }
};

const updateUser = async (token, userData) => {
  const request = {};
  ['name', 'surname', 'email', 'phoneNumber'].forEach(field => {
    if (userData[field]) {
      request[field] = userData[field];
    }
  });
  
  try {
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    await apiService.put(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_PUT}`, request, config);
  } catch (error) {
    console.error(error);
    return error;
  }
};

const uploadListing = async (token, formData, imageFiles) => {
  const config = {
    headers: { 'Authorization' : `Bearer ${token}` }
  };
  const carListing = {
    ...formData,
    imagesBase64: imageFiles.filter((image) => image !== imageFiles[0]),
    thumbnailBase64: imageFiles[0],
  };
  const response = await apiService.post(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.VEHICLE}`, carListing, config);

  return response;
};

const updateListing = async (token, formData) => {
  // eslint-disable-next-line no-unused-vars
  const { thumbnail, images, phoneNumber, userId, ...request } = formData;
  request.price = Number(request.price);
  request.year = Number(request.year);
  request.power = Number(request.power);
  request.engineCapacity = Number(request.engineCapacity);
  try {
    const config = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    await apiService.put(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.VEHICLE}`, request, config);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default {fetchFilteredListings, fetchListing, fetchUser, updatePassword, updateUser, uploadListing, updateListing};