import { Autocomplete, Box, TextField } from '@mui/material';

import PropTypes from 'prop-types';

export const Country = ({ regions, onCountryChange }) => {
  return (
    <>
      <Autocomplete
        id="country-select"
        sx={{ width: 300, marginTop: 2 }}
        options={regions}
        autoHighlight
        getOptionLabel={option => option.name}
        onChange={(event, newValue) => {
          event.preventDefault();
          onCountryChange(newValue?.iso);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.name} ({option.iso})
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    </>
  );
};
Country.propTypes = {
  regions: PropTypes.array,
  onCountryChange: PropTypes.func.isRequired,
};
