import constants from '../constants'
//the brogrammer i'm following calls copy to d text inside a webpage so do I now :P
var initialState = {
  registrarseShowing :false ,
  creacionesShowing : false,
  lenguaShowing : false,
  menuXsShowing : false,
  warningShowing : false,
  menuLoginShowing: false,
  menuEntrarShowing:false,
  realizarCompraShowing: false,

  submodalWarning: '',
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.TOGGLE_MODAL:
    //closeRegistrarse///////////openRegistrarse
    if (action.data === 'closeRegistrarse'){
      newState['registrarseShowing'] = false
    }
    else if (action.data === 'openRegistrarse'){
      newState['registrarseShowing'] = true
    }
    //lengua
    else if (action.data === 'closeLengua'){
      newState['lenguaShowing'] = false
    }
    else if (action.data === 'openLengua'){
      newState['lenguaShowing'] = true
    }
    //creaciones
    else if (action.data === 'closeCreaciones'){
      newState['creacionesShowing'] = false
    }
    else if (action.data === 'openCreaciones'){
      newState['creacionesShowing'] = true
    }
    //login
    else if (action.data === 'closeLogin'){
      newState['menuLoginShowing'] = false
    }
    else if (action.data === 'openLogin'){
      newState['menuLoginShowing'] = true
    }
    //entrar cuando ya tengo un usuario
    if (action.data === 'closeEntrar'){
      newState['menuEntrarShowing'] = false
    }
    else if (action.data === 'openEntrar'){
      newState['menuEntrarShowing'] = true
    }
    //si toca fuera de los dialogos de dropdown es que quiere pasar de ellos as'i q los cierro
    //tb con el hoover off en version desktop
    else if (action.data === 'closeDropdowns'){
      newState['creacionesShowing'] = false
      newState['lenguaShowing'] = false
      newState['menuLoginShowing'] = false
    }
    // el menuXs blokea todo como el registrarse
    else if(action.data === 'openMenuXs'){
      newState['menuXsShowing'] = true
    }else if(action.data === 'closeMenuXs'){
      newState['menuXsShowing'] = false
    }
    //aqui viene el abrir y cerrar el de trabajando en ello, es con time-out pero al reducer le da igual
    else if(action.data === 'openWarning'){
      newState['warningShowing'] = true
      newState.submodalWarning = action.params

    }else if(action.data === 'closeWarning'){
      newState['warningShowing'] = false
      newState.submodalWarning=''
    }
    //abrir cerrar el proceso de compra
    else if(action.data === 'openRealizarCompra'){
      newState['realizarCompraShowing'] = true
    }else if(action.data === 'closeRealizarCompra'){
      newState['realizarCompraShowing'] = false
    }

    return newState

  /*case constants.MOVETO_CREACION_SECTION:
    newState['tipoSectionSelected'] = action.data
    console.log (' from reducer tipoSectionSelected:' +action.data)

    return newState
*/
  default:
    return state
  }
}
