import React, { Component } from 'react'
import { FotoContainer } from '../containers'
export default class Diseños extends Component {

  render() {

    return (
      <div className='container-fluid' id ='backgroundDiv' style= {{padding: 0 }}>
        <div className='container-fluid' id ='containerDiv' >
          <FotoContainer/>
        </div>
      </div>
    )
  }
}
