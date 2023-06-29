import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Chart = ({ data }) => {
  const queryParams = new URLSearchParams(location.search);

  const deathParam = queryParams.get('d');
  const recoverParam = queryParams.get('r');
  const confirmParam = queryParams.get('c');

  return (
    <LineChart
      width={900}
      height={600}
      data={data}
      margin={{ top: 50, right: 50, bottom: 5, left: 50 }}
    >
      {confirmParam === 'true' && (
        <Line type="monotone" dataKey="confirmed" stroke="#ff0000" />
      )}
      {recoverParam === 'true' && (
        <Line type="monotone" dataKey="recovered" stroke="#008dc0" />
      )}

      {deathParam === 'true' && (
        <Line type="monotone" dataKey="deaths" stroke="#1e000c" />
      )}

      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};

// Default prop values
Chart.defaultProps = {
  filterValueFrom: null,
  filterValueTo: null,
};
