import constants from "../constants";
import { Firebase } from "../utils";
import actions from "./";

export default {
  showNotificationWithTimeout: (
    notificationMaysuculaLaPrimera,
    submodalName
  ) => {
    return dispatch => {
      let modalName = "open";
      modalName = modalName + notificationMaysuculaLaPrimera;
      dispatch(actions.toggleModal(modalName, submodalName));
      setTimeout(() => {
        dispatch(actions.toggleModal("close" + notificationMaysuculaLaPrimera));
      }, 8000);
    };
  },

  cierraCookiesAviso: () => {
    return {
      type: constants.CIERRA_COOKIES_AVISO,
      data: false
    };
  },

  moveCarousell: pic => {
    return {
      type: constants.MOVE_CAROUSELL,
      data: pic
    };
  },
  loadFromInstagram: feedList => {
    return {
      type: constants.LOAD_FROM_INSTAGRAM,
      data: feedList
    };
  },
  chageScreenWidth: screenSize => {
    return {
      type: constants.CHANGE_SCREEN_WIDTH,
      data: screenSize
    };
  },
  fixNavbar: flag => {
    return {
      type: constants.FIX_NAVBAR,
      data: flag
    };
  },
  toggleYear: year => {
    return {
      type: constants.TOGGLE_YEAR,
      data: year
    };
  },
  markerClicked: (markerId, params) => {
    return {
      type: constants.MARKER_CLICKED,
      params: params,
      data: markerId
    };
  },

  navActive: (activeTab, params) => {
    return {
      type: constants.NAV_ACTIVE,
      params: params,
      data: activeTab
    };
  },

  toggleModal: (modalName, submodalName) => {
    return {
      type: constants.TOGGLE_MODAL,
      params: submodalName,
      data: modalName
    };
  },

  moveToCreacionesSection: creacionTipo => {
    return {
      type: constants.MOVETO_CREACION_SECTION,
      data: creacionTipo
    };
  },
  cambiaLengua: id => {
    return {
      type: constants.CAMBIA_LENGUA,
      data: id
    };
  },
  getEnlaces: params => {
    return dispatch => {
      return dispatch(Firebase.getEnlaces(params, constants.ENLACES_RECEIVED));
    };
  },
  getContenidos: params => {
    return dispatch => {
      return dispatch(
        Firebase.getContenidos(params, constants.CONTENIDOS_RECEIVED)
      );
    };
  },

  getCreaciones: params => {
    return dispatch => {
      return dispatch(
        Firebase.getCreaciones(params, constants.CREACIONES_RECEIVED)
      );
    };
  },
  getFerias: params => {
    return dispatch => {
      return dispatch(Firebase.getFerias(params, constants.FERIAS_RECEIVED));
    };
  },
  // Another simple pure action creator
  selectedFoto: foto => {
    // key 'type' is mandatory after that, u can send whatever
    //console.log ('selectedfoto action' + JSON.stringify(foto))
    return {
      type: constants.SELECT_FOTO,
      data: foto
    };
  },
  eraseProduct: indice => {
    // key 'type' is mandatory after that, u can send whatever
    //console.log ('erasing from cart ' + JSON.stringify(indice))
    return {
      type: constants.ERASE_PRODUCT,
      data: indice
    };
  },
  changeQtty: (indice, qtty) => {
    // key 'type' is mandatory after that, u can send whatever
    var data = { indice: indice, qtty: qtty };
    console.log("changing qtty " + JSON.stringify(data));
    return {
      type: constants.CHANGE_QTTY,
      data: data
    };
  },
  productToCart: product => {
    return {
      type: constants.PRODCUT_TO_CART,
      data: product
    };
  },
  guardarDatosPedido: (datosEnvio, carro, paymentData) => {
    return dispatch => {
      return dispatch(
        Firebase.guardarDatosPedido(
          datosEnvio,
          carro,
          paymentData,
          constants.GUARDAR_DATOS_PEDIDO
        )
      );
    };
  },
  elementoVendido: id => {
    return dispatch => {
      return dispatch(Firebase.elementoVendido(id, constants.ELEMENTO_VENDIDO));
    };
  },
  vaciarCarro: () => {
    return dispatch => {
      return dispatch(Firebase.vaciarCarro(constants.LOAD_CARRO));
    };
  },
  loadCarro: (carro, justLogedIn) => {
    //combinar el carro que haya con el de la DB si t acabas de logear
    return dispatch => {
      //si no, simplemente sustituir el de la DB x el nuevo
      return dispatch(
        Firebase.loadCarro(carro, justLogedIn, constants.LOAD_CARRO)
      );
    };
  },
  uploadCarro: carro => {
    return dispatch => {
      //simplemente sustituir el de la DB x el nuevo
      return dispatch(Firebase.uploadCarro(carro, constants.LOAD_CARRO));
    };
  },
  checkEmailVerified: flagEmailVerified => {
    return dispatch => {
      return dispatch(
        Firebase.checkEmailVerified(flagEmailVerified, constants.VERIFY_EMAIL)
      );
    };
  },
  currentUserToDB: user => {
    return dispatch => {
      return dispatch(
        Firebase.currentUserToDB(user, constants.CURRENT_USER_TO_DB)
      );
    };
  },
  addUserInfo: (user, params, posibleFoto) => {
    return dispatch => {
      return dispatch(
        Firebase.addUserInfo(user, params, posibleFoto, constants.ADD_USER_INFO)
      );
    };
  },
  cambiarCurrentUserModificables: (currentUserModificable, params) => {
    return {
      type: constants.CAMBIAR_CURRENT_USER_MODIFICABLE,
      params: params,
      data: currentUserModificable
    };
  },
  userCreated: params => {
    return dispatch => {
      return dispatch(Firebase.userCreated(params, constants.USER_CREATED));
    };
  },

  guardarConsentimientoFGLogin: params => {
    return dispatch => {
      return dispatch(
        Firebase.guardarConsentimientoFGLogin(params, constants.USER_CREATED)
      );
    };
  },

  currentUserRecieved: user => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      data: user
    };
  },

  loginWithEmailAndPassword: params => {
    return dispatch => {
      return dispatch(
        Firebase.loginWithEmailAndPassword(
          params,
          constants.CURRENT_USER_RECEIVED
        )
      );
    };
  },

  loginGoogle: params => {
    return dispatch => {
      return dispatch(
        Firebase.loginGoogle(params, constants.CURRENT_USER_RECEIVED)
      );
    };
  },
  loginFacebook: params => {
    return dispatch => {
      return dispatch(
        Firebase.loginFacebook(params, constants.CURRENT_USER_RECEIVED)
      );
    };
  },
  logout: params => {
    return dispatch => {
      return dispatch(Firebase.logout(params, constants.CURRENT_USER_RECEIVED));
    };
  },
  eliminarCurrentCuenta: params => {
    return dispatch => {
      return dispatch(
        Firebase.eliminarCurrentCuenta(params, constants.CURRENT_USER_RECEIVED)
      );
    };
  },
  amIlogedIn: params => {
    return dispatch => {
      return dispatch(
        Firebase.amIlogedIn(params, constants.CURRENT_USER_RECEIVED)
      );
    };
  },
  changePassword: (newPassword, params) => {
    //params: change or forgot
    return dispatch => {
      return dispatch(
        Firebase.changePassword(newPassword, params, constants.PASSWORD_CHANGED)
      );
    };
  },
  resendEmail: params => {
    return dispatch => {
      return dispatch(Firebase.resendEmail(params, constants.RESEND_EMAIL));
    };
  }
};
