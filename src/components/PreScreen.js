import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRedux } from '../utilities';

class PreScreen extends Component {
  render() {

    return (
      <div
        className='prescreen mb-5'>
        <button
          onClick={() => {
            fetchRedux()
              .then((response)=>{
                this.props.dispatch({
                  'type': 'fetchData',
                  'data': response
                })
                this.props.dispatch({'type': 'restart'});
                this.props.dispatch({'type': 'reset_reader'});
              });
          }}
          title="Start"
          className="btn btn-primary btn-lg">
          <i className="fa fa-play fa-2x"></i>
        </button>
      </div>
    );
  }
}

export default connect()(PreScreen);
