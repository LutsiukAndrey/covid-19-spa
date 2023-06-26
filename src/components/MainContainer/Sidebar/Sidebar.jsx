import { Divider, Drawer, List, Toolbar } from '@mui/material';
import { Country } from './Country/Country';
import { Case } from './Case/Case';
import { Calendar } from './Calendar/Calendar';
import { useEffect, useState } from 'react';
import api from '../../../api';
import { Loader } from '../../Loader/Loader';

export const Sidebar = () => {
  const [regions, setRegions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [targetRegion, setTargetRegion] = useState(null);

  const onCaseChange = choice => {
    console.log(choice);
  };
  const onCountryChange = country => {
    setTargetRegion(country);
  };
  const onCalendarChange = date => {
    console.log(date);
  };

  console.log(targetRegion);
  useEffect(() => {
    const regionsData = async () => {
      const result = await api.getRegions();

      setLoading(false);

      setRegions(result.data);
    };
    regionsData();
  }, []);
  console.log(regions);

  return (
    <aside style={{ backgroundCollor: '#f3f' }}>
      <Drawer
        sx={{
          //   position: 'relative',
          //   width: 440,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            padding: 1,
            position: 'relative',
            width: '25%',
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
              <Country regions={regions} onCountryChange={onCountryChange} />
              <Case onCaseChange={onCaseChange} />
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
