import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../css/Calendar.css';

const propTypes = {
  calendarMonthIndex: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  date: PropTypes.objectOf(PropTypes.any),
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool,
  lightHeader: PropTypes.bool,
  moveIndex: PropTypes.func.isRequired,
  startOfWeek: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
  width: PropTypes.number,
};

const defaultProps = {
  date: null,
  hoverWeek: false,
  lightHeader: false,
  startOfWeek: 0,
  style: {},
  width: 400,
};

const dayNames = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
];

class Calendar extends Component {
  genWeek = () => {
    const days = [0, 1, 2, 3, 4, 5, 6];
    const startOfWeek = [];
    const endOfWeek = [];
    days.forEach((num) => {
      if (num < this.props.startOfWeek) {
        endOfWeek.push(num);
      } else {
        startOfWeek.push(num);
      }
    });
    return [...startOfWeek, ...endOfWeek];
  }

  genMonthDates = (currentDate) => {
    const dateParam = new Date(currentDate);
    const thisYear = dateParam.getFullYear();
    const thisMonth = dateParam.getMonth();
    const daysInMonth = moment(dateParam).daysInMonth();
    const daysLastMonth = moment(dateParam).subtract(1, 'month').daysInMonth();
    const firstDay = moment(new Date(thisYear, thisMonth, 1)).day();

    const calendarDisplay = [];
    const dates = [];
    const daysByWeek = [];

    const week = this.genWeek();
    const firstOfMonthIndex = week.findIndex(d => d === firstDay);
    const startOfWeekIndex = week.findIndex(d => d === this.props.startOfWeek);

    // num days needed from prior month
    const startBufferLength = firstOfMonthIndex - startOfWeekIndex;

    // min number of boxes to appear on calendar
    const dayDisplayMin = startBufferLength + daysInMonth;

    // num days needed for next month
    const monthRemainder = dayDisplayMin % 7;
    const endBufferLength = monthRemainder > 0 ?
      7 - (monthRemainder) : 0;

    // total number of boxes to appear on calendar
    const calendarTotal = dayDisplayMin + endBufferLength;

    let dayCounter = 0;

    for (let i = 0; i < daysInMonth; i += 1) {
      dates[i] = String(i + 1).padStart(2, '0');
    }

    for (let i = 0; i < calendarTotal; i += 1) {
      const day = {};
      if (i < startBufferLength) {
        const diff = startBufferLength - (i + 1);
        const date = daysLastMonth - diff;
        day.month = 'previous';
        day.date = String(date).padStart(2, '0');
      } else if (i >= dayDisplayMin) {
        const date = i - (dayDisplayMin - 1);
        day.month = 'next';
        day.date = String(date).padStart(2, '0');
      } else {
        day.month = 'current';
        day.date = dates[dayCounter];
        dayCounter += 1;
      }
      calendarDisplay.push(day);
    }

    calendarDisplay.forEach((day, index) => {
      const weekIndex = Math.floor(index / 7);
      const currentWeek = daysByWeek[weekIndex] ? daysByWeek[weekIndex] : [];
      currentWeek.push(day);
      daysByWeek[weekIndex] = currentWeek;
    });

    return daysByWeek;
  }

  render() {
    const {
      calendarMonthIndex,
      color,
      date: selectedDate,
      handleDateChange,
      hoverWeek,
      lightHeader,
      moveIndex,
      style,
      width,
    } = this.props;

    // calendar default style
    const defaultStyle = {
      boxShadow: '1px 1px 5px gray',
      width,
    };

    // calendar wrapper style merged with props
    const wrapperStyle = Object.assign({}, defaultStyle, style);

    // get the width of each column
    const colWidth = width / 7;
    // set the width for columns
    const colStyle = {
      boxSizing: 'border-box',
      display: 'inline-block',
      padding: 10,
      textAlign: 'center',
      width: colWidth,
    };

    // get date info
    const currentDate = moment().add(calendarMonthIndex, 'months');
    const year = currentDate.format('YYYY');
    const month = currentDate.format('MMMM');
    const week = this.genWeek();
    const today = moment().format('YYYY-MM-DD');
    const monthDates = this.genMonthDates(currentDate);

    return (
      <div
        className="Calendar"
        style={wrapperStyle}
      >
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

        <div className="day-header">
          {week.map((dayIndex, index) => (
            <span
              key={index}
              style={colStyle}
            >
              {dayNames[dayIndex]}
            </span>
          ))}
        </div>

        <div className="calendar-dates">
          {monthDates.map((weekOfMonth, weekIndex) => (
            <div
              key={weekIndex}
              className={hoverWeek ? 'calendar-week hover-week' : 'calendar-week'}
            >
              {weekOfMonth.map((day, dayIndex) => {
                let monthAsNum = currentDate.format('MM');
                let yearOfDay = year;

                const isCurrentMonth = day.month === 'current';
                const isPrevMonth = day.month === 'previous';
                const isNextMonth = day.month === 'next';

                if (monthAsNum === '01' && isPrevMonth) {
                  yearOfDay = String(Number(year) - 1);
                  monthAsNum = '12';
                } else if (monthAsNum === '12' && isNextMonth) {
                  yearOfDay = String(Number(year) + 1);
                  monthAsNum = '01';
                } else if (isPrevMonth) {
                  monthAsNum = String(Number(monthAsNum) - 1).padStart(2, '0');
                } else if (isNextMonth) {
                  monthAsNum = String(Number(monthAsNum) + 1).padStart(2, '0');
                }

                const dateDisplay = `${year}-${monthAsNum}-${day.date}`;
                const selectedDateDisplay = moment(selectedDate).format('YYYY-MM-DD');
                const dateValid = JSON.stringify(new Date(dateDisplay)) !== 'null';

                const isSelected = dateDisplay === selectedDateDisplay && dateValid;
                const isToday = dateDisplay === today;
                const todayMarker = isToday ?
                  (
                    <span
                      className="today-marker"
                      style={{ color }}
                    >
                      &#9698;
                    </span>
                  )
                  : null;

                const dayClassName = isCurrentMonth ? 'current-month' : 'outside-dates';
                const selectedStyle = isSelected ? {
                  backgroundColor: color,
                  color: lightHeader ? 'white' : 'black',
                } : {};

                const dayStyle = Object.assign({}, colStyle, selectedStyle);

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
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;

export default Calendar;
