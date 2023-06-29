import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, List, ListItemText } from '@mui/material';
import { Country } from './Country/Country';
import { Case } from './Case/Case';
// import { Calendar } from './Calendar/Calendar';
import api from '../../../api';
import { FilteDate } from './FilterDate/FilterDate';
import { CountryToggle } from './CountryToggle/CountryToggle';
import { ResetFilterBtn } from './ResetFilterBtn/ResetFilterBtn';

export const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  // const [dataArr, setDataArr] = useState([]);
  const [calendarDisable, setCalendarDisable] = useState(false);
  const [countrySelected, setCountrySelected] = useState(false);
  const [resetCalendar, setResetCalendar] = useState(false);

  // const onCountryChange = country => {
  //   setCalendarDisable(true);
  //   setResetCalendar(true);
  // };

  // useEffect(() => {
  //   if (countrySelected) {
  //     setDate(null);
  //     setData([]);
  //     setCalendarDisable(false);
  //     setResetCalendar(true);
  //   } else {
  //     setData([]);
  //     setDate(null);
  //     // setTargetCountry(null);
  //     setCalendarDisable(true);
  //     setResetCalendar(true);
  //   }
  // }, [countrySelected]);

  // useEffect(() => {
  //   if (resetCalendar) {
  //     setResetCalendar(false);
  //   }
  // }, [resetCalendar]);

  return (
    <>
      <Box
        sx={{
          padding: 3,
          width: 300,
          backgroundColor: '#2D4356',
        }}
      >
        <CountryToggle
          setCountrySelected={setCountrySelected}
          countrySelected={countrySelected}
        />
        <List>
          <Divider />
          {countrySelected && <Country />}
          <Divider />
          <FilteDate />
          <Case />
        </List>
        <ResetFilterBtn />
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  setChartData: PropTypes.func.isRequired,
};

// useEffect(() => {
//   const sortedDataArr = [...dataArr].sort((a, b) =>
//     a.date.localeCompare(b.date)
//   );
//   const existingDataIndex = sortedDataArr.findIndex(
//     item => item.date === data.date
//   );

//   const updatedDataArr = [...sortedDataArr];
//   if (data.length !== 0 && existingDataIndex === -1) {
//     updatedDataArr.push(data);
//   } else if (existingDataIndex !== -1) {
//     updatedDataArr[existingDataIndex] = data;
//   }
//   setDataArr(updatedDataArr);
//   setChartData(updatedDataArr);
// }, [data, setChartData]);

// useEffect(() => {
//   setDataArr([]);
//   setDate(null);
// }, [targetCountry]);

{
  /* <ListItemText
  primary={
    countrySelected ? 'Choose Date and Country' : 'Choose Date '
  }
/>{' '} */
}

{
  /* <Calendar
  onCalendarChange={onCalendarChange}
  disabled={!calendarDisable}
  resetCalendar={resetCalendar} // Set to true to reset the calendar
/> */
}
{
  /* <ListItemText primary="Filter" /> */
}

// import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Divider, Drawer, List, ListItemText } from '@mui/material';
// import { Country } from './Country/Country';
// import { Case } from './Case/Case';
// import { Calendar } from './Calendar/Calendar';
// import api from '../../../api';
// import { FilteDate } from './FilterDate/FilterDate';
// import { CountryToggle } from './CountryToggle/CountryToggle';

// export const Sidebar = ({ setChartData, setDate }) => {
//   const [loading, setLoading] = useState(true);
//   const [targetCountry, setTargetCountry] = useState(null);
//   // const [data, setData] = useState([]);
//   // const [dataArr, setDataArr] = useState([]);
//   const [countrySelected, setCountrySelected] = useState(false);
//   const [resetCalendar, setResetCalendar] = useState(false);

//   const onCountryChange = country => {
//     console.log(country);
//     setTargetCountry(country);
//     setCalendarDisable(true);
//     setResetCalendar(true);
//   };

//   const onCalendarChange = dateProp => {
//     setDate(dateProp);
//   };

//   useEffect(() => {
//     setDataArr([]);
//     setDate(null);
//   }, [targetCountry]);

//   useEffect(() => {
//     if (countrySelected) {
//       setDate(null);
//       setData([]);
//       setCalendarDisable(false);
//       setResetCalendar(true);
//     } else {
//       setData([]);
//       setDate(null);
//       setTargetCountry(null);
//       setCalendarDisable(true);
//       setResetCalendar(true);
//     }
//   }, [countrySelected]);

//   useEffect(() => {
//     if (resetCalendar) {
//       setResetCalendar(false);
//     }
//   }, [resetCalendar]);

//   return (
//     <aside style={{ backgroundColor: '#d4d4d4' }}>
//       <CountryToggle
//         setCountrySelected={setCountrySelected}
//         countrySelected={countrySelected}
//       />
//       <Drawer
//         sx={{
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             backgroundColor: '#d4d4d4',
//             padding: 1,
//             width: 400,
//             position: 'relative',
//             height: '100vh',
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <List>
//           <ListItemText
//             primary={
//               countrySelected ? 'Choose Date and Country' : 'Choose Date '
//             }
//           />{' '}
//           <Divider />
//           {countrySelected && <Country onCountryChange={onCountryChange} />}
//           <Calendar
//             onCalendarChange={onCalendarChange}
//             disabled={!calendarDisable}
//             resetCalendar={resetCalendar} // Set to true to reset the calendar
//           />
//         </List>
//         <List>
//           <ListItemText primary="Filter" />
//           <Divider />
//           <Case />
//           <FilteDate />
//         </List>
//       </Drawer>
//     </aside>
//   );
// };

// Sidebar.propTypes = {
//   setChartData: PropTypes.func.isRequired,
// };
