import constants from '../constants'

var initialState = {

  listaContenidos: [],
  ContenidosLoaded :false ,
  startHomeOpacity : false,
  stopHomeOpacity:false,
  homeOpacity: 0

}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.CONTENIDOS_RECEIVED:
    //console.log (' from reducer Contenidos_RECEIVED: ' +JSON.stringify(action.data))
    newState['ContenidosLoaded'] = true
    let list = action.data

    newState['listaContenidos'] = list
    newState['startHomeOpacity'] = true
    return newState

  case constants.INCRISE_OPACITY:

    let homeOpacity = action.data
    if(newState.homeOpacity > 0.8){
      newState['stopHomeOpacity'] = true
    }
    newState['homeOpacity'] = homeOpacity

    return newState

  /*case constants.MOVETO_FERIA_SECTION:
    newState['feriaSectionSelected'] = action.data
    return newState
*/
  default:
    return state
  }
}


