import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';

const propTypes = {
  placeholder: PropTypes.string,
};

const defaultProps = {
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
    if (target.classList.contains('DatePicker')) {
      return;
    } else if (target.tagName === 'HTML') {
      this.setState({ showCalendar: false });
    } else {
      this.bubbleEvent(target.parentElement);
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
      <div
        className="DatePicker"

      >
        <input
          onChange={evt => this.handleChange(evt)}
          onFocus={this.showCalendar}
          placeholder={this.props.placeholder}
          value={this.state.displayDate}
        />
        <Calendar
          calendarMonthIndex={this.state.calendarMonthIndex}
          date={this.state.date}
          handleDateChange={this.handleDateChange}
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
