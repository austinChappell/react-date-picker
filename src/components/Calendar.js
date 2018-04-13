import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import '../css/Calendar.css';

const propTypes = {
  calendarMonthIndex: PropTypes.number.isRequired,
  color: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired,
  lightHeader: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  startOfWeek: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
  width: PropTypes.number,
};

const defaultProps = {
  color: '#005599',
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

    const dates = [];

    for (let i = 0; i < daysInMonth; i += 1) {
      dates[i] = String(i + 1).padStart(2, '0');
    }

    const week = this.genWeek();

    const firstOfMonthIndex = week.findIndex(d => d === firstDay);
    const startOfWeekIndex = week.findIndex(d => d === this.props.startOfWeek);

    // num days needed from prior month
    const startBufferLength = firstOfMonthIndex - startOfWeekIndex;

    const dayDisplayMin = startBufferLength + daysInMonth;

    // num days needed for next month
    const monthRemainder = dayDisplayMin % 7;
    const endBufferLength = monthRemainder > 0 ?
      7 - (monthRemainder) : 0;

    const calendarTotal = dayDisplayMin + endBufferLength;

    let dayCounter = 0;
    const calendarDisplay = [];

    for (let i = 0; i < calendarTotal; i += 1) {
      const day = {};
      if (i < startBufferLength) {
        const diff = startBufferLength - (i + 1);
        const date = daysLastMonth - diff;
        day.month = 'previous';
        day.date = String(date).padStart('0', 2);
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

    const weekCount = calendarDisplay.length / 7;
    const daysByWeek = [];
    daysByWeek.length = Math.ceil(weekCount);

    calendarDisplay.forEach((day, index) => {
      const weekIndex = Math.floor(index / 7);
      const currentWeek = daysByWeek[weekIndex] ? daysByWeek[weekIndex] : [];
      currentWeek.push(day);
      daysByWeek[weekIndex] = currentWeek;
    });

    return daysByWeek;
  }

  render() {
    // calendar default style
    const defaultStyle = {
      boxShadow: '1px 1px 5px gray',
      width: this.props.width,
    };

    // calendar wrapper style merged with props
    const style = Object.assign({}, defaultStyle, this.props.style);

    // get the width of each column
    const colWidth = this.props.width / 7;
    // set the width for columns
    const colStyle = {
      boxSizing: 'border-box',
      display: 'inline-block',
      padding: 5,
      textAlign: 'center',
      width: colWidth,
    };

    const className = this.props.show ? 'Calendar' : 'hide';

    // get date info
    const currentDate = moment().add(this.props.calendarMonthIndex, 'months');
    const year = currentDate.format('YYYY');
    const month = currentDate.format('MMMM');
    const monthAsNum = currentDate.format('MM');
    const week = this.genWeek();
    const today = moment().format('YYYY-MMMM-DD');
    const monthDates = this.genMonthDates(currentDate);

    return (
      <div
        className={className}
        style={style}
      >
        <div
          className="header"
          style={{
            backgroundColor: this.props.color,
            color: this.props.lightHeader ? 'white' : 'black',
          }}
        >
          <button
            onClick={() => this.props.moveIndex(-1)}
            style={{
              float: 'left',
              color: this.props.lightHeader ? 'white' : 'black',
            }}
          >
            <FontAwesome name="chevron-left" />
          </button>
          <span>
            {`${month} ${year}`}
          </span>
          <button
            onClick={() => this.props.moveIndex(1)}
            style={{
              float: 'right',
              color: this.props.lightHeader ? 'white' : 'black',
            }}
          >
            <FontAwesome name="chevron-right" />
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
              className="calendar-week"
            >
              {weekOfMonth.map((day, dayIndex) => {
                const date = moment(`${year}-${monthAsNum}-${day.date}`).format('YYYY-MMMM-DD');
                const isToday = date === today;
                const isCurrentMonth = day.month === 'current';
                let yearOfDay = year;
                if (monthAsNum === '01' && day.month === 'previous') {
                  yearOfDay = String(Number(year) - 1);
                } else if (monthAsNum === '12' && day.month === 'next') {
                  yearOfDay = String(Number(year) + 1);
                }

                const todayMarker = isToday ?
                  (
                    <FontAwesome
                      className="today-marker"
                      name="caret-right"
                      style={{ color: this.props.color }}
                    />
                  )
                  : null;

                const dayClassName = isCurrentMonth ? 'current-month' : 'outside-dates';

                return (
                  <span
                    key={dayIndex}
                    className={dayClassName}
                    onClick={() => this.props.handleDateChange(yearOfDay, monthAsNum, day.date)}
                    style={colStyle}
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
