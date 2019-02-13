import React from 'react';
import styled from '@emotion/styled';

import ListIcon from '../img/iconmonstr-menu-4-24.png';

const SavedListContainer = styled.div`
  background-color: #dff3e3;
  position: fixed;
  padding: 1em;
  bottom: 0;
  transform: ${props =>
    props.yPosition ? 'translateY(0)' : 'translateY(100%)'};
  width: 100%;
  z-index: 5;
  transition: all 0.2s;
`;

/* LabelText = 'Click to remove' */
const ListWithLabelText = styled.div`
  float: right;
  width: calc(100% - 50px);
`;

const ToggleShowFullListButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

const ToggleSavedListButton = styled.button`
  border: none;
  border-radius: 100px;
  margin-right: 1em;
  padding: 1em;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 10;

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
      <React.Fragment>
        <ToggleSavedListButton onClick={this.toggleDisplayListWithLabel}>
          <img src={ListIcon} />
        </ToggleSavedListButton>
        <SavedListContainer yPosition={this.state.showListWithLabel ? 1 : 0}>
          <ListWithLabelText>
            {this.props.saved.length === 1 && 'Click to remove:'}

            {this.props.saved.map((name, index) => {
              return this.renderNamesList(name, index);
            })}
            {this.renderShowMoreButton()}
          </ListWithLabelText>
        </SavedListContainer>
      </React.Fragment>
    );
  }
}
