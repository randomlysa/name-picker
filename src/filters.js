import React from 'react';
import axios from 'axios';

export default class Filters extends React.Component {
  state = {
    min: 0,
    max: 10,
    letters: ['a']
  };

  handleSubmit = e => {
    e.preventDefault();
    const { min, max, letters } = this.state;
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
          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}
