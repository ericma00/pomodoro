import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  render() {
    if (this.props.type === 'pomodoro') {
      return (
        <div className="timer">
          <h1>{this.props.minutes}:{this.props.seconds}</h1>
        </div>
      );
    } else if (this.props.type === 'stopwatch') {
      return (
        <div className="timer">
          <h1>{this.props.minutes}:{this.props.seconds}:{this.props.hundredthSec}</h1>
        </div>
      )
    } else {
      return(
        <div className="timer">
          <h1>{this.props.hours}:{this.props.minutes}:{this.props.seconds}</h1>
        </div>
      )
    }
  }
}

export default Timer;
