import React, { Component } from 'react'

import {connect} from 'react-redux'


class ModalTrabajandoContainer extends Component {

  render(){
    //estamos en ello tb con el user
    var userName =''
    var trabajandoShowing = false
    var trabajandoImgUrl = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2Fc66ef7da202d2c6866ff178aa81c9e6f.png?alt=media&token=8b0baaf2-b622-4095-af99-2f6ecda50d69'
    if (this.props.storeModal){
      trabajandoShowing = this.props.storeModal.trabajandoShowing
    }
    // Rend{trabajandoImgUrl}r nothing if the 'show' is false
    if (!trabajandoShowing){
      return null
    }
    var stiloModalGrande ={
      position: 'fixed',
      backgroundColor:'#FAFAFA',
      maxWidth: 600,
      maxHeight: 300,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6669,
      top: '70px',
      left: '70px',
      right:100,
      border: '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',

    }

    var stiloModalXs ={
      position: 'fixed',
      backgroundColor:'#FAFAFA',
      maxWidth: 500,
      maxHeight: 500,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6669,
      top: '70px',
      left: '20px',
      right:'20px',
      border: '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    return (
      <div >
        <div className = 'hidden-xs' style={stiloModalGrande}>
          <div className = ' container col-xs-5 col-sm-5col-md-5 col-lg-5 '>
            <img src={trabajandoImgUrl} className='img-responsive' style= {{maxWidth: '100%'}}/>
          </div>
          <div className = ' col-xs-7 col-sm-7 col-md-7 col-lg-7 '>
            <h4>Hola{userName}, </h4>
            <h4>Aún no estamos completamente operativos para la compra online, pero estamos trabajando en ello :)</h4>
          </div>
          <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

            <p>mientras tanto, tienes nuestro contacto a pie de página. Un saludo</p>
          </div>
        </div>

        <div className = 'visible-xs-block hidden-sm hidden-md hidden-lg' style={stiloModalXs}>
          <div className = ' container col-xs-5 col-sm-5col-md-5 col-lg-5 '>
            <img src={trabajandoImgUrl} className='img-responsive' style= {{maxWidth: '100%'}}/>
          </div>
          <div className = ' col-xs-7 col-sm-7 col-md-7 col-lg-7 '>
            <p>Hola{userName}, aún no tenemos total funcionalidad.</p>
            <p>pero estamos trabajando en ello :)</p>
          </div>
          <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

            <p>mientras tanto, tienes nuestro contacto a pie de página. Un saludo</p>
          </div>
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras

    storeModal:state.modal,

  }
}
//                                   ****
export default connect (stateToProps,null)(ModalTrabajandoContainer)

