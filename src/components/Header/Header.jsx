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
    <header style={{ backgroundColor: '#435B66', padding: 20 }}>
      {/* <AppBar position="static"> */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/" sx={{}}>
          Main
        </Link>

        <Link underline="hover" color="inherit" to="/about">
          About
        </Link>
      </Breadcrumbs>
      {/* </AppBar> */}

      {/* <Toolbar>
        <Button color="primary">
          <NavLink to="/">main</NavLink>
        </Button>
        <Button color="inherit">
          <NavLink to="/about">About</NavLink>
        </Button>
      </Toolbar> */}
    </header>
  );
};
