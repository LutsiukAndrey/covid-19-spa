import { Autocomplete, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../../api';
import { useLocation } from 'react-router-dom';
import { useQueryParams } from '../../../../helpers/helpers';

export const Country = () => {
  const location = useLocation();
  const { updateQueryParam } = useQueryParams();
  const queryParams = new URLSearchParams(location.search);
  const countryParam = queryParams.get('q');

  const [regions, setRegions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const selectedIndex = regions.findIndex(el => el.iso === countryParam);
    if (selectedIndex !== -1) {
      setSelectedValue(regions[selectedIndex]);
    } else {
      setSelectedValue(null);
    }
  }, [countryParam, regions]);

  return (
    <Autocomplete
      id="country-select"
      sx={{ marginTop: 2 }}
      options={regions}
      autoHighlight
      value={selectedValue}
      getOptionLabel={option => option.name}
      loading={loading}
      onChange={(event, newValue) => {
        event.preventDefault();
        updateQueryParam('q', newValue?.iso);
        setSelectedValue(newValue);
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
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  );
};
