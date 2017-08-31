import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyClcb4B5oRktWDQWGU8Ev4hgYm5p_NXgL4',
  authDomain: 'mico-62a9a.firebaseapp.com',
  databaseURL: 'https://mico-62a9a.firebaseio.com',
  projectId: 'mico-62a9a',
  storageBucket: 'mico-62a9a.appspot.com',
  messagingSenderId: '307587845773'
}
firebase.initializeApp(config)
const database =firebase.database()

const DBferias = database.ref('ferias/')
const DBcreaciones = database.ref('creaciones/')
const DBcontenidos = database.ref('contenidos/')
const DBenlaces = database.ref('enlaces/')
var listCreaciones = []
var listFerias =[]
var listContenidos = []
var listEnlaces = []

const getCreaciones = (params, actionType) => {
  return dispatch => DBcreaciones.once('value')
    .then(snapshot => {
      snapshot.forEach(function(childSnapshot){
        const valor = childSnapshot.val()
        valor.id = childSnapshot.key
        listCreaciones.push(valor)
      })
      if (actionType != null){
        dispatch({
          type: actionType,
          params: params, // can be null
          data: listCreaciones, // list with all d objects
        })
      }

      return snapshot.val()
    })
    .catch(err => {
      throw err
    })
}
const getFerias = (params, actionType) => {
  return dispatch => DBferias.once('value')
    .then(snapshot => {
      snapshot.forEach(function(childSnapshot){
        const valor = childSnapshot.val()
        valor.id = childSnapshot.key
        listFerias.push(valor)
      })
      if (actionType != null){
        dispatch({
          type: actionType,
          params: params, // can be null
          data: listFerias, // list with all d objects
        })
      }

      return snapshot.val()
    })
    .catch(err => {
      throw err
    })
}

const getContenidos = (params, actionType) => {
  return dispatch => DBcontenidos.once('value')
    .then(snapshot => {
      snapshot.forEach(function(childSnapshot){
        const valor = childSnapshot.val()
        valor.id = childSnapshot.key
        listContenidos.push(valor)
      })
      if (actionType != null){
        dispatch({
          type: actionType,
          params: params, // can be null
          data: listContenidos, // list with all d objects
        })
      }

      return snapshot.val()
    })
    .catch(err => {
      throw err
    })
}

const getEnlaces = (params, actionType) => {
  return dispatch => DBenlaces.once('value')
    .then(snapshot => {
      snapshot.forEach(function(childSnapshot){
        const valor = childSnapshot.val()
        valor.id = childSnapshot.key
        listEnlaces.push(valor)
      })
      if (actionType != null){
        dispatch({
          type: actionType,
          params: params, // can be null
          data: listEnlaces, // list with all d objects
        })
      }

      return snapshot.val()
    })
    .catch(err => {
      throw err
    })
}


export default {
  getFerias: getFerias,
  getCreaciones: getCreaciones,
  getContenidos: getContenidos,
  getEnlaces: getEnlaces,

}
