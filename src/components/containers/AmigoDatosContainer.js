import React, { Component } from 'react'
import {AmigoDatos} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class AmigoDatosContainer extends Component {

  actualizarInfoUsuario(user, flag, posibleFoto) {
    //flag -> envio, nombre, foto
    this.props.addUserInfo(user,flag, posibleFoto)

  }
  cambiarCurrentUserModificables(datos,flag){
    this.props.cambiarCurrentUserModificables(datos,flag)
  }
  changePassword(newPasword,params){
    this.props.changePassword(newPasword,params)
  }
  resendEmail(){
    this.props.resendEmail()
  }


  comprobarNombre(nombre){
    var listaUsers = []
    var repe= false
    if (this.props.users){
      listaUsers = this.props.users.listaUsers
    }
    for (let i =0; i < listaUsers.length; i++){
      if (listaUsers[i].datosPersonales.nombre === nombre){
        repe = true
        break
      }
    }
    return repe
  }

  render(){
    var registrarseContenidos = {}


    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id == 'registrarse'){
        registrarseContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }



    return (

      <div>
        <AmigoDatos
          actualizarInfoUsuario={this.actualizarInfoUsuario.bind(this)}
          contenido = {registrarseContenidos}
          comprobarNombre = {this.comprobarNombre.bind(this)}
          currentUser = {this.props.users.currentUser}
          currentUserDatos={this.props.users.currentUserDatos}
          cambiarCurrentUserModificables ={this.cambiarCurrentUserModificables.bind(this)}
          changePassword ={this.changePassword.bind(this)}
          resendEmail= {this.resendEmail.bind(this)}
        >
        </AmigoDatos>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

    showNotificationWithTimeout: (modalName) =>dispatch(actions.showNotificationWithTimeout(modalName)),
    addUserInfo: (datos,flag,posibleFoto) => dispatch (actions.addUserInfo(datos,flag,posibleFoto)),
    cambiarCurrentUserModificables : (datos,flag) => dispatch (actions.cambiarCurrentUserModificables(datos,flag)),
    changePassword:(newPasword,params) =>dispatch(actions.changePassword(newPasword,params)),
    resendEmail:()=>dispatch(actions.resendEmail()),
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


  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(AmigoDatosContainer)
