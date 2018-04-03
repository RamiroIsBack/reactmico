import React, { Component } from 'react'
import style from './styles'
import {Taller_css} from '../../utils/css'
class Taller extends Component {
  handleClick(event){
    this.props.whenClicked()
  }
  render() {
    //el taller primero deberia ser algo mas corto en xs
    return (
      <div className = 'taller__container'>

        <div className= 'taller__foto1__container'>
          <img alt='taller' src= {this.props.tallerContenido.urlFoto1}></img>
        </div>
        <div className= 'taller__foto2__container'>
          <img alt='taller' src= {this.props.tallerContenido.urlFoto2}></img>
        </div>
        <div className= 'taller__foto3__container'>
          <img alt='taller' src= {this.props.tallerContenido.urlFoto3}></img>
        </div>
        <div className= 'taller__foto4__container'>
          <img alt='taller' src= {this.props.tallerContenido.urlFoto4}></img>
        </div>
        <div className= 'taller__descripcion__container'>
          <img alt='taller' src= {this.props.tallerContenido.descripcion}></img>
        </div>
        <div></div>

      </div>
    )
  }
}

export default Taller
