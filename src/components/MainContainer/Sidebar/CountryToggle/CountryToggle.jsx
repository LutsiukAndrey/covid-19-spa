import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from '../../../../helpers/helpers';

export const CountryToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = new URLSearchParams(location.search);

  const countryCheckedParam = queryParams.get('countryChecked');

  const [countrySelected, setCountrySelected] = useState(true);
  const [alignment, setAlignment] = useState('Global');

  const { updateQueryParam } = useQueryParams();

  useEffect(() => {
    setAlignment(countryCheckedParam ? 'Country' : 'Global');
  }, [countryCheckedParam]);

  const onChangeCountry = (e, newAligment) => {
    setAlignment(newAligment);
    setCountrySelected(!countrySelected);
    if (newAligment === 'Country') {
      updateQueryParam('countryChecked', 'true');
    } else {
      setSearchParams();
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={(event, newAligment) => {
        onChangeCountry(event, newAligment);
      }}
      aria-label="Platform"
    >
      <ToggleButton
        sx={{
          borderRadius: '10px',

          '&:hover': {
            backgroundColor: '#a8c78f',
            color: '#000',
          },
          '&.Mui-selected': {
            backgroundColor: '#a8c78f',
            color: '#000',
          },
        }}
        value="Global"
      >
        Global
      </ToggleButton>
      <ToggleButton
        sx={{
          borderRadius: '10px',

          '&:hover': {
            backgroundColor: '#a8c78f',
            color: '#000',
          },
          '&.Mui-selected': {
            backgroundColor: '#a8c78f',
            color: '#000',
          },
        }}
        value="Country"
      >
        Country
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
