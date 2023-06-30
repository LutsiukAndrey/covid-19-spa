import '../../App.css';
import { useEffect, useState } from 'react';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import api from '../../api';
import { generateDateRange } from '../../helpers/helpers';
import { Box, CircularProgress, Snackbar } from '@mui/material';

export const MainContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');
  const countryParam = queryParams.get('q');
  const [data, setData] = useState([]);
  const [periodDatesArr, setPeriodDatesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setPeriodDatesArr(generateDateRange(fromParam, toParam));
  }, [fromParam, toParam]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await api.getTotalInfo(periodDatesArr, countryParam);
        setShowNotification(result.length === 0);
        setData(result);
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [countryParam, periodDatesArr]);

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="mainContainer">
      <Snackbar
        open={showNotification}
        onClose={handleNotificationClose}
        message="No statistics found for your request"
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Sidebar />

      {isLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            right: '40%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : data.length === 0 ? (
        <Box className="noResult">
          <h3 className="noResult-title">
            I have nothing to show... please enter something
          </h3>
        </Box>
      ) : (
        <>
          <Chart data={data} />
        </>
      )}
    </div>
  );
};
