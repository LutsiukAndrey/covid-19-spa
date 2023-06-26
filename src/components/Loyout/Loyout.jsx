import { Container } from '@mui/material';

import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <>
      <Container
        maxWidth="1200px"
        sx={{
          '&.MuiContainer-root': {
            backgroundColor: '#fff6ff',
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
