import React from 'react';

export default class Results extends React.Component {
  componentDidMount() {
    console.log('PROPS ', this.props);
  }
  componentDidUpdate() {
    console.log('PROPS ', this.props);
  }
  render() {
    if (this.props.results.length == 0) {
      return 'No Results - Do a search!';
    }
    return (
      <div>
        {this.props.results.map(name => {
          console.log(name);
          const nn = name.slice(0, 1) + name.slice(1).toLowerCase();
          return <div>{nn}</div>;
        })}
      </div>
    );
  }
}
