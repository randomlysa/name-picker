import React from 'react';
import styled from '@emotion/styled';

import ListIcon from '../img/iconmonstr-menu-4-24.png';

const SavedListContainer = styled.div`
  position: fixed;
  padding: 1em;
  bottom: 0;
  background-color: ${props => (props.width ? '#dff3e3' : 'none')};
  width: ${props => (props.width ? '100%' : '0px')};
`;

/* LabelText = 'Click to remove' */
const ListWithLabelText = styled.div`
  display: ${props => (props.display ? 'block' : 'none')};
`;

const ToggleShowFullListButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const ToggleSavedListButton = styled.button`
  background: none;
  border: none;
  border-radius: 100px;
  margin-right: 1em;
  padding: 1em;
  cursor: pointer;
  float: left;

  :hover {
    background: #ffd1ba;
  }
`;

const Name = styled.button`
  margin-right: 1em;
  background-color: #dff3e3;
  cursor: pointer;
  padding: 5px;
  border: none;
  font-family: inherit;
  font-size: 1.3em;
  transition: all 0.3s;

  :hover {
    background-color: #ce7da5;
  }
`;

export default class Saved extends React.Component {
  state = { showListWithLabel: true, showFullList: false };
  listLength = 2;

  toggleDisplayListWithLabel = () => {
    this.setState(state => {
      return { showListWithLabel: !state.showListWithLabel };
    });
  };

  renderNamesList = (name, index) => {
    if (index <= this.listLength || this.state.showFullList === true) {
      return (
        <Name key={name} onClick={this.props.toggleSaveName.bind(this, name)}>
          {name}
        </Name>
      );
    } else {
      return null;
    }
  };

  toggleShowFullList = () => {
    this.setState(state => {
      return { showFullList: !state.showFullList };
    });
  };

  // show '...' button that toggles whether to show the full list of saved names
  renderShowMoreButton = () => {
    if (this.props.saved.length > 3) {
      return (
        <ToggleShowFullListButton onClick={this.toggleShowFullList}>
          ...
        </ToggleShowFullListButton>
      );
    }
  };

  render() {
    return (
      <SavedListContainer width={this.state.showListWithLabel ? 1 : 0}>
        <ToggleSavedListButton onClick={this.toggleDisplayListWithLabel}>
          <img src={ListIcon} />
        </ToggleSavedListButton>
        <ListWithLabelText display={this.state.showListWithLabel ? 1 : 0}>
          {this.props.saved.length === 1 && 'Click to remove:'}

          {this.props.saved.map((name, index) => {
            return this.renderNamesList(name, index);
          })}
          {this.renderShowMoreButton()}
        </ListWithLabelText>
      </SavedListContainer>
    );
  }
}
