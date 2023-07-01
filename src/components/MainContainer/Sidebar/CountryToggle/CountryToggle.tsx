import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQueryParams } from '../../../../hooks/updateQveryParams';

export const CountryToggle: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = new URLSearchParams(location.search);

  const countryCheckedParam = queryParams.get('countryChecked');

  const [countrySelected, setCountrySelected] = useState(true);
  const [alignment, setAlignment] = useState<string>('Global');

  const { updateQueryParam } = useQueryParams();

  useEffect(() => {
    setAlignment(countryCheckedParam ? 'Country' : 'Global');
  }, [countryCheckedParam]);

  const onChangeCountry = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setCountrySelected(!countrySelected);
    if (newAlignment === 'Country') {
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
      onChange={(event, newAlignment) => {
        onChangeCountry(event, newAlignment);
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
