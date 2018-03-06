import constants from '../constants'

var initialState = {
  listaUsers: [],
  currentUser: null, // signed in user
  usersLoaded: false,

  currentUserDatos : {
    currentUserDatosEnvio: false,
    currentUserFoto: false,
    currentUserNombre: true,
    currentUserEmail: true,
    currentUserPassword: true,
  }
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {

  case constants.CAMBIAR_CURRENT_USER_MODIFICABLE:
    //currentUserDatosEnvio, currentUserNombre , currentUserfoto en data -> true or false en params
    newState.currentUserDatos[action.data] = action.params
    return newState

  case constants.ADD_USER_INFO:
    //params : okEnvio, okFoto, okNombre
    if (action.params === 'okEnvio'){
      newState.currentUserDatosEnvio = true
    }else if (action.params ==='okFoto'){
      newState.currentUserFoto= true
    }
    newState['currentUser'] = action.data
    //force it to refresh the listausers
    newState['usersLoaded'] = false
    return newState

  case constants.CURRENT_USER_RECEIVED:
    if (action.data === 'null'){
      newState['currentUser'] = null
      return newState
    }else if (action.params === 'error'){
      //el login ha ido mal , dicir algo al respecto
      newState['currentUser'] = null
      return newState
    }else if (action.params ==='okGoogle' || action.params ==='okFacebook'){
      // se ha logeado con google, colocar los datos
      console.log(`${action.data} t has logeado con google o facebook`)
      newState.currentUser= {
        datosPersonales:{
          nombre: action.data.user.displayName,
          email: action.data.user.email,
          phoneNumber: action.data.user.phoneNumber,
          emailVerified:action.data.user.emailVerified,
          providerId: action.data.user.providerData[0].providerId,
          uid: action.data.user.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
        },
        foto:{
          photoURL: action.data.user.photoURL,
        }
      }
      let loTenemos=false
      if(newState.currentUser.foto.photoURL !== null){
        newState.currentUserFoto =true
      }
      for (let i =0; i < newState.listaUsers.length; i++){
        if (newState.listaUsers[i].id === newState.currentUser.datosPersonales.uid){
          //ya lo tenemos en la base de datos le metemos todos los datos
          newState.currentUser= newState.listaUsers[i]
          loTenemos = true
          if(newState.currentUser.datosEnvio.cp){//vale est'a en la DB pero igual est'a todo a false
            //hay datos mostrables en la db, si no lo ubiera , seria false y el user tendr'ia q rellenarlos
            newState.currentUserDatos.currentUserDatosEnvio = true
          }
          break
        }
      }
      if(!loTenemos){
        newState.currentUser.datosEnvio = {
          nombreCompletoEnvio: false,
          calle: false,
          localidad: false,
          provincia: false,
          cp: false,
          newsletter: true,

        }
      }
      newState['usersLoaded'] = false
      return newState
    }else if (action.params ==='okPassword'){
      // se ha logeado con password, colocar los datos
      console.log(`${action.data.displayName} t has logeado con email y password`)
      newState.currentUser= {
        datosPersonales:{
          nombre: action.data.displayName,
          email: action.data.email,
          phoneNumber: action.data.phoneNumber,
          emailVerified: action.data.emailVerified,
          providerId: action.data.providerId,
          uid: action.data.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
        },
        foto:{
          photoURL: action.data.photoURL,
        }
      }
      if(newState.currentUser.foto.photoURL !== null){
        newState.currentUserDatos.currentUserFoto =true
      }
      let loTenemos=false
      for (let i =0; i < newState.listaUsers.length; i++){
        if (newState.listaUsers[i].id === newState.currentUser.datosPersonales.uid){
          // le metemos los datos q ya tenemos en la base de datos
          newState.currentUser= newState.listaUsers[i]
          loTenemos = true
          if(newState.listaUsers[i].datosEnvio.cp){
            newState.currentUserDatos.currentUserDatosEnvio = true
            break
          }
        }
      }
      if(!loTenemos){
        newState.currentUser.datosEnvio = {
          nombreCompletoEnvio: false,
          calle: false,
          localidad: false,
          provincia: false,
          cp: false,
          newsletter: true,

        }
      }
      newState['usersLoaded'] = false
      return newState

    }else{
      newState['currentUser'] = action.data
      return newState
    }


  case constants.USERS_RECEIVED:
    newState['usersLoaded'] = true
    newState['listaUsers'] = action.data
    //console.log('usersloaded '+JSON.stringify(action.data))
    if(newState.currentUser){

      for (let i =0; i < action.data.length; i++){
        if (newState.listaUsers[i].id === newState.currentUser.datosPersonales.uid){
          //ya lo tenemos en la base de datos, lo actualizamos con los nuevos datos
          newState['currentUser'] = newState.listaUsers[i]
          console.log('usersloaded '+JSON.stringify(newState.listaUsers[i]))
          break
        }
      }
    }
    return newState

  case constants.USER_CREATED:
    let currentUser= {
      datosPersonales:{
        nombre: action.data.displayName,
        email: action.data.email,
        phoneNumber: action.data.phoneNumber,
        emailVerified: action.data.emailVerified,
        providerId: action.data.providerId,
        uid: action.data.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
      },
      datosEnvio:{
        nombreCompletoEnvio: false,
        calle: false,
        localidad: false,
        provincia: false,
        cp: false,
        newsletter: action.data.newsletter,
      },
      foto:{
        photoURL: action.data.photoURL,
      },
    }
    if(!newState.currentUser){
      newState['currentUser'] = currentUser
      console.log('from USER_CREATED e iniciada sesion'+JSON.stringify(currentUser.datosPersonales.nombre))
    }else{
      alert('tienes que salir de la sesion anterior primero')
      console.log('from USER_CREATED pero sin iniciar sesion xq ya habia alguien'+JSON.stringify(currentUser.datosPersonales.nombre))
    }
    return newState

  case constants.PASSWORD_CHANGED:
    return newState
  case constants.RESEND_EMAIL:
    return newState
  default:
    return state
  }
}
