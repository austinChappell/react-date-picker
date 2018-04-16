import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  day: PropTypes.objectOf(PropTypes.any).isRequired,
  dayClassName: PropTypes.string.isRequired,
  dayIndex: PropTypes.number.isRequired,
  dayStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  monthAsNum: PropTypes.string.isRequired,
  todayMarker: PropTypes.objectOf(PropTypes.any),
  yearOfDay: PropTypes.string.isRequired,
};

const defaultProps = {
  todayMarker: null,
};

const Day = (props) => {
  const {
    day,
    dayClassName,
    dayIndex,
    dayStyle,
    handleDateChange,
    monthAsNum,
    todayMarker,
    yearOfDay,
  } = props;
  return (
    <span
      key={dayIndex}
      className={dayClassName}
      onClick={() => handleDateChange(yearOfDay, monthAsNum, day.date)}
      style={dayStyle}
    >
      {day.date} {todayMarker}
    </span>
  );
};

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;

export default Day;
