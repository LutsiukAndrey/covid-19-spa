import axios from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';
const myInit = {
  method: 'HEAD',
  mode: 'no-cors',
};

const getRegions = async () => {
  try {
    const { data } = await axios.get('/regions', myInit);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getCountryInfo = async iso => {
  try {
    const { data } = await axios.get(`/reports?iso=${iso}`, myInit);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const api = {
  getRegions,
  getCountryInfo,
};

export default api;
