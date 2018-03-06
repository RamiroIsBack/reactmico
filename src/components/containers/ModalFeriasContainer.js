import React, { Component } from 'react'
import {ModalFerias} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'


class ModalFeriasContainer extends Component {

  componentDidMount() {

    //cargo la lista para que el dropdown menu sea dinamico

    if (this.props.storeFerias.FeriasLoaded === false){
      //en el reducer ya lo pone a true
      this.props.getFerias()
    }
  }

  moveToFeriasSection(feriaName){
    this.props.toggleModal('closeFerias')
    this.props.moveToFeriasSection(feriaName)
    this.props.navActive('ferias', 'navbarMicoFront')
  }

  //onMouseOut() Rocks!!
  handleHoverOff(event){
    this.props.toggleModal('closeDropdowns')
  }

  render(){
    var feriasShowing = false
    var feriasContenidos = {}

    if (this.props.storeModal){
      feriasShowing = this.props.storeModal.feriasShowing
    }
    // Render nothing if the "show" prop is false
    if (!feriasShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id === 'ferias'){
        feriasContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }

    let feriaDB = this.props.storeFerias.listaFerias

    return (

      <div onMouseLeave={this.handleHoverOff.bind(this)} >
        <ModalFerias show={feriasShowing} onSelect={this.moveToFeriasSection.bind(this)} contenido = {feriasContenidos} feriaDB = {feriaDB}>
        </ModalFerias>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    getFerias:()=>dispatch(actions.getFerias()),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    moveToFeriasSection: (feriaName)=>dispatch(actions.moveToFeriasSection(feriaName)),
    navActive:(navTab,params)=>dispatch(actions.navActive(navTab,params)),
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
    storeFerias:state.feria,
  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalFeriasContainer)
