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
    letters: '',
    results: [],
    saved: [],
    dataLoaded: false,
    errorMessage: ''
  };

  setLoaded = which => {
    this.setState({ dataLoaded: which });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  validateForm = e => {
    // This should be enough for here... need better validation on server most likely.
    const RegNumbers = /^[0-9]+$/;
    const RegLetters = /^[a-z]+$/;
    let { min, max, letters } = this.state;
    // If letters is empty or if it passes Regex
    if ((min && !RegNumbers.test(min)) || (max && !RegNumbers.test(max))) {
      this.setState({
        errorMessage: 'Please use only numbers in the numbers fields!!!'
      });
      return false;
    }

    if (letters && !RegLetters.test(letters)) {
      this.setState({
        errorMessage:
          'Please use only letters in the letters field !!!!!!!!!!!!!!'
      });
      document.getElementById('letters').value = '';
      return false;
    }

    this.setState({ errorMessage: '' });
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validateForm()) return;

    // Clear out results otherwise they stay mixed in with old results when
    // doing a new search (when splitting up data into smaller arrays in
    // ./results)
    this.setState({ dataLoaded: false, results: [] });
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

  saveToStorage = saved => {
    const save = JSON.stringify(saved);
    localStorage.setItem('sa_name_gen', save);
  };

  toggleSaveName = name => {
    if (this.state.saved.includes(name)) {
      const filtered = this.state.saved.filter(allnames => allnames !== name);
      this.setState(
        (state, props) => {
          return { saved: filtered };
        },
        () => {
          this.saveToStorage(this.state.saved);
        }
      );
    } else {
      this.setState(
        (state, props) => {
          return { saved: [name, ...state.saved] };
        },
        () => {
          this.saveToStorage(this.state.saved);
        }
      );
    }
  };

  componentDidMount() {
    const load = localStorage.getItem('sa_name_gen');
    if (load) {
      this.setState({ saved: JSON.parse(load) });
    }
  }

  render() {
    return (
      <div>
        <Saved saved={this.state.saved} toggleSaveName={this.toggleSaveName} />
        <Filters
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          min={this.state.min}
          max={this.state.max}
          letters={this.state.letters}
        />
        {<div>{this.state.errorMessage}</div>}
        <Results
          results={this.state.results}
          toggleSaveName={this.toggleSaveName}
          saved={this.state.saved}
          setLoaded={this.setLoaded}
          dataLoaded={this.state.dataLoaded}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
