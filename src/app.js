// name list:  https://github.com/arineng/arincli
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Filters from './filters';

class App extends React.Component {
  state = {
    min: 0,
    max: 10,
    letters: []
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { min, max, letters } = this.state;
    // Query won't work without something for letters.
    if (!min) min = 0;
    if (!max) max = 10;
    if (letters.length === 0) letters = ['_____'];

    const results = axios.get(
      `http://localhost:3000/search/${min}/${max}/${letters}`
    );
    results.then(r => {
      console.log(r.data);
      // r.data.forEach(name => {
      //   console.log(name, name.length);
      // });
    });
  };

  render() {
    return (
      <div>
        <Filters
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          min={this.state.min}
          max={this.state.max}
          letters={this.state.letters}
        />
        React
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
