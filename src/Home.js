import React, { Component } from 'react';
import './Home.css';

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import stopwatch from './stopwatch.png';
import timer from './alarm-clock.png';
import pom from './tomato.png';


class Home extends Component {

  constructor(props) {
    super(props);
    
    
    this.passVal = this.passVal.bind(this);
    
  }

  passVal(event) {
    this.props.changeMode(event.currentTarget.firstChild.firstChild.childNodes[1].innerHTML);
  }

 
  render() {
    var button_style = {
        height: '150px',
        width: '200px',
        margin: '0.3rem',
        fontSize: '20pt',
        background: '#5869cf'
    }

    return (
        <div className="home_main">
            <div className="home_input">
                <Button 
                    variant="contained" 
                    color="primary"
                    style={button_style}
                    onClick={this.passVal}>
                    <div className="buttin_content">
                        <img src={pom} />
                        <h4>Pomodoro</h4>
                    </div>
                </Button>
                <Button variant="contained" 
                        color="primary"
                        style={button_style}
                        onClick={this.passVal}
                        >
                        <div className="buttin_content">
                            <img src={timer} />
                            <h4>Timer</h4>
                        </div>
                </Button>
                <Button variant="contained" 
                        color="primary"
                        style={button_style}
                        onClick={this.passVal}
                        >
                        <div className="buttin_content">
                            <img src={stopwatch} />
                            <h4>Stopwatch</h4>
                        </div>
                </Button>
            </div>
        </div>
    )
  }
}

export default Home;
