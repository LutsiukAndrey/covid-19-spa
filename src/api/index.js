import axios from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';
// const myInit = {
// };
const myInit = {
  method: 'HEAD',
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': `*`,
  },
};

const getRegions = async () => {
  try {
    const { data } = await axios.get('/regions', myInit);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
const getCountryInfo = async date => {
  try {
    const { data } = await axios.get(
      `/reports/total?date=${date}&iso=USA`,
      myInit
    );

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
