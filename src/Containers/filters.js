import React from 'react';
import styled from '@emotion/styled';

import searchIcon from '../img/iconmonstr-magnifier-1-32.png';

const BlankHeader = styled.div`
  background-color: #fff;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const ToggleSearchIconButton = styled.button`
  background: none;
  border: none;
  border-radius: 100px;
  margin: 1em;
  padding: 1em;
  position: fixed;
  top: 0;
  cursor: pointer;

  :hover {
    background: #ffd1ba;
  }
`;

const SearchIcon = styled.img`
  cursor: pointer;
  margin-left: 1em;
  transform: translateX(-6px);
`;

// Form items
const SearchForm = styled.form`
  background: #fff;
  display: ${props => (props.displaySearchForm ? 'flex' : 'none')};
  flex-wrap: wrap;
  justify-content: space-around;
  position: fixed;
  top: 80px;
  padding-bottom: 10px;
  z-index: 5;
`;

const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.3em;
  width: 80%;

  /* Fix for smaller screens in portrait, like iphone 5/SE */
  @media screen and (max-height: 320px) {
    width: 30%;
  }

  background: none;
  border: solid 1px;
  border-radius: 10px;

  :focus {
    background: #ffd1ba;
  }
`;

const SubmitButton = styled.input`
  padding: 0.5em;
  margin: 0.3em;
  width: 80%;

  background: #bee5bf;
  border: solid 1px;
  border-radius: 10px;

  :active {
    background-color: #dff3e3;
  }
`;

export default class Filters extends React.Component {
  state = { displaySearch: true };
  // Search by letters:
  // https://stackoverflow.com/a/1580104/3996097

  doSearch = e => {
    this.setState({ displaySearch: false });
    this.props.handleSubmit(e);
  };

  toggleSearch = () => {
    this.setState(state => {
      return { displaySearch: !state.displaySearch };
    });
  };

  render() {
    return (
      <React.Fragment>
        <BlankHeader>
          <ToggleSearchIconButton>
            <SearchIcon
              src={searchIcon}
              alt="search"
              onClick={this.toggleSearch}
            />
          </ToggleSearchIconButton>
        </BlankHeader>
        <SearchForm
          onSubmit={this.doSearch}
          displaySearchForm={this.state.displaySearch}
        >
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
          <SubmitButton type="submit" value="Search!" />
        </SearchForm>
      </React.Fragment>
    );
  }
}
