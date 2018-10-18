import React, { Component } from 'react';
import './Pomodoro.css';

import Timer from './Timer.js';
import TimerInput from './TimerInput.js';
import StartButton from './StartButton.js';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Sound from 'react-sound';
import alarm from './barking.mp3';


var inputData_1 = [0, 1, 2, 3, 4];
var inputData_2 = [5, 6, 7, 8, 9];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: 
      {
        main:'#7885cb'
      },
    error: red,
  },
});

class Pomodoro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: "00",
      seconds: '00',
      startTime: 0,
      isClicked: false,
      inputDisabled: false,
      playAlarm: Sound.status.STOPPED
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    
    this.countDown = this.countDown.bind(this);
    this.tick = this.tick.bind(this);
    this.clear = this.clear.bind(this);
    this.stop = this.stop.bind(this);
  }

  handleInputChange(inputVal) {
    var val = inputVal;
    if (this.state.minutes === '00') {
      val = '0' + val;
    } else {
      val = this.state.minutes.substring(1,) + val;
    }

    this.setState({
      minutes: val,
      isDisabled: false
    })
    

  }

  countDown() {
    var startTime = this.state.minutes;
    this.setState({
      startTime: startTime,
      isClicked: true
    });
    this.intervalHandle = setInterval(this.tick, 1000);    
  }

  tick() {
    var min = parseInt(this.state.minutes);
    var sec = parseInt(this.state.seconds);

    if (min === 0 && sec === 0) {
      // clearInterval(this.intervalHandle);
      var start = this.state.startTime - 1;
      if (start - 1 < 10) {
        start = '0' + start
      }
      this.setState({
        minutes: start,
        seconds: '59',
        playAlarm: Sound.status.PLAYING
      })
      return;
    }

    if (sec === 0 && min !== 0) {
      sec = 60;
      min--;
    }

    sec--;

    if (sec === 57) {
      this.setState({
        playAlarm: Sound.status.STOPPED
      })
    }

    if (sec < 10) {
      sec = '0' + sec;
    }

    if (min < 10) {
      min = '0' + min;
    }

    

    this.setState({
      seconds: sec,
      minutes: min,
    });
  } 

  clear() {
    this.setState({
      minutes: '00',
      seconds: '00',
      isDisabled: true
    })
  }

  stop() {
    clearInterval(this.intervalHandle);
    this.setState({
      isClicked: false,
      playAlarm: Sound.status.STOPPED,
    })
  }
  render() {
    var clicked = this.state.isClicked;
    if (clicked) {
      return (
        <MuiThemeProvider theme={theme}>
          <div className="pom_main">
            <Timer 
              minutes={this.state.minutes}
              seconds={this.state.seconds}
              type='pomodoro'
            />
            <div className="control_buttons">
              <div className="input_data">
                <TimerInput minutes={this.state.minutes} 
                            handleInputChange={this.handleInputChange} 
                            data={inputData_1}
                            isDisabled={true}/>
                <TimerInput minutes={this.state.minutes} 
                              handleInputChange={this.handleInputChange}
                              data={inputData_2}
                              isDisabled={true}/>
              </div>
              <Button style={{margin: '.5rem 0'}} className="stop_button" variant="contained" color="secondary" onClick={this.stop}>
                Stop
              </Button>
            </div>
            <Sound
              url={alarm}
              playStatus={this.state.playAlarm}
              onLoading={this.handleSongLoading}
              onPlaying={this.handleSongPlaying}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              />
          </div>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider theme={theme}>
          <div className="pom_main">
            <Timer 
              minutes={this.state.minutes}
              seconds={this.state.seconds}
              type="pomodoro"
            />
            <div className="control_buttons">
              <div className="input_data">
                <TimerInput minutes={this.state.minutes} 
                            handleInputChange={this.handleInputChange}
                            data={inputData_1}
                            isDisabled={false}/>
                
                <TimerInput minutes={this.state.minutes} 
                            handleInputChange={this.handleInputChange}
                            data={inputData_2}
                            isDisabled={false}/>
              </div>
              <div className="start_clear">
                <StartButton
                  isDisabled={this.state.isDisabled}
                  handleClick={this.countDown}
                />
                <Button disabled={this.state.isDisabled} variant="contained" color="secondary" onClick={this.clear} style={{margin: '0'}}>
                  Clear
                </Button> 
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

export default Pomodoro;
