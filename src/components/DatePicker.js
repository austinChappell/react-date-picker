import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './Calendar';

const propTypes = {
  color: PropTypes.string,
  date: PropTypes.objectOf(PropTypes.any),
  errorColor: PropTypes.string,
  errorMessage: PropTypes.string,
  forceError: PropTypes.bool,
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool,
  inputStyle: PropTypes.objectOf(PropTypes.any),
  lightHeader: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

const defaultProps = {
  color: '#005599',
  date: null,
  errorColor: '#ff0000',
  errorMessage: 'Invalid Date',
  forceError: false,
  hoverWeek: false,
  inputStyle: {},
  lightHeader: false,
  placeholder: 'Date',
  required: false,
};

class DatePicker extends Component {
  state = {
    activated: false,
    calendarMonthIndex: 0,
    displayDate: '',
    showCalendar: false,
  };

  closeCalendar = () => {
    this.setState({ activated: true, showCalendar: false });
  }

  handleChange = (evt) => {
    const displayDate = evt.target.value;
    this.setState({ displayDate });
  };

  handleDateChange = (year, month, day) => {
    const displayDate = `${month}/${day}/${year}`;
    const date = new Date(displayDate);
    this.setState({
      activated: true,
      calendarMonthIndex: 0,
      displayDate,
      showCalendar: false,
    }, () => {
      this.props.handleDateChange(date);
    });
  }

  moveIndex = (diff) => {
    const calendarMonthIndex = this.state.calendarMonthIndex + diff;
    this.setState({ calendarMonthIndex });
  }

  setMonthIndex = () => {
    const { date } = this.props;
    if (date) {
      const month = date.getMonth();
      const currentMonth = new Date().getMonth();
      const monthDiff = month - currentMonth;
      return monthDiff;
    }
    return 0;
  }

  showCalendar = () => {
    const calendarMonthIndex = this.setMonthIndex();
    this.setState({
      calendarMonthIndex,
      showCalendar: true,
    });
  }

  render() {
    const {
      color,
      date,
      errorColor,
      errorMessage,
      forceError,
      hoverWeek,
      inputStyle,
      lightHeader,
      placeholder,
      required,
    } = this.props;

    const {
      activated,
      calendarMonthIndex,
      displayDate,
      showCalendar,
    } = this.state;

    const stringDate = JSON.stringify(new Date(displayDate));
    const error = stringDate === 'null' && activated && required;
    const hasForceError = stringDate === 'null' && forceError && required;
    const errorFound = error || hasForceError;

    const errorStyle = {
      border: `1px solid ${errorColor}`,
    };

    const errorMessageDisplay =
      errorFound ? (
        <span
          className="error-message"
          style={{
            color: errorColor,
            marginTop: '5px',
          }}
        >
          {errorMessage}
        </span>
      ) : null;

    const defaultInputStyle = {
      border: '1px solid black',
      borderRadius: 4,
      outline: 'none',
      padding: 5,
    };

    const mergedInputStyle = Object.assign({}, defaultInputStyle, inputStyle);
    const renderInputStyle = errorFound ?
      Object.assign({}, mergedInputStyle, errorStyle)
      : mergedInputStyle;

    const calendar = showCalendar ?
      (
        <Calendar
          calendarMonthIndex={calendarMonthIndex}
          closeCalendar={this.closeCalendar}
          color={color}
          date={date}
          handleDateChange={this.handleDateChange}
          hoverWeek={hoverWeek}
          lightHeader={lightHeader}
          moveIndex={this.moveIndex}
          startOfWeek={1}
        />
      )
      : null;

    return (
      <div className="DatePicker">
        <div>
          <input
            className="date-picker-input"
            onChange={evt => this.handleChange(evt)}
            onFocus={this.showCalendar}
            style={renderInputStyle}
            placeholder={placeholder}
            value={displayDate}
          />
          {calendar}
        </div>
        {errorMessageDisplay}
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
