import React, { Component } from 'react'
import style from './styles'
import {AmigoContainer} from '../containers'
export default class Amigo extends Component {
  constructor(){
    super()

  }
  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv'>
        <div className='container-fluid' id ='containerDiv' style ={style.universal.containerDiv}>
          <AmigoContainer/>
        </div>
      </div>
    )
  }
}
