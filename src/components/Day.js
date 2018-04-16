import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool.isRequired,
  activeWeek: PropTypes.bool.isRequired,
  day: PropTypes.objectOf(PropTypes.any).isRequired,
  dayIndex: PropTypes.number.isRequired,
  dayStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
  monthAsNum: PropTypes.string.isRequired,
  todayMarker: PropTypes.objectOf(PropTypes.any),
  weekIndex: PropTypes.number.isRequired,
  yearOfDay: PropTypes.string.isRequired,
};

const defaultProps = {
  todayMarker: null,
};

const Day = (props) => {
  const {
    active,
    activeWeek,
    day,
    dayIndex,
    dayStyle,
    handleDateChange,
    handleHover,
    monthAsNum,
    todayMarker,
    weekIndex,
    yearOfDay,
  } = props;

  const activeDayStyle = {
    backgroundColor: active ? '#cccccc' : '#ffffff',
  };

  const activeWeekStyle = {
    backgroundColor: activeWeek ? '#dddddd' : '#ffffff',
  };

  let activeStyle;

  if (active) {
    activeStyle = activeDayStyle;
  } else if (activeWeek) {
    activeStyle = activeWeekStyle;
  } else {
    activeStyle = {};
  }

  const style = Object.assign({}, dayStyle, activeStyle);
  return (
    <span
      key={dayIndex}
      onClick={() => handleDateChange(yearOfDay, monthAsNum, day.date)}
      onMouseEnter={() => handleHover(dayIndex, weekIndex)}
      style={style}
    >
      {day.date} {todayMarker}
    </span>
  );
};

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;

export default Day;
