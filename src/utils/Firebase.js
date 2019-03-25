import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

var storage = firebase.storage();
var storageRef = storage.ref();

const providerGoogle = new firebase.auth.GoogleAuthProvider();

const DBferias = database.ref("ferias/");
const DBcreaciones = database.ref("creaciones/");
const DBcontenidos = database.ref("contenidos/");
const DBenlaces = database.ref("enlaces/");

var listCreaciones = [];
var listFerias = [];
var listContenidos = [];
var listEnlaces = [];
var currentUserUid = ""; //identificador del currentUser. Lo guardo al logear y lo uso si tengo q hacer cambios en sus datos
var currentUserEmail = "";
var currentUserPassword = "";
const getCreaciones = (params, actionType) => {
  return dispatch =>
    DBcreaciones.once("value")
      .then(snapshot => {
        listCreaciones = [];
        snapshot.forEach(function(childSnapshot) {
          const valor = childSnapshot.val();
          valor.id = childSnapshot.key;
          listCreaciones.push(valor);
        });
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: params, // can be null
            data: listCreaciones // list with all d objects
          });
        }

        return snapshot.val();
      })
      .catch(err => {
        console.log(err);
      });
};
const getFerias = (params, actionType) => {
  return dispatch =>
    DBferias.once("value")
      .then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
          const valor = childSnapshot.val();
          valor.id = childSnapshot.key;
          listFerias.push(valor);
        });
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: params, // can be null
            data: listFerias // list with all d objects
          });
        }

        return snapshot.val();
      })
      .catch(err => {
        console.log(err);
      });
};

const getContenidos = (params, actionType) => {
  return dispatch =>
    DBcontenidos.once("value")
      .then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
          const valor = childSnapshot.val();
          valor.id = childSnapshot.key;
          listContenidos.push(valor);
        });
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: params, // can be null
            data: listContenidos // list with all d objects
          });
        }

        return snapshot.val();
      })
      .catch(err => {
        console.log(err);
      });
};

const getEnlaces = (params, actionType) => {
  return dispatch =>
    DBenlaces.once("value")
      .then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
          const valor = childSnapshot.val();
          valor.id = childSnapshot.key;
          listEnlaces.push(valor);
        });
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: params, // can be null
            data: listEnlaces // list with all d objects
          });
        }

        return snapshot.val();
      })
      .catch(err => {
        console.log(err);
      });
};

