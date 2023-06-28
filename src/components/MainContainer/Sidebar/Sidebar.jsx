import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  List,
  ListItemText,
} from '@mui/material';
import { Country } from './Country/Country';
import { Case } from './Case/Case';
import { Calendar } from './Calendar/Calendar';
import api from '../../../api';
import { FilteDate } from './FilterDate/FilterDate';

export const Sidebar = ({ setChartData }) => {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetCountry, setTargetCountry] = useState(null);
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [calendarDisable, setCalendarDisable] = useState(false);
  const [countrySelected, setCountrySelected] = useState(false);
  const [resetCalendar, setResetCalendar] = useState(false);

  const onCountryChange = country => {
    setTargetCountry(country);
    setCalendarDisable(true);
    setResetCalendar(true);
  };

  const onCalendarChange = dateProp => {
    setDate(dateProp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.getRegions();
        setRegions(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching regions:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (date && calendarDisable) {
        try {
          const result = await api.getTotalInfo(date, targetCountry);
          setData(result?.data);
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      }
    };
    fetchData();
  }, [date, calendarDisable]);

  useEffect(() => {
    const sortedDataArr = [...dataArr].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const existingDataIndex = sortedDataArr.findIndex(
      item => item.date === data.date
    );

    const updatedDataArr = [...sortedDataArr];
    if (data.length !== 0 && existingDataIndex === -1) {
      updatedDataArr.push(data);
    } else if (existingDataIndex !== -1) {
      updatedDataArr[existingDataIndex] = data;
    }
    setDataArr(updatedDataArr);
    setChartData(updatedDataArr);
  }, [data, setChartData]);

  useEffect(() => {
    setDataArr([]);
    setDate(null);
  }, [targetCountry]);

  useEffect(() => {
    if (countrySelected) {
      setDate(null);
      setData([]);
      setCalendarDisable(false);
      setResetCalendar(true);

      return;
    } else {
      setData([]);
      setDate(null);
      setTargetCountry(null);
      setCalendarDisable(true);
      setResetCalendar(true);

      return;
    }
  }, [countrySelected]);

  useEffect(() => {
    if (resetCalendar) {
      setResetCalendar(false);
    }
  }, [resetCalendar]);
  return (
    <aside style={{ backgroundColor: '#d4d4d4' }}>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={() => setCountrySelected(!countrySelected)}>
          {!countrySelected ? 'Global' : 'Country'}
        </Button>
      </ButtonGroup>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor: '#d4d4d4',
            padding: 1,
            width: 400,
            position: 'relative',
            height: '100vh',
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItemText
            primary={
              countrySelected ? 'Choose Date and Country' : 'Choose Date '
            }
          />{' '}
          <Divider />
          {!loading && regions && countrySelected && (
            <Country regions={regions} onCountryChange={onCountryChange} />
          )}
          <Calendar
            onCalendarChange={onCalendarChange}
            disabled={!calendarDisable}
            resetCalendar={resetCalendar} // Установите true, чтобы сбросить календарь
          />
        </List>
        <List>
          <ListItemText primary="Filter" />
          <Divider />
          <Case />
          <FilteDate />
        </List>
      </Drawer>
    </aside>
  );
};

Sidebar.propTypes = {
  setChartData: PropTypes.func.isRequired,
};
