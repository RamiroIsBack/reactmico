import React, { Component } from 'react'
import style from './styles'
import {ConocenosContainer} from '../containers'
export default class Conocenos extends Component {
  constructor(){
    super()

  }
  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv'>
        <div className='container-fluid' id ='containerDiv' style ={style.universal.containerDiv}>
          <ConocenosContainer/>
        </div>
      </div>
    )
  }
}
