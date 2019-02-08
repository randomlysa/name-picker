import React from 'react';
import styled from '@emotion/styled';

import loading from './487.gif';

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
  state = { dataLoaded: false };
  smallData = [];
  smallArray = [];

  componentDidUpdate() {
    if (this.state.dataLoaded === false && this.props.results.length > 0) {
      this.setState({ dataLoaded: false });
      // Clear out previous data.
      this.smallData = [];
      this.smallArray = [];
      this.props.results.map((item, index) => {
        // Add items to smaller array.
        this.smallArray.push(item);
        // Push small array into big and clear out small.
        if (index !== 0 && index % 100 === 0) {
          this.smallData.push(this.smallArray);
          this.smallArray = [];
        }
      });
      this.setState({ dataLoaded: true });
    }
  }
  render() {
    if (!this.props.searched) {
      return 'No Results - Do a search!';
    }
    if (!this.state.dataLoaded) {
      return (
        <span>
          <img src={loading} alt="Loading..." />
        </span>
      );
    }

    return (
      <div>
        {this.smallData[0].map(data => {
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
