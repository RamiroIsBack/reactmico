import React, { Component } from 'react'
import {ModalMenuXs} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'


class ModalMenuXsContainer extends Component {

  componentDidMount() {
    //no hago nada d esto xq ya los cargo en los otros modales y da la casualidad
    //de que en el feriasReducer entra a la vez 2 veces y me carga el doble de ferias

    /*if (this.props.storeContenidos.ContenidosLoaded == false){
      //en la accion ya lo pone a true
      this.props.getContenidos()
    }
    //cargo lalista para que el dropdown menu sea dinamico
    if (this.props.storeCreaciones.CreacionesLoaded == false){
      //en la accion ya lo pone a true
      this.props.getCreaciones()
    }
    if (this.props.storeFerias.FeriasLoaded == false){
      //en el reducer ya lo pone a true
      this.props.getFerias()
    }*/
  }

  moveToCreacionesSection(Name){
    this.props.moveToCreacionesSection(Name)
    this.props.toggleModal('closeMenuXs')
  }
  moveToFeriasSection(Name){
    this.props.moveToFeriasSection(Name)
    this.props.toggleModal('closeMenuXs')
  }

  toggleModal(){
    this.props.toggleModal('closeMenuXs')
  }
  render(){
    var menuXsShowing = false
    var creacionesContenidos = {}
    var feriasContenidos = {}

    if (this.props.storeModal){
      menuXsShowing = this.props.storeModal.menuXsShowing
    }
    // Render nothing if the "show" prop is false
    if (!menuXsShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id == 'creaciones'){
        creacionesContenidos = this.props.storeContenidos.listaContenidos[i]

      }
      if (this.props.storeContenidos.listaContenidos[i].id == 'ferias'){
        feriasContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }
    let creacionDB =this.props.storeCreaciones.listaCreaciones

    var creacionList =[]
    //TODO:
    //si lista.length > 3 hacer 2 filas con el conditional rendering
    //valorar hacer 2 componentes presentational

    for (var tipo in creacionDB) {
      if (creacionDB.hasOwnProperty(tipo)) {

        creacionList.push (
          {
            nombre: tipo,
            urlIcon: creacionesContenidos.tipo[tipo].urlIcon,
          }
        )
      }
    }
    let feriaDB = this.props.storeFerias.listaFerias



    return (

      <div>
        <ModalMenuXs show={menuXsShowing} onSelectCreaciones={this.moveToCreacionesSection.bind(this)} onSelectFerias={this.moveToFeriasSection.bind(this)} onClose={this.toggleModal.bind(this)} creacionesContenidos = {creacionesContenidos} feriasContenidos = {feriasContenidos} creacionList ={creacionList} feriaDB = {feriaDB}>
        </ModalMenuXs>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    getFerias:()=>dispatch(actions.getFerias()),
    getCreaciones:()=>dispatch(actions.getCreaciones()),
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
    moveToFeriasSection: (feriaName)=>dispatch(actions.moveToFeriasSection(feriaName)),
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
    storeCreaciones: state.creacion,
    storeFerias:state.feria,

  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalMenuXsContainer)
