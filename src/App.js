import React, { Component } from 'react';

import DatePicker from './components/DatePicker';

class App extends Component {
  state = {
    date: null,
    endDate: null,
  }

  handleDateChange = (date) => {
    this.setState({ date });
  }

  render() {
    return (
      <div className="App" style={{ padding: 20 }}>
        <DatePicker
          // color="#ff0000"
          date={this.state.date}
          endDate={this.state.endDate}
          // errorColor="#00ff00"
          // errorMessage="This is the error message"
          // forceError
          handleDateChange={this.handleDateChange}
          // hoverWeek
          inputStyle={{
            borderRadius: 0,
          }}
          lightHeader
          placeholder="Select Date"
          range
          required
        />
      </div>
    );
  }
}

export default App;
