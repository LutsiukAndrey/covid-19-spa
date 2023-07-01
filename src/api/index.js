import axios from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
};

const getRegions = async () => {
  try {
    const response = await fetch('https://covid-api.com/api/regions');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getTotalInfo = async (dates, iso = null) => {
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
        let url = `/reports/total?date=${currentDate}`;
        if (iso) {
          url += `&iso=${iso}`;
        }
        requests.push(axios.get(url, config));
      }

      let firstRequestUrl = `/reports/total?date=${firstDate}`;
      let lastRequestUrl = `/reports/total?date=${lastDate}`;
      if (iso) {
        firstRequestUrl += `&iso=${iso}`;
        lastRequestUrl += `&iso=${iso}`;
      }
      requests.unshift(axios.get(firstRequestUrl, config));
      requests.push(axios.get(lastRequestUrl, config));
    } else {
      requests = dates.map(date => {
        let url = `/reports/total?date=${date}`;
        if (iso) {
          url += `&iso=${iso}`;
        }
        return axios.get(url, config);
      });
    }

    const responses = await Promise.all(requests);
    const data = responses.map(response => response.data);
    const transformedData = data.map(item => item.data);

    const removedEmptyArrs = transformedData.filter(
      item => Object.keys(item).length > 0
    );

    return removedEmptyArrs;
  } catch (error) {
    console.error(error.message);
  }
};

const api = {
  getRegions,
  getTotalInfo,
};

export default api;
