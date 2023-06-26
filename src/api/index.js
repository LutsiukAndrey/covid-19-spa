import axios from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';
const getRegions = async () => {
  try {
    const { data } = await axios.get(`/regions`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const api = {
  getRegions,
};

export default api;
