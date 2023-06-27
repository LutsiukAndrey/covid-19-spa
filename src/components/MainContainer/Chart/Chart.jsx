import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Chart = ({ data, caseState }) => {
  const { isConfirmedChecked, isDeathChecked, isRecoveredChecked } = caseState;
  console.log(data);
  return (
    <LineChart
      width={900}
      height={600}
      data={data}
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
      <XAxis dataKey="region.province" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
