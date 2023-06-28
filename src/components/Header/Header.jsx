import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header style={{ backgroundColor: '#9f9f9f', padding: 20 }}>
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Main
        </Link>

        <Link underline="hover" color="inherit" to="/about">
          About
        </Link>
      </Breadcrumbs> */}

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
    </header>
  );
};
