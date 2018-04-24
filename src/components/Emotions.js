import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrRandom } from '../utilities';

class Emotions extends Component {
  render() {
    let thumbList = [
      ["./asset/emotions/question2.gif", "./asset/emotions/yay3.gif"],
      ["./asset/emotions/yay1.gif", "./asset/emotions/yay2.gif", "./asset/emotions/yay4.gif"],
      ["./asset/emotions/what.gif", "./asset/emotions/sad.gif"]
    ];

    return (
      <div
        className='emotions'
        style={{ 'height': '300px', 'display': 'inline-block'}}>
        <img src={ ArrRandom(thumbList[0]) } alt='' className={`${this.props.status === 0 ? 'd-block' : 'd-none'} img-fluid`} />
        <img src={ ArrRandom(thumbList[1]) } alt='' className={`${this.props.status === 1 ? 'd-block' : 'd-none'} img-fluid`} />
        <img src={ ArrRandom(thumbList[2]) } alt='' className={`${this.props.status === 2 ? 'd-block' : 'd-none'} img-fluid`} />
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    status: state.quizData.status
  }
}

export default connect(mapStateToProps)(Emotions);
