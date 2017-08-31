import React, { Component } from 'react'
import {ProductContainer} from '../containers'
import style from './styles'
export default class Productos extends Component {
  constructor(){
    super()

  //TODO
  //usar un Card d bootstrap con el hint si pones <ca
  //ya t escribe mazo del tir'on

  }
  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv'>
        <div className='container-fluid' id ='containerDiv' style ={style.universal.containerDiv}>
          <ProductContainer/>
        </div>
      </div>
    )
  }
}
