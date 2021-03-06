import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Calendar from './Calendar';

const propTypes = {
  color: PropTypes.string,
  date: PropTypes.objectOf(PropTypes.any),
  endDate: PropTypes.objectOf(PropTypes.any),
  errorColor: PropTypes.string,
  errorMessage: PropTypes.string,
  forceError: PropTypes.bool,
  handleDateChange: PropTypes.func.isRequired,
  hoverWeek: PropTypes.bool,
  inputStyle: PropTypes.objectOf(PropTypes.any),
  keepOpen: PropTypes.bool,
  lightHeader: PropTypes.bool,
  placeholder: PropTypes.string,
  range: PropTypes.bool,
  required: PropTypes.bool,
};

const defaultProps = {
  color: '#005599',
  date: null,
  endDate: null,
  errorColor: '#ff0000',
  errorMessage: 'Invalid Date',
  forceError: false,
  hoverWeek: false,
  inputStyle: {},
  keepOpen: false,
  lightHeader: false,
  placeholder: 'Date',
  range: false,
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
    // only set one date
    if (!this.props.range) {
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
      // set the start date or change start date and erase end date
    } else if ((this.props.date && this.props.endDate) || !this.props.date) {
      const displayDate = `${month}/${day}/${year}`;
      const date = new Date(displayDate);
      this.setState({
        activated: true,
        displayDate,
      }, () => {
        this.props.handleDateChange([date, null]);
      });
      // set the end date
    } else {
      const startDisplay = this.state.displayDate;
      const endDisplay = `${month}/${day}/${year}`;
      const displayDate = `${startDisplay} - ${endDisplay}`;
      const startDate = new Date(startDisplay);
      const endDate = new Date(endDisplay);
      this.setState({
        activated: true,
        calendarMonthIndex: 0,
        displayDate,
        showCalendar: false,
      }, () => {
        this.props.handleDateChange([startDate, endDate]);
      });
    }
  }

  moveIndex = (diff) => {
    const calendarMonthIndex = this.state.calendarMonthIndex + diff;
    this.setState({ calendarMonthIndex });
  }

  setMonthIndex = () => {
    const { date } = this.props;
    if (date) {
      const monthDiff = moment(date).diff(moment(), 'months');
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
      endDate,
      errorColor,
      errorMessage,
      forceError,
      hoverWeek,
      inputStyle,
      lightHeader,
      keepOpen,
      placeholder,
      range,
      required,
    } = this.props;

    const {
      activated,
      calendarMonthIndex,
      displayDate,
      showCalendar,
    } = this.state;

    // split dates of multiple dates
    const dates = displayDate.split(' - ');
    let error = false;
    let hasForceError = false;
    dates.forEach((dateObj) => {
      const stringDate = JSON.stringify(new Date(dateObj));
      if (stringDate === 'null' && activated && required) {
        error = true;
      }
      if (stringDate === 'null' && forceError && required) {
        hasForceError = true;
      }
    });
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
      minWidth: range ? 150 : 0,
      outline: 'none',
      padding: 5,
    };

    const mergedInputStyle = Object.assign({}, defaultInputStyle, inputStyle);
    const renderInputStyle = errorFound ?
      Object.assign({}, mergedInputStyle, errorStyle)
      : mergedInputStyle;

    const calendar = showCalendar || keepOpen ?
      (
        <Calendar
          calendarMonthIndex={calendarMonthIndex}
          closeCalendar={this.closeCalendar}
          color={color}
          date={date}
          endDate={endDate}
          handleDateChange={this.handleDateChange}
          hoverWeek={hoverWeek}
          lightHeader={lightHeader}
          moveIndex={this.moveIndex}
          range={range}
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
