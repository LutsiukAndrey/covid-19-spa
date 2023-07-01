import React from 'react';
import '../../../App.css';

import { Box, Divider, List } from '@mui/material';

import { Country } from './Country/Country';
import { Case } from './Case/Case';
import { CountryToggle } from './CountryToggle/CountryToggle';
import { ResetFilterBtn } from './ResetFilterBtn/ResetFilterBtn';
import { FilterDate } from './FilterDate/FilterDate';

export const Sidebar: React.FC = () => {
  const queryParams = new URLSearchParams(location.search);

  const countryCheckedParam = queryParams.get('countryChecked');

  return (
    <Box className="custom-box">
      <CountryToggle />
      <List>
        <Divider />
        {countryCheckedParam && <Country />}
        <Divider />
        <FilterDate />
        <Case />
        <ResetFilterBtn />
      </List>
    </Box>
  );
};
