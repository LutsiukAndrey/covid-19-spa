import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export const Calendar = ({ onCalendarChange, disabled, resetCalendar }) => {
  const [valueFrom, setValueFrom] = useState(null);

  useEffect(() => {
    onCalendarChange(valueFrom);
  }, [onCalendarChange, valueFrom]);

  useEffect(() => {
    if (resetCalendar) {
      setValueFrom(null);
    }
  }, [resetCalendar]);

  const handleDateFromChange = newValue => {
    if (newValue) {
      const year = newValue.getFullYear();
      const month = newValue.getMonth() + 1;
      const day = newValue.getDate();
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
      setValueFrom(formattedDate);
    } else {
      setValueFrom(null);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <DatePicker
            disabled={disabled}
            minDate={dayjs('2020-01-22')}
            disableFuture
            views={['year', 'month', 'day']}
            format="YYYY-MM-DD"
            value={valueFrom}
            onAccept={newValue => {
              handleDateFromChange(newValue.$d);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
};

Calendar.propTypes = {
  onCalendarChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  resetCalendar: PropTypes.bool.isRequired,
};
