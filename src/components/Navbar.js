import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavbarConfig from './Navbar_config';
import DocInput from './DocInput';
import { fetchRedux, talk } from '../utilities';

class Navbar extends Component {
  render() {
    return (
      <div
        className="navbar-light"
      >
        <button
          type="button"
          className="navbar-toggler collapsed navbar-main"
          data-toggle="collapse"
          data-target="#questionlist"
          aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          type="button"
          className="btn navbar-toggler navbar-2 collapsed"
          data-toggle="collapse"
          data-target="#nav_config"
          aria-expanded="false"
        >
          <i className="fa fa-cogs"></i>
        </button>
        <button
          type="button"
          className="btn navbar-toggler navbar-3"
          onClick={()=>{
            let {
                  questionNumber,
                  list,
                  talkspeed,
                  gender
                } = this.props,
                activeQuestion = list[questionNumber];

            if (activeQuestion) {
              talk(`it's about: ${activeQuestion.category}`, ()=>{
                this.props.nextReader();
              }, talkspeed, gender);
            }
          }}
        >
          <i className="fa fa-info"></i>
        </button>
        <div
          id="questionlist"
          className="collapse navbar-collapse navbar-wrapper"
          style={{"zIndex": "1"}}
        >
          <div className="navbar-content table">
            <div className="table-cell">
              {
                this.props.questionNumber === -1 &&
                <div className="align-items-center">
                  <div className="row mx-0">
                    <div className="col-12">
                      <DocInput/>
                    </div>
                  </div>
                </div>
              }
              {
                this.props.status !== 2 &&
                this.props.questionNumber !== -1 &&
                <button
                  onClick={() => {
                    this.props.reset_reader();
                    window.jQuery('#questionlist, #nav_config').collapse('hide');
                  }}
                  title="Repeat"
                  className="btn btn-info btn-lg">
                  <i className="fa fa-undo fa-2x fa-rotate-270"></i>
                </button>
              }
              {
                this.props.status === 2 &&
                <button
                  onClick={() => {
                    if (this.props.useGsheet) {
                      this.props.restart();
                      this.props.reset_reader();
                    } else{
                      fetchRedux()
                        .then((response)=>{
                          this.props.fetchData(response);
                          this.props.restart();
                          this.props.reset_reader();
                        });
                    }
                    window.jQuery('#questionlist, #nav_config').collapse('hide');
                  }}
                  title="Start"
                  className="btn btn-primary btn-lg">
                  <i className="fa fa-play fa-2x"></i>
                </button>
              }
              {
                this.props.status === 1 &&
                <button
                  onClick={() => {
                    this.props.nextQuestion();
                    this.props.reset_reader();
                    window.jQuery('#questionlist, #nav_config').collapse('hide');
                  }}
                  title="Next Question"
                  className="btn btn-primary btn-lg">
                  <i className="fa fa-share fa-2x"></i>
                </button>
              }
            </div>
          </div>
          <NavbarConfig/>
        </div>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    status: state.quizData.status,
    list: state.quizData.list,
    questionNumber: state.quizData.question,
    useGsheet: state.config.useGsheet,
    talkspeed: state.config.talkspeed,
    gender: state.config.gender
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    fetchData: (data) => dispatch({
        'type': 'fetchData',
        'data': data
      }),
    reset_reader: (data) => dispatch({'type': 'reset_reader'}),
    nextQuestion: (data) => dispatch({'type': 'nextQuestion'}),
    restart: (data) => dispatch({'type': 'restart'}),
    nextReader: ()=> dispatch({
      'type': 'next_reader'
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);