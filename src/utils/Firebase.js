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

var storage = firebase.storage()
var storageRef =storage.ref()

const providerGoogle = new firebase.auth.GoogleAuthProvider()

const DBferias = database.ref('ferias/')
const DBcreaciones = database.ref('creaciones/')
const DBcontenidos = database.ref('contenidos/')
const DBenlaces = database.ref('enlaces/')
const DBusers = database.ref('users/')
var listCreaciones = []
var listFerias =[]
var listContenidos = []
var listEnlaces = []
var currentUserUid='' //identificador del currentUser. Lo guardo al logear y lo uso si tengo q hacer cambios en sus datos
var currentUserEmail=''

const getCreaciones = (params, actionType) => {
  return dispatch => DBcreaciones.once('value')
    .then(snapshot => {
      listCreaciones=[]
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

const getUsers = (params, actionType) => {//actionType=USERS_RECEIVED
  return dispatch => DBusers.once('value')
    .then(snapshot => {
      let listaUsuarios =[]
      snapshot.forEach(function(childSnapshot){
        const valor = childSnapshot.val()
        valor.id = childSnapshot.key
        listaUsuarios.push(valor)
      })
      if (actionType != null){
        dispatch({
          type: actionType,
          params: params, // can be null
          data: listaUsuarios, // list with all d objects
        })
      }

      return snapshot.val()
    })
    .catch(err => {
      throw err
    })
}
const guardarDatosPedido=(datosEnvio,carro,paymentData,actionType)=>{
  return dispatch => database.ref('users/'+currentUserUid+'/pedidos/'+paymentData.paymentID+'/carro')
    .set(carro).then(snapshot => {
      database.ref('users/'+currentUserUid+'/pedidos/'+paymentData.paymentID+'/datosEnvio')
        .set(datosEnvio).then(snapshot => {
          database.ref('users/'+currentUserUid+'/pedidos/'+paymentData.paymentID+'/datosCompra')
            .set(paymentData).then(snapshot => {
              database.ref('users/'+currentUserUid+'/pedidos')
                .once('value').then(snapshot => {
                  console.log('cargando los pedidos que hay en la DB para este user')
                  if (actionType != null){
                    dispatch({
                      type: actionType,
                      params: 'okPedido', // can be null
                      data: snapshot, // usuario subido correctamente
                    })
                  }
                }).catch(err => {
                  console.log(` no se ha podido cargar los pedidos: ${err.message}`)
                  if (actionType != null){
                    dispatch({
                      type: actionType,
                      params: 'errorCargaPedidos', // can be null
                      data: err, // err , no ha subido usuario
                    })
                  }
                  throw err

                })
            }).catch(err => {
              console.log(` no se ha podido guardar los datos d compra del pedido: ${err.message}`)
              if (actionType != null){
                dispatch({
                  type: actionType,
                  params: 'errorPedidoDatosCompra', // can be null
                  data: err, // err , no ha subido usuario
                })
              }
              throw err

            })
        }).catch(err => {
          console.log(` no se ha podido guardar los datos d compra del pedido: ${err.message}`)
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'errorPedidoDatosCompra', // can be null
              data: err, // err , no ha subido usuario
            })
          }
          throw err

        })
    }).catch(err => {
      console.log(` no se ha podido guardar el carro del pedido: ${err.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'errorPedidoCarro', // can be null
          data: err, // err , no ha subido usuario
        })
      }
      throw err

    })
}
const elementoVendido = (id,actionType) =>{
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth()+1 //January is 0!
  var yyyy = today.getFullYear()

  if(dd<10) {
    dd = '0'+dd
  }

  if(mm<10) {
    mm = '0'+mm
  }

  today = dd + '/' + mm + '/' + yyyy

  return dispatch => database.ref('creaciones/'+id).update({
    vendido:true,
    vendidoTime: today,

  }).then (snapshot => {
    console.log ('se ha puesto como vendido el elemento')
    if (actionType != null){
      dispatch({
        type: actionType,
        params: 'okElementoVendido', // can be null
        data: snapshot, // usuario subido correctamente
      })
    }

  }).catch(function(error){
    console.log ('no se pudo poner como vendido '+ error)
    if (actionType != null){
      dispatch({
        type: actionType,
        params: 'errorElementoVendido', // can be null
        data: error, // err , no ha subido usuario
      })
    }
    throw error

  })

}
const vaciarCarro = (actionType) =>{
  return dispatch => database.ref('users/'+currentUserUid+'/carro')
    .remove().then(snapshot => {

      console.log('subido el carro vacio')
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'okCarroVacio', // can be null
          data: snapshot, // usuario subido correctamente
        })
      }
    }).catch(err => {
      console.log(` no se ha creado: ${err.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'errorDeleteCarro', // can be null
          data: err, // err , no ha subido usuario
        })
      }
      throw err

    })
}
const loadCarro = (carro,justLogedIn,actionType)=> {
  if (justLogedIn){//hay q combinar lo q haya
    return dispatch => database.ref('users/'+currentUserUid+'/carro')
      .once('value').then(snapshot => {
        let listaCarroDB =[]
        snapshot.forEach(function(childSnapshot){
          const valor = childSnapshot.val()
          let repe = false
          for(let i =0 ; i<carro.length; i++){ // hay q ver q no esten repes
            if(carro[i].id === valor.id){
              repe = true
              break
            }
          }
          if(!repe){
            listaCarroDB.push(valor)
          }
        })
        let listaCarroConcat = listaCarroDB.concat(carro)
        database.ref('users/'+currentUserUid+'/carro')
          .set(listaCarroConcat).then(snapshot => {

            console.log('subido el carro')
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'okCarro', // can be null
                data: listaCarroConcat, // usuario subido correctamente
              })
            }
          }).catch(err => {
            console.log(` no se ha creado: ${err.message}`)
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'errorCarro', // can be null
                data: err, // err , no ha subido usuario
              })
            }
            throw err

          })

        return snapshot.val()
      })
      .catch(err => {
        throw err
      })
  }else{//solo hay q escribir encima

    return dispatch => database.ref('users/'+currentUserUid+'/carro')
      .set(carro).then(snapshot => {

        console.log('subido el carro')
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'okCarroReady', // can be null
            data: snapshot, // usuario subido correctamente
          })
        }
      }).catch(err => {
        console.log(` no se ha creado: ${err.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorCarro', // can be null
            data: err, // err , no ha subido usuario
          })
        }
        throw err

      })
  }
}
const uploadCarro=(carro,actionType) =>{
  return dispatch => database.ref('users/'+currentUserUid+'/carro')
    .set(carro).then(snapshot => {

      console.log('subido el carro')
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'okCarro', // can be null
          data: carro, // usuario subido correctamente
        })
      }
    }).catch(err => {
      console.log(` no se ha creado: ${err.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'errorCarro', // can be null
          data: err, // err , no ha subido usuario
        })
      }
      throw err

    })
}
const loginFacebook = (params,actionType) => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().useDeviceLanguage()
  return dispatch => firebase.auth().signInWithPopup(provider)
  //.signInWithRedirect(provider) (is suposed to be more mobile friendly)
  // when your page loads :  firebase.auth().getRedirectResult().then(function(result) {

    .then(result =>{
      console.log ('t has logeado con facebook'+ result.user.email)
      let datosPers={
        nombre: result.user.displayName,
        email: result.user.email,
        emailVerified:result.user.emailVerified,
        phoneNumber: result.user.phoneNumber,
        providerId: result.user.providerData[0].providerId,
        uid: result.user.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
      }
      currentUserUid = result.user.uid
      currentUserEmail = result.user.email
      database.ref('users/'+result.user.uid+'/datosPersonales')
        .set(datosPers).then(snapshot => {

          console.log('creado los datos personales')
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'okFacebook', // can be null
              data: result, // usuario subido correctamente
            })
          }
        }).catch(err => {
          console.log(` no se ha creado: ${err.message}`)
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'error', // can be null
              data: err, // err , no ha subido usuario
            })
          }
          throw err

        })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // The email of the user's account used.
      var email = error.email
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential
      // ...
      console.log (`el error es ${errorCode}: ${errorMessage}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'error', // can be null
          data: error, // usuario subido correctamente
        })
      }
    })
}

const loginGoogle = (params,actionType) => {
  firebase.auth().useDeviceLanguage()
  return dispatch => firebase.auth().signInWithPopup(providerGoogle)
    .then (result => {
      console.log(`${result.user.email} ha iniciado sesion`)

      let datosPers={
        nombre: result.user.displayName,
        email: result.user.email,
        emailVerified:result.user.emailVerified,
        phoneNumber: result.user.phoneNumber,
        providerId: result.user.providerData[0].providerId,
        uid: result.user.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
      }
      currentUserUid = result.user.uid
      currentUserEmail = result.user.email

      database.ref('users/'+result.user.uid+'/datosPersonales')
        .set(datosPers).then(snapshot => {

          console.log('creado los datos personales')
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'okGoogle', // can be null
              data: result, // usuario subido correctamente
            })
          }
        }).catch(err => {
          console.log(` no se ha creado: ${err.message}`)
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'error', // can be null
              data: err, // err , no ha subido usuario
            })
          }
          throw err

        })

    })
    .catch(error =>{
      console.log (`el error es ${error.code}: ${error.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'error', // can be null
          data: error, // usuario subido correctamente
        })
      }
    })
}
const loginWithEmailAndPassword = (user,actionType) => {
  return dispatch => firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then (result => {
      console.log(`${result.email} ha iniciado sesion`)

      let datosPers={
        nombre: result.displayName,
        email: result.email,
        emailVerified:result.emailVerified,
        phoneNumber: result.phoneNumber,
        providerId: result.providerId,
        uid: result.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
      }
      currentUserUid = result.uid
      currentUserEmail = result.email

      database.ref('users/'+result.uid+'/datosPersonales')
        .set(datosPers).then(snapshot => {

          console.log('creado los datos personales')
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'okPassword', // can be null
              data: result, // usuario subido correctamente
            })
          }
        }).catch(err => {
          console.log(` no se ha creado: ${err.message}`)
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'error', // can be null
              data: err, // err , no ha subido usuario
            })
          }
          throw err

        })

    })
    .catch(error =>{
      console.log (`el error es ${error.code}: ${error.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'error', // can be null
          data: error, // usuario subido correctamente
        })
      }
    })
}

const logout = (params,actionType) => {
  return dispatch => firebase.auth().signOut()
    .then (result => {
      //console.log(`${result.user.email} ha salido de la sesion`)
      currentUserUid = ''
      currentUserEmail = ''

      console.log('bye bye')
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'byebye', // can be null
          data: null, // usuario salio de la sesion
        })
      }

    })
    .catch(error =>{
      console.log (`el error es ${error.code}: ${error.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'error', // can be null
          data: null, // usuario subido correctamente
        })
      }
    })
}

