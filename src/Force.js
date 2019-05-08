/** @jsx h */

import { h, Component } from 'preact'
import { Builder } from 'escher'
import * as d3 from 'd3'

import map1 from './data/iJO1366.Central metabolism.json'
import map2 from './data/iJO1366.Fatty acid beta-oxidation.json'
import map3 from './data/iJO1366.Fatty acid biosynthesis (saturated).json'
import model from './data/iJO1366.json'
import _ from 'underscore'

const data = _.chain(model.reactions)
      .map(reaction => [reaction.id, Math.random()])
      .object()
      .value()

export default class Force extends Component {
  drawEscher (d, sel) {
    const builder = new Builder(
      d.mapData,
      null,
      null,
      sel,
      {
        reaction_data: data,
        fill_screen: false,
        menu: 'none',
        enable_editing: false,
        never_ask_before_quit: true,
        simplified: true,
        scroll_behavior: 'none',
        // full_screen_button: {
        //   enable_editing: true,
        //   scroll_behavior: 'pan',
        //   menu: 'all',
        //   simplified: false
        // },
        first_load_callback: builder => {
          // no interactions
          builder.none_mode()
        }
        //   builder.callback_manager.set('full_screen', isFullScreen => {
        //     builder.map.draw_everything()
        //     if (!isFullScreen) {
        //       builder.none_mode()
        //     } else {
        //       builder.zoom_mode()
        //     }
        //   })
        // }
      }
    )
    d.builder = builder
  }

  renderForce (node) {
    const topNode = d3.select(node)
    const { width, height } = topNode.node().getBoundingClientRect()

    const nodes = [ map1, map2, map3 ].map(mapData => ({
      radius: Math.min(width, height) / 4,
      mapData
    }))

    const forceX = d3.forceX(width / 2).strength(0.35)
    const forceY = d3.forceY(height / 2).strength(0.35)
    const simulation = d3.forceSimulation(nodes)
          .force('collision', d3.forceCollide().radius(d => d.radius * 1).strength(1))
          .on('tick', tick)
          .force('x', forceX)
          .force('y', forceY)

    const drawEscher = this.drawEscher.bind(this)
    const box = topNode.selectAll('div')
          .data(nodes)
          .join(
            enter => enter.append('div')
              .style('background-color', 'grey')
              .style('width', d => `${d.radius * 1.5}px`)
              .style('height', d => `${d.radius * 1.5}px`)
              .style('position', 'absolute')
              .call(
                d3.drag()
                  .on('start', d => {
                    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
                    d.fx = d.x
                    d.fy = d.y
                  })
                  .on('drag', d => {
                    d.fx = d3.event.x
                    d.fy = d3.event.y
                  })
                  .on('end', d => {
                    if (!d3.event.active) simulation.alphaTarget(0)
                    d.fx = null
                    d.fy = null
                  })
              )
              .each(function (d) {
                const sel = d3.select(this).append('div').style('width', '100%').style('height', '100%')
                drawEscher(d, sel)
              })
          )

    function tick () {
      box
        .style('top', d => `${d.y - d.radius / 2}px`)
        .style('left', d => `${d.x - d.radius / 2}px`)
    }
  }

  //  Enables d3 handling DOM
  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    this.renderForce(this.base)
  }

  render () {
    return <div style={{width: '100%', height: '100%'}} />
  }
}
