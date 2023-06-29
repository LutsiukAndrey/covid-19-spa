import { Autocomplete, Box, TextField } from '@mui/material';

import { useEffect, useState } from 'react';
import api from '../../../../api';
import { useSearchParams, useLocation } from 'react-router-dom';

export const Country = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const updateQueryParam = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    setSearchParams(params.toString());
  };

  const queryParams = new URLSearchParams(location.search);
  const countryParam = queryParams.get('q');

  const [targetCountry, setTargetCountry] = useState(null);
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
    const selectedIndex = regions.findIndex(el => el.name === countryParam);
    if (selectedIndex !== -1) {
      setSelectedValue(regions[selectedIndex]);
      setTargetCountry(regions[selectedIndex]?.iso);
    } else {
      setSelectedValue(null);
      setTargetCountry(null);
    }
  }, [countryParam, regions]);

  return (
    <>
      {!loading && (
        <Autocomplete
          id="country-select"
          sx={{ width: 300, marginTop: 2 }}
          options={regions}
          autoHighlight
          value={selectedValue}
          getOptionLabel={option => option.name}
          loading={loading}
          onChange={(event, newValue) => {
            event.preventDefault();
            setTargetCountry(newValue?.iso);
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
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    </>
  );
};
