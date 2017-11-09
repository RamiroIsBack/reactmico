import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'
import style from './styles'

class AmigoNavContainer extends Component {
  constructor(){
    super()
    this.state = {

    }
  }
  cambiaTab(e){
    if(e.target.id === 'pedidos'){
      this.props.navActive(e.target.id, 'amigoNav')
    }else if (e.target.id === 'datos'){
      this.props.navActive(e.target.id, 'amigoNav')
    }
  }
  render() {
    let pathDatos ='/Amigo/Datos'
    let pathPedidos ='/Amigo/Pedidos'
    // para saber donde estamos del path
    let datosActive = ''
    let datosEstilo = { color:'grey'}
    let pedidosEstilo = { color:'grey'}
    let pedidosActive = ''
    if(this.props.navigation){

      if (this.props.navigation.amigoNavActive.datosActive){
        datosActive = 'active'
        datosEstilo = {borderTop:'2px solid black', color:'black'}

      }else if (this.props.navigation.amigoNavActive.pedidosActive){
        pedidosActive = 'active'
        pedidosEstilo={borderTop:'2px solid black', color:'black'}
      }
    }

    return (
      <div>
        <button onClick={this.props.logout} className = 'btn glyphicon glyphicon glyphicon-log-out pull-right'
          style = {{background: 'white', border: '1px solid'}}></button>
        <h6 className = ' pull-right' style = {{marginRight : 2}}>Cerrar sesión </h6>
        <ul className='nav nav-tabs'>
          <li id= 'datos' className={datosActive} onClick= {this.cambiaTab.bind(this)}>
            <NavLink style = {datosEstilo} id= 'datos' to ={pathDatos}>Datos</NavLink>
          </li>
          <li id = 'pedidos' className={pedidosActive} onClick= {this.cambiaTab.bind(this)}>
            <NavLink style = {pedidosEstilo} id = 'pedidos' to ={pathPedidos}>Pedidos</NavLink>
          </li>



        </ul>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
    getContenidos:()=>dispatch(actions.getContenidos()),
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
    carro:state.carro,
    storeContenidos: state.contenidos,
    users: state.user,
    storeModal:state.modal,
    navigation: state.navigation,
  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(AmigoNavContainer)
