import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                this.props.status !== 2 &&
                <button
                  onClick={() => {
                    this.props.dispatch({'type': 'reset_reader'});
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
                    this.props.dispatch({'type': 'restart'});
                    this.props.dispatch({'type': 'reset_reader'});
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
                    this.props.dispatch({'type': 'nextQuestion'});
                    this.props.dispatch({'type': 'reset_reader'});
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
    status: state.quizData.status
  }
}

export default connect(mapStateToProps)(Navbar);