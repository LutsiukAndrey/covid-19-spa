import '../../App.css';
import { useEffect, useState } from 'react';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import api from '../../api';

import { Box, CircularProgress, Snackbar } from '@mui/material';
import getPeriod from '../../helpers/helpers';

export const MainContainer = () => {
  const { generateDateRange, generateLastMonth } = getPeriod;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');
  const countryParam = queryParams.get('q');

  const [data, setData] = useState([]);
  const [periodDatesArr, setPeriodDatesArr] = useState([]);
  const [wholePeriod, setwholePeriod] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setwholePeriod(generateLastMonth());
    setPeriodDatesArr(generateDateRange(fromParam, toParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toParam]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (periodDatesArr.length > 0) {
          const result = await api.getTotalInfo(periodDatesArr, countryParam);
          setShowNotification(result.length === 0);

          setData(result);
        } else {
          const result = await api.getTotalInfo(wholePeriod, countryParam);
          setShowNotification(result.length === 0);

          setData(result);
        }
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
      setIsLoading(false);
    };
    if (countryParam || periodDatesArr) {
      fetchData();
    }
  }, [countryParam, periodDatesArr, wholePeriod]);

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
        <Box className="nothingToshow">
          <h3 className="nothingToshow-title">
            No data found for your request...
          </h3>
        </Box>
      ) : (
        <>
          {periodDatesArr.length > 0 ? (
            <Chart
              description={`Target dates from ${periodDatesArr[0]} to ${
                periodDatesArr[periodDatesArr.length - 1]
              }`}
              data={data}
            />
          ) : (
            <Chart
              description={`Whole period ${wholePeriod[0]} to ${
                wholePeriod[wholePeriod.length - 1]
              }`}
              data={data}
            />
          )}
        </>
      )}
    </div>
  );
};
