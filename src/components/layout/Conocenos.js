import React, { Component } from 'react'
import {ConocenosContainer} from '../containers'
export default class Conocenos extends Component {

  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv'>
        <div className='container-fluid' id ='containerDiv'>
          <ConocenosContainer/>
        </div>
      </div>
    )
  }
}
