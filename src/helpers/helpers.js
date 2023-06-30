import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

export const generateDateRange = (dateFrom, dateTo) => {
  const arr = [];
  if (dateFrom && dateTo) {
    const startDate = dayjs(dateFrom, 'YYYY-MM-DD');
    const endDate = dayjs(dateTo, 'YYYY-MM-DD');
    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      arr.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
  }
  return arr;
};

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryParam = (name, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(name, value) : params.delete(name);
    setSearchParams(params);
  };

  return { searchParams, updateQueryParam };
};