const guardarDatosPedido = (datosEnvio, carro, paymentData, actionType) => {
  return dispatch =>
    database
      .ref(
        "users/" +
          currentUserUid +
          "/pedidos/" +
          paymentData.paymentID +
          "/carro"
      )
      .set(carro)
      .then(snapshot => {
        database
          .ref(
            "users/" +
              currentUserUid +
              "/pedidos/" +
              paymentData.paymentID +
              "/datosEnvio"
          )
          .set(datosEnvio)
          .then(snapshot => {
            database
              .ref(
                "users/" +
                  currentUserUid +
                  "/pedidos/" +
                  paymentData.paymentID +
                  "/datosCompra"
              )
              .set(paymentData)
              .then(snapshot => {
                database
                  .ref("users/" + currentUserUid + "/pedidos")
                  .once("value")
                  .then(snapshot => {
                    console.log(
                      "cargando los pedidos que hay en la DB para este user"
                    );
                    if (actionType !== null) {
                      dispatch({
                        type: actionType,
                        params: "okPedido", // can be null
                        data: snapshot // usuario subido correctamente
                      });
                    }
                  })
                  .catch(err => {
                    console.log(
                      ` no se ha podido cargar los pedidos: ${err.message}`
                    );
                    if (actionType !== null) {
                      dispatch({
                        type: actionType,
                        params: "errorCargaPedidos", // can be null
                        data: err // err , no ha subido usuario
                      });
                    }
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(
                  ` no se ha podido guardar los datos d compra del pedido: ${
                    err.message
                  }`
                );
                if (actionType !== null) {
                  dispatch({
                    type: actionType,
                    params: "errorPedidoDatosCompra", // can be null
                    data: err // err , no ha subido usuario
                  });
                }
                console.log(err);
              });
          })
          .catch(err => {
            console.log(
              ` no se ha podido guardar los datos d compra del pedido: ${
                err.message
              }`
            );
            if (actionType !== null) {
              dispatch({
                type: actionType,
                params: "errorPedidoDatosCompra", // can be null
                data: err // err , no ha subido usuario
              });
            }
            console.log(err);
          });
      })
      .catch(err => {
        console.log(
          ` no se ha podido guardar el carro del pedido: ${err.message}`
        );
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "errorPedidoCarro", // can be null
            data: err // err , no ha subido usuario
          });
        }
        console.log(err);
      });
};
const elementoVendido = (id, actionType) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "/" + mm + "/" + yyyy;

  return dispatch =>
    database
      .ref("creaciones/" + id)
      .update({
        vendido: true,
        vendidoTime: today
      })
      .then(snapshot => {
        console.log("se ha puesto como vendido el elemento");
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "okElementoVendido", // can be null
            data: snapshot // usuario subido correctamente
          });
        }
      })
      .catch(function(error) {
        console.log("no se pudo poner como vendido " + error);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "errorElementoVendido", // can be null
            data: error
          });
        }
        console.log(error);
      });
};
const vaciarCarro = actionType => {
  return dispatch =>
    database
      .ref("users/" + currentUserUid + "/carro")
      .remove()
      .then(snapshot => {
        console.log("subido el carro vacio");
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "okCarroVacio", // can be null
            data: snapshot // usuario subido correctamente
          });
        }
      })
      .catch(err => {
        console.log(` no se ha creado: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "errorDeleteCarro", // can be null
            data: err // err , no ha subido usuario
          });
        }
        console.log(err);
      });
};
const loadCarro = (carro, justLogedIn, actionType) => {
  if (justLogedIn) {
    //hay q combinar lo q haya
    return dispatch =>
      database
        .ref("users/" + currentUserUid + "/carro")
        .once("value")
        .then(snapshot => {
          let listaCarroDB = [];
          snapshot.forEach(function(childSnapshot) {
            const valor = childSnapshot.val();
            let repe = false;
            for (let i = 0; i < carro.length; i++) {
              // hay q ver q no esten repes
              if (carro[i].id === valor.id) {
                repe = true;
                break;
              }
            }
            if (!repe) {
              listaCarroDB.push(valor);
            }
          });
          let listaCarroConcat = listaCarroDB.concat(carro);
          database
            .ref("users/" + currentUserUid + "/carro")
            .set(listaCarroConcat)
            .then(snapshot => {
              console.log("subido el carro");
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "okCarro",
                  data: listaCarroConcat
                });
              }
            })
            .catch(err => {
              console.log(` no se ha creado: ${err.message}`);
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "errorCarro", // can be null
                  data: err
                });
              }
              console.log(err);
            });

          return snapshot.val();
        })
        .catch(err => {
          console.log(err);
        });
  } else {
    //solo hay q escribir encima

    return dispatch =>
      database
        .ref("users/" + currentUserUid + "/carro")
        .set(carro)
        .then(snapshot => {
          console.log("subido el carro");
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "okCarroReady", // can be null
              data: snapshot // usuario subido correctamente
            });
          }
        })
        .catch(err => {
          console.log(` no se ha creado: ${err.message}`);
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "errorCarro", // can be null
              data: err // err , no ha subido usuario
            });
          }
          console.log(err);
        });
  }
};
const uploadCarro = (carro, actionType) => {
  return dispatch =>
    database
      .ref("users/" + currentUserUid + "/carro")
      .set(carro)
      .then(snapshot => {
        console.log("subido el carro");
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "okCarro", // can be null
            data: carro
          });
        }
      })
      .catch(err => {
        console.log(` no se ha creado: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "errorCarro", // can be null
            data: err
          });
        }
        console.log(err);
      });
};

const amIlogedIn = (params, actionType) => {
  return dispatch =>
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        getCurrentUserFromDBAndDispatchIt(
          user,
          actionType,
          dispatch,
          "si user",
          "error al comprobar si hay usuario"
        );
      } else {
        // No user is signed in.
        dispatch({
          type: actionType,
          params: "no user", // can be null
          data: null //
        });
        console.log("no estas logeado");
        return null;
      }
    });
};
const getCurrentUser = (userUid, actionType) => {
  return dispatch => {
    getCurrentUserFromDBAndDispatchIt(
      { user: { uid: userUid } },
      actionType,
      dispatch,
      "user refreshed",
      "error al obtener el usuario de la base de datos"
    );
  };
};
const getCurrentUserFromDBAndDispatchIt = (
  user,
  actionType,
  dispatch,
  positiveMessage,
  negativeMessage
) => {
  database
    .ref("users/" + user.uid)
    .once("value")
    .then(snapshot => {
      let currentUser = snapshot.val();

      if (actionType !== null) {
        dispatch({
          type: actionType,
          params: positiveMessage, // can be null
          data: currentUser // usuario subido correctamente
        });
      }
      currentUserUid = user.uid;
      currentUserEmail = user.email;
      return true;
    })
    .catch(err => {
      if (actionType !== null) {
        dispatch({
          type: actionType,
          params: "error", // can be null
          data: negativeMessage // err , no ha subido usuario
        });
      }
      console.log(err);
    });
};

