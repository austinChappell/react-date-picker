import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  color: PropTypes.string.isRequired,
  lightHeader: PropTypes.bool.isRequired,
  month: PropTypes.string.isRequired,
  moveIndex: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
};

const CalendarHeader = (props) => {
  const {
    color,
    lightHeader,
    month,
    moveIndex,
    year,
  } = props;
  return (
    <div
      className="header"
      style={{
        backgroundColor: color,
        color: lightHeader ? 'white' : 'black',
      }}
    >
      <button
        onClick={() => moveIndex(-1)}
        style={{
          float: 'left',
          fontSize: '20px',
          lineHeight: '14px',
          color: lightHeader ? 'white' : 'black',
        }}
      >
        {'<'}
      </button>
      <span>
        {`${month} ${year}`}
      </span>
      <button
        onClick={() => moveIndex(1)}
        style={{
          float: 'right',
          fontSize: '20px',
          lineHeight: '14px',
          color: lightHeader ? 'white' : 'black',
        }}
      >
        {'>'}
      </button>
    </div>
  );
};

CalendarHeader.propTypes = propTypes;

export default CalendarHeader;
