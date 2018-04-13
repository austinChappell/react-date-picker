import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

import '../css/Calendar.css';

const propTypes = {
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
  state = {
    calendarMonthIndex: 0,
  }

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
    const date = new Date(currentDate);
    const thisYear = date.getFullYear();
    const thisMonth = date.getMonth();
    const daysInMonth = moment().daysInMonth();
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
    const endBufferLength = 7 - (dayDisplayMin % 7);

    const calendarTotal = dayDisplayMin + endBufferLength;

    console.log('END BUFFER', endBufferLength);

    let dayCounter = 0;
    const calendarDisplay = [];

    for (let i = 0; i < calendarTotal; i += 1) {
      if (i < startBufferLength) {
        const day = {
          month: 'previous',
        };
        console.log('day', day);
        calendarDisplay.push('');
      } else if (i >= dayDisplayMin) {

        // get day of next month
        const date = i - (dayDisplayMin - 1);
        const day = {
          month: 'next',
          date: String(date).padStart(2, '0'),
        };
        console.log('day', day);
        calendarDisplay.push('');
      } else {
        const day = {
          month: 'current',
          date: dates[dayCounter],
        };
        console.log('day', day);
        calendarDisplay.push(dates[dayCounter]);
        dayCounter += 1;
      }
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

  moveIndex = (diff) => {
    const calendarMonthIndex = this.state.calendarMonthIndex + diff;
    this.setState({ calendarMonthIndex });
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
    const currentDate = moment().add(this.state.calendarMonthIndex, 'months');
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
            onClick={() => this.moveIndex(-1)}
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
            onClick={() => this.moveIndex(1)}
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
                const date = moment(`${year}-${monthAsNum}-${day}`).format('YYYY-MMMM-DD');
                const isToday = date === today;

                const todayMarker = isToday ?
                  (
                    <FontAwesome
                      className="today-marker"
                      name="caret-right"
                      style={{ color: this.props.color }}
                    />
                  )
                  : null;

                return (
                  <span
                    key={dayIndex}
                    onClick={() => this.props.handleDateChange(year, monthAsNum, day)}
                    style={colStyle}
                  >
                    {day} {todayMarker}
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
