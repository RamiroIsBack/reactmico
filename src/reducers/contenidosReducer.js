import constants from '../constants'

var initialState = {

  listaContenidos: [],
  ContenidosLoaded :false ,

  carousellBackground:{
    urlPic:'',
    num:0,

  }
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.CONTENIDOS_RECEIVED:{
    //console.log (' from reducer Contenidos_RECEIVED: ' +JSON.stringify(action.data))
    newState['ContenidosLoaded'] = true
    let list = action.data

    newState['listaContenidos'] = list
    newState['startHomeOpacity'] = true
    return newState
  }
  case constants.MOVE_CAROUSELL:{

    if(newState.listaContenidos.length!==0){
      for (let i = 0 ; i < newState.listaContenidos.length ; i++) {
        let carousellObjectList= newState.listaContenidos[i]
        if(carousellObjectList.id ==='carousell'){
          let numpic = action.data+1 //empieza en pic1 hasta pic4 no en 0
          let CarousellObject = 'pic'+numpic
          newState.carousellBackground.urlPic = carousellObjectList[CarousellObject].urlPicCarousell

          newState.carousellBackground.num =action.data
        }
      }
    }
    return newState
  }

  default:
    return state
  }
}
