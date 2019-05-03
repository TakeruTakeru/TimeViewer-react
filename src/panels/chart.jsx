import React from 'react';
import Plot from 'react-plotly.js';

export default class App extends React.Component {
  render() {
    const {name, x, y} = this.props;

    const data=[
        {
          x: x,
          y: y,
          // error_y: {
          //   type: 'data',
          //   array: [1, 2, 3],
          //   visible: true
          // },
          type: 'scatter'
        }
      ];

      const layout={width: 320, height: 240, title: `'${name}' city`}
    return (
        <Plot
          data={data}
          layout={layout}
        / >
    );
  }
}