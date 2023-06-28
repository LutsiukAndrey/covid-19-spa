import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const Chart = ({
  data,
  caseState,
  filterValueFrom,
  //   setFilterValueFrom,
  filterValueTo,
  //   setFilterValueTo,
}) => {
  const { isConfirmedChecked, isDeathChecked, isRecoveredChecked } = caseState;
  const filteredDataArr = data.filter(
    item =>
      (!filterValueFrom || item.date >= filterValueFrom) &&
      (!filterValueTo || item.date <= filterValueTo)
  );

  return (
    <div style={{ display: 'flex' }}>
      <LineChart
        width={900}
        height={600}
        data={filteredDataArr}
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
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  caseState: PropTypes.shape({
    isConfirmedChecked: PropTypes.bool.isRequired,
    isDeathChecked: PropTypes.bool.isRequired,
    isRecoveredChecked: PropTypes.bool.isRequired,
  }).isRequired,
  filterValueFrom: PropTypes.string,
  filterValueTo: PropTypes.string,
};

// Default prop values
Chart.defaultProps = {
  filterValueFrom: null,
  filterValueTo: null,
};
