import '../../../../App.css';

import { useQueryParams } from '../../../../hooks/updateQveryParams';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Box, ListItemText } from '@mui/material';

import dayjs from 'dayjs';

export const FilterDate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const params = {
    fromParam: queryParams.get('from'),
    toParam: queryParams.get('to'),
  };

  const { fromParam, toParam } = params;

  const [filterValueFrom, setFilterValueFrom] = useState<string | null>(
    fromParam
  );
  const [filterValueTo, setFilterValueTo] = useState<string | null>(toParam);

  const { updateQueryParam } = useQueryParams();

  useEffect(() => {
    setFilterValueFrom(fromParam);
    setFilterValueTo(toParam);
  }, [fromParam, toParam]);

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
          return;
        }
        setFilterValueTo(formattedDate);
        updateQueryParam('to', formattedDate);
      }
    };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <Box className="dataPicker-container">
            <Box>
              <ListItemText primary="Date from" />
              <DatePicker
                minDate={dayjs('2020-01-22') as any}
                disableFuture
                views={['year', 'month', 'day']}
                format="YYYY-MM-DD"
                value={filterValueFrom && dayjs(filterValueFrom)}
                onAccept={handleDateChange('from') as any}
              />
            </Box>

            <Box>
              <ListItemText primary="Date to" />
              <DatePicker
                minDate={
                  dayjs(filterValueFrom ? filterValueFrom : '2020-01-22') as any
                }
                disableFuture
                views={['year', 'month', 'day']}
                format="YYYY-MM-DD"
                value={filterValueTo && dayjs(filterValueTo || '')}
                onAccept={handleDateChange('to') as any}
              />
            </Box>
          </Box>
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};
