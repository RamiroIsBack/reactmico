import constants from '../constants'

var initialState = {

  listaFerias: [],
  FeriasLoaded :false ,
  feriaSectionSelected : 'allFerias',
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {

  case constants.FERIAS_RECEIVED:

    newState['FeriasLoaded'] = true
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

    //las ferias mas nuevas abajo (si cambio el 1 y el -1 seria al reves)
    //lo paso a formato yyyy/mm/dd para poder operar con Date Object y miro a ver si est'a en curso o est'a caducada
    for (let i = 0; i < list.length; i++) {
      let date = list[i].fecha
      let parts = date.split('/')
      //                       year        month         day
      let feriaDate = new Date(parts[2], parts[1] - 1, parts[0])

      //no lo uso aqui ahora pero as'i seria copiar un objeto
      //let copyList = Object.assign([],this.state.list)

      //calculo el final de la feria segun sus dias d duracion
      let finalFeriaDate =  new Date(parts[2], parts[1] - 1, parts[0])
      let duracion = list[i].duracion
      finalFeriaDate.setTime( finalFeriaDate.getTime() + duracion * 86400000 )
      list[i].fechaFinal = finalFeriaDate
      let diaHoy = new Date()

      if (feriaDate < diaHoy && diaHoy < list[i].fechaFinal){
        list[i].enCurso = true
      }else{
        list[i].enCurso = false
      }
      if (finalFeriaDate < diaHoy){
        list[i].caducada = true
      }else{
        list[i].caducada = false
      }
    }

    newState['listaFerias'] = list
    return newState

  case constants.MOVETO_FERIA_SECTION:
    if(action.data){
      newState['feriaSectionSelected'] = action.data
    }
    return newState

  default:
    return state
  }
}

