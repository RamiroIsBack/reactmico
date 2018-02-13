import React, { Component } from 'react'
import {ModalRegistrarse} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'



class ModalRegistrarseContainer extends Component {


  subirNuevoAmigo(user ){
    //TODO: log this new amigo to d DB
    if (user === null){
      this.props.showNotificationWithTimeout('Trabajando')
    }else{
      console.log('soy tu nuevo amigo!!!!!!!'+JSON.stringify(user))
      this.props.userCreated(user)
      this.props.toggleModal('closeRegistrarse')
      //make it start at the top of the page every time
      window.scrollTo(0, 0)

    }
  }
  entrarConGoogle(){
    this.props.loginGoogle()
      .then(response => {
        this.props.toggleModal('closeEntrar')
        //puede que haya algo en el carro d ates y habr'a q combinarlo x eso lo paso, digo q est'a recien logeado
        // y tb paso el uid de user para buscar en la base de ddatos
        this.props.loadCarro(this.props.carro.cartList,true )

      })
      .catch(err => {
        alert(err.message+ 'cacafuti ModalEntrarContainer l-134')
      })

    this.props.toggleModal('closeRegistrarse')

  }
  entrarConFacebook(){
    this.props.loginGoogle()
      .then(response => {
        this.props.toggleModal('closeEntrar')
        //puede que haya algo en el carro d ates y habr'a q combinarlo x eso lo paso, digo q est'a recien logeado
        // y tb paso el uid de user para buscar en la base de ddatos
        this.props.loadCarro(this.props.carro.cartList,true )

      })
      .catch(err => {
        alert(err.message+ 'cacafuti ModalEntrarContainer l-134')
      })

    this.props.toggleModal('closeRegistrarse')

  }

  toggleModal(){
    this.props.toggleModal('closeRegistrarse')
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
    var registrarseShowing = false
    var registrarseContenidos = {}

    if (this.props.storeModal){
      registrarseShowing = this.props.storeModal.registrarseShowing
    }
    // Render nothing if the "show" prop is false
    if (!registrarseShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id == 'registrarse'){
        registrarseContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }



    return (

      <div>
        <ModalRegistrarse entrarConGoogle = {this.entrarConGoogle.bind(this)} entrarConFacebook = {this.entrarConFacebook.bind(this)} show={registrarseShowing} subirNuevoAmigo={this.subirNuevoAmigo.bind(this)} onClose={this.toggleModal.bind(this)} contenido = {registrarseContenidos} comprobarNombre = {this.comprobarNombre.bind(this)}>
        </ModalRegistrarse>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{


    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout: (modalName) =>dispatch(actions.showNotificationWithTimeout(modalName)),
    userCreated:(user) => dispatch(actions.userCreated(user)),
    loginGoogle:() =>dispatch(actions.loginGoogle()),
    loginFacebook:() =>dispatch(actions.loginFacebook()),
    loadCarro:(carro,justLogedIn)=>dispatch(actions.loadCarro(carro,justLogedIn)),

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
    carro:state.carro


  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalRegistrarseContainer)
