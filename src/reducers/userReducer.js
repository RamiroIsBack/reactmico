import constants from "../constants";

var initialState = {
  listaUsers: [],
  currentUser: null, // signed in user
  usersLoaded: false,

  currentUserDatos: {
    currentUserDatosEnvio: false,
    currentUserFoto: false,
    currentUserNombre: true,
    currentUserEmail: true,
    currentUserPassword: true
  }
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case constants.CAMBIAR_CURRENT_USER_MODIFICABLE:
      //currentUserDatosEnvio, currentUserNombre , currentUserfoto en data -> true or false en params
      newState.currentUserDatos[action.data] = action.params;
      return newState;

    case constants.ADD_USER_INFO:
      //params : okEnvio, okFoto, okNombre, okEmail
      if (action.params === "okEnvio") {
        newState.currentUserDatosEnvio = true;
        newState.currentUser.datosEnvio = action.data;
      } else if (action.params === "okFoto") {
        newState.currentUser.foto = action.data;
        newState.currentUserFoto = true;
      } else if (action.params === "okNombre") {
        newState.currentUser.datosPersonales.nombre = action.data;
      } else if (action.params === "okEmail") {
        newState.currentUser.datosPersonales.email = action.data;
      }

      return newState;

    case constants.CURRENT_USER_RECEIVED:
      if (action.data === null) {
        newState["currentUser"] = null;
        return newState;
      } else if (action.params === "error") {
        //el login ha ido mal , dicir algo al respecto
        newState["currentUser"] = null;
        return newState;
      } else {
        newState.currentUser = action.data;
        if (newState.currentUser.foto.photoURL !== null) {
          newState.currentUserDatos.currentUserFoto = true;
        }
        if (newState.currentUser.datosEnvio.cp) {
          newState.currentUserDatos.currentUserDatosEnvio = true;
        }
        return newState;
      }

    case constants.USERS_RECEIVED:
      newState["usersLoaded"] = true;
      newState["listaUsers"] = action.data;
      //console.log('usersloaded '+JSON.stringify(action.data))
      if (newState.currentUser) {
        for (let i = 0; i < action.data.length; i++) {
          if (
            newState.listaUsers[i].id ===
            newState.currentUser.datosPersonales.uid
          ) {
            //ya lo tenemos en la base de datos, lo actualizamos con los nuevos datos
            newState["currentUser"] = newState.listaUsers[i];
            console.log(
              "usersloaded " + JSON.stringify(newState.listaUsers[i])
            );
            break;
          }
        }
      }
      return newState;

    case constants.USER_CREATED: {
      if (!newState.currentUser) {
        newState["currentUser"] = action.data;
        console.log(
          "from USER_CREATED e iniciada sesion" +
            JSON.stringify(action.data.datosPersonales.nombre)
        );
      } else {
        alert("tienes que salir de la sesion anterior primero");
        console.log(
          "from USER_CREATED pero sin iniciar sesion xq ya habia alguien" +
            JSON.stringify(action.data.datosPersonales.nombre)
        );
      }
      return newState;
    }

    case constants.VERIFY_EMAIL: {
      if (action.params === "mailNoVerificado") {
        //alert('tu email aún no ha sido verificado, porfavor busca el email en tu correo electrónico (puede que esté en correo no deseado) o si quieres te lo volvemos a mandar ,pincha en "email no verificado" en tu zona personal')
      } else {
        newState.currentUser.datosPersonales.emailVerified = action.data;
      }
      return newState;
    }
    case constants.PASSWORD_CHANGED:
      return newState;
    case constants.RESEND_EMAIL:
      return newState;
    default:
      return state;
  }
};
