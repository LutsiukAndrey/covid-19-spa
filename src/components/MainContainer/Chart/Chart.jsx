import PropTypes from 'prop-types';

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

export const Chart = ({ data, description }) => {
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
            <Label value={description} offset={700} position="top" />
          </XAxis>

          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
};
