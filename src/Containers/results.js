import React from 'react';
import styled from '@emotion/styled';
import throttle from 'lodash.throttle';
import posed from 'react-pose';

// https://icons8.com/preloaders/en/free/3/
import loading from '../img/487.gif';

const PageCenter = styled.div`
  text-align: center;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;

const Pagination = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding-top: 0.5em;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: 5;

  /* @media screen and (max-width: 1200px) {
    position: static;
  } */
`;

const PageButton = styled.button`
  border: none;
  padding: 0.5em;
  cursor: pointer;
  background: ${props => (props.current ? '#BEE5BF' : '#fff')};
  font-family: inherit;
  font-size: 0.9em;
  padding: 1em;
  display: ${props => (props.display ? 'block' : 'none')};

  :hover {
    background: #ffd1ba;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const AnimatedContainer = posed.div({
  visible: {
    x: '0%',
    transition: {
      duration: 300
    },
    applyAtStart: { x: '100%' },
    applyAtEnd: { x: '0%' }
  },
  hidden: {
    x: '-100%',
    transition: {
      duration: 200
    }
  }
});

const Button = styled.button`
  padding: 1em;
  border: solid 1px #000;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.3em;
  transition: all 0.3s;
  margin: 1em;

  background: ${props => (props.saved ? '#CE7DA5' : '#ddd')};

  :hover {
    background: ${props => (props.saved ? '#CE7DA5' : '#fff')};
  }

  @media screen and (max-width: 500px) {
    margin: 0.5em;
  }
`;

export default class Results extends React.Component {
  // Animation/transition on page change:
  // https://muffinman.io/react-rerender-in-component-did-mount/
  state = {
    dataLoaded: false,
    currentPage: 0,
    showPagination: false,
    animate: false
  };

  smallData = [];
  smallArray = [];
  page = 0;

  closePagination = () => {
    this.setState({ showPagination: false });
  };

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.closePagination, 1000));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle);
    // window.removeEventListener('scroll', throttle);
  }

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
    // Todo: hide pages when scrolling starts? Or add an [x] button to hide.

    // After a search, only the current page # is shown (probably need to change
    // this to indicate there are more pages.) In this state, when clicking
    // on the current page # (the only page # shown), expand pagination to show
    // all page #'s.
    if (page == this.state.currentPage) {
      this.setState({ showPagination: true });
    } else {
      // Otherwise, change the page

      this.setState({ animate: true }, () => {
        window.setTimeout(() => this.setState({ animate: false }), 200);
      });

      this.setState({ currentPage: page });
      window.scrollTo(0, 0);
    }
  };

  doPagination = () => {
    const results = [];
    for (var i = 0; i < this.smallData.length; i++) {
      let areWeOnThisPage = false;
      if (this.state.currentPage === i) {
        areWeOnThisPage = true;
      }

      const pageKey = `page_${i}`;

      // When pagination is close, show `currentPage / totalPages`'
      // otherwise, just show the page number.
      let extraText = '';
      if (!this.state.showPagination && areWeOnThisPage) {
        extraText = `/ ${this.smallData.length}`;
      }

      // Why I used display={x || y ? 1 : 0} below:
      // https://stackoverflow.com/a/49786272/3996097
      const myButton = (
        <PageButton
          key={pageKey}
          current={areWeOnThisPage}
          display={this.state.showPagination || areWeOnThisPage ? 1 : 0}
          onClick={this.changePage.bind(this, i)}
        >
          {i + 1} {extraText}
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
      <React.Fragment>
        <Pagination>{this.doPagination()}</Pagination>
        <ResultsContainer>
          <AnimatedContainer pose={this.state.animate ? 'hidden' : 'visible'}>
            {this.smallData[this.state.currentPage].map(data => {
              let saved = false;
              const [name, id] = data;
              const nn = name.slice(0, 1) + name.slice(1).toLowerCase();

              if (this.props.saved.includes(nn)) saved = true;

              return (
                <Button
                  saved={saved}
                  onClick={this.props.toggleSaveName.bind(null, nn)}
                >
                  {nn}
                </Button>
              );
            })}
          </AnimatedContainer>
        </ResultsContainer>
      </React.Fragment>
    );
  }
}
