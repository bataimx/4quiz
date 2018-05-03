import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Navbar from './Navbar';
import NavbarConfig from './Navbar_config';
import PreScreen from './PreScreen';
import Emotions from './Emotions';
import { shuffle, filterObject } from '../utilities';

class Game extends Component {

  render() {

    let {
          questionNumber,
          list,
          useGsheet
        } = this.props,
        activeQuestion = list[questionNumber],
        incorrect_answers = [],
        answerList = [];

    if (questionNumber === -1) {
      return (
        <div className="container bg-light">
          <div className="row">
            <div className="col-sm-12 mainApp">
              <div className="table-cell paddingtop-50">
                <PreScreen/>
                <Emotions/>
              </div>
            </div>
            <Navbar/>
            <NavbarConfig/>
          </div>
        </div>
      );
    }

    //googlesheet data
    if (useGsheet) {
      incorrect_answers = filterObject(activeQuestion, /incorrect_answers/i);
    }else{
      incorrect_answers = activeQuestion.incorrect_answers.length ? activeQuestion.incorrect_answers : [];
    }

    //shuffle and merge the incorrect_answers, correct_answer
    answerList = shuffle([activeQuestion.correct_answer, ...incorrect_answers]);

    return (
      <div className="container bg-light">
        <div className="row">
          <div className="col-sm-12 mainApp">
            <div className="table-cell paddingtop-50">
              <Question activeQuestion={activeQuestion} answerList={answerList}/>
              <Emotions/>
            </div>
          </div>
          <Navbar/>
          <NavbarConfig/>
        </div>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    list: state.quizData.list,
    questionNumber: state.quizData.question,
    useGsheet: state.config.useGsheet
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    fetchData: (data) => dispatch({
        'type': 'fetchData',
        'data': data
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
