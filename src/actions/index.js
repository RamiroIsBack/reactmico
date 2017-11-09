import constants from '../constants'
import { TurboClient } from '../utils'
import { Firebase } from '../utils'
import actions from './'

export default {

  // A VER Q PUEEDO HACER ESTO LLAMANDO AL TOGGLEMODAL, NO NECESITO LOS HIDE AND SHOW NOTIFICATION
  showNotificationWithTimeout: (notificationMaysuculaLaPrimera) => {
    return dispatch => {
      let modalName = 'open'
      modalName = modalName +notificationMaysuculaLaPrimera
      dispatch(actions.toggleModal(modalName))
      setTimeout(() => {
        dispatch(actions.toggleModal('close'+notificationMaysuculaLaPrimera))
      }, 8000)
    }
  },

  //info interesante -> https://github.com/reactjs/redux/issues/291

  //intentando hacer una acion asincrona
  //Redux Thunk middleware will give it  dispatch as an argument. It will also “swallow” such actions (firebase.getCreaciones does d async action)

  //ALSO
  //Fortunately, Redux Thunk offers you a way to read the current state of the Redux store. In addition to dispatch, it also passes getState as the second argument to the function you return from your thunk action creator


  navActive:(activeTab,params) =>{
    return{
      type: constants.NAV_ACTIVE,
      params: params,
      data: activeTab,
    }
  },

  toggleModal: (modalName) => {
    return {
      type: constants.TOGGLE_MODAL,
      data: modalName,
    }
  },

  moveToCreacionesSection:(creacionTipo)=>{
    return{
      type: constants.MOVETO_CREACION_SECTION,
      data: creacionTipo
    }
  },
  moveToFeriasSection: (feriaName)=>{
    return{
      type: constants.MOVETO_FERIA_SECTION,
      data: feriaName
    }

  },
  getEnlaces: (params)=>{
    return dispatch => {
      return dispatch(Firebase.getEnlaces(params, constants.ENLACES_RECEIVED))
    }

  },
  getContenidos: (params)=>{
    return dispatch => {
      return dispatch(Firebase.getContenidos(params, constants.CONTENIDOS_RECEIVED))
    }

  },

  getCreaciones: (params)=>{
    return dispatch => {
      return dispatch(Firebase.getCreaciones(params, constants.CREACIONES_RECEIVED))
    }

  },
  getFerias: (params)=>{
    return dispatch => {
      return dispatch (Firebase.getFerias(params, constants.FERIAS_RECEIVED))
    }
  },
  // Another simple pure action creator
  selectedFoto: (foto) => {
    // key 'type' is mandatory after that, u can send whatever
    //console.log ('selectedfoto action' + JSON.stringify(foto))
    return {
      type: constants.SELECT_FOTO,
      data: foto
    }

  },
  eraseProduct: (indice) => {
    // key 'type' is mandatory after that, u can send whatever
    //console.log ('erasing from cart ' + JSON.stringify(indice))
    return {
      type: constants.ERASE_PRODUCT,
      data: indice
    }

  },
  changeQtty: (indice,qtty) => {
    // key 'type' is mandatory after that, u can send whatever
    var data = {indice: indice, qtty: qtty}
    console.log ('changing qtty ' + JSON.stringify(data))
    return {
      type: constants.CHANGE_QTTY,
      data: data
    }

  },
  productToCart: (product) => {

    return {
      type: constants.PRODCUT_TO_CART,
      data: product
    }


  },
  guardarDatosPedido:(carro,paymentData) =>{
    return dispatch =>{
      return dispatch(Firebase.guardarDatosPedido(carro,paymentData,constants.GUARDAR_DATOS_PEDIDO))
    }

  },
  vaciarCarro:() =>{
    return dispatch => {
      return dispatch (Firebase.vaciarCarro(constants.LOAD_CARRO))
    }
  },
  loadCarro:(carro,justLogedIn) =>{//combinar el carro que haya con el de la DB si t acabas de logear
    return dispatch=> {            //si no, simplemente sustituir el de la DB x el nuevo
      return dispatch(Firebase.loadCarro(carro,justLogedIn,constants.LOAD_CARRO))
    }
  },
  currentUserToDB : (user) => {
    return dispatch => {
      return dispatch(Firebase.currentUserToDB( user, constants.CURRENT_USER_TO_DB))
    }
  },
  addUserInfo: (user , params, posibleFoto) => {
    return dispatch => {
      return dispatch(Firebase.addUserInfo(user, params, posibleFoto, constants.ADD_USER_INFO))
    }
  },
  cambiarCurrentUserModificables : (currentUserModificable, params) => {
    return {
      type: constants.CAMBIAR_CURRENT_USER_MODIFICABLE,
      params: params,
      data: currentUserModificable
    }
  },
  userCreated: (params)=>{
    return dispatch => {
      return dispatch(Firebase.userCreated(params, constants.USER_CREATED))
    }

  },
  getUsers: (params)=>{
    return dispatch => {
      return dispatch(Firebase.getUsers(params, constants.USERS_RECEIVED))
    }

  },
  currentUserRecieved: (user) => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      data: user
    }
  },

  fetchUsers: (params) => {
    return dispatch => {
      return dispatch(TurboClient.getRequest('user', params, constants.USERS_RECEIVED))
    }
  },


  loginWithEmailAndPassword: (params) => {
    return dispatch => {
      return dispatch(Firebase.loginWithEmailAndPassword(params, constants.CURRENT_USER_RECEIVED))
    }
  },

  loginGoogle :(params) =>{
    return dispatch => {
      return dispatch (Firebase.loginGoogle(params,constants.CURRENT_USER_RECEIVED))
    }
  },
  loginFacebook :(params) =>{
    return dispatch => {
      return dispatch (Firebase.loginFacebook(params,constants.CURRENT_USER_RECEIVED))
    }
  },
  logout :(params) =>{
    return dispatch => {
      return dispatch (Firebase.logout(params,constants.CURRENT_USER_RECEIVED))
    }
  },
  changePassword : (newPassword,params)=>{
    //params: change or forgot
    return dispatch =>{
      return dispatch(Firebase.changePassword(newPassword,params, constants.PASSWORD_CHANGED))
    }
  },
  resendEmail:(params)=>{
    return dispatch =>{
      return dispatch(Firebase.resendEmail(params, constants.RESEND_EMAIL))
    }
  },
}
