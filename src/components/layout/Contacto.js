import React, { Component } from 'react'
import {ContactoContainer} from '../containers'
export default class Contacto extends Component {

  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv'>
        <div className='container-fluid' id ='containerDiv'>
          <ContactoContainer/>
        </div>
      </div>
    )
  }
}
