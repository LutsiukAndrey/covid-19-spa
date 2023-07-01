import '../../../../App.css';
import { PropTypes } from 'prop-types';

import { useQueryParams } from '../../../../hooks/updateQveryParams';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Box, ListItemText } from '@mui/material';

import dayjs from 'dayjs';

export const FilteDate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');

  const [filterValueFrom, setFilterValueFrom] = useState(fromParam);
  const [filterValueTo, setFilterValueTo] = useState(toParam);

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
        } else if (type === 'to') {
          setFilterValueTo(formattedDate);
          updateQueryParam('to', formattedDate);
        }
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
                minDate={dayjs('2020-01-22')}
                disableFuture
                views={['year', 'month', 'day']}
                format="YYYY-MM-DD"
                value={filterValueFrom && dayjs(filterValueFrom)}
                onAccept={handleDateChange('from')}
              />
            </Box>

            <Box>
              <ListItemText primary="Date to" />
              <DatePicker
                minDate={dayjs(
                  filterValueFrom ? filterValueFrom : '2020-01-22'
                )}
                disableFuture
                views={['year', 'month', 'day']}
                format="YYYY-MM-DD"
                value={filterValueTo && dayjs(filterValueTo || '')}
                onAccept={handleDateChange('to')}
              />
            </Box>
          </Box>
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

FilteDate.propTypes = {
  disabled: PropTypes.bool,
};