const userCreated = (user, actionType) => {
  return dispatch => firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(result =>{
      console.log('se ha creado correctamente ' +JSON.stringify(result))

      firebase.auth().currentUser.updateProfile({
        displayName: user.nombre,
      }).then(function() {
        // Update successful.
        console.log(`${result.displayName} ha actualizado el profile`)
        firebase.auth().currentUser
          .sendEmailVerification().then(function() {
            alert('se ha mandado un email, mira en la bandeja de correo no deseado!!')
            console.log('email sent')
            let datosPers={
              nombre: result.displayName,
              email: result.email,
              emailVerified:result.emailVerified,
              phoneNumber: result.phoneNumber,
              providerId: result.providerId,
              uid: result.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
            }

            database.ref('users/'+result.uid+'/datosPersonales')
              .set(datosPers).then(snapshot => {

                console.log('creado los datos personales')
                let foto = false
                if(result.photoURL){

                  foto = result.photoURL
                }
                database.ref('users/'+result.uid+'/foto')
                  .set({photoURL:foto,}).then(snapshot => {
                    console.log('creado la foto')
                    let datosEnv={
                      nombreCompletoEnvio: false, //false xq null no lo sube a BD
                      calle: false,
                      localidad: false,
                      provincia: false,
                      cp: false,
                      newsletter: user.newsletter,
                    }
                    database.ref('users/'+result.uid+'/datosEnvio')
                      .set(datosEnv).then(snapshot => {
                        console.log('creado los datos envio')

                        result.newsletter=user.newsletter
                        if (actionType != null){
                          dispatch({
                            type: actionType,
                            params: 'ok', // can be null
                            data: result, // usuario subido correctamente
                          })
                        }

                      }).catch(err => {
                        console.log(` no se ha creado: ${err.message}`)
                        if (actionType != null){
                          dispatch({
                            type: actionType,
                            params: 'error', // can be null
                            data: err, // err , no ha subido usuario
                          })
                        }
                        throw err

                      })
                  }).catch(err => {
                    console.log(` no se ha creado: ${err.message}`)
                    if (actionType != null){
                      dispatch({
                        type: actionType,
                        params: 'error', // can be null
                        data: err, // err , no ha subido usuario
                      })
                    }
                    throw err

                  })

              }).catch(err => {
                console.log(` no se ha creado: ${err.message}`)
                if (actionType != null){
                  dispatch({
                    type: actionType,
                    params: 'error', // can be null
                    data: err, // err , no ha subido usuario
                  })
                }
                throw err

              })

          }).catch(function(error) {
            console.log (`el error es ${error.code}: ${error.message}`)
            // An error happened. de enviar el mail
          })
      }).catch(function(error) {
        // An error happened. de autenticacion
        console.log (`el error es ${error.code}: ${error.message}`)

      })


    }).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message

      alert('error en autenticacion ' +errorCode +' ' +errorMessage)
      console.log('error en autenticacion ' +errorCode +' ' +errorMessage)
      // ...

    })

}
const currentUserToDB =(user,actionType) => {
  return dispatch => database.ref('users/'+user.datosPersonales.uid+'/datosPersonales')
    .set(user.datosPersonales).then(snapshot => {

      console.log('creado los datos personales')

      database.ref('users/'+user.datosPersonales.uid+'/foto')
        .set({photoURL:user.foto.photoURL,}).then(snapshot => {
          console.log('creado la foto')

          database.ref('users/'+user.datosPersonales.uid+'/datosEnvio')
            .set(user.datosEnvio).then(snapshot => {
              console.log('creado los datos envio')

              if (actionType != null){
                dispatch({
                  type: actionType,
                  params: 'ok', // can be null
                  data: user, // usuario subido correctamente
                })
              }

            }).catch(err => {
              console.log(` no se ha creado: ${err.message}`)
              if (actionType != null){
                dispatch({
                  type: actionType,
                  params: 'error', // can be null
                  data: err, // err , no ha subido usuario
                })
              }
              throw err

            })
        }).catch(err => {
          console.log(` no se ha creado: ${err.message}`)
          if (actionType != null){
            dispatch({
              type: actionType,
              params: 'error', // can be null
              data: err, // err , no ha subido usuario
            })
          }
          throw err

        })

    }).catch(err => {
      console.log(` no se ha creado: ${err.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'error', // can be null
          data: err, // err , no ha subido usuario
        })
      }
      throw err

    })

}
const changePassword = (payload,params,actionType) =>{
  //params: change or forgot
  if(params === 'change'){
    return dispatch => firebase.auth().currentUser.updatePassword(payload)
      .then(function() {
        console.log('se ha cambiado el password'+ payload)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'okPassword', // can be null
            data: firebase.auth().currentUser, // paso el usuario x si kiero usarlo para algo tras la modificacion del password
          })
        }
      }).catch(function(error) {
        // An error happened.
        console.log (`el error es ${error.code}: ${error.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorUpdateProfile', // can be null
            data: error, // err , no ha subido usuario
          })
        }
        throw error
      })

  }else if (params === 'forgot'){
    return dispatch => firebase.auth()
      .sendPasswordResetEmail(payload).then(function() {
        alert('se ha mandado un email de cambiar de contraseña, mira en la bandeja de correo no deseado!!')
        console.log('change password email sent')
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'okPasswordMail', // can be null
            data: firebase.auth().currentUser, // paso el usuario x si kiero usarlo para algo tras la modificacion del password
          })
        }
      }).catch(err => {
        console.log(` no se ha creado: ${err.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorPasswordMail', // can be null
            data: err, // no se ha mandado el mail
          })
        }
        throw err

      })

  }



}
const resendEmail = (params,actionType)=>{
  return dispatch =>firebase.auth().currentUser
    .sendEmailVerification().then(function() {
      alert('se ha mandado un email, mira en la bandeja de correo no deseado!!')
      console.log('email sent')
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'okEnvioMail', // can be null
          data: '', // mail mandado correctamente
        })
      }
    }).catch(err => {
      console.log(` no se ha creado: ${err.message}`)
      if (actionType != null){
        dispatch({
          type: actionType,
          params: 'errorEnvioMail', // can be null
          data: err, // err , no ha mandado el mail
        })
      }
      throw err
    })
}

const addUserInfo = (user,params, posibleFoto, actionType) => {
  //flag -> envio, nombre, foto
  if(params === 'envio'){
    return dispatch => database.ref('users/'+user.datosPersonales.uid+'/datosEnvio')
      .set(user.datosEnvio).then(snapshot => {
        console.log('creado los datos envio')

        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'okEnvio', // can be null
            data: user, // usuario subido correctamente
          })
        }

      }).catch(err => {
        console.log(` no se ha creado: ${err.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorEnvio', // can be null
            data: err, // err , no ha subido usuario
          })
        }
        throw err

      })
  }else if(params === 'nombre'){
    return dispatch => firebase.auth().currentUser.updateProfile({displayName: user.datosPersonales.nombre,})
      .then(function() {
        database.ref('users/'+user.datosPersonales.uid+'/datosPersonales')
          .set(user.datosPersonales).then(snapshot => {
            console.log('creado los datos personales')

            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'okNombre', // can be null
                data: user, // usuario subido correctamente
              })
            }

          }).catch(err => {
            console.log(` no se ha creado: ${err.message}`)
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'errorNombre', // can be null
                data: err, // err , no ha subido usuario
              })
            }
            throw err

          })
      }).catch(function(error) {
        // An error happened.
        console.log (`el error es ${error.code}: ${error.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorUpdateProfile', // can be null
            data: error, // err , no ha subido usuario
          })
        }
        throw error
      })

  }else if(params === 'email'){
    let oldEmail= firebase.auth().currentUser.email
    return dispatch => firebase.auth().currentUser.updateEmail(user.datosPersonales.email)
      .then(function() {
        console.log(`se ha cambiado el mail de: ${oldEmail} a ${firebase.auth().currentUser.email} `)
        firebase.auth().currentUser
          .sendEmailVerification().then(function() {
            alert('se ha mandado un email, mira en la bandeja de correo no deseado!!')
            console.log('email sent')
            database.ref('users/'+user.datosPersonales.uid+'/datosPersonales')
              .set(user.datosPersonales).then(snapshot => {

                console.log('creado los datos personales '+firebase.auth().currentUser.email)
                if (actionType != null){
                  dispatch({
                    type: actionType,
                    params: 'okEmail', // can be null
                    data: user, // usuario subido correctamente
                  })
                }

              }).catch(err => {
                console.log(` no se ha creado: ${err.message}`)
                if (actionType != null){
                  dispatch({
                    type: actionType,
                    params: 'errorNombre', // can be null
                    data: err, // err , no ha subido usuario
                  })
                }
                throw err

              })
          }).catch(err => {
            console.log(` no se ha creado: ${err.message}`)
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'errorNombre', // can be null
                data: err, // err , no ha subido usuario
              })
            }
            throw err

          })
      }).catch(function(error) {
        // An error happened.
        console.log (`el error es ${error.code}: ${error.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorUpdateProfile', // can be null
            data: error, // err , no ha subido usuario
          })
        }
        throw error
      })

  }else if(params === 'foto'){
    var subirImagen = storageRef.child('usersPics/' + posibleFoto.name).put(posibleFoto)
    return dispatch =>
      subirImagen.on('state_changed',function(snapshot) {
      },function(error){
        console.log('error en la carga de la imagen' + error)

      },function(success){
        //aqui se guarda la direcci'on donde se guarda el archivo
        console.log('success!'+subirImagen.snapshot.downloadURL)

        database.ref('users/'+user.datosPersonales.uid+'/foto')
          .set({photoURL: subirImagen.snapshot.downloadURL}).then(snapshot => {
            console.log('cambiado la foto')

            firebase.auth().currentUser
              .updateProfile({photoURL: subirImagen.snapshot.downloadURL, }).then(function() {
              // Update successful.
                console.log('ha actualizado el profile')
                user.foto.photoURL = subirImagen.snapshot.downloadURL
                if (actionType != null){
                  dispatch({
                    type: actionType,
                    params: 'okFoto', // can be null
                    data: user, // usuario subido correctamente
                  })
                }
              }).catch(err => {
                console.log(` no se ha actualizado: ${err.message}`)
                if (actionType != null){
                  dispatch({
                    type: actionType,
                    params: 'errorUpdateProfile', // can be null
                    data: err, // err , no ha subido usuario
                  })
                }
                throw err

              })

          }).catch(err => {
            console.log(` no se ha creado: ${err.message}`)
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'errorFoto', // can be null
                data: err, // err , no ha subido usuario
              })
            }
            throw err

          })
      })





  }else if(params === 'nombre'){
    return dispatch => database.ref('users/'+user.datosPersonales.uid+'/datosPersonales')
      .set(user.datosPersonales).then(snapshot => {
        console.log('hemos cambiado los datosPersonales para cambiar el nombre')
        //we need to change it on the firebase user too

        firebase.auth().currentUser
          .updateProfile({displayName: user.datosPersonales.nombre, }).then(function() {
          // Update successful.
            console.log('ha actualizado el profile displayName')
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'okNombre', // can be null
                data: user, // usuario subido correctamente
              })
            }
          }).catch(err => {
            console.log(` no se ha actualizado: ${err.message}`)
            if (actionType != null){
              dispatch({
                type: actionType,
                params: 'errorUpdateProfile', // can be null
                data: err, // err , no ha subido usuario
              })
            }
            throw err

          })

      }).catch(err => {
        console.log(` no se ha creado: ${err.message}`)
        if (actionType != null){
          dispatch({
            type: actionType,
            params: 'errorName', // can be null
            data: err, // err , no ha subido usuario
          })
        }
        throw err

      })

  }

}

export default {
  getFerias: getFerias,
  getCreaciones: getCreaciones,
  getContenidos: getContenidos,
  getEnlaces: getEnlaces,
  getUsers: getUsers,
  userCreated: userCreated,
  addUserInfo:addUserInfo,
  loginGoogle : loginGoogle,
  loginWithEmailAndPassword: loginWithEmailAndPassword,
  currentUserToDB: currentUserToDB,
  logout: logout,
  changePassword:  changePassword,
  loginFacebook: loginFacebook,
  loadCarro: loadCarro,
  uploadCarro: uploadCarro,
  resendEmail: resendEmail,
  guardarDatosPedido: guardarDatosPedido,
  vaciarCarro:vaciarCarro,
  elementoVendido:elementoVendido,
}
