import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import history from "../../utils/history";
import { ModalEntrar } from "../presentational";

class ModalEntrarContainer extends Component {
  changePassword(amigo, params) {
    let user = this.comprobarNombreOEmailValido(amigo);
    if (user !== null) {
      alert(
        "hola, en breve recibirás um email a " +
          user.email +
          " para cambiar la contraseña, porfavor mira en la carpeta de correo no deseado por si acaso"
      );
      this.props.changePassword(user.email, params);
    }
    if (user === null) {
      alert(
        "el nombre o contraseña introducidos no coinciden con niguno de los usuarios registrados, porfavor comprueba que lo has escrito bien"
      );
    }
  }

  isLetterOrNumber(str) {
    /*
    \w is a character class that represents exactly what you want: [A-Za-z0-9_]. If you want the empty string to return true, change the + to a *.
    */
    return /^\w+$/.test(str);
  }
  IrAregistrarse() {
    this.props.toggleModal("closeEntrar");
    this.props.toggleModal("openRegistrarse");
  }

  toggleModal() {
    this.props.toggleModal("closeEntrar");
  }

  gestionaLogin(event) {
    if (event.target.id === "entrar") {
      this.props.toggleModal("closeLogin");
      this.props.toggleModal("openEntrar");
    } else if (event.target.id === "registrarse") {
      this.props.toggleModal("closeLogin");
      this.props.toggleModal("openRegistrarse");
    }
  }
  comprobarEmailPasswordValido(amigo) {
    //comprobar que existe este user
    if (
      amigo.email.indexOf("@") > -1 &&
      amigo.email.indexOf(".") > -1 &&
      amigo.email.charAt(amigo.email.length - 1) !== "."
    ) {
      return amigo.password.length > 5 ? "ok" : "el password no es valido";
    } else {
      return "el email no es valido";
    }
  }

  entrar(amigo) {
    let message = this.comprobarEmailPasswordValido(amigo);
    if (message === "ok") {
      //make it start at the top of the page every time
      window.scrollTo(0, 0);
      this.props
        .loginWithEmailAndPassword(amigo)
        .then(response => {
          if (response.code) {
            alert(
              "fallo al logearte con email y password , comprueba que lo has escrito bien :)"
            );
            //error
            return 0;
          }
          this.props.toggleModal("closeEntrar");
          //routing programatically, now i can prevent if there is an error
          history.push("/Amigo/Datos");
          this.toggleModalYrecargaCreacionesYgestionaCarroUser();
        })
        .catch(err => {
          console.log(err.message + "fallo al logearte con email y password");
        });
    } else {
      alert(
        message +
          ", comprueba que los has escrito bien porfavor y recuerda si pusiste alguna mayuscula que tambien cuenta ;)"
      );
    }
  }

  handleLoginGoogle() {
    this.sendActionForLogin(this.props.loginGoogle());
  }
  handleLoginFacebook() {
    this.sendActionForLogin(this.props.loginFacebook());
  }
  sendActionForLogin(providerAction) {
    providerAction
      .then(response => {
        if (response.additionalUserInfo.isNewUser) {
          this.props.toggleModal("closeEntrar");
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
  toggleModalYrecargaCreacionesYgestionaCarroUser() {
    this.props.toggleModal("closeEntrar");
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
              //no need cos it didn't change
              //this.props.uploadCarro(listaSinVendidos)
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

  render() {
    var menuEntrarShowing = false;
    var registrarseContenidos = {};

    if (this.props.storeModal) {
      menuEntrarShowing = this.props.storeModal.menuEntrarShowing;
    }
    // Render nothing if the 'show' prop is false
    if (!menuEntrarShowing) {
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
        <ModalEntrar
          show={menuEntrarShowing}
          entrar={this.entrar.bind(this)}
          onClose={this.toggleModal.bind(this)}
          contenido={registrarseContenidos}
          IrAregistrarse={this.IrAregistrarse.bind(this)}
          handleGLogin={this.handleLoginGoogle.bind(this)}
          handleFLogin={this.handleLoginFacebook.bind(this)}
          changePassword={this.changePassword.bind(this)}
        />
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout: (modalName, submodalName) =>
      dispatch(actions.showNotificationWithTimeout(modalName, submodalName)),
    loginWithEmailAndPassword: user =>
      dispatch(actions.loginWithEmailAndPassword(user)),
    loginGoogle: () => dispatch(actions.loginGoogle()),
    loginFacebook: () => dispatch(actions.loginFacebook()),
    changePassword: (newPassword, params) =>
      dispatch(actions.changePassword(newPassword, params)),
    getCreaciones: () => dispatch(actions.getCreaciones()),
    loadCarro: (carro, justLogedIn) =>
      dispatch(actions.loadCarro(carro, justLogedIn)),
    uploadCarro: carro => dispatch(actions.uploadCarro(carro))
  };
};

const stateToProps = state => {
  return {
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    users: state.user,
    storeModal: state.modal,
    storeContenidos: state.contenidos,
    carro: state.carro,
    creacion: state.creacion
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(ModalEntrarContainer);
