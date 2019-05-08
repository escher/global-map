/** @jsx h */

import { h, Component } from 'preact'
import './App.css'
import EscherContainer from './EscherContainer'
import map1 from './data/iJO1366.Central metabolism.json'
import map2 from './data/iJO1366.Fatty acid beta-oxidation.json'
import map3 from './data/iJO1366.Fatty acid biosynthesis (saturated).json'
// import model from './data/iJO1366.json'

class App extends Component {
  render () {
    return (
      <div className='App'>
        {[map1, map2, map3].map(mapData => (
          <div style={{height: '100%', width: '33%', float: 'left'}}>
            <EscherContainer mapData={mapData} />
          </div>
        ))}
      </div>
    )
  }
}

export default App
