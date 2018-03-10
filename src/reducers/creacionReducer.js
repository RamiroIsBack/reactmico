import constants from '../constants'

var initialState = {
  listaCreacionesSinOrdenar: [],
  listaCreaciones: {},
  creacionesLoaded :false ,
  tipoSectionSelected :'allCreaciones',
  carousellItem:{
    tipo:'',
    vendido:'',
    pic:'',
  },
  carousellBackground:{
    listaCarousellBackground:[
      'http://www.wpzoom.com/wp-content/uploads/2017/03/image-center.png',
      'https://davidwalsh.name/demo/background-size-2.jpg',
      '/3.png',
      '/4.png',
    ],
    urlPic:'http://www.wpzoom.com/wp-content/uploads/2017/03/image-center.png',
    num:0,

  }

}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {

  case constants.CREACIONES_RECEIVED:
  //desde
    //console.log (' from reducer CREACIONES_RECEIVED: ' +JSON.stringify(action.data))

    newState['creacionesLoaded'] = true

    //hago un objeto que contiene las listas segun su tipo
    var sorted = {}
    let list = action.data
    for( var i = 0, max = list.length; i < max ; i++ ){
      if( sorted[list[i].tipo] === undefined ){
        sorted[list[i].tipo] = []
      }
      sorted[list[i].tipo].push(list[i])
    }
    newState['listaCreacionesSinOrdenar'] = list
    newState['listaCreaciones'] = sorted
    return newState

  case constants.MOVETO_CREACION_SECTION:
    if(action.data){
      newState['tipoSectionSelected'] = action.data
    }
    console.log (' from reducer tipoSectionSelected:' +action.data)

    return newState

  case constants.MOVE_CAROUSELL:
    // if (newState.listaCreacionesSinOrdenar.length!==0){
    //   newState['carousellItem'] =
    //     {
    //       tipo:newState.listaCreacionesSinOrdenar[action.data].tipo,
    //       vendido:newState.listaCreacionesSinOrdenar[action.data].vendido,
    //       pic:newState.listaCreacionesSinOrdenar[action.data].pic
    //
    //     }
    // }
    if(newState.carousellBackground.listaCarousellBackground.length!==0){

      newState.carousellBackground.urlPic = newState.carousellBackground.listaCarousellBackground[action.data]
      
    }
    return newState

  default:
    return state
  }
}
