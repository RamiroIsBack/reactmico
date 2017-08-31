import constants from '../constants'

var initialState = {

  selectedFoto: null,
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.SELECT_FOTO:
  //desde
    //console.log (' from reducer SELECT_FOTO: ' +JSON.stringify(action.data))
    newState['selectedFoto'] = action.data
    return newState


  default:
    return state
  }
}
