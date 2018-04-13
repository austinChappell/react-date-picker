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
    date: null,
    displayDate: '',
    showCalendar: false,
  };

  handleChange = (evt) => {
    const displayDate = evt.target.value;
    this.setState({ displayDate });
  };

  handleDateChange = (year, month, day) => {
    const displayDate = `${year}-${month}-${day}`;
    const date = new Date(displayDate);
    this.setState({
      date,
      displayDate,
      showCalendar: false,
    });
  }

  showCalendar = () => {
    this.setState({ showCalendar: true });
  }

  render() {
    return (
      <div className="DatePicker">
        <input
          onChange={evt => this.handleChange(evt)}
          onFocus={this.showCalendar}
          placeholder={this.props.placeholder}
          value={this.state.displayDate}
        />
        <Calendar
          date={this.state.date}
          handleDateChange={this.handleDateChange}
          lightHeader
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
