import { Button } from '@mui/material';

import { useSearchParams } from 'react-router-dom';

export const ResetFilterBtn = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Button
      sx={{
        borderRadius: '10px',
        backgroundColor: 'transparent',
        color: '#000',

        '&:hover': {
          backgroundColor: '#a8c78f',
        },
      }}
      onClick={() => {
        setSearchParams();
      }}
      variant="contained"
    >
      Reset filter
    </Button>
  );
};
