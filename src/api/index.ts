import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://covid-api.com/api';

interface Region {
  iso: string;
  name: string;
}

interface TotalInfo {
  data: [];
  date: string;
  last_update: string;
  confirmed: number;
  confirmed_diff: number;
  deaths: number;
  deaths_diff: number;
  recovered: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: number;
}

const config = {
  headers: {
    Accept: 'application/json',
  },
};

const getRegions = async (): Promise<Region[]> => {
  try {
    const response: AxiosResponse = await axios.get('/regions', config);
    const { data } = response.data;

    return data as Region[];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTotalInfo = async (
  dates: string[],
  iso: string | null = null
): Promise<TotalInfo[]> => {
  try {
    let requests: Promise<AxiosResponse<TotalInfo>>[] = [];

    if (dates.length > 2) {
      const numRequests = Math.min(dates.length - 2, 15);
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
    ) as TotalInfo[] | [];

    return removedEmptyArrs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const api = {
  getRegions,
  getTotalInfo,
};

export default api;
