import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from './Day';

const propTypes = {
  color: PropTypes.string.isRequired,
  colStyle: PropTypes.objectOf(PropTypes.any).isRequired,
  currentDate: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool.isRequired,
  lightHeader: PropTypes.bool.isRequired,
  monthDates: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedDate: PropTypes.objectOf(PropTypes.any),
  today: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

const defaultProps = {
  selectedDate: null,
};

class MonthDates extends Component {
  state = {
    activeWeekIndex: null,
    activeDayIndex: null,
  }

  handleHover = (dayIndex, weekIndex) => {
    this.setState({
      activeDayIndex: dayIndex,
      activeWeekIndex: weekIndex,
    });
  }

  render() {
    const {
      color,
      colStyle,
      currentDate,
      handleDateChange,
      hoverWeek,
      lightHeader,
      monthDates,
      selectedDate,
      today,
      year,
    } = this.props;

    const {
      activeDayIndex,
      activeWeekIndex,
    } = this.state;

    return (
      <div
        className="calendar-dates"
        onMouseLeave={() => this.handleHover(null, null)}
      >
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
              const activeDay = dayIndex === activeDayIndex;
              const activeWeek = weekIndex === activeWeekIndex;
              const active = activeDay && activeWeek;

              return (
                <Day
                  key={dayIndex}
                  active={active}
                  activeWeek={activeWeek && hoverWeek}
                  day={day}
                  dayClassName={dayClassName}
                  dayIndex={dayIndex}
                  dayStyle={dayStyle}
                  handleDateChange={handleDateChange}
                  handleHover={this.handleHover}
                  monthAsNum={monthAsNum}
                  todayMarker={todayMarker}
                  weekIndex={weekIndex}
                  yearOfDay={yearOfDay}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }
};

MonthDates.propTypes = propTypes;
MonthDates.defaultProps = defaultProps;

export default MonthDates;
