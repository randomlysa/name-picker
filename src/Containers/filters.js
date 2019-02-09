import React from 'react';
import styled from '@emotion/styled';

const StyledInput = styled.input`
  width: 5em;
`;

export default class Filters extends React.Component {
  // Search by letters:
  // https://stackoverflow.com/a/1580104/3996097

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.handleSubmit}>
          <StyledInput
            size="3"
            type="number"
            placeholder="Min Length"
            id="min"
            value={this.props.min}
            onChange={this.props.handleChange}
          />
          <StyledInput
            size="3"
            type="number"
            placeholder="Max Length"
            id="max"
            value={this.props.max}
            onChange={this.props.handleChange}
          />
          <StyledInput
            placeholder="Letters"
            id="letters"
            value={this.props.letters}
            onChange={this.props.handleChange}
          />
          <input type="submit" />
        </form>
      </React.Fragment>
    );
  }
}
