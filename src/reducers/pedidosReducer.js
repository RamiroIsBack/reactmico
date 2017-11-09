import constants from '../constants'

var initialState = {
  pedidosList:[],
  numPedidos: 0,

}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {

  case constants.GUARDAR_DATOS_PEDIDO:
    console.log (' from reducer GUARDAR_DATOS_PEDID: ' +JSON.stringify(action.data))
    if(action.params === 'okPedidosReady'){//solo lo he subido a la DB

    }else if (action.params === 'okPedido'){//he cogido de la DB as'i q hay q meterlo en pedidosList
      newState.pedidosList = action.data
      newState.numPedidos = action.data.length

    }
    return newState


  default:
    return state
  }
}
