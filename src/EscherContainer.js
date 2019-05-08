/** @jsx h */

import { h, Component } from 'preact'
import { Builder } from 'escher'

class EscherContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      builder: null
    }
    this.fullScreen = this.fullScreen.bind(this)
  }

  fullScreen () {
    const builder = this.state.builder
    if (builder) {
      builder.fullScreen()
      builder.map.draw_everything()
    }
  }

  //  Enables Escher handling DOM
  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    const builder = new Builder(
      this.props.mapData,
      null,
      null,
      this.base,
      {
        fill_screen: false,
        menu: 'none',
        enable_editing: false,
        never_ask_before_quit: true,
        simplified: true,
        scroll_behavior: 'none',
        full_screen_button: {
          enable_editing: true,
          scroll_behavior: 'pan',
          menu: 'all',
          simplified: false
        }
      }
    )
    this.setState({ builder })
  }

  render () {
    return (
      <div
        className='global-maps-escher-container'
        style={{width: '100%', height: '100%'}}
        onClick={this.fullScreen}
      />
    )
  }
}

export default EscherContainer
