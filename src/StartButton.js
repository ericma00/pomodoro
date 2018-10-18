import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class StartButton extends Component {
  render() {
    return (
      <Button disabled={this.props.isDisabled} variant="contained" color="secondary" onClick={this.props.handleClick}>
        Start
      </Button>   
    );
  }
}

export default StartButton;
