/* eslint-disable react/prop-types */
// const testObject = [
//   {
//     date: '2020-05-06',
//     last_update: '2020-05-07 02:32:28',
//     confirmed: 1228603,
//     confirmed_diff: 24252,
//     deaths: 73431,
//     deaths_diff: 2367,
//     recovered: 189910,
//     recovered_diff: 119,
//     active: 965262,
//     active_diff: 21766,
//     fatality_rate: 0.0598,
//   },
//   {
//     date: '2021-05-05',
//     last_update: '2021-05-06 04:20:38',
//     confirmed: 32557440,
//     confirmed_diff: 44865,
//     deaths: 579276,
//     deaths_diff: 795,
//     recovered: 0,
//     recovered_diff: 0,
//     active: 31978164,
//     active_diff: 44070,
//     fatality_rate: 0.0178,
//   },
//   {
//     date: '2022-05-18',
//     last_update: '2022-05-19 04:20:54',
//     confirmed: 82951379,
//     confirmed_diff: 225272,
//     deaths: 1001269,
//     deaths_diff: 1080,
//     recovered: 0,
//     recovered_diff: 0,
//     active: 81950110,
//     active_diff: 224192,
//     fatality_rate: 0.0121,
//   },
//   {
//     date: '2021-02-10',
//     last_update: '2021-02-11 05:23:55',
//     confirmed: 27285621,
//     confirmed_diff: 95860,
//     deaths: 471422,
//     deaths_diff: 3319,
//     recovered: 0,
//     recovered_diff: 0,
//     active: 26814199,
//     active_diff: 92541,
//     fatality_rate: 0.0173,
//   },
//   {
//     date: '2022-05-11',
//     last_update: '2022-05-12 04:20:54',
//     confirmed: 82223174,
//     confirmed_diff: 163335,
//     deaths: 998997,
//     deaths_diff: 949,
//     recovered: 0,
//     recovered_diff: 0,
//     active: 81224177,
//     active_diff: 162386,
//     fatality_rate: 0.0121,
//   },
// ];
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Chart = ({ data, caseState }) => {
  //

  //

  const { isConfirmedChecked, isDeathChecked, isRecoveredChecked } = caseState;

  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    const isDateUnique = dataArr.some(item => item.date === data.date);
    console.log(isDateUnique);
    if (data.length !== 0 && !isDateUnique) {
      const updatedDataArr = [...dataArr, data];
      const sortedDataArr = updatedDataArr.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      setDataArr(sortedDataArr);
    }
  }, [data, dataArr]);

  console.log('Chatrs dataarr', dataArr);
  return (
    <LineChart
      width={900}
      height={600}
      data={dataArr}
      margin={{ top: 50, right: 50, bottom: 5, left: 50 }}
    >
      {isConfirmedChecked && (
        <Line type="monotone" dataKey="confirmed" stroke="#ff0000" />
      )}
      {isRecoveredChecked && (
        <Line type="monotone" dataKey="recovered" stroke="#008dc0" />
      )}
      {isDeathChecked && (
        <Line type="monotone" dataKey="deaths" stroke="#1e000c" />
      )}

      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
