import React, { Component } from 'react'
import style from './styles'
import {FeriaContainer,ContenidoFeriaContainer} from '../containers'
export default class Ferias extends Component {

  constructor(){
    super()

  }
  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv' >
        <div className='container-fluid' id ='containerDiv' style = {{padding : 0}} >
          <div style = {style.feria.headerFerias}>    </div>
          <br/>
          <ContenidoFeriaContainer/>
          <FeriaContainer/>
        </div>
      </div>
    )
  }
}
