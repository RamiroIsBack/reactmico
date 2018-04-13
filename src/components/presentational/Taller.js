import React, { Component } from 'react'
import style from './styles'
import {Taller_css} from '../../utils/css'
class Taller extends Component {
  handleClick(event){
    this.props.whenClicked()
  }
  render() {
    let pic1 ,pic2 ,pic3 ,pic4 , descripcion, artesaniaLogo =''
    if(this.props.tallerContenido.pic1){
      pic1 = this.props.tallerContenido.pic1.urlPicTaller
      pic2 = this.props.tallerContenido.pic2.urlPicTaller
      pic3 = this.props.tallerContenido.pic3.urlPicTaller
      pic4 = this.props.tallerContenido.pic4.urlPicTaller
      descripcion = this.props.tallerContenido.descripcion.descripcionTaller
    }
    if(this.props.artesaniaContenido.logo){
      artesaniaLogo = this.props.artesaniaContenido.logo.urlLogoArtesania
    }
    return (
      <div className = 'taller__container'>

        <div className= 'taller__foto1__container'>
          <img className= 'taller__foto' alt='taller' src= {pic1}></img>
        </div>
        <div className= 'taller__foto2__container'>
          <img className= 'taller__foto' alt='taller' src= {pic2}></img>
        </div>
        <div className= 'taller__foto3__container'>
          <img className= 'taller__foto' alt='taller' src= {pic3}></img>
        </div>
        <div className= 'taller__foto4__container'>
          <img className= 'taller__foto' alt='taller' src= {pic4}></img>
        </div>
        <div className= 'taller__descripcion__container'>
          <p> {descripcion}</p>
        </div>
        <div className= 'taller__artesania__container'>
          <img onClick = {this.handleClick.bind(this)} className= 'taller__foto' alt='artesaniadegalicia' src= {artesaniaLogo}></img>
        </div>
        <div></div>

      </div>
    )
  }
}

export default Taller
