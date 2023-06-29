import { Container } from '@mui/material';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      <Container
        maxWidth="1400px"
        sx={{
          '&.MuiContainer-root': {
            backgroundColor: '#FFF4F4',
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
