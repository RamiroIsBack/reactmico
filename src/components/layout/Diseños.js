import React, { Component } from 'react'
import { FotoContainer } from '../containers'
import style from './styles'
export default class Diseños extends Component {
  constructor(){
    super()

  }
  //TODO
  // sidebar to navigatebetween different product types
  render() {
    //console.log ('caca '+ FotoContainer)

    return (
      <div className='container-fluid' id ='backgroundDiv' style= {{padding: 0 }}>
        <div className='container-fluid' id ='containerDiv' style ={style.universal.containerDiv}>
          <FotoContainer/>
        </div>
      </div>
    )
  }
}
