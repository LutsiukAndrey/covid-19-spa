import '../../App.css';
import api from '../../api';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import getPeriod from '../../helpers/helpers';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';

import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import React from 'react';

export const MainContainer = () => {
  interface DataItem {
    date: string;
    last_update: string;
    confirmed: number;
    confirmed_diff: number;
    deaths: number;
    deaths_diff: number;
    recovered: number;
    recovered_diff: number;
    active: number;
    active_diff: number;
    fatality_rate: number;
  }

  const { generateDateRange, generateLastMonth } = getPeriod;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const parapms = {
    fromParam: queryParams.get('from'),
    toParam: queryParams.get('to'),
    countryParam: queryParams.get('q'),
  };

  const { fromParam, toParam, countryParam } = parapms;

  const [data, setData] = useState<DataItem[]>([]);
  const [periodDatesArr, setPeriodDatesArr] = useState<string[]>([]);
  const [wholePeriod, setwholePeriod] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showNotification, setShowNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setwholePeriod(generateLastMonth());
    setPeriodDatesArr(generateDateRange(fromParam, toParam));
  }, [fromParam, toParam]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let result: DataItem[] = [];
        if (periodDatesArr.length > 0) {
          result = (await api.getTotalInfo(
            periodDatesArr,
            countryParam
          )) as DataItem[];
        } else {
          result = (await api.getTotalInfo(
            wholePeriod,
            countryParam
          )) as DataItem[];
        }
        setData(result);
      } catch (error) {
        setErrorMessage(error.message);
        setShowNotification(true);
      } finally {
        setIsLoading(false);
      }
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
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
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
      ) : !data.length ? (
        <Box className="nothingToshow">
          <h3 className="nothingToshow-title">
            No data found for your request...
          </h3>
        </Box>
      ) : (
        <>
          {periodDatesArr.length && (
            <Chart
              description={`Target dates from ${periodDatesArr[0]} to ${
                periodDatesArr[periodDatesArr.length - 1]
              }`}
              data={data}
            />
          )}
          {!periodDatesArr.length && (
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
