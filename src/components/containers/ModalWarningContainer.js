import React, { Component } from 'react'
import {connect} from 'react-redux'

import actions from '../../actions'
import history from '../../utils/history'

import{WarningCarroVacio,WarningNoUser,WarningNoVerifyedEmail,WarningNoDatos,WarningTienesVendidos, WarningBasicConfigurable} from '../presentational'

class ModalWarningContainer extends Component {

  toggleModal(){
    this.props.toggleModal('closeWarning')
  }
  llevameA(whereTo){

    if(whereTo === 'Diseños'){
      history.push('/'+whereTo)
      this.props.navActive('creaciones', 'navbarMicoFront')
      this.props.toggleModal('closeWarning')
    }else if(whereTo === 'user'){
      this.props.toggleModal('closeWarning')
      this.props.toggleModal('openEntrar')
    }else if(whereTo === 'datos'){
      history.push('/Amigo/Datos')
      this.props.navActive('currentUser', 'navbarMicoFront')
      this.props.toggleModal('closeWarning')

    }else if(whereTo === 'email'){
      history.push('/Amigo/Datos')
      this.props.navActive('currentUser', 'navbarMicoFront')
      this.props.toggleModal('closeWarning')
    }
  }

  render(){
    var nombre = ''
    var photoURL = ''
    if(this.props.user.currentUser){
      nombre =this.props.user.currentUser.datosPersonales.nombre
      photoURL =this.props.user.currentUser.foto.photoURL
    }
    var warningShowing = false

    if (this.props.storeModal){
      warningShowing = this.props.storeModal.warningShowing
    }

    if (!warningShowing){
      return null
    }
    let warningBasic =''
    if(this.props.storeModal.submodalWarning === 'noPassword' ||
      this.props.storeModal.submodalWarning === 'noUserName' ||
      this.props.storeModal.submodalWarning === 'faltanDatos' ||
      this.props.storeModal.submodalWarning === 'wrongEmail' )
    {
      warningBasic = true
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
      border: '3px solid #ccc',
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
      border: '3px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    return (
      <div >
        <div className = 'visible-xs-block hidden-sm hidden-md hidden-lg' style={stiloModalXs}>
          <button onClick={this.toggleModal.bind(this)} className = 'btn glyphicon glyphicon-remove pull-right'
            style= {{backgroundColor: 'rgba(255,255,255,0.75)',
              paddingRight: '18px',
              paddingLeft: '18px',
              borderRadius: '5px',
              fontSize: '19px',
              border: 'none',}}>
          </button>
          {this.props.storeModal.submodalWarning === 'carroVacio'&&
            <WarningCarroVacio
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              photoURL = {photoURL}
            />
          }
          {this.props.storeModal.submodalWarning === 'noUser' &&
            <WarningNoUser
              redirecciona = {this.llevameA.bind(this)}
            />
          }
          {this.props.storeModal.submodalWarning === 'noDatos'&&
            <WarningNoDatos
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              photoURL = {photoURL}
            />
          }
          {this.props.storeModal.submodalWarning === 'noVerifyedEmail'&&
            <WarningNoVerifyedEmail
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              photoURL = {photoURL}
            />
          }
          {this.props.storeModal.submodalWarning.nombre === 'tienesVendidos' &&
            <WarningTienesVendidos
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              listaDescartados = {this.props.storeModal.submodalWarning.listaDescartados}
            />
          }

          {warningBasic &&
            <WarningBasicConfigurable

              nombre = {nombre}
              submodalWarning = {this.props.storeModal.submodalWarning}
            />
          }
        </div>


        <div className = 'hidden-xs' style={stiloModalGrande}>
          <button onClick={this.toggleModal.bind(this)} className = 'btn glyphicon glyphicon-remove pull-right'
            style= {{backgroundColor: 'rgba(255,255,255,0.75)',
              paddingRight: '18px',
              paddingLeft: '18px',
              borderRadius: '5px',
              fontSize: '19px',
              border: 'none',}}>
          </button>

          {this.props.storeModal.submodalWarning === 'carroVacio'&&
            <WarningCarroVacio
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              photoURL = {photoURL}
            />
          }
          {this.props.storeModal.submodalWarning === 'noUser' &&
            <WarningNoUser
              redirecciona = {this.llevameA.bind(this)}
            />
          }
          {this.props.storeModal.submodalWarning === 'noDatos'&&
            <WarningNoDatos
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              photoURL = {photoURL}
            />
          }
          {this.props.storeModal.submodalWarning === 'noVerifyedEmail'&&
            <WarningNoVerifyedEmail
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              photoURL = {photoURL}
            />
          }
          {this.props.storeModal.submodalWarning.nombre === 'tienesVendidos' &&
            <WarningTienesVendidos
              redirecciona = {this.llevameA.bind(this)}
              nombre = {nombre}
              listaDescartados = {this.props.storeModal.submodalWarning.listaDescartados}
            />
          }
          {warningBasic &&
            <WarningBasicConfigurable

              nombre = {nombre}
              submodalWarning = {this.props.storeModal.submodalWarning}
            />
          }

        </div>

      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
  }
}

const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    user:state.user,
    storeModal:state.modal,

  }
}

export default connect (stateToProps,dispatchToProps)(ModalWarningContainer)

