
import constants from '../constants'

var initialState = {

  listaEnlaces: [],
  enlacesLoaded :false ,
  instagramFeedList:[],
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
  case constants.LOAD_FROM_INSTAGRAM:
    newState.instagramFeedList = action.data
    return newState

  case constants.ENLACES_RECEIVED:
    //console.log (' from reducer enlaces_RECEIVED: ' +JSON.stringify(action.data))
    newState['enlacesLoaded'] = true
    let list = action.data

    newState['listaEnlaces'] = list
    return newState

  default:
    return state
  }
}
