import constants from '../constants'

var initialState = {

  listaFerias: [],
  feriasLoaded :false ,
  feriaSectionSelected : 'allFerias',
  idFeriaShowing : '',
  openYear: '',
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.TOGGLE_YEAR://action.data= id de feria selected

    newState['openYear'] = action.data
    return newState

  case constants.MARKER_CLICKED:{//action.data= id de feria selected
    for (let i =0 ;i<newState.listaFerias.length;i++){
      if(action.data === newState.listaFerias[i].id){
        newState.listaFerias[i].showInfo = true
        newState['idFeriaShowing'] = action.data
        let parts = newState.listaFerias[i].fecha.split('/')
        newState['openYear'] = parts[2]
      }else{
        newState.listaFerias[i].showInfo = false
      }
    }
  }
    return newState

  case constants.FERIAS_RECEIVED: {

    newState['feriasLoaded'] = true
    let list = action.data
    //sort it by date,by day, then month, then year (y esto funciona en serio??)
    //it did work
    for(let i=0;i<=2; i++){
      list.sort(function(a, b){

        a = a.fecha.split('/')
        b = b.fecha.split('/')

        return a[i]>b[i] ? 1 : a[i]<b[i] ? -1 : 0
      })
    }
    //lo paso a formato yyyy/mm/dd para poder operar con Date Object y miro a ver si est'a en curso o est'a caducada
    let firstNoCaducada = true //flag to set the idFeriaShowing

    for (let i = 0; i < list.length; i++) {
      let date = list[i].fecha
      let parts = date.split('/')
      //                       year        month         day
      let feriaDate = new Date(parts[2], parts[1] - 1, parts[0])

      //ahora con la fecha final
      let parts2 = list[i].fechaFinal.split('/')
      //                             year        month         day
      let finalFeriaDate = new Date(parts2[2], parts2[1] - 1, parts2[0])

      let diaHoy = new Date()


      if (finalFeriaDate < diaHoy){
        list[i].caducada = true
      }else{
        list[i].caducada = false
        if(firstNoCaducada){//muestro la feria mas proxima y hago visible su agno
          firstNoCaducada = false
          newState['idFeriaShowing'] = list[i].id
          newState['openYear'] = parts[2]
          list[i].showInfo = true
        }
      }
      if (feriaDate < diaHoy && diaHoy < list[i].fechaFinal){
        list[i].enCurso = true
      }else{
        list[i].enCurso = false
      }
    }
    //me aseguro de que se muestren por lo menos 3 ferias en el mapa
    if(list.length>=3){
      if(list[list.length-3].caducada){
        list[list.length-3].mostrarCaducada=true

        if(list[list.length-2].caducada){
          list[list.length-2].mostrarCaducada=true
          if(list[list.length-1].caducada){
            list[list.length-1].mostrarCaducada=true
            newState['idFeriaShowing'] = list[list.length-1].id
            list[list.length-1].showInfo=true
            let date = list[list.length-1].fecha
            let parts = date.split('/')
            newState['openYear'] = parts[2]
          }
        }
      }
    }

    newState['listaFerias'] = list
    return newState
  }

  case constants.MOVETO_FERIA_SECTION:{
    if(action.data){
      newState['feriaSectionSelected'] = action.data
    }
    return newState
  }

  default:
    return state
  }
}
