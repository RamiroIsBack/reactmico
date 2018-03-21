import React, { Component } from 'react'
import {AmigoDatos} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'


class AmigoDatosContainer extends Component {
  componentDidMount(){
    if(this.props.users.currentUser){
      if(!this.props.users.currentUser.datosPersonales.emailVerified &&
        this.props.users.currentUser.datosPersonales.providerId==='firebase'){

        this.props.checkEmailVerified(this.props.users.currentUser.datosPersonales.emailVerified)
      }
    }
  }
  componentDidUpdate(){
    if(this.props.users.currentUser){
      if(!this.props.users.currentUser.datosPersonales.emailVerified &&
        this.props.users.currentUser.datosPersonales.providerId==='firebase'){

        this.props.checkEmailVerified(this.props.users.currentUser.datosPersonales.emailVerified)
      }
    }
  }
  
  actualizarInfoUsuario(user, flag, posibleFoto) {
    //flag -> envio, nombre, foto, Warning
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
  showWarning(message){
    //message = noUserName, noPassword, faltanDatos, wrongEmail
    this.props.showNotificationWithTimeout('Warning',message)
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

      if (this.props.storeContenidos.listaContenidos[i].id === 'registrarse'){
        registrarseContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }



    return (

      <div className = 'container'>
        <AmigoDatos
          actualizarInfoUsuario={this.actualizarInfoUsuario.bind(this)}
          contenido = {registrarseContenidos}
          comprobarNombre = {this.comprobarNombre.bind(this)}
          currentUser = {this.props.users.currentUser}
          currentUserDatos={this.props.users.currentUserDatos}
          cambiarCurrentUserModificables ={this.cambiarCurrentUserModificables.bind(this)}
          changePassword ={this.changePassword.bind(this)}
          resendEmail= {this.resendEmail.bind(this)}
          showWarning= {this.showWarning.bind(this)}
        >
        </AmigoDatos>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

    showNotificationWithTimeout: (modalName,subModalName) =>dispatch(actions.showNotificationWithTimeout(modalName,subModalName)),
    addUserInfo: (datos,flag,posibleFoto) => dispatch (actions.addUserInfo(datos,flag,posibleFoto)),
    cambiarCurrentUserModificables : (datos,flag) => dispatch (actions.cambiarCurrentUserModificables(datos,flag)),
    changePassword:(newPasword,params) =>dispatch(actions.changePassword(newPasword,params)),
    resendEmail:()=>dispatch(actions.resendEmail()),
    checkEmailVerified:(flagEmailVerified)=>dispatch(actions.checkEmailVerified(flagEmailVerified)),
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
