import React, { Component } from 'react';
import { ansiConvert } from '../utilities';

class Answer extends Component {
  render() {
    return (
      <button 
        onClick={()=>{
          this.props.click( this.props.idx );
        }}
        className={`answer btn btn-primary btn-lg btn-block ${this.props.className}`}>
        { ansiConvert(this.props.children) }
      </button>
    );
  }
}

export default Answer;
