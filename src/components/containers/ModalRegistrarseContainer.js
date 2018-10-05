import React, { Component } from "react";
import { ModalRegistrarse } from "../presentational";

import { connect } from "react-redux";
import actions from "../../actions";

class ModalRegistrarseContainer extends Component {
  subirNuevoAmigo(user) {
    if (user === null) {
      this.props.showNotificationWithTimeout("Trabajando");
    } else {
      console.log("soy tu nuevo amigo!!!!!!!" + JSON.stringify(user));
      this.props.userCreated(user);
      this.props.toggleModal("closeRegistrarse");
      //make it start at the top of the page every time
      window.scrollTo(0, 0);
    }
  }
  handleLoginGoogle() {
    this.props
      .loginGoogle()
      .then(response => {
        if (response.additionalUserInfo.isNewUser) {
          this.props.toggleModal("closeRegistrarse");
          this.props.toggleModal("openConsentimiento");
        } else {
          this.toggleModalYrecargaCreacionesYgestionaCarroUser();
        }
      })
      .catch(err => {
        console.log(
          err.message +
            "fallo al logearte con google, prueba otra vez en un par de minutos"
        );
      });
  }
  handleLoginFacebook() {
    this.props
      .loginFacebook()
      .then(response => {
        if (response.additionalUserInfo.isNewUser) {
          this.props.toggleModal("closeRegistrarse");
          this.props.toggleModal("openConsentimiento");
        } else {
          this.toggleModalYrecargaCreacionesYgestionaCarroUser();
        }
      })
      .catch(err => {
        console.log(
          err.message +
            "fallo al logearte con facebook, prueba en un par de minutos"
        );
      });
  }
  toggleModalYrecargaCreacionesYgestionaCarroUser() {
    this.props.toggleModal("closeRegistrarse");
    //puede que haya algo en el carro d ates y habr'a q combinarlo x eso lo paso, digo q est'a recien logeado
    // y tb paso el uid de user para buscar en la base de ddatos
    this.props
      .getCreaciones()
      .then(creaciones => {
        let justLogedIn = true;
        this.props
          .loadCarro(this.props.carro.cartList, justLogedIn)
          .then(carro => {
            let listaSinVendidos = [];
            let listaDescartados = [];
            let tienesVendidos = false;

            for (let i = 0; i < carro.length; i++) {
              let elementoEnCarro = carro[i];
              for (var key in creaciones) {
                if (creaciones.hasOwnProperty(key)) {
                  let elementoEnCreaciones = creaciones[key];
                  elementoEnCreaciones.id = key;
                  if (elementoEnCarro.id === elementoEnCreaciones.id) {
                    if (elementoEnCreaciones.vendido) {
                      listaDescartados.push(elementoEnCreaciones.nombre);
                      tienesVendidos = true;
                    } else {
                      listaSinVendidos.push(elementoEnCreaciones);
                    }
                    break;
                  }
                }
              }
            }
            if (tienesVendidos) {
              this.props.uploadCarro(listaSinVendidos);
              let objetosVendidos = {
                listaDescartados: listaDescartados,
                nombre: "tienesVendidos"
              };
              this.props.showNotificationWithTimeout(
                "Warning",
                objetosVendidos
              );
            } else {
              this.props.uploadCarro(listaSinVendidos);
            }
          })
          .catch(err => {
            console.log(err.message + "fallo al cargar el carro");
          });
      })
      .catch(err => {
        console.log(err.message + "fallo al cargar las creaciones");
      });
  }

  toggleModal() {
    this.props.toggleModal("closeRegistrarse");
  }
  //this 2 methods are currently doing nothing cos listaUsers is always empty
  comprobarNombre(nombre) {
    var listaUsers = [];
    var repe = false;
    if (this.props.users) {
      listaUsers = this.props.users.listaUsers;
    }
    for (let i = 0; i < listaUsers.length; i++) {
      if (listaUsers[i].datosPersonales.nombre === nombre) {
        repe = true;
        break;
      }
    }
    return repe;
  }
  //TODO:: check if the email is repeated contrasting against the DB directly
  comprobarEmail(email) {
    var listaUsers = [];
    var repe = false;
    if (this.props.users) {
      listaUsers = this.props.users.listaUsers;
    }
    for (let i = 0; i < listaUsers.length; i++) {
      if (listaUsers[i].datosPersonales.email === email) {
        repe = true;
        break;
      }
    }
    return repe;
  }

  politica() {
    this.props.toggleModal("openPolitica");
  }

  render() {
    var registrarseShowing = false;
    var registrarseContenidos = {};

    if (this.props.storeModal) {
      registrarseShowing = this.props.storeModal.registrarseShowing;
    }
    // Render nothing if the "show" prop is false
    if (!registrarseShowing) {
      return null;
    }
    for (
      let i = 0;
      i < this.props.storeContenidos.listaContenidos.length;
      i++
    ) {
      if (this.props.storeContenidos.listaContenidos[i].id === "registrarse") {
        registrarseContenidos = this.props.storeContenidos.listaContenidos[i];
        break;
      }
    }

    return (
      <div>
        <ModalRegistrarse
          show={registrarseShowing}
          onClose={this.toggleModal.bind(this)}
          entrarConGoogle={this.handleLoginGoogle.bind(this)}
          entrarConFacebook={this.handleLoginFacebook.bind(this)}
          subirNuevoAmigo={this.subirNuevoAmigo.bind(this)}
          contenido={registrarseContenidos}
          comprobarNombre={this.comprobarNombre.bind(this)}
          comprobarEmail={this.comprobarEmail.bind(this)}
          politica={this.politica.bind(this)}
        />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    getCreaciones: () => dispatch(actions.getCreaciones()),
    loadCarro: (carro, justLogedIn) =>
      dispatch(actions.loadCarro(carro, justLogedIn)),
    uploadCarro: carro => dispatch(actions.uploadCarro(carro)),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout: modalName =>
      dispatch(actions.showNotificationWithTimeout(modalName)),
    userCreated: user => dispatch(actions.userCreated(user)),
    loginGoogle: () => dispatch(actions.loginGoogle()),
    loginFacebook: () => dispatch(actions.loginFacebook())
  };
};

const stateToProps = state => {
  return {
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,
    storeModal: state.modal,
    users: state.user,
    carro: state.carro
  };
};
//                                   ****
export default connect(
  stateToProps,
  dispatchToProps
)(ModalRegistrarseContainer);
