import '../../../App.css';

import { Box, Divider, List } from '@mui/material';

import { Country } from './Country/Country';
import { Case } from './Case/Case';
import { FilteDate } from './FilterDate/FilterDate';
import { CountryToggle } from './CountryToggle/CountryToggle';
import { ResetFilterBtn } from './ResetFilterBtn/ResetFilterBtn';

export const Sidebar = () => {
  const queryParams = new URLSearchParams(location.search);

  const countryCheckedParam = queryParams.get('countryChecked');

  return (
    <Box className="custom-box">
      <CountryToggle />
      <List>
        <Divider />
        {countryCheckedParam && <Country />}
        <Divider />
        <FilteDate />
        <Case />
        <ResetFilterBtn />
      </List>
    </Box>
  );
};
