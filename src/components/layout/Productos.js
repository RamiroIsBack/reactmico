import React, { Component } from 'react'
import {ProductContainer} from '../containers'
export default class Productos extends Component {


  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv'>
        <div className='container-fluid' id ='containerDiv' >
          <ProductContainer/>
        </div>
      </div>
    )
  }
}
