/** @jsx h */

import { h, Component } from 'preact'
import './App.css'
import Force from './Force'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Force />
      </div>
    )
  }
}

export default App
