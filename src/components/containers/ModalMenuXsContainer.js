import React, { Component } from 'react'
import {ModalMenuXs} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'


class ModalMenuXsContainer extends Component {


  moveToCreacionesSection(Name){
    this.props.moveToCreacionesSection(Name)
    this.props.toggleModal('closeMenuXs')
  }

  toggleModal(){
    this.props.toggleModal('closeMenuXs')
  }
  render(){
    var menuXsShowing = false
    var creacionesContenidos = {}

    if (this.props.storeModal){
      menuXsShowing = this.props.storeModal.menuXsShowing
    }
    // Render nothing if the "show" prop is false
    if (!menuXsShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id === 'creaciones'){
        creacionesContenidos = this.props.storeContenidos.listaContenidos[i]

      }
    }
    let creacionDB =this.props.storeCreaciones.listaCreaciones

    var creacionList =[]

    for (var tipo in creacionDB) {
      if (creacionDB.hasOwnProperty(tipo)) {

        creacionList.push (
          {
            nombre: tipo,
          }
        )
      }
    }


    return (

      <div>
        <ModalMenuXs show={menuXsShowing} onSelectCreaciones={this.moveToCreacionesSection.bind(this)}  onClose={this.toggleModal.bind(this)} creacionesContenidos = {creacionesContenidos} creacionList ={creacionList} >
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
