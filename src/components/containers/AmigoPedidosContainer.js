import React, { Component } from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'
import {AmigoPedidos} from '../presentational'
class AmigoPedidosContainer extends Component {
  detallesPedido(){

  }
  trackOrder(){

  }
  render() {
    return (
      <div>
        <AmigoPedidos
          detallesPedido={this.detallesPedido.bind(this)}
          trackOrder = {this.trackOrder.bind(this)}
          currentUser = {this.props.users.currentUser}
        >
        </AmigoPedidos>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{

    showNotificationWithTimeout: (modalName) =>dispatch(actions.showNotificationWithTimeout(modalName)),
    addUserInfo: (datos,flag,posibleFoto) => dispatch (actions.addUserInfo(datos,flag,posibleFoto)),
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
export default connect (stateToProps,dispatchToProps)(AmigoPedidosContainer)
