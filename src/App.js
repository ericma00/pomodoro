import React, { Component } from 'react';
import './App.css';

import Pomodoro from './Pomodoro';
import StopWatch from './StopWatch';
import CountdownTimer from './CountdownTimer';
import Home from './Home';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import back_icon from './back_arrow.png';

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curr: 'home'
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.home = this.home.bind(this);
  }

  handleChange(inputVal) {
    this.setState({
      curr: inputVal
    });
  }

  home() {
    this.setState({
      curr: 'home'
    });
  }

  render() {
    var curr = this.state.curr;
    console.log(curr);
    if (curr === 'Pomodoro') {
      return (
        <MuiThemeProvider theme={theme}>
          <div>
              <Pomodoro />
              <div className="back_button">
                <Button variant="contained" color="primary" onClick={this.home} fullWidth>
                  <img src={back_icon} alt="back icon" />
                </Button>
              </div>
          </div>
        </MuiThemeProvider>
      )
    } else if (curr === 'Timer') {
      return (
        <MuiThemeProvider theme={theme}>
        <div>
            <CountdownTimer />
            <div className="back_button">
              <Button variant="contained" color="primary" onClick={this.home} fullWidth>
                <img src={back_icon} alt="back icon" />
              </Button>
            </div>
        </div>
        </MuiThemeProvider>
      )
    } else if (curr === 'Stopwatch') {
      return (
        <MuiThemeProvider theme={theme}>
          <div>
            <StopWatch />
            <div className="back_button">
             <Button variant="contained" color="primary" onClick={this.home} fullWidth>
              <img src={back_icon} alt="back icon" />
             </Button>
            </div>
          </div>
        </MuiThemeProvider>
      )
    } else {
      return (
        <div>
          <Home changeMode={this.handleChange}/>
        </div>
      )
    }
  }
}

export default App;
