import { useState } from 'react';
import { Chart } from './Chart/Chart';
import { Sidebar } from './Sidebar/Sidebar';

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
      <Sidebar
        setChartData={setChartData}
        caseState={caseState}
        setCaseState={setCaseState}
      />

      <Chart data={chartData} caseState={caseState} />
    </div>
  );
};
