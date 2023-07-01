import '../../App.css';
import api from '../../api';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import getPeriod from '../../helpers/helpers';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';

import { Box, CircularProgress, Snackbar } from '@mui/material';
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

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');
  const countryParam = queryParams.get('q');

  const [data, setData] = useState<DataItem[]>([]);
  const [periodDatesArr, setPeriodDatesArr] = useState<string[]>([]);
  const [wholePeriod, setwholePeriod] = useState<string[]>([]);
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
        let result: DataItem[] = [];
        if (periodDatesArr.length > 0) {
          result = (await api.getTotalInfo(
            periodDatesArr,
            countryParam
          )) as DataItem[];
          setShowNotification(result.length === 0);
        } else {
          result = (await api.getTotalInfo(
            wholePeriod,
            countryParam
          )) as DataItem[];
          setShowNotification(result.length === 0);
        }
        setData(result);
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
