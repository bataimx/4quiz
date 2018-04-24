import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRedux } from '../utilities';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-light">
        <button
          type="button"
          className="navbar-toggler collapsed"
          data-toggle="collapse"
          data-target="#questionlist"
          aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="questionlist" className="collapse navbar-collapse questionlist">
          <div className="question-list table">
            <div className="table-cell">
              {
                this.props.questionNumber === -1 &&
                <div className="align-items-center">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-9">
                        <label className="sr-only" htmlFor="url">public Url</label>
                        <input 
                          type="text" 
                          ref="GoogleSheetUrl"
                          placeholder="public Url"
                          id="url"
                          className="form-control col-12" 
                          defaultValue='https://docs.google.com/spreadsheets/d/e/2PACX-1vRTXLrh-gxr8a3cmsw4KhmRBhpnzQGsZRmZwHqEDbG4HawYiaBWK2yRp7MHo6GVMJTtI9MmKtPSskRW/pub?gid=0&single=true&output=tsv'
                          />
                      </div>
                      <div className="col-3 pl-0">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          onClick={() => {
                            fetchRedux(this.refs.GoogleSheetUrl.value, (dt)=>{
                              this.props.fetchData(dt);
                              this.props.restart();
                              window.jQuery('#questionlist').collapse('hide');
                            });
                          }}
                          >Fetch</button>
                      </div>
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
                    window.jQuery('#questionlist').collapse('hide');
                  }}
                  className="btn btn-info btn-lg">
                  <i className="fa fa-undo fa-2x fa-rotate-270"></i>
                </button>
              }
              {
                this.props.status === 2 &&
                <button
                  onClick={() => {
                    this.props.restart();
                    this.props.reset_reader();
                    window.jQuery('#questionlist').collapse('hide');
                  }}
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
                    window.jQuery('#questionlist').collapse('hide');
                  }}
                  className="btn btn-primary btn-lg">
                  <i className="fa fa-share fa-2x"></i>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    status: state.quizData.status,
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
    reset_reader: (data) => dispatch({'type': 'reset_reader'}),
    nextQuestion: (data) => dispatch({'type': 'nextQuestion'}),
    restart: (data) => dispatch({'type': 'restart'}),
    updateUrl: (value) => dispatch({
      'type': 'updateUrl',
      'url': value
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);