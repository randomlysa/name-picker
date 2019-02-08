import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  padding: 1em;
  border: solid 1px #000;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.3em;
  transition: all 0.3s;
  float: left;
  margin: 1em;

  background: ${props => (props.saved ? '#CE7DA5' : '#ddd')};

  :hover {
    background: ${props => (props.saved ? '#CE7DA5' : '#fff')};
  }
`;

export default class Results extends React.Component {
  render() {
    if (this.props.results.length == 0) {
      return 'No Results - Do a search!';
    }
    return (
      <div>
        {this.props.results.map(data => {
          let saved = false;
          const [name, id] = data;
          const nn = name.slice(0, 1) + name.slice(1).toLowerCase();

          if (this.props.saved.includes(nn)) saved = true;

          return (
            <div className="results" key={id}>
              <Button
                saved={saved}
                onClick={this.props.toggleSaveName.bind(null, nn)}
              >
                {nn}
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}
