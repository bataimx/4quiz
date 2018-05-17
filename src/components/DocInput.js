import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRedux } from '../utilities';

class DocInput extends Component {
  render() {
    return (
      <div className="form-group text-left">
        <label htmlFor="url">Google Sheet Url</label>
        <div className="row">
          <div className="col-9">
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
                fetchRedux(this.refs.GoogleSheetUrl.value)
                  .then((resp) => {
                    this.props.fetchData(resp);
                    if (!this.props.config.useGsheet) {
                      this.props.toggle_useGsheet();
                    }
                    this.props.reset_reader();
                    this.props.restart();
                    window.jQuery('#questionlist, #nav_config').collapse('hide');
                  });
              }}
              >Fetch</button>
          </div>
        </div>
      </div>
    )
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
    restart: (data) => dispatch({'type': 'restart'}),
    toggle_useGsheet: ()=> dispatch({
      'type': 'toggle_useGsheet'
    })
  }
}

export default connect( (state)=>state, mapDispatchToProps)(DocInput);