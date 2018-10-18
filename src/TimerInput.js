import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './TimerInput.css';

class TimerInput extends Component {
  constructor(props) {
    super(props);
    this.passVal = this.passVal.bind(this);
  }
  passVal(event) {
    this.props.handleInputChange(event.currentTarget.firstChild.innerHTML)
  }
  render() {
    return (
      <div className="container">
          
          {this.props.data.map((val, key) => <Button key={key}
                                                     variant="contained" 
                                                     color="primary"
                                                     onClick={this.passVal}
                                                     className="input_buttons"
                                                     style={buttonStyle}
                                                     disabled={this.props.isDisabled}
                                                    >{val}</Button>)}
      </div>
    );
  }

  
}

var buttonStyle={
    margin: '0.5rem',

}

export default TimerInput;
