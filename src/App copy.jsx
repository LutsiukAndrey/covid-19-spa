import { Route, Routes } from 'react-router-dom';
import './App.css';

import { NotFound } from './pages/NotFound';
import { MainPage } from './pages/MainPage';
import { About } from './pages/About';

import Layout from './components/Loyout/Loyout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path="/about" element={<About />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
