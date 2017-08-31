import constants from '../constants'
//the brogrammer i'm following calls copy to d text inside a webpage so do I now :P
var initialState = {
  registrarseShowing :false ,
  creacionesShowing : false,
  feriasShowing : false,
  menuXsShowing : false,
  trabajandoShowing : false,
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.TOGGLE_MODAL:
    //closeRegistrarse///////////openRegistrarse
    if (action.data == 'closeRegistrarse'){
      newState['registrarseShowing'] = false
    }
    else if (action.data == 'openRegistrarse'){
      newState['registrarseShowing'] = true
    }
    //ferias
    else if (action.data == 'closeFerias'){
      newState['feriasShowing'] = false
    }
    else if (action.data == 'openFerias'){
      newState['feriasShowing'] = true
    }
    //creaciones
    else if (action.data == 'closeCreaciones'){
      newState['creacionesShowing'] = false
    }
    else if (action.data == 'openCreaciones'){
      newState['creacionesShowing'] = true
    }
    //si toca fuera de los dialogos de dropdown es que quiere pasar de ellos as'i q los cierro
    //tb con el hoover off en version desktop
    else if (action.data == 'closeDropdowns'){
      newState['creacionesShowing'] = false
      newState['feriasShowing'] = false
    }
    // el menuXs blokea todo como el registrarse
    else if(action.data == 'openMenuXs'){
      newState['menuXsShowing'] = true
    }else if(action.data == 'closeMenuXs'){
      newState['menuXsShowing'] = false
    }
    //aqui viene el abrir y cerrar el de trabajando en ello, es con time-out pero al reducer le da igual
    else if(action.data == 'openTrabajando'){
      newState['trabajandoShowing'] = true
    }else if(action.data == 'closeTrabajando'){
      newState['trabajandoShowing'] = false
    }



    //desde
    console.log (' from reducer TOGGLE_MODAL: ' +JSON.stringify(action.data) + 'menuXsShowing: '+ newState.menuXsShowing)

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

