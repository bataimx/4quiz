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
        >
        <div
          id="nav_config"
          className="collapse navbar-collapse navbar-wrapper nav_config"
          style={{"zIndex": "2"}}
        >
          <div className="navbar-content table">
            <div
              className="table-cell pt-5"
              style={{"verticalAlign": "top"}}
            >
              <div className="text-left pt-3">
                <div className="form-group">
                  <div className="row mx-4">
                    <div className="col-12">
                      <h4>Configs</h4>
                    </div>
                    <div className="col-10">
                      <label>Voice speed</label>
                      <div className="row">
                        <div className="col-10 text-center pt-2">
                          <Slider
                            step={10}
                            max={120}
                            min={20}
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
                        <div className="col-2 pl-0">
                          <p>{ Math.floor(this.props.talkspeed * 100) }</p>
                        </div>
                      </div>
                      <label>Voice Gender</label>
                      <div className="row">
                        <div className="col-10 text-center pt-2">
                          <Select
                            className="text-left"
                            name="form-field-gender"
                            value={this.props.gender}
                            onChange={(e)=>{
                              let genderName = e ? e.value : null;
                              this.props.dispatch({
                                'type': 'update_gender',
                                'gender': genderName
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