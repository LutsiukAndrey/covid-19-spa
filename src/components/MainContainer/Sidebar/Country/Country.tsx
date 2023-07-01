import { Autocomplete, Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../../../api';
import { useLocation } from 'react-router-dom';
import { useQueryParams } from '../../../../hooks/updateQveryParams';

interface Region {
  iso: string;
  name: string;
}

export const Country: React.FC = () => {
  const location = useLocation();
  const { updateQueryParam } = useQueryParams();
  const queryParams = new URLSearchParams(location.search);
  const countryParam = queryParams.get('q');

  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedValue, setSelectedValue] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getRegions();

        setRegions(response);
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
