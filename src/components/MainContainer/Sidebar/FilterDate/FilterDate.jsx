import { ListItemText } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
// import { SidebarContext } from '../../MainContainer';
import { useLocation, useSearchParams } from 'react-router-dom';

// enum DataPoints {
//    FROM = 'from',
//    TO = 'to'
// }
export const FilteDate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');

  const [filterValueFrom, setFilterValueFrom] = useState(null);
  const [filterValueTo, setFilterValueTo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFilterValueFrom(fromParam);
    setFilterValueTo(toParam);
  }, [fromParam, toParam]);

  const updateQueryParam = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    setSearchParams(params.toString());
  };

  const handleDateChange =
    type =>
    ({ $d: newValue }) => {
      if (newValue) {
        const year = newValue.getFullYear();
        const month = newValue.getMonth() + 1;
        const day = newValue.getDate();
        const formattedDate = `${year}-${month
          .toString()
          .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        if (type === 'from') {
          setFilterValueFrom(formattedDate);
          updateQueryParam('from', formattedDate);
        } else if (type === 'to') {
          setFilterValueTo(formattedDate);
          updateQueryParam('to', formattedDate);
        }
      } else {
        if (type === 'from') {
          setFilterValueFrom(null);
        } else if (type === 'to') {
          setFilterValueTo(null);
        }
      }
    };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <ListItemText primary="Date from" />
          <DatePicker
            minDate={dayjs('2020-01-22')}
            disableFuture
            views={['year', 'month', 'day']}
            format="YYYY-MM-DD"
            value={filterValueFrom && dayjs(filterValueFrom)}
            onAccept={handleDateChange('from')}
          />
          <ListItemText primary="Date to" />
          <DatePicker
            minDate={dayjs(filterValueFrom ? filterValueFrom : '2020-01-22')}
            disableFuture
            views={['year', 'month', 'day']}
            format="YYYY-MM-DD"
            value={filterValueTo && dayjs(filterValueTo || '')}
            onAccept={handleDateChange('to')}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};
