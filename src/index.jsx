import React from 'react'
import { render } from 'react-dom'
import Timer from './panels/time';
import './style/normalize.css';
import './style/index.css';

class App extends React.Component {

  render() {
    return (
      <div>
        <Timer />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))