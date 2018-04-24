import React, { Component } from 'react';
import { connect } from 'react-redux';

class PreScreen extends Component {
  render() {

    return (
      <div
        className='prescreen mb-5'>
        <button
          onClick={() => {
            this.props.dispatch({'type': 'restart'});
            this.props.dispatch({'type': 'reset_reader'});
          }}
          className="btn btn-primary btn-lg">
          <i className="fa fa-play fa-2x"></i>
        </button>
      </div>
    );
  }
}

export default connect()(PreScreen);
