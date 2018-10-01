import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import history from "../../utils/history";

class LogoContainer extends Component {
  handleClick(event) {
    this.props.toggleModal("closeCreaciones");
    this.props.navActive("", "navbarMicoFront"); //no hay tab activa
    window.scrollTo(0, 0);
    //routing programatically, now i can prevent if there is an error
    history.push("/");
  }
  onImgLoaded() {
    if (this.props.users.usersLoaded === false) {
      //en la accion ya lo pone a true
      this.props
        .getUsers()
        .then(response => {
          if (this.props.users.listaUsers.length > 0) {
            this.props.amIlogedIn();
            setTimeout(() => {
              if (this.props.users.currentUser) {
                this.gestionaCarroUser();
              }
            }, 800);
          }
        })
        .catch(error => {
          console.log("algo fue mal al cargar los usuarios" + error);
        });
    }
  }
  gestionaCarroUser() {
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
  render() {
    let paddingTop = {};
    if (this.props.navigation) {
      if (
        this.props.navigation.sticky ||
        this.props.navigation.screenSize === "mobile"
      ) {
        paddingTop = this.props.navigation.paddingTop4navbar;
      } else {
        let paddingNumber = this.props.navigation.paddingTop4navbar.paddingTop;
        paddingTop = { paddingTop: paddingNumber };
      }
    }
    return (
      <div
        className="logo__top__container"
        id="logoTopContainer"
        style={paddingTop}
      >
        <img
          className="logo__top__img"
          src="https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/logoApaisado.png?alt=media&token=34e5b690-df60-4234-bf66-d62346dfbb3e"
          onClick={this.handleClick.bind(this)}
          onLoad={this.onImgLoaded.bind(this)}
        />
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getCreaciones: () => dispatch(actions.getCreaciones()),
    getUsers: () => dispatch(actions.getUsers()),
    amIlogedIn: () => dispatch(actions.amIlogedIn()),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    navActive: (activeTab, params) =>
      dispatch(actions.navActive(activeTab, params)),
    loadCarro: (carro, justLogedIn) =>
      dispatch(actions.loadCarro(carro, justLogedIn)),
    uploadCarro: carro => dispatch(actions.uploadCarro(carro))
  };
};

const stateToProps = state => {
  return {
    navigation: state.navigation,
    users: state.user,
    carro: state.carro
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(LogoContainer);
