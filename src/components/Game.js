import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Navbar from './Navbar';
import { shuffle } from '../utilities';

function fetchRedux() {
  fetch('https://opentdb.com/api.php?amount=10')
  // fetch('http://localhost:3000/data.json')
    .then(response => {
      if ( response.status === 404 ) {
        window.location.reload();
      } else {
        return response.json();
      }
    })
    .then(json => {
      if (json.results.length) {
        this.fetchData(json.results);
      }
    })
    .catch(() => {
      console.log( 'No internet connection found. App is running in offline mode.' );
    });
}

class Game extends Component {

  componentDidMount(){
    this.props.fetchRedux();
  }

  render() {
    if (!this.props.list.length) {
      return (
        <div>no found questions</div>
        )
    }

    let {questionNumber, list} = this.props,
        activeQuestion = list[questionNumber],
        answerList = shuffle([activeQuestion.correct_answer, ...activeQuestion.incorrect_answers]);

    return (
      <div className="container bg-light">
        <div className="row">
          <div className="col-sm-12 mainApp">
            <div className="table-cell paddingtop-50">
              <Question activeQuestion={activeQuestion} answerList={answerList}/>
            </div>
          </div>
          <Navbar/>
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
      }),
    fetchRedux
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
