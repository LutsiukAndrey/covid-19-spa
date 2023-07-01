import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';

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

interface ChartProps {
  data: DataItem[];
  description: string;
}

export const Chart: React.FC<ChartProps> = ({ data, description }) => {
  const queryParams = new URLSearchParams(location.search);

  const deathParam = !queryParams.get('isDeath');
  const recoverParam = !queryParams.get('isRecovered');
  const confirmParam = !queryParams.get('isConfirmed');

  return (
    <>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={900}
          height={600}
          data={data}
          margin={{ top: 50, right: 50, bottom: 5, left: 50 }}
        >
          <Legend />
          {confirmParam && (
            <Line type="monotone" dataKey="confirmed" stroke="#ff0000" />
          )}
          {recoverParam && (
            <Line type="monotone" dataKey="recovered" stroke="#008dc0" />
          )}

          {deathParam && (
            <Line type="monotone" dataKey="deaths" stroke="#1e000c" />
          )}

          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date">
            <Label value={description} offset={600} position="top" />
          </XAxis>

          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
