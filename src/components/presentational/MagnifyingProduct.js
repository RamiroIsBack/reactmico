import React, { Component } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { NavLink} from 'react-router-dom'

import {Magnifying_css} from '../../utils/css'

export default class extends Component {
  constructor(){
    super()
    this.state={
      picToShow: ''
    }
  }
  handleClick(){
    this.props.whenClicked(this.props.propiedades)
  }

  handlePicSelection(event){

    this.setState({picToShow:event.target.name})

  }

  render() {
    let numPic = '1/2'
    if(this.state.picToShow === 'pic2'){
      numPic = '2/2'
    }
    let picToShow = this.props.propiedades.pic
    if(this.state.picToShow ==='' ||this.state.picToShow === 'pic1'){
      picToShow = this.props.propiedades.pic
    }else if(this.state.picToShow === 'pic2'){
      picToShow = this.props.propiedades.pic2
    }
    return (
      <div className="fluid">
        <div className="fluid__image-container">
          <ReactImageMagnify {...{
            largeImage: {
              alt: '',
              src: picToShow,
              width: 1200,
              height: 800
            },
            smallImage: {
              src: picToShow,
              sizes: '(min-width: 80px) 30vw, 80vw',
              isFluidWidth: true,
            },
            isHintEnabled: true,
            hintTextMouse:'al entrar el raton se activara la lupa',
            hintTextTouch:'manten apretado para que se active la lupa',
            shouldHideHintAfterFirstActivation: true,
            pressDuration:300,//default 500
            //enlargedImagePosition: default is 'beside'(en mouse) and 'over' (en touch).
          }} />
          <h6  style = {{top:0,left:15,position:'absolute' ,opacity:0.5, padding: '0px', overflow: 'hidden', margin:0}}>{numPic}</h6>
          {this.props.propiedades.precioRebajado &&
            <div className = 'vendido__container' style={{right:10}}>
              <h4 style={{padding:1,margin:0}}>Rebajado</h4>
            </div>
          }
        </div>
        <div className="pic1__container">
          <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
            <img className='pic__1 img-rounded' name = 'pic1' src={this.props.propiedades.pic} alt='foto1' draggable = 'false' onClick={this.handlePicSelection.bind(this)}/>
          </a>
        </div>
        <div className="pic2__container">
          <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
            <img className='pic__2 img-rounded' name = 'pic2' src={this.props.propiedades.pic2} alt='foto2' draggable = 'false' onClick={this.handlePicSelection.bind(this)}/>
          </a>
        </div>

        <div className="boton__comprar__container">
          <NavLink to='/Carro' type='button' className='btn boton__comprar list-inline' onClick={this.handleClick.bind(this)} draggable = 'false'>
            <li className='glyphicon glyphicon-shopping-cart' style = {{color:'white'}}>
            </li>
            <li><h4 style = {{color:'white'}}>Añadir al carro</h4></li>
          </NavLink>
        </div>

      </div>
    )
  }
}
