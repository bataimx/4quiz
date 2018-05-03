import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Navbar from './Navbar';
import NavbarConfig from './Navbar_config';
import PreScreen from './PreScreen';
import Emotions from './Emotions';
import { shuffle } from '../utilities';

class Game extends Component {

  render() {

    let {questionNumber, list} = this.props;

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

    let activeQuestion = list[questionNumber],
        incorrect_answers = typeof activeQuestion.incorrect_answers === 'string' ? JSON.parse(activeQuestion.incorrect_answers) : activeQuestion.incorrect_answers,
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
    questionNumber: state.quizData.question
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
