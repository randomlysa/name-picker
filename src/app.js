// name list:  https://github.com/arineng/arincli
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Filters from './filters';

class App extends React.Component {
  state = {
    min: 0,
    max: 10,
    haveLetters: [],
    notHaveLetters: []
  };

  componentDidMount() {}
  render() {
    return (
      <div>
        <Filters />
        React
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
