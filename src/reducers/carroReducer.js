import constants from '../constants'

var initialState = {
  cartList:[],
  numProducts: 0,
  precioSubTotal : 0,
  envio : 15,
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)
  let unidadesTotales = 0
  let precioSubTotal = 0
  let repe = false
  switch (action.type) {

  case constants.PRODCUT_TO_CART:
    newState['cartList'].forEach((value,index)=>{
      //  para evitar duplicados
      if(value.id == action.data.id){
        repe =true
      }
    })
    console.log (' from reducer PRODCUT_TO_CART: '+ repe)
    if (!repe){
      //es nuevo en el carro lo pongo a 1 x si venia ya con unidades
      action.data.unidades = 1
      newState['cartList'].push(action.data)
      //saco el numero total de elementos de cada '.unidades'
      newState['cartList'].forEach((value,index)=>{
        unidadesTotales += value.unidades
        precioSubTotal += value.precio * value.unidades
      })
      newState['numProducts'] = unidadesTotales
      newState['precioSubTotal'] = precioSubTotal
      //console.log (' from reducer PRODCUT_TO_CART: ' +JSON.stringify(action.data.id))
    }
    return newState

  case constants.ERASE_PRODUCT :
    //'splice' actualiza el array 'delete' meteria un undefined
    //splice (a partir de este , quita '1')
    newState['cartList'].splice(action.data,1)
    //saco el numero total de elementos de cada '.unidades'
    newState['cartList'].forEach((value,index)=>{
      unidadesTotales += value.unidades
      precioSubTotal += value.precio * value.unidades
    }
    )
    newState['numProducts'] = unidadesTotales
    newState['precioSubTotal'] = precioSubTotal
    return newState

  case constants.CHANGE_QTTY:

    if(action.data.qtty == 1){
      newState['cartList'][action.data.indice].unidades += 1

    }else{
      if(newState['cartList'][action.data.indice].unidades > 1){
        newState['cartList'][action.data.indice].unidades -= 1
      }
    }
    //saco el numero total de elementos de cada '.unidades'
    newState['cartList'].forEach((value,index)=>{
      unidadesTotales += value.unidades
      precioSubTotal += value.precio * value.unidades
    }
    )
    newState['numProducts'] = unidadesTotales
    newState['precioSubTotal'] = precioSubTotal

    console.log (' from reducer PRODCUT_TO_CART: ' +JSON.stringify(newState['cartList'][action.data.indice]))
    return newState

  case constants.LOAD_CARRO:
    //se ha combinado con el de la base de datos el carro provisional de antes de logearse si lo habia
    //se ha cargado el carro de user
    if(action.params === 'okCarroReady'){//solo lo he subido a la DB

    }else if (action.params === 'okCarro'){//he cogido de la DB as'i q hay q meterlo en cartList
      newState.cartList = action.data
      newState.numProducts = action.data.length

      newState['cartList'].forEach((value,index)=>{
        //en realidad no estoy dejando q suban unidades pero lo dejo preparado xa el futuro x si acaso
        unidadesTotales += value.unidades
        precioSubTotal += value.precio * value.unidades
      })
      newState['precioSubTotal'] = precioSubTotal
    }else if(action.params === 'okCarroVacio'){//se ha realizado una compra hay q vaciar el carro
      newState['cartList'] = []
      newState['numProducts'] = 0
    }
    return newState

  default:
    return state
  }
}
