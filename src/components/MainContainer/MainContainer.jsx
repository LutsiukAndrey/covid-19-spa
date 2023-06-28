import { createContext, useState } from 'react';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';

//
//
export const SidebarContext = createContext();

export const MainContainer = () => {
  const [chartData, setChartData] = useState([]);

  const [caseState, setCaseState] = useState({
    openCaseList: false,
    isConfirmedChecked: true,
    isDeathChecked: true,
    isRecoveredChecked: true,
  });

  const [filterValueFrom, setFilterValueFrom] = useState(null);
  const [filterValueTo, setFilterValueTo] = useState(null);

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
