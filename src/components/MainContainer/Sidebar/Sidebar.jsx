import { Divider, Drawer, List, Toolbar } from '@mui/material';
import { Country } from './Country/Country';
import { Case } from './Case/Case';
import { Calendar } from './Calendar/Calendar';
import { useEffect, useState } from 'react';
import api from '../../../api';
import { Loader } from '../../Loader/Loader';

export const Sidebar = ({ setChartData, caseState, setCaseState }) => {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetRegion, setTargetRegion] = useState(null);

  const [date, setDate] = useState(null);


  const onCountryChange = country => {
    setTargetRegion(country);
  };

  const onCalendarChange = date => {
    setDate(date);
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
      if (targetRegion) {
        try {
          const result = await api.getCountryInfo(targetRegion);
          setChartData(result?.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      }
    };
    fetchData();
  }, [setChartData, targetRegion]);

  return (
    <aside style={{ backgroundColor: '#f3f3f3' }}>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
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
        <Toolbar />
        <Divider />
        <List>
          {!loading ? (
            <>
              <Calendar onCalendarChange={onCalendarChange} />
              {regions && (
                <Country regions={regions} onCountryChange={onCountryChange} />
              )}
              <Case caseState={caseState} setCaseState={setCaseState} />
            </>
          ) : (
            <Loader />
          )}
        </List>
        <Divider />
      </Drawer>
    </aside>
  );
};
