import { Button } from '@mui/material';

import { useSearchParams } from 'react-router-dom';

export const ResetFilterBtn = () => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Button
      onClick={() => {
        setSearchParams();
      }}
      variant="contained"
    >
      Reset filter
    </Button>
  );
};
