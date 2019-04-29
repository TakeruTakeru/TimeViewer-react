import React from 'react'
import { render } from 'react-dom'
import Timer from './panels/time';
import './style/normalize.css';
import './style/index.css';

class App extends React.Component {

  render() {
    return (
      <div>
          <h1>グローバルな人材向けの時計</h1>
        <Timer />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))