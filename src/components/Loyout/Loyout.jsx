import { Container } from '@mui/material';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      <Container
        sx={{
          '&.MuiContainer-root': {
            maxWidth: '1280px',
            // height: '100vh',
            backgroundColor: '#EDC6B1',
            padding: '0',
          },
        }}
      >
        <Header />

        <Suspense fallback={<h1>Loading...</h1>}></Suspense>
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
