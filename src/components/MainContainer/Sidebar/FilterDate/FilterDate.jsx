import { ListItemText } from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import { useContext } from 'react';
import { SidebarContext } from '../../MainContainer';

export const FilteDate = () => {
  const {
    filterValueFrom,
    setFilterValueFrom,
    filterValueTo,
    setFilterValueTo,
  } = useContext(SidebarContext);

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
        } else if (type === 'to') {
          setFilterValueTo(formattedDate);
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
        <ListItemText primary="Date from" />
        <DatePicker
          minDate={dayjs('2020-01-22')}
          disableFuture
          views={['year', 'month', 'day']}
          value={filterValueFrom}
          onAccept={handleDateChange('from')}
        />
        <ListItemText primary="Date to" />
        <DatePicker
          minDate={dayjs(filterValueFrom ? filterValueFrom : '2020-01-22')}
          disableFuture
          format="YYYY-MM-DD"
          value={filterValueTo}
          onAccept={handleDateChange('to')}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
