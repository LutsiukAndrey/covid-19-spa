import axios from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';

const myInit = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
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

const getTotalInfo = async (dates, iso = null) => {
  console.log(iso);
  try {
    let requests = [];
    const numRequests = Math.min(dates.length - 2, 15);

    if (dates.length > 2) {
      const firstDate = dates[0];
      const lastDate = dates[dates.length - 1];
      const step = Math.floor((dates.length - 2) / numRequests);

      for (let i = 0; i < numRequests; i++) {
        const index = 1 + i * step;
        const currentDate = dates[index];
        const url = `/reports/total?date=${currentDate}&iso=${iso}`;
        requests.push(axios.get(url, myInit));
      }

      requests.unshift(
        axios.get(`/reports/total?date=${firstDate}&iso=${iso}`, myInit)
      );
      requests.push(
        axios.get(`/reports/total?date=${lastDate}&iso=${iso}`, myInit)
      );
    } else {
      requests = dates.map(date => {
        const url = `/reports/total?date=${date}&iso=${iso}`;
        return axios.get(url, myInit);
      });
    }

    const responses = await Promise.all(requests);
    const data = responses.map(response => response.data);
    const transformedData = data.map(item => item.data);
    return transformedData;
  } catch (error) {
    console.error(error.message);
  }
};

const api = {
  getRegions,
  getTotalInfo,
};

export default api;
