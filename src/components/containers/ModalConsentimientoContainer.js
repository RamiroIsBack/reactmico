import React, { Component } from 'react'
import {ModalConsentimiento} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'

class ModalConsentimientoContainer extends Component {


  toggleModal(){
    this.props.eliminarCurrentCuenta()
    this.props.toggleModal('closeConsentimiento')
  }
  politica(){
    this.props.toggleModal('openPolitica')
  }

  consentimientoOk(){
    let amigo = {}

    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)

        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth()+1 //January is 0!
        var yyyy = today.getFullYear()

        if(dd<10) {
          dd = '0'+dd
        }

        if(mm<10) {
          mm = '0'+mm
        }

        today = dd + '/' + mm + '/' + yyyy
        amigo ={
          nombre: '',// los cojo luego en firebase del firebase.auth().currentUser
          email: '',// los cojo luego en firebase del firebase.auth().currentUser
          aceptaPoliticaDatos: true,
          fechaAltaYacepta:today,
          ip:responseJson.ip,
          ciudad:responseJson.city,
        }
        this.props.guardarConsentimientoFGLogin(amigo)
        this.props.toggleModal('closeConsentimiento')
        window.scrollTo(0, 0)

      })
      .catch((error) => {
        console.log('algo fue mal al cargar la ip'+error)
      })


  }

  render(){
    var consentimientoShowing = false
    var registrarseContenidos = {}

    if (this.props.storeModal){
      consentimientoShowing = this.props.storeModal.consentimientoShowing
    }
    // Render nothing if the "show" prop is false
    if (!consentimientoShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id === 'registrarse'){
        registrarseContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }
    return (

      <div>
        <ModalConsentimiento
          show={consentimientoShowing}
          onClose={this.toggleModal.bind(this)}
          consentimientoOk = {this.consentimientoOk.bind(this)}
          contenido = {registrarseContenidos}
          lengua = {this.props.navigation.lengua}
          politica = {this.politica.bind(this)}
        >
        </ModalConsentimiento>
      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    eliminarCurrentCuenta: () =>dispatch(actions.eliminarCurrentCuenta()),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    guardarConsentimientoFGLogin:(user) =>dispatch(actions.guardarConsentimientoFGLogin(user)),
  }
}


const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,
    storeModal:state.modal,
    users: state.user,
    carro:state.carro,
    navigation:state.navigation,

  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalConsentimientoContainer)
