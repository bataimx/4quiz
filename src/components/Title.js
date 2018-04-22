import React, { Component } from 'react';

class Title extends Component {

  render() {
    return (
      <h2 className="title">
        {this.props.children}
      </h2>
    );
  }
}

export default Title;
