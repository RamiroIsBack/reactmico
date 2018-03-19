
import constants from '../constants'

var initialState = {
  cartList:[],
  numProducts: 0,
  precioSubTotal : 0,
  envio : 0,

  amigoNavActive : {
    datosActive:false,
    pedidosActive:false,
  },
  navbarMicoFrontActive : {
    creaciones : false,
    ferias : false,
    conocenos: false,
    currentUser: false,
    carro: false,
  },
  sticky: false,
  paddingTop4navbar:{
    paddingTop:60
  },
  screenSize: 'laptop', //or mobile

}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {

  case constants.NAV_ACTIVE:
    if (action.params ==='navbarMicoFront'){
      newState.navbarMicoFrontActive = {
        creaciones : false,
        ferias : false,
        conocenos: false,
        currentUser: false,
        carro: false,
      }
      if(action.data !==''){
        newState.navbarMicoFrontActive[action.data]= true
      }
    }
    if (action.params==='amigoNav'){
      if(action.data ==='datos'){
        newState.amigoNavActive.datosActive =true
        newState.amigoNavActive.pedidosActive = false
      }else if(action.data ==='pedidos'){
        newState.amigoNavActive.pedidosActive = true
        newState.amigoNavActive.datosActive = false
      }
    }
    return newState

  case constants.CHANGE_SCREEN_WIDTH:

    newState.screenSize = action.data
    console.log('chageScreenWidth: '+action.data)
    return newState

  case constants.FIX_NAVBAR:
    newState.sticky = action.data
    console.log('fixNavbar: '+action.data)
    return newState

  default:
    return state
  }
}
