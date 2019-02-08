import React from 'react';

export default class Results extends React.Component {
  render() {
    if (this.props.results.length == 0) {
      return 'No Results - Do a search!';
    }
    return (
      <div>
        {this.props.results.map(data => {
          const [name, id] = data;
          const nn = name.slice(0, 1) + name.slice(1).toLowerCase();
          return (
            <div className="results" key={id}>
              <button onClick={this.props.toggleSaveName.bind(null, nn)}>
                {nn}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
