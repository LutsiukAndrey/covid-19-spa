import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="primary">
              <NavLink to="/">main</NavLink>
            </Button>
            <Button color="inherit">
              <NavLink to="/about">About</NavLink>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};
