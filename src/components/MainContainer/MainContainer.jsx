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

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <SidebarContext.Provider value={{ caseState, setCaseState }}>
        <Sidebar setChartData={setChartData} />
      </SidebarContext.Provider>
      <Chart data={chartData} caseState={caseState} />
    </div>
  );
};
