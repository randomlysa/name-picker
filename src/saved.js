import React from 'react';

export default class Saved extends React.Component {
  render() {
    return this.props.saved.join(', ');
  }
}
