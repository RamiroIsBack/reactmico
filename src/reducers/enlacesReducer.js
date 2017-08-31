
import constants from '../constants'

var initialState = {

  listaEnlaces: [],
  enlacesLoaded :false ,

}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.ENLACES_RECEIVED:
    console.log (' from reducer enlaces_RECEIVED: ' +JSON.stringify(action.data))
    newState['enlacesLoaded'] = true
    let list = action.data

    newState['listaEnlaces'] = list
    return newState

  /*case constants.MOVETO_FERIA_SECTION:
    newState['feriaSectionSelected'] = action.data
    return newState
*/
  default:
    return state
  }
}


