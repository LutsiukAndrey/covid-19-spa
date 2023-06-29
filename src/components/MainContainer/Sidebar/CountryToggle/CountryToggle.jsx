import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

export const CountryToggle = ({ setCountrySelected, countrySelected }) => {
  const [alignment, setAlignment] = useState('Global');

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={(event, newAligment) => {
        setAlignment(newAligment);
        setCountrySelected(!countrySelected);
      }}
      aria-label="Platform"
    >
      <ToggleButton value="Global">Global</ToggleButton>
      <ToggleButton value="Country">Country</ToggleButton>
    </ToggleButtonGroup>
  );
};
CountryToggle.propTypes = {
  setCountrySelected: PropTypes.func.isRequired,
  countrySelected: PropTypes.bool.isRequired,
};
