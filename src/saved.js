import React from 'react';
import styled from '@emotion/styled';

const Fixed = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #dff3e3;
  padding: 1em;
`;

export default class Saved extends React.Component {
  render() {
    return <Fixed>{this.props.saved.join(', ')}</Fixed>;
  }
}
