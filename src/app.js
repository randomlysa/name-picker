// name list:  https://github.com/arineng/arincli
// colors: https://coolors.co/493657-ce7da5-bee5bf-dff3e3-ffd1ba
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Saved from './saved';
import Filters from './filters';
import Results from './results';

import { prodServer, devServer } from './config';

class App extends React.Component {
  state = {
    min: 0,
    max: 10,
    letters: [],
    results: [],
    saved: []
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
      `http://${devServer}/search/${min}/${max}/${letters}`
    );
    results.then(r => {
      this.setState({ results: r.data });
    });
  };

  toggleSaveName = name => {
    if (this.state.saved.includes(name)) {
      const filtered = this.state.saved.filter(allnames => allnames !== name);
      this.setState((state, props) => {
        return { saved: filtered };
      });
    } else {
      this.setState((state, props) => {
        return { saved: [name, ...state.saved] };
      });
    }
  };

  render() {
    return (
      <div>
        <Saved saved={this.state.saved} />
        <Filters
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          min={this.state.min}
          max={this.state.max}
          letters={this.state.letters}
        />
        <Results
          results={this.state.results}
          toggleSaveName={this.toggleSaveName}
          saved={this.state.saved}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
