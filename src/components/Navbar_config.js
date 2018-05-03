import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Select from 'react-select';
import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';

class Nav_config extends Component {
  render() {
    return (
      <div
        className="navbar-light"
        style={{"zIndex": "2"}}
        >
        <button
          type="button"
          className="navbar-toggler left-15 collapsed"
          data-toggle="collapse"
          data-target="#nav_config"
          aria-expanded="false"
          style={{"top": "5px",
                  "width": "40px",
                  "height": "40px" }}
        >
          <i className="fa fa-cogs"></i>
        </button>
        <div id="nav_config" className="collapse navbar-collapse navbar-wrapper">
          <div className="navbar-content table">
            <div
              className="table-cell pt-5"
              style={{"verticalAlign": "top"}}
            >
              <div className="align-items-center">
                <div className="form-group">
                  <div className="row">
                    <div className="col-10">
                      <div className="row">
                        <div className="col-10 text-center pt-2">
                          <div className="row ml-4">
                            <Slider
                              step={5}
                              max={120}
                              min={0}
                              defaultValue={ this.props.talkspeed * 100 }
                              onAfterChange={(e)=>{
                                let spd = e / 100;
                                this.props.dispatch({
                                  'type': 'update_talkspeed',
                                  'speed': spd
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-2 pl-0">
                          <p>{ this.props.talkspeed * 100 }</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-10 text-center pt-2">
                          <div className="row ml-4">
                            <Select
                              className="text-left"
                              name="form-field-gender"
                              value={this.props.gender}
                              onChange={(e)=>{
                                this.props.dispatch({
                                  'type': 'update_gender',
                                  'gender': e.value
                                });
                              }}
                              style={{width: "200px"}}
                              options={[
                                { value: 'UK English Female', label: 'UK English Female' },
                                { value: 'UK English Male', label: 'UK English Male' },
                                { value: 'US English Female', label: 'US English Female' },
                                { value: 'Vietnamese Male', label: 'Vietnamese Male' }
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    talkspeed: state.config.talkspeed,
    gender: state.config.gender
  }
}

export default connect(mapStateToProps)(Nav_config);