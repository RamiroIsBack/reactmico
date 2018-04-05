import React, { Component } from 'react'
import {ModalPoliticaPrivacidad} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'

class ModalPoliticaPrivacidadContainer extends Component {


  toggleModal(){
    //this.props.eliminarCurrentCuenta()
    this.props.toggleModal('closePolitica')
    this.props.toggleModal('closeCookies')
  }


  render(){
    var politicaShowing = false
    var showOnlyCookies = false
    var politicaContenidos ={}

    if (this.props.storeModal){

      politicaShowing = this.props.storeModal.politicaShowing

      showOnlyCookies = this.props.storeModal.cookiesShowing

    }
    // Render nothing if the "show" prop is false
    if (!politicaShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id === 'politica'){
        politicaContenidos = this.props.storeContenidos.listaContenidos[i]

      }
    }
    return (

      <div>
        <ModalPoliticaPrivacidad
          show={politicaShowing}
          onClose={this.toggleModal.bind(this)}
          politica = {politicaContenidos}
          legua = {this.props.navigation.lengua}
          showOnlyCookies = {showOnlyCookies}
        >
        </ModalPoliticaPrivacidad>
      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
  }
}


const stateToProps = (state) => {
  return{
    navigation:state.navigation,
    storeContenidos: state.contenidos,
    storeModal:state.modal,

  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalPoliticaPrivacidadContainer)
