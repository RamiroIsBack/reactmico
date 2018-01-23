import React, { Component } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import { NavLink} from 'react-router-dom'

import {Magnifying} from '../../utils'

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
      numPic = '2/1'
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
              alt: 'Wristwatch by Ted Baker London',
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
          <div className = 'col-xs-offset-10 col-xs-2 col-sm-offset-10 col-sm-2 col-md-offset-10 col-md-2 col-lg-offset-10 col-lg-2 carousel-caption ' style = {{width : 25, padding: '0px', top: 0, left: 10, right: 10}}>
            <h6  style = {{backgroundColor: 'rgba(0,0,0,0.50)' ,borderRadius:'25px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{numPic}</h6>
          </div>
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
