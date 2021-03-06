// name list:  https://github.com/arineng/arincli
// colors: https://coolors.co/493657-ce7da5-bee5bf-dff3e3-ffd1ba
// purple:      493657
// pink:        CE7DA5
// dark green   BEE5BF
// light green  DFF3E3
// tan          FFD1BA

import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';

import Saved from './Containers/saved';
import Filters from './Containers/filters';
import Results from './Containers/results';

import { prodServer, devServer } from './config';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.7em;
`;

class App extends React.Component {
  state = {
    min: 0,
    max: 10,
    letters: '',
    results: [],
    saved: [],
    errorMessage: '',
    searched: false
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  validateForm = e => {
    // This should be enough for here... need better validation on server most likely.
    const RegNumbers = /^[0-9]+$/;
    const RegLetters = /^[a-zA-Z]+$/;
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
    this.setState({ searched: true });

    // Clear out results otherwise they stay mixed in with old results when
    // doing a new search (when splitting up data into smaller arrays in
    // ./results)
    this.setState({ results: [] });
    let { min, max, letters } = this.state;
    // Query won't work without something for letters.
    if (!min) min = 0;
    if (!max) max = 10;
    if (letters.length === 0) letters = ['_____'];

    // https://github.com/webpack/webpack/issues/8656
    import(/* webpackChunkName: "axios" */ 'axios').then(
      ({ default: axios }) => {
        const results = axios.get(
          `http://${prodServer}/search/${min}/${max}/${letters}`
        );
        results.then(r => {
          if (r.data.length === 0) {
            this.setState({ errorMessage: "Sorry, we couldn't find that!!!" });
            return;
          }
          this.setState({ results: r.data });
        });
      }
    );
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
        {this.state.saved.length > 0 && (
          <Saved
            saved={this.state.saved}
            toggleSaveName={this.toggleSaveName}
          />
        )}
        <Filters
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          min={this.state.min}
          max={this.state.max}
          letters={this.state.letters}
        />
        {<ErrorContainer>{this.state.errorMessage}</ErrorContainer>}
        <Results
          results={this.state.results}
          toggleSaveName={this.toggleSaveName}
          saved={this.state.saved}
          searched={this.state.searched}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
