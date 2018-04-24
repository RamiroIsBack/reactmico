import React, { Component } from 'react'
import {ModalCreaciones} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'


class ModalCreacionesContainer extends Component {

  componentDidMount() {

    //cargo lalista para que el dropdown menu sea dinamico
    if (this.props.storeCreaciones.creacionesLoaded === false){
      //en la accion ya lo pone a true
      this.props.getCreaciones()
    }
  }

  moveToCreacionesSection(tipoName){
    this.props.moveToCreacionesSection(tipoName)
    this.props.toggleModal('closeCreaciones')
    this.props.navActive('creaciones', 'navbarMicoFront')
  }

  //onMouseOut() Rocks!!
  handleHoverOff(event){
    this.props.toggleModal('closeDropdowns')
  }

  render(){
    var creacionesShowing = false
    var creacionesContenidos = {}

    if (this.props.storeModal){
      creacionesShowing = this.props.storeModal.creacionesShowing
    }
    // Render nothing if the "show" prop is false
    if (!creacionesShowing){
      return null
    }
    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id === 'creaciones'){
        creacionesContenidos = this.props.storeContenidos.listaContenidos[i]
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
            nombreGalego:creacionesContenidos.tipo[tipo].tipoGalego,
            nombre: tipo,
            //urlIcon: creacionesContenidos.tipo[tipo].urlIcon,
          }
        )
      }
    }
    if(creacionList.length ===0){
      return null
    }
    return (

      <div onMouseLeave={this.handleHoverOff.bind(this)} >
        <ModalCreaciones
          show={creacionesShowing}
          onSelect={this.moveToCreacionesSection.bind(this)}
          contenido = {creacionesContenidos}
          creacionList ={creacionList}
          lengua = {this.props.navigation.lengua}
        >
        </ModalCreaciones>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    getCreaciones:()=>dispatch(actions.getCreaciones()),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
    navActive:(navTab,params)=>dispatch(actions.navActive(navTab,params)),
  }
}


const stateToProps = (state) => {
  return{
    navigation:state.navigation,
    storeContenidos: state.contenidos,
    storeModal:state.modal,
    storeCreaciones:state.creacion,
  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalCreacionesContainer)
