import { NavLink } from 'react-router-dom';

export const Header = () => {
  const linkStyles = {
    display: 'block',
    textDecoration: 'none',
    color: '#000',
    fontSize: '30px',
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
      <NavLink color="inherit" underline="hover" to="/" style={linkStyles}>
        Main
      </NavLink>
      <NavLink color="inherit" to="/about" style={linkStyles}>
        About
      </NavLink>
    </header>
  );
};
