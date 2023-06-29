// import { useEffect, useState } from 'react';
// import { Chart } from './Chart/Chart';
// import { Sidebar } from './Sidebar/Sidebar';
// import { testObject } from '../../../fakeApi/tempApi';
// import { useLocation } from 'react-router-dom';
// import api from '../../api';
// import dayjs from 'dayjs';
// import { generateDateRange } from '../../helpers/helpers';

// export const MainContainer = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const fromParam = queryParams.get('from');
//   const toParam = queryParams.get('to');
//   const countryParam = queryParams.get('q');

//   const [chartData, setChartData] = useState([]);
//   const [data, setData] = useState([]);
//   const [dataArr, setDataArr] = useState([]);

//   const [periodDatesArr, setperiodDatesArr] = useState([]);

//   //
//   useEffect(() => {
//     setperiodDatesArr(generateDateRange(fromParam, toParam));
//   }, [fromParam, toParam]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await api.getTotalInfo(periodDatesArr, countryParam);
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching country info:', error);
//       }
//     };
//     fetchData();
//   }, [countryParam, periodDatesArr]);

//   console.log('data', data);
//   //

//   //

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <Sidebar setChartData={setChartData} />

//       <Chart data={data} />
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';
import { testObject } from '../../../fakeApi/tempApi';
import { useLocation } from 'react-router-dom';
import api from '../../api';
import dayjs from 'dayjs';
import { generateDateRange } from '../../helpers/helpers';
import { CircularProgress } from '@mui/material';

export const MainContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');
  const countryParam = queryParams.get('q');

  const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [periodDatesArr, setPeriodDatesArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки данных

  useEffect(() => {
    setPeriodDatesArr(generateDateRange(fromParam, toParam));
  }, [fromParam, toParam]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Установка состояния загрузки данных в true
      try {
        const result = await api.getTotalInfo(periodDatesArr, countryParam);
        setData(result);
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
      setIsLoading(false); // Установка состояния загрузки данных в false после получения данных
    };
    fetchData();
  }, [countryParam, periodDatesArr]);

  console.log('data', data);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      {isLoading ? (
        <CircularProgress style={{ width: '200px' }} />
      ) : (
        <Chart data={data} />
      )}
    </div>
  );
};

// useEffect(() => {
//   // const sortedDataArr = [...dataArr].sort((a, b) =>
//   //   a.date.localeCompare(b.date)
//   // );
//   // const existingDataIndex = sortedDataArr.findIndex(
//   //   item => item.date === data.date
//   // );
//   // const updatedDataArr = [...sortedDataArr];
//   // if (data.length !== 0 && existingDataIndex === -1) {
//   //   updatedDataArr.push(data);
//   // } else if (existingDataIndex !== -1) {
//   //   updatedDataArr[existingDataIndex] = data;
//   // }
//   // setDataArr(updatedDataArr);
// }, []);
