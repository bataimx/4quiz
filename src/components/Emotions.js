import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrRandom } from '../utilities';

class Emotions extends Component {

  componentDidMount(){
    document.getElementById("myAudio1").volume=0.5;
    document.getElementById("myAudio2").volume=0.5;
  }

  render() {
    //thumbList[0]: default status 0
    //thumbList[1]: Correct answer status 1
    //thumbList[2]: Wrong answer status 2
    let thumbList = [
      ["./asset/emotions/question2.gif", "./asset/emotions/yay3.gif"],
      ["./asset/emotions/yay1.gif", "./asset/emotions/yay2.gif", "./asset/emotions/yay4.gif"],
      ["./asset/emotions/what.gif", "./asset/emotions/sad.gif"]
    ];

    if (this.props.status === 1) {
      document.getElementById("myAudio1").play();
    }
    if (this.props.status === 2) {
      document.getElementById("myAudio2").play();
    }

    return (
      <div
        className='emotions'
        style={{ 'height': '300px', 'display': 'inline-block'}}>
        <img src={ ArrRandom(thumbList[0]) } alt='' className={`${this.props.status === 0 ? 'd-block' : 'd-none'} img-fluid`} />
        <img src={ ArrRandom(thumbList[1]) } alt='' className={`${this.props.status === 1 ? 'd-block' : 'd-none'} img-fluid`} />
        <img src={ ArrRandom(thumbList[2]) } alt='' className={`${this.props.status === 2 ? 'd-block' : 'd-none'} img-fluid`} />
        <audio id="myAudio1" ref="audio_tag" src='./asset/tracks/yay.mp3' preload="auto" />
        <audio id="myAudio2" ref="audio_tag" src='./asset/tracks/wa-wa-wa.mp3' preload="auto" />
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
