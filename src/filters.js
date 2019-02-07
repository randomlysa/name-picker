import React from 'react';
import axios from 'axios';

export default class Filters extends React.Component {
  // Search by letters:
  // https://stackoverflow.com/a/1580104/3996097
  state = {
    min: 0,
    max: 10,
    letters: []
  };

  handleSubmit = e => {
    e.preventDefault();
    let { min, max, letters } = this.state;
    // Query won't work without something for letters.
    if (letters.length === 0) letters = ['_____'];

    const results = axios.get(
      `http://localhost:3000/search/${min}/${max}/${letters}`
    );
    results.then(r => console.log(r.data));
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Min Length"
            id="min"
            value={this.state.min}
            onChange={this.handleChange}
          />
          <input
            placeholder="Max Length"
            id="max"
            value={this.state.max}
            onChange={this.handleChange}
          />
          <input
            placeholder="Letters"
            id="letters"
            value={this.state.letters}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}
