import React, { Component } from 'react';
import Timer from './Timer';

import './StopWatch.css';
import './Timer.css';

import Button from '@material-ui/core/Button';


class StopWatch extends Component {

  constructor(props) {
    super(props);

    this.state = {
        minutes: '00',
        seconds: '00',
        hundredthSec: '00',
        start: false,
        isDisabled: true
    }

    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
    
  }
  
    tick() {
        console.log('hi');
        var hundredthSec = parseInt(this.state.hundredthSec);
        var sec = parseInt(this.state.seconds);
        var min = parseInt(this.state.minutes);
        
        hundredthSec++;
        console.log(hundredthSec);


        if (hundredthSec === 100) {
            hundredthSec = 0;
            sec++;
        }

        if (sec === 60) {
            sec = 0
            min++;
        }

        if (sec < 10) {
            sec = '0' + sec;
        }
        if (hundredthSec < 10) {
            hundredthSec = '0' + hundredthSec;
        }
        if (min < 10) {
            min = '0' + min;
        }

        this.setState({
            hundredthSec: hundredthSec,
            seconds: sec,
            minutes: min
        })
    }
    handleStart() {
        this.setState({
            start: true,
            isDisabled: false
        })
        this.handleInterval = setInterval(this.tick, 10);
    }
    
    handleStop() {
        this.setState({
            start: false
        })
        clearInterval(this.handleInterval);
    }

    reset() {
        clearInterval(this.handleInterval);
        this.setState({
            minutes: '00',
            seconds: '00',
            hundredthSec: '00',
            start: false,
            isDisabled: true
        })

    }

    render() { 
        var isStart = this.state.start;
        return (
            <div className="stopwatch_main">
                <Timer minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    hundredthSec={this.state.hundredthSec}
                    type="stopwatch"
                />
                <div className="input_buttons">
                    { !isStart ? (
                        <Button color="primary"
                                variant="contained"
                                onClick={this.handleStart}>
                            Start
                        </Button>
                    ) : (
                        <Button color="primary"
                                variant="contained"
                                onClick={this.handleStop}>
                            Stop
                        </Button>
                    )
                        
                    }
                    <Button color="primary"
                            variant="contained"
                            disabled={this.state.isDisabled}
                            onClick={this.reset}>
                        Reset
                    </Button>
                </div>
            </div>
        )

    }
}

export default StopWatch;
