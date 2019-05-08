/** @jsx h */

import { h, Component } from 'preact'
import { Builder } from 'escher'

class EscherContainerMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      builder: null
    }
  }

  fullScreen () {
    const builder = this.state.builder
    if (builder && !builder.isFullScreen) {
      builder.fullScreen()
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
        reaction_data: this.props.reactionData,
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
        },
        first_load_callback: builder => {
          // no interactions
          builder.none_mode()
          builder.callback_manager.set('full_screen', isFullScreen => {
            builder.map.draw_everything()
            if (!isFullScreen) {
              builder.none_mode()
            } else {
              builder.zoom_mode()
            }
          })
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
      />
    )
  }
}

class EscherContainer extends Component {
  constructor (props) {
    super(props)
    this.fullScreen = this.fullScreen.bind(this)
  }

  fullScreen () {
    this.ec.fullScreen()
  }

  render () {
    return (
      <div onClick={this.fullScreen}
        style={{width: '100%', height: '100%'}}
      >
        <EscherContainerMap
          ref={ref => { this.ec = ref }}
          {...this.props}
        />
      </div>
    )
  }
}
export default EscherContainer
