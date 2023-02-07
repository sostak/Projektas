import axios from 'axios';

const get = async (url, config = null) => {
  const response = await axios.get(url, config);
  return response.data;
};

const post = async (url, data, config) => {
  const response = await axios.post(url, data, config);
  return response.data;
};

const put = async (url, data) => {
  const response = await axios.put(url, data);
  return response.data;
};

export default {
  get, post, put
};
