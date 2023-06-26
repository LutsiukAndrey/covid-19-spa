import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { ListItemText } from '@mui/material';
import dayjs from 'dayjs';

// eslint-disable-next-line react/prop-types
export const Calendar = ({ onCalendarChange }) => {
  const [valueFrom, setValueFrom] = useState(null);
  const [valueTo, setValueTo] = useState(dayjs());
  useEffect(() => {
    onCalendarChange(valueFrom);
  }, [valueFrom]);

  const handleDateFromChange = newValue => {
    if (newValue) {
      const year = newValue.getFullYear();
      const month = newValue.getMonth() + 1;
      const day = newValue.getDate();
      const formattedDate = `${year}-${month}-${day}`;
      setValueFrom(formattedDate);
    } else {
      setValueFrom(null);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <ListItemText primary="Date from" />
          <DatePicker
            views={['year', 'month', 'day']}
            format="YYYY-MM-DD"
            value={valueFrom}
            onChange={newValue => {
              handleDateFromChange(newValue.$d);
            }}
          />
          {/* <ListItemText primary="Date to" />

          <DatePicker
            // defaultValue={}
            format="YYYY-MM-DD"
            value={valueTo}
            onChange={newValue => setValueTo(newValue)}
          /> */}
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};
