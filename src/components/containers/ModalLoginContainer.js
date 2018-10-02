import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import history from "../../utils/history";

class ModalLoginContainer extends Component {
  //onMouseOut() Rocks!!
  handleHoverOff(event) {
    this.props.toggleModal("closeDropdowns");
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

  render() {
    var menuLoginShowing = false;
    var listaUsers = [];

    if (this.props.storeModal) {
      menuLoginShowing = this.props.storeModal.menuLoginShowing;
    }
    // Render nothing if the "show" prop is false
    if (!menuLoginShowing) {
      return null;
    }
    if (this.props.users) {
      listaUsers = this.props.users.listaUsers;
    }
    var estiloModal = {
      position: "fixed",
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',

      //backgroundPosition: 'center',
      //backgroundSize: 'cover',
      //backgroundRepeat: 'no-repeat',
      backgroundColor: "white",
      minWidth: 100,
      maxWidth: 220,
      minHeight: 50,
      maxHeight: 700,
      margin: "0 auto",
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 3333,
      top: "43px",
      right: "50px",
      //right: '40px',
      //bottom: '40px',
      border: "1px solid #ccc",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "5px",
      outline: "none"
    };

    return (
      <div style={estiloModal} onMouseLeave={this.handleHoverOff.bind(this)}>
        <div
          className="col-xs-7 col-sm-7 col-md-7 col-lg-7 "
          style={{ padding: 1 }}
        >
          <a
            className="pull-right"
            id="entrar"
            onClick={this.gestionaLogin.bind(this)}
            style={{
              color: "rgba(0,0,0,0.45)",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            tengo cuenta
          </a>
        </div>
        <div
          className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
          style={{ padding: 1, paddingLeft: 5 }}
        >
          <a
            id="entrar"
            onClick={this.gestionaLogin.bind(this)}
            style={{
              color: "black",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Entrar
          </a>
        </div>
        <div
          className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
          style={{ padding: 1, textAlign: "center" }}
        >
          <hr style={{ padding: 0, margin: 0 }} />
        </div>
        <div
          className="col-xs-7 col-sm-7 col-md-7 col-lg-7 "
          style={{ padding: 1 }}
        >
          <a
            className="pull-right"
            id="registrarse"
            onClick={this.gestionaLogin.bind(this)}
            style={{
              color: "rgba(0,0,0,0.45)",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            soy nuevo aqui
          </a>
        </div>
        <div
          className="col-xs-5 col-sm-5 col-md-5 col-lg-5"
          style={{ padding: 1, paddingLeft: 5 }}
        >
          <a
            className=""
            id="registrarse"
            onClick={this.gestionaLogin.bind(this)}
            style={{
              width: " 90%",
              color: "black",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Registrarse
          </a>
        </div>
      </div>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(actions.getUsers()),
    toggleModal: modalName => dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout: modalName =>
      dispatch(actions.showNotificationWithTimeout(modalName))
  };
};

const stateToProps = state => {
  return {
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    users: state.user,
    storeModal: state.modal
  };
};
//                                   ****
export default connect(
  stateToProps,
  dispatchToProps
)(ModalLoginContainer);
