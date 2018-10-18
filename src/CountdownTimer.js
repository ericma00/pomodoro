import React, { Component } from 'react';

import Timer from './Timer';
import TimerInput from './TimerInput';
import Button from '@material-ui/core/Button';
import Sound from 'react-sound';

import './CountdownTimer.css';
import alarm from './timer_alarm.mp3';

var data_1 = [0, 1, 2, 3, 4];
var data_2 = [5, 6, 7, 8, 9];

class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: '00',
            minutes: '00',
            seconds: '00',
            value: '',
            didStart: false,
            isDisabled: false,
            playAlarm: Sound.status.STOPPED,
            flash: {background: 'white'},
            count: 0,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.start = this.start.bind(this);
        this.tick = this.tick.bind(this);
        this.reset = this.reset.bind(this);
        this.pause = this.pause.bind(this);      
    }

    handleInputChange(inputVal) {
        var val = this.state.value + inputVal;
        var hour = this.state.hours;
        var min = this.state.minutes;
        var sec = this.state.seconds;

        if (val.length <= 2) {
            if (val.length === 1) {
                sec = '0' + val;
            } else {
                sec = val;
            }
        }

        if (val.length <= 4 && val.length > 2) {
            if (val.length === 3 ) {
                min = '0' + val.substring(0, 1);
            } else {
                min = val.substring(0, 2);
            }
            sec = val.substring(val.length - 2, val.length);
        }

        if (val.length > 4) {
            if (val.length === 5 ) {
                hour = '0' + val.substring(0, 1);
            } else {
                hour = val.substring(0, val.length - 4);
            }
            sec = val.substring(val.length - 2, val.length);
            min = val.substring(val.length - 4, val.length - 2);
        }

        this.setState({
            value: val,
            seconds: sec,
            minutes: min,
            hours: hour,
        })
    }

    start() {
        this.setState({
            didStart: true,
            isDisabled: true,
        })
        this.handleInterval = setInterval(this.tick, 1000);
    }

    tick() {
        var sec = parseInt(this.state.seconds);
        var min = parseInt(this.state.minutes);
        var hour = parseInt(this.state.hours);

        if (sec === 0 && min === 0 && hour === 0) {
            this.setState({
                playAlarm: Sound.status.PLAYING
            })
            this.flashBackground = setInterval(() => {
                var count = this.state.count;
                if (count % 2 === 0) {
                    this.setState({
                        flash: {background: 'white'}
                    });
                } else {
                    this.setState({
                        flash: {background: '#bbc2e5'}
                    });
                }
                console.log(count);
                count++;
                this.setState({
                    count: count
                })
            }, 500);
            clearInterval(this.handleInterval);            
            return;
        }
        
      
        if (sec === 0 && min !== 0) {
            sec = 60;
            min--
           
        }

        if (sec === 0 && min === 0 && hour !== 0) {
            sec = 60;
            min = 59;
            hour--
        }


        if (hour < 10) {
            hour = '0' + hour;
        }

        if (min < 10) {
            min = '0' + min;
        }
    
        sec--;

        if (sec < 10) {
            sec = '0' + sec;
        }



        this.setState({
            seconds: sec,
            minutes: min,
            hours: hour
        })
    }

    reset() {
        clearInterval(this.flashBackground);
        clearInterval(this.handleInterval);
        this.setState({
            minutes: '00',
            seconds: '00',
            hours: '00',
            didStart: false,
            value: '',
            isDisabled: false,
            count: 0,
            flash: {background: 'white'},
            playAlarm: Sound.status.STOPPED,
        })
    }

    pause() {
        clearInterval(this.handleInterval);
        this.setState({ didStart: false,});
    }

    render() {
        var didStart = this.state.didStart; // initially false
        return (
            <div className="timerMain">
                <div className="timer_style"
                     style={this.state.flash}>
                    <Timer hours={this.state.hours}
                        minutes={this.state.minutes}
                        seconds={this.state.seconds}
                        />
                </div>
                <div className="timer_input">
                    <div className="num_input">
                        <TimerInput data={data_1} handleInputChange={this.handleInputChange} isDisabled={this.state.isDisabled} />
                        <TimerInput data={data_2} handleInputChange={this.handleInputChange} isDisabled={this.state.isDisabled}/>
                    </div>
                    <div className="controls">
                        {
                            !didStart ? 
                            (<Button style={{margin: '.5rem 0'}} className="start_button" variant="contained" color="secondary" onClick={this.start}>
                                start
                            </Button>) : 
                            (<Button style={{margin: '.5rem 0'}} className="start_button" variant="contained" color="secondary" onClick={this.pause}>
                                Pause
                            </Button>)
                        }
                        <Button style={{margin: '.5rem 0'}} className="stop_button" variant="contained" color="secondary" onClick={this.reset}>
                            Reset
                        </Button>
                    </div>
                </div>
                <Sound
                    url={alarm}
                    playStatus={this.state.playAlarm}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying}
              />
            </div>
        )
    }
}

export default CountdownTimer;
