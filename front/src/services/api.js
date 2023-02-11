import axios from 'axios';

const instance = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

const get = async (url, config = null) => {
  const response = await instance.get(url, { ...config });
  return response.data;
};

const post = async (url, data, config) => {
  const response = await axios.post(url, data, config);
  return response.data;
};

const put = async (url, data, config) => {
  const response = await axios.put(url, data, config);
  return response.data;
};

export default {
  get, post, put
};
