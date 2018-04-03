import React, { Component } from 'react'
import {TallerContainer} from '../containers'
export default class Taller extends Component {

  render() {
    return (
      <div id ='backgroundDiv'>
        <div id ='containerDiv'>
          <TallerContainer/>
        </div>
      </div>
    )
  }
}
