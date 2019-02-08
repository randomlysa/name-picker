import React from 'react';
import styled from '@emotion/styled';

const Fixed = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #dff3e3;
  padding: 1em;
`;

const Name = styled.button`
  margin-right: 1em;
  background-color: #dff3e3;
  cursor: pointer;
  padding: 5px;
  border: none;
  font-family: inherit;
  font-size: 1.3em;
  transition: all 0.3s;

  :hover {
    background-color: #ce7da5;
  }
`;

export default class Saved extends React.Component {
  render() {
    return (
      <Fixed>
        Click to remove:
        {this.props.saved.map(name => {
          return (
            <Name
              key={name}
              onClick={this.props.toggleSaveName.bind(this, name)}
            >
              {name}
            </Name>
          );
        })}
      </Fixed>
    );
  }
}