const loginFacebook = (params, actionType) => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  return dispatch =>
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (!result.additionalUserInfo.isNewUser) {
          console.log("t has logeado con facebook" + result.user.email);
          getCurrentUserFromDBAndDispatchIt(
            result.user,
            actionType,
            dispatch,
            "si loginFacebook",
            "error al logear usuario facebook"
          );
        }
        return result;
      })
      .catch(err => {
        console.log(` no te has podido logear con facebook: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: "error login con facebook" // err , no ha subido usuario
          });
        }
        console.log(err);
      });
};

const loginGoogle = (params, actionType) => {
  firebase.auth().useDeviceLanguage();
  return dispatch =>
    firebase
      .auth()
      .signInWithPopup(providerGoogle)
      .then(result => {
        if (!result.additionalUserInfo.isNewUser) {
          console.log(`${result.user.email} ha iniciado sesion`);
          getCurrentUserFromDBAndDispatchIt(
            result.user,
            actionType,
            dispatch,
            "si loginGoogle",
            "error al logear usuario google"
          );
        }
        return result;
      })
      .catch(err => {
        console.log(` no te has podido logear con google: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: "error login con google" // err , no ha subido usuario
          });
        }
        console.log(err);
      });
};
const loginWithEmailAndPassword = ({ email, password }, actionType) => {
  return dispatch =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(`${result.email} ha iniciado sesion`);
        getCurrentUserFromDBAndDispatchIt(
          result.user,
          actionType,
          dispatch,
          "si login emailpassword",
          "error al logear usuario con email y password"
        );
        currentUserPassword = password;
        return true;
      })
      .catch(err => {
        console.log(
          ` no te has podido logear con email and password: ${err.message}`
        );
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: "error login con email and password" // err , no ha subido usuario
          });
        }
        return err;
      });
};
const eliminarCurrentCuenta = (params, actionType) => {
  let user = firebase.auth().currentUser;
  return dispatch =>
    user
      .delete()
      .then(function() {
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "byebye forever", // can be null
            data: null // usuario salio de la sesion y eliminado
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
};
const logout = (params, actionType) => {
  return dispatch =>
    firebase
      .auth()
      .signOut()
      .then(result => {
        //console.log(`${result.user.email} ha salido de la sesion`)
        currentUserUid = "";
        currentUserEmail = "";
        currentUserPassword = "";
        console.log("bye bye");
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "byebye", // can be null
            data: null // usuario salio de la sesion
          });
        }
      })
      .catch(error => {
        console.log(`el error es ${error.code}: ${error.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: null // usuario subido correctamente
          });
        }
      });
};

const guardarConsentimientoFGLogin = (user, actionType) => {
  let result = firebase.auth().currentUser;
  var NewUser = {
    datosPersonales: {
      nombre: result.displayName,
      email: result.email,
      providerId: result.providerData[0].providerId,
      uid: result.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
      aceptaPoliticaDatos: user.aceptaPoliticaDatos,
      fechaAltaYacepta: user.fechaAltaYacepta,
      ip: user.ip,
      ciudad: user.ciudad
    },
    datosEnvio: {
      nombreCompletoEnvio: false, //false xq null no lo sube a BD
      calle: false,
      localidad: false,
      provincia: false,
      cp: false,
      hayDatos: false
    },
    foto: {
      photoURL: result.photoURL ? result.photoURL : false
    }
  };
  currentUserUid = result.uid;
  currentUserEmail = result.email;

  return dispatch =>
    database
      .ref("users/" + result.uid)
      .set(NewUser)
      .then(snapshot => {
        console.log("creado new user");
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "ok", // can be null
            data: NewUser // usuario subido correctamente
          });
        }
      })
      .catch(err => {
        console.log(` no se ha creado: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: err // err , no ha subido usuario
          });
        }
        console.log(err);
      });
};

