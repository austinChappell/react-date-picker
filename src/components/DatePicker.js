import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';

const propTypes = {
  color: PropTypes.string,
  placeholder: PropTypes.string,
};

const defaultProps = {
  color: '#005599',
  placeholder: 'Date',
};

class DatePicker extends Component {
  state = {
    calendarMonthIndex: 0,
    date: null,
    displayDate: '',
    showCalendar: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.listenForClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listenForClose);
  }

  bubbleEvent = (target) => {
    const clickedInput = target.classList.contains('date-picker-input');
    const clickedCalendar = target.classList.contains('Calendar');
    if (!clickedInput && !clickedCalendar) {
      if (target.tagName === 'HTML') {
        this.setState({ showCalendar: false });
      } else {
        this.bubbleEvent(target.parentElement);
      }
    }
  }

  handleChange = (evt) => {
    const displayDate = evt.target.value;
    this.setState({ displayDate });
  };

  handleDateChange = (year, month, day) => {
    const displayDate = `${year}-${month}-${day}`;
    const date = new Date(displayDate);
    this.setState({
      calendarMonthIndex: 0,
      date,
      displayDate,
      showCalendar: false,
    });
  }

  listenForClose = (evt) => {
    const { target } = evt;
    this.bubbleEvent(target);
  }

  moveIndex = (diff) => {
    const calendarMonthIndex = this.state.calendarMonthIndex + diff;
    this.setState({ calendarMonthIndex });
  }

  showCalendar = () => {
    this.setState({ showCalendar: true });
  }

  render() {
    return (
      <div className="DatePicker">
        <input
          className="date-picker-input"
          onChange={evt => this.handleChange(evt)}
          onFocus={this.showCalendar}
          placeholder={this.props.placeholder}
          value={this.state.displayDate}
        />
        <Calendar
          calendarMonthIndex={this.state.calendarMonthIndex}
          color={this.props.color}
          date={this.state.date}
          handleDateChange={this.handleDateChange}
          hoverWeek
          lightHeader
          moveIndex={this.moveIndex}
          show={this.state.showCalendar}
          startOfWeek={1}
        />
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
