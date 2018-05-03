import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from './Title';
import Answer from './Answer';
import { ansiConvert, talk } from '../utilities';

class Question extends Component {

  questionChecker(t){
    var {activeQuestion} = this.props;

    if (t === activeQuestion.correct_answer){
      this.props.dispatch({'type': 'correctAnswer'});
      talk('Congratulation! it\'s Correct!', () => {
        window.jQuery('#nav_config').collapse('hide');
        window.jQuery('#questionlist').collapse('show');
      }, this.props.talkspeed, this.props.gender);
    }else{
      this.props.dispatch({'type': 'wrongAnswer'});
      talk('unCorrect!', () => {
        window.jQuery('#nav_config').collapse('hide');
        window.jQuery('#questionlist').collapse('show');
      }, this.props.talkspeed, this.props.gender);
    }
  }

  reader(msg){
    talk(msg, () => {
      this.props.dispatch({
        'type': 'next_reader'
      });
    }, this.props.talkspeed, this.props.gender);
  }

  render() {
    let {answerList,
        activeQuestion,
        selectedAnswer,
        status,
        question,
        reader} = this.props,
        listName = ['a.', 'b.', 'c.', 'd.'],
        title = ansiConvert(activeQuestion.question);

    if (reader === -1) {
      this.reader(`Question number ${question+1}. ${title}`);
    }

    if (reader >= 0 && reader < answerList.length && reader <= 99) {
      this.reader(`${listName[reader]} ${ansiConvert(answerList[reader])}`);
    }

    return (
      <div className="question text-center">
        <div className="paddingbottom-40">
          <Title>{title}</Title>
        </div>
        <div className="row">
        {
          answerList.map((item, idx) => {
            return(
                <div
                  key={idx}
                  className={`col-sm-6 paddingbottom-40 fade ${reader >= idx ? 'show' : ''}`}>
                  <Answer
                    idx={idx}
                    className={`
                      ${selectedAnswer === idx ? 'btn-success' : ''} 
                      ${(item === activeQuestion.correct_answer
                        && selectedAnswer !== -1
                        && status !== 0) ? 'flash' : ''}
                    `}
                    click={(idx)=>{
                      if (status === 0){
                        this.props.dispatch({'type': 'stop_reader'});
                        this.props.dispatch({
                          'type': 'selectAnswer',
                          'selectedAnswer': idx
                        });
                        talk(ansiConvert(`Your choice is: ${listName[idx]} ${item}`),() => {
                          setTimeout(()=>{this.questionChecker(item)}, 1000);
                        }, this.props.talkspeed, this.props.gender);
                      }
                    }}>
                    {`${listName[idx]} ${item}`}
                  </Answer>
                </div>
              )
          })
        }
        </div>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    status: state.quizData.status,
    selectedAnswer: state.quizData.selectedAnswer,
    reader: state.reader,
    question: state.quizData.question,
    talkspeed: state.config.talkspeed,
    gender: state.config.gender
  }
}

export default connect(mapStateToProps)(Question);