const userCreated = (user, actionType) => {
  return dispatch =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        console.log("se ha creado correctamente " + JSON.stringify(result));

        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: user.nombre
          })
          .then(function() {
            // Update successful.
            console.log(`${result.user.displayName} ha actualizado el profile`);
            firebase
              .auth()
              .currentUser.sendEmailVerification()
              .then(function() {
                alert(
                  "se ha mandado un email, mira en la bandeja de correo no deseado!!"
                );
                console.log("email sent");
                var NewUser = {
                  datosPersonales: {
                    nombre: result.user.displayName,
                    email: result.user.email,
                    emailVerified: result.user.emailVerified,
                    phoneNumber: result.user.phoneNumber,
                    providerId: result.user.providerId,
                    uid: result.user.uid, //user's unique ID lo usaremos para linkarlo con la DBUsers
                    aceptaPoliticaDatos: user.aceptaPoliticaDatos,
                    fechaAltaYacepta: user.fechaAltaYacepta,
                    ip: user.ip,
                    ciudad: user.ciudad
                  },
                  datosEnvio: {
                    nombreCompletoEnvio: false, //false xq null no lo sube a BD
                    calle: false,
                    localidad: false,
                    provincia: false,
                    cp: false,
                    hayDatos: false
                  },
                  foto: {
                    photoURL: result.user.photoURL
                      ? result.user.photoURL
                      : false
                  }
                };
                currentUserUid = result.user.uid;
                currentUserEmail = result.user.email;
                currentUserPassword = user.password;

                database
                  .ref("users/" + result.user.uid)
                  .set(NewUser)
                  .then(snapshot => {
                    console.log("creado newUser");

                    if (actionType !== null) {
                      dispatch({
                        type: actionType,
                        params: "user created ok", // can be null
                        data: NewUser // usuario subido correctamente
                      });
                    }
                  })
                  .catch(err => {
                    console.log(` no se ha creado: ${err.message}`);
                    if (actionType !== null) {
                      dispatch({
                        type: actionType,
                        params: "error", // can be null
                        data: err // err , no ha subido usuario
                      });
                    }
                    console.log(err);
                  });
              })

              .catch(function(error) {
                console.log(`el error es ${error.code}: ${error.message}`);
                // An error happened. de enviar el mail
              });
          })
          .catch(function(error) {
            // An error happened. de autenticacion
            console.log(`el error es ${error.code}: ${error.message}`);
          });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("error en autenticacion " + errorCode + " " + errorMessage);
        // ...
      });
};
const currentUserToDB = (user, actionType) => {
  return dispatch =>
    database
      .ref("users/" + user.datosPersonales.uid + "/datosPersonales")
      .update(user.datosPersonales)
      .then(snapshot => {
        console.log("creado los datos personales");

        database
          .ref("users/" + user.datosPersonales.uid + "/foto")
          .update({ photoURL: user.foto.photoURL })
          .then(snapshot => {
            console.log("creado la foto");

            database
              .ref("users/" + user.datosPersonales.uid + "/datosEnvio")
              .update(user.datosEnvio)
              .then(snapshot => {
                console.log("creado los datos envio");

                if (actionType !== null) {
                  dispatch({
                    type: actionType,
                    params: "ok", // can be null
                    data: user // usuario subido correctamente
                  });
                }
              })
              .catch(err => {
                console.log(` no se ha creado: ${err.message}`);
                if (actionType !== null) {
                  dispatch({
                    type: actionType,
                    params: "error", // can be null
                    data: err // err , no ha subido usuario
                  });
                }
                console.log(err);
              });
          })
          .catch(err => {
            console.log(` no se ha creado: ${err.message}`);
            if (actionType !== null) {
              dispatch({
                type: actionType,
                params: "error", // can be null
                data: err // err , no ha subido usuario
              });
            }
            console.log(err);
          });
      })
      .catch(err => {
        console.log(` no se ha creado: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "error", // can be null
            data: err // err , no ha subido usuario
          });
        }
        console.log(err);
      });
};
const changePassword = (payload, params, actionType) => {
  //params: change or forgot
  if (params === "change") {
    return dispatch =>
      firebase
        .auth()
        .currentUser.updatePassword(payload)
        .then(function() {
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "okPassword", // can be null
              data: firebase.auth().currentUser // paso el usuario x si kiero usarlo para algo tras la modificacion del password
            });
          }
        })
        .catch(function(error) {
          // An error happened.
          console.log(`el error es ${error.code}: ${error.message}`);
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "errorUpdateProfile", // can be null
              data: error // err , no ha subido usuario
            });
          }
          console.log(error);
        });
  } else if (params === "forgot") {
    return dispatch =>
      firebase
        .auth()
        .sendPasswordResetEmail(payload)
        .then(function() {
          alert(
            "se ha mandado un email de cambiar de contraseña, mira en la bandeja de correo no deseado!!"
          );
          console.log("change password email sent");
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "okPasswordMail", // can be null
              data: firebase.auth().currentUser // paso el usuario x si kiero usarlo para algo tras la modificacion del password
            });
          }
        })
        .catch(err => {
          console.log(` no se ha creado: ${err.message}`);
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "errorPasswordMail", // can be null
              data: err // no se ha mandado el mail
            });
          }
          console.log(err);
        });
  }
};
const resendEmail = (params, actionType) => {
  return dispatch =>
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function() {
        alert(
          "se ha mandado un email, mira en la bandeja de correo no deseado!!"
        );
        console.log("email sent");
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "okEnvioMail", // can be null
            data: "" // mail mandado correctamente
          });
        }
      })
      .catch(err => {
        console.log(` no se ha creado: ${err.message}`);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "errorEnvioMail", // can be null
            data: err // err , no ha mandado el mail
          });
        }
        console.log(err);
      });
};

const checkEmailVerified = (flagEmailVerified, actionType) => {
  // VERIFY_EMAIL
  let userRecord = firebase.auth().currentUser;
  let caca = "";
  var credentials = firebase.auth.EmailAuthProvider.credential(
    userRecord.email,
    currentUserPassword
  );
  return dispatch =>
    userRecord
      .reauthenticateWithCredential(credentials)
      .then(snapshot => {
        if (flagEmailVerified === userRecord.emailVerified) {
          if (actionType !== null) {
            let dispatch = {
              type: actionType,
              params: "mailNoVerificado", // can be null
              data: false // nada ha cambiado
            };
            return dispatch;
          }
        } else {
          //se ha verificado el mail

          database
            .ref("users/" + currentUserUid + "/datosPersonales")
            .update({
              emailVerified: userRecord.emailVerified
            })
            .then(snapshot => {
              console.log("emailVerified");
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "okemailverified", // can be null
                  data: userRecord.emailVerified
                });
              }
            })
            .catch(function(error) {
              console.log(
                "no se actualizaron los datos personales con email verificado " +
                  error
              );
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "errorEmailVerified", // can be null
                  data: error
                });
              }
              console.log(error);
            });
        } //else
      })
      .catch(function(error) {
        console.log("no se ha podido reautenticar " + error);
        if (actionType !== null) {
          dispatch({
            type: actionType,
            params: "errorReauthenticateWithCredential", // can be null
            data: error
          });
        }
        console.log(error);
      });
};

const addUserInfo = (user, params, posibleFoto, actionType) => {
  //flag -> envio, nombre, foto
  if (params === "envio") {
    return dispatch =>
      database
        .ref("users/" + user.datosPersonales.uid + "/datosEnvio")
        .set(user.datosEnvio)
        .then(snapshot => {
          console.log("creado los datos envio");

          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "okEnvio", // can be null
              data: user.datosEnvio // usuario subido correctamente
            });
          }
        })
        .catch(err => {
          console.log(` no se ha creado: ${err.message}`);
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "errorEnvio", // can be null
              data: err // err , no ha subido usuario
            });
          }
          console.log(err);
        });
  } else if (params === "nombre") {
    return dispatch =>
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: user.datosPersonales.nombre })
        .then(function() {
          database
            .ref("users/" + user.datosPersonales.uid + "/datosPersonales")
            .update({ nombre: user.datosPersonales.nombre })
            .then(snapshot => {
              console.log("actualizado los datos personales");

              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "okNombre", // can be null
                  data: user.datosPersonales.nombre // usuario subido correctamente
                });
              }
            })
            .catch(err => {
              console.log(` no se ha creado: ${err.message}`);
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "errorNombre", // can be null
                  data: err // err , no ha subido usuario
                });
              }
              console.log(err);
            });
        })
        .catch(function(error) {
          // An error happened.
          console.log(`el error es ${error.code}: ${error.message}`);
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "errorUpdateProfile", // can be null
              data: error // err , no ha subido usuario
            });
          }
          console.log(error);
        });
  } else if (params === "email") {
    let oldEmail = firebase.auth().currentUser.email;
    return dispatch =>
      firebase
        .auth()
        .currentUser.updateEmail(user.datosPersonales.email)
        .then(function() {
          console.log(
            `se ha cambiado el mail de: ${oldEmail} a ${
              firebase.auth().currentUser.email
            } `
          );
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(function() {
              alert(
                "se ha mandado un email, mira en la bandeja de correo no deseado!!"
              );
              console.log("email sent");
              currentUserEmail = user.datosPersonales.email;
              database
                .ref("users/" + user.datosPersonales.uid + "/datosPersonales")
                .update({ email: user.datosPersonales.email })
                .then(snapshot => {
                  console.log(
                    "creado los datos personales " +
                      firebase.auth().currentUser.email
                  );
                  if (actionType !== null) {
                    dispatch({
                      type: actionType,
                      params: "okEmail", // can be null
                      data: user.datosPersonales.email // usuario subido correctamente
                    });
                  }
                })
                .catch(err => {
                  console.log(` no se ha creado: ${err.message}`);
                  if (actionType !== null) {
                    dispatch({
                      type: actionType,
                      params: "errorNombre", // can be null
                      data: err // err , no ha subido usuario
                    });
                  }
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(` no se ha creado: ${err.message}`);
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "errorNombre", // can be null
                  data: err // err , no ha subido usuario
                });
              }
              console.log(err);
            });
        })
        .catch(function(error) {
          // An error happened.
          console.log(`el error es ${error.code}: ${error.message}`);
          if (actionType !== null) {
            dispatch({
              type: actionType,
              params: "errorUpdateProfile", // can be null
              data: error // err , no ha subido usuario
            });
          }
          console.log(error);
        });
  } else if (params === "foto") {
    var subirImagen = storageRef
      .child("usersPics/" + posibleFoto.name)
      .put(posibleFoto);
    return dispatch =>
      subirImagen.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          console.log("error en la carga de la imagen" + error);
        },
        function(success) {
          //aqui se guarda la direcci'on donde se guarda el archivo
          console.log("success!" + subirImagen.snapshot.downloadURL);

          database
            .ref("users/" + user.datosPersonales.uid + "/foto")
            .set({ photoURL: subirImagen.snapshot.downloadURL })
            .then(snapshot => {
              console.log("cambiado la foto");

              firebase
                .auth()
                .currentUser.updateProfile({
                  photoURL: subirImagen.snapshot.downloadURL
                })
                .then(function() {
                  // Update successful.
                  console.log("ha actualizado el profile");
                  user.foto.photoURL = subirImagen.snapshot.downloadURL;
                  if (actionType !== null) {
                    dispatch({
                      type: actionType,
                      params: "okFoto", // can be null
                      data: user.foto // usuario subido correctamente
                    });
                  }
                })
                .catch(err => {
                  console.log(` no se ha actualizado: ${err.message}`);
                  if (actionType !== null) {
                    dispatch({
                      type: actionType,
                      params: "errorUpdateProfile", // can be null
                      data: err // err , no ha subido usuario
                    });
                  }
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(` no se ha creado: ${err.message}`);
              if (actionType !== null) {
                dispatch({
                  type: actionType,
                  params: "errorFoto", // can be null
                  data: err // err , no ha subido usuario
                });
              }
              console.log(err);
            });
        }
      );
  }
};

export default {
  getFerias: getFerias,
  getCreaciones: getCreaciones,
  getContenidos: getContenidos,
  getEnlaces: getEnlaces,
  guardarConsentimientoFGLogin: guardarConsentimientoFGLogin,
  userCreated: userCreated,
  addUserInfo: addUserInfo,
  loginGoogle: loginGoogle,
  loginWithEmailAndPassword: loginWithEmailAndPassword,
  currentUserToDB: currentUserToDB,
  amIlogedIn: amIlogedIn,
  logout: logout,
  eliminarCurrentCuenta: eliminarCurrentCuenta,
  changePassword: changePassword,
  loginFacebook: loginFacebook,
  loadCarro: loadCarro,
  uploadCarro: uploadCarro,
  resendEmail: resendEmail,
  guardarDatosPedido: guardarDatosPedido,
  vaciarCarro: vaciarCarro,
  elementoVendido: elementoVendido,
  checkEmailVerified: checkEmailVerified,
  getCurrentUser: getCurrentUser
};
