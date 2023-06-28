import { createContext, useState } from 'react';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';

import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

//
//
export const SidebarContext = createContext();

export const MainContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const fromParam = queryParams.get('from');
  const toParam = queryParams.get('to');

  console.log(fromParam);
  console.log(toParam);

  const [filterValueFrom, setFilterValueFrom] = useState(fromParam || null);
  const [filterValueTo, setFilterValueTo] = useState(toParam || null);

  const [chartData, setChartData] = useState([]);

  const [caseState, setCaseState] = useState({
    openCaseList: false,
    isConfirmedChecked: true,
    isDeathChecked: true,
    isRecoveredChecked: true,
  });

  // if (fromParam && toParam) {
  //   console.log(toParam);
  //   console.log(fromParam);
  //   setFilterValueFrom(fromParam);
  //   setFilterValueTo(toParam);
  // }
  //
  //

  //

  //
  //
  // const [searchParams, setSearchParams] = useSearchParams();

  // const filterFromParam = searchParams.get('from');
  // const filterToParam = searchParams.get('to');
  // useEffect(() => {
  //   if (filterValueFrom)
  //     setSearchParams({ from: filterValueFrom, to: filterValueTo });
  // }, [filterValueFrom, filterValueTo, setSearchParams]);

  //

  const chartProps = {
    data: chartData,
    caseState,
    filterValueFrom,
    setFilterValueFrom,
    filterValueTo,
    setFilterValueTo,
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SidebarContext.Provider
        value={{
          caseState,
          setCaseState,
          filterValueFrom,
          setFilterValueFrom,
          filterValueTo,
          setFilterValueTo,
        }}
      >
        <Sidebar setChartData={setChartData} />
      </SidebarContext.Provider>
      <Chart {...chartProps} />
    </div>
  );
};
