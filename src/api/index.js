import axios from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';
// const myInit = {
// };
const myInit = {
  method: 'HEAD',
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*',
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
const getTotalInfo = async (date, iso = null) => {
  try {
    let url = `/reports/total?date=${date}`;
    if (iso) {
      url += `&iso=${iso}`;
    }

    const { data } = await axios.get(url, myInit);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const api = {
  getRegions,
  getTotalInfo,
};

export default api;
