import React, { Component } from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import {Pedido} from '../presentational'
class AmigoPedidosContainer extends Component {

  trackOrder(urlToGo){
    window.open(urlToGo,'_blank')
  }
  render() {
    let pedidos= {}
    let listaPedidos =[]
    if(this.props.users.currentUser){

      if(this.props.users.currentUser.pedidos){
        pedidos = this.props.users.currentUser.pedidos
        for (var id in pedidos) {
          if (pedidos.hasOwnProperty(id)) {

            listaPedidos.push(

              <Pedido
                key = {id}
                id ={id}
                pedido={pedidos[id]}
                trackOrder = {this.trackOrder.bind(this)}

              >
              </Pedido>

            )
          }
        }
      }
    }

    return (
      <div>
        {listaPedidos.length=== 0 &&
          <h4 style= {{textAlign:'center',padding:'30px'}}>
            no has realizado ningún pedido todavía
          </h4>
        }
        <div className = 'container'>
          {listaPedidos}
        </div>
    </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{

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

export default connect (stateToProps,dispatchToProps)(AmigoPedidosContainer)
