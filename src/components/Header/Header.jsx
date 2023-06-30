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
  const linkStyles = {
    display: 'block',
    textDecoration: 'none',
    color: '#000',
    backgroundColor: '#a8c78f',
    padding: '5px',
    borderRadius: '10px',
    fontSize: '30px',
    width: '80px',

    '&:hover': {
      backgroundColor: '#fd0000',
    },
    '&:focus': {
      backgroundColor: '#fd0000',
    },
  };

  return (
    <header
      style={{
        backgroundColor: '#7C96AB',
        gap: '20px',
        padding: 20,
        display: 'flex',
      }}
    >
      {/* <AppBar position="static"> */}

      <NavLink color="inherit" underline="hover" to="/" style={linkStyles}>
        Main
      </NavLink>
      <NavLink color="inherit" to="/about" style={linkStyles}>
        About
      </NavLink>

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
