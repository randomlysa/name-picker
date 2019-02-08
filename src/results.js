import React from 'react';
import styled from '@emotion/styled';

import loading from './487.gif';

const PageCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Pagination = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
  padding: 1.3em;
`;

const PageButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 0.5em;
  cursor: pointer;
  background: ${props => (props.current ? '#BEE5BF' : '')};
  font-family: inherit;
  font-size: 0.9em;
  padding: 1em;

  :hover {
    background: #ffd1ba;
  }
`;

const Button = styled.button`
  padding: 1em;
  border: solid 1px #000;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.3em;
  transition: all 0.3s;
  float: left;
  margin: 1em;

  background: ${props => (props.saved ? '#CE7DA5' : '#ddd')};

  :hover {
    background: ${props => (props.saved ? '#CE7DA5' : '#fff')};
  }
`;

export default class Results extends React.Component {
  state = { dataLoaded: false, currentPage: 0 };

  smallData = [];
  smallArray = [];
  page = 0;

  componentDidUpdate(prevProps) {
    // I guess it's possible for a new search to have the same [9]th prop...
    if (this.props.results[9] !== prevProps.results[9]) {
      // New props, load them
      this.setState({ dataLoaded: false });
    }

    if (this.state.dataLoaded === false && this.props.results.length > 0) {
      this.setState({ dataLoaded: false });
      // Clear out previous data.
      this.smallData = [];
      this.smallArray = [];
      this.props.results.map((item, index) => {
        // Add items to smaller array.
        this.smallArray.push(item);

        // If results are < 100, the second if will never run and results never
        // be pushed to smallData. Found this out the fun way! (When testing
        // with 4 names as test data.)
        if (
          this.props.results.length < 100 &&
          this.props.results.length === index + 1
        ) {
          this.smallData.push(this.smallArray);
          this.smallArray = [];
        }
        // And for larger results
        // Push small array into big and clear out small.
        if (index !== 0 && index % 100 === 0) {
          this.smallData.push(this.smallArray);
          this.smallArray = [];
        }
      });
      this.setState({ dataLoaded: true });
    }
  }

  changePage = page => {
    this.setState({ currentPage: page });
  };

  doPagination = () => {
    const results = [];
    for (var i = 0; i < this.smallData.length; i++) {
      let areWeOnThisPage = false;
      if (this.state.currentPage === i) {
        areWeOnThisPage = true;
      }
      const pageKey = `page_${i}`;
      const myButton = (
        <PageButton
          key={pageKey}
          current={areWeOnThisPage}
          onClick={this.changePage.bind(this, i)}
        >
          {i}
        </PageButton>
      );
      results.push(myButton);
    }
    return results;
  };

  render() {
    if (!this.props.searched) {
      return <PageCenter>No Results - Do a search!</PageCenter>;
    }
    if (!this.state.dataLoaded) {
      return (
        <PageCenter>
          <img src={loading} alt="Loading..." />
        </PageCenter>
      );
    }

    return (
      <div>
        {this.smallData[this.state.currentPage].map(data => {
          let saved = false;
          const [name, id] = data;
          const nn = name.slice(0, 1) + name.slice(1).toLowerCase();

          if (this.props.saved.includes(nn)) saved = true;

          return (
            <div className="results" key={id}>
              <Button
                saved={saved}
                onClick={this.props.toggleSaveName.bind(null, nn)}
              >
                {nn}
              </Button>
            </div>
          );
        })}
        <Pagination>Page: {this.doPagination()}</Pagination>
      </div>
    );
  }
}
