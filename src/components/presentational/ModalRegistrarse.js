import React from "react";
import style from "./styles";
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalRegistrarse extends React.Component {
  constructor() {
    super();
    this.state = {
      show: "no",
      nombreCorrect: false,
      emailCorrect: false,
      passwordCorrect: false,
      acepto: false,

      nombreExpectation1: false,
      nombreExpectation2: true,
      nombreExpectation3: false,

      mailExpectation1: false,
      mailExpectation2: false,

      passwordExpectation1: false,
      passwordExpectation2: false
    };
  }

  handleClick(e) {
    if (e.target.id === "acepto") {
      this.setState({ acepto: !this.state.acepto });
    }
    if (e.target.id === "politica") {
      this.props.politica();
    }
  }
  handleFocus(event) {
    this.setState({ show: event.target.id });
    console.log("show: " + event.target.id);
  }
  isLetterOrNumber(str) {
    /*
    \w is a character class that represents exactly what you want: [A-Za-z0-9_]. If you want the empty string to return true, change the + to a *.
    */
    return /^\w+$/.test(str);
  }

  handleImputData(event) {
    /*//create a copy from d state and then u update d state
    //never mutate d state!!!
    let copyToUpdate = Object.assign({},this.state)*/
    let value = event.target.value;
    console.log(value);
    if (event.target.id === "nombre") {
      if (value.length > 2) {
        this.setState({ nombreExpectation1: true });
      } else {
        this.setState({ nombreExpectation1: false });
      }
      // si es diferente de letra o numero
      if (!this.isLetterOrNumber(value)) {
        this.setState({ nombreExpectation2: false });
      } else {
        this.setState({ nombreExpectation2: true });
      }

      //////////// llamada a la base de datos xa ver si ya existe ese nombre de usuario
      //          TEST THIS
      //llamada a la base de datos xa ver si ya existe ese nombre de usuario
      if (this.props.comprobarNombre(value)) {
        this.setState({ nombreExpectation3: false });
      } else {
        this.setState({ nombreExpectation3: true });
      }
    } else if (event.target.id === "contactMail") {
      if (
        value.indexOf("@") > -1 &&
        value.indexOf(".") > -1 &&
        value.charAt(value.length - 1) !== "."
      ) {
        this.setState({ mailExpectation1: true });
      } else {
        this.setState({ mailExpectation1: false });
      }
      if (this.props.comprobarEmail(value)) {
        this.setState({ mailExpectation2: false });
      } else {
        this.setState({ mailExpectation2: true });
      }
    } else if (event.target.id === "password") {
      if (value.length > 5) {
        this.setState({ passwordExpectation1: true });
      } else {
        this.setState({ passwordExpectation1: false });
      }
      // si es diferente de letra o numero (alphanumeric)
      if (!this.isLetterOrNumber(value)) {
        this.setState({ passwordExpectation2: false });
      } else {
        this.setState({ passwordExpectation2: true });
      }
    }
  }
  handleRegistrarse(event) {
    let amigo = null;
    if (
      this.state.nombreExpectation1 &&
      this.state.nombreExpectation2 &&
      this.state.nombreExpectation3 &&
      this.state.mailExpectation1 &&
      this.state.mailExpectation2 &&
      this.state.passwordExpectation1 &&
      this.state.passwordExpectation2 &&
      this.state.acepto
    ) {
      fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);

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
          amigo = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("contactMail").value,
            password: document.getElementById("password").value,
            aceptaPoliticaDatos: this.state.acepto,
            fechaAltaYacepta: today,
            ip: responseJson.ip,
            ciudad: responseJson.city
          };
          this.props.subirNuevoAmigo(amigo);
        })
        .catch(error => {
          console.log("algo fue mal al cargar desde instagram" + error);
        });
    } else {
      if (!this.state.acepto) {
        alert("tienes que aceptar la politica de privacidad de datos");
      } else {
        alert("porfavor comprueba el campo que este en rojo");
      }
      // TODO: hacer bien esto diciendo exactamente cual es el fallo y con un dialogo con timeout
    }
  }
  handleGLogin() {
    this.props.entrarConGoogle();
  }
  handleFLogin() {
    this.props.entrarConFacebook();
  }
  render() {
    // Render nothing if the 'show' prop is false
    if (!this.props.show) {
      return null;
    }
    let contenido = {};
    let registrarseInfo = "";
    let registrarseTitulo = "";
    if (this.props.contenido) {
      contenido = this.props.contenido;
      if (contenido.descripcion) {
        registrarseInfo = contenido.descripcion.registrarseInfo;
        registrarseTitulo = contenido.descripcion.registrarseTitulo;
      }
    }
    var stiloModal = {
      position: "absolute",
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',
      backgroundColor: "white",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      maxWidth: 700,
      minHeight: 300,
      maxHeight: 700,
      margin: "0 auto",
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: "60px",
      left: "20px",
      right: "20px",
      bottom: "20px",
      //border                     : '1px solid #ccc',
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "5px",
      outline: "none"
    };
    ///////     Tessting cos d background sometimes doesnt charge on time
    if (contenido.pic) {
      stiloModal.backgroundImage =
        "url(" + contenido.pic.urlPicRegistrarse + ")";
    } else {
      stiloModal.backgroundColor = "white";
    }
    // setting all the styles when something changes on the form
    var estiloNom1 = { color: "red", marginTop: 0, marginBottom: 0 };
    var estiloNom2 = { color: "red", marginTop: 0, marginBottom: 0 };
    var estiloNom3 = { color: "red", marginTop: 0, marginBottom: 0 };

    var estiloMail1 = { color: "red", marginTop: 0, marginBottom: 0 };
    var estiloMail2 = { color: "red", marginTop: 0, marginBottom: 0 };

    var estiloPassword1 = { color: "red", marginTop: 0, marginBottom: 0 };
    var estiloPassword2 = { color: "red", marginTop: 0, marginBottom: 0 };

    var nombreExpectation1Met = "glyphicon glyphicon-remove";
    var nombreExpectation2Met = "glyphicon glyphicon-remove";
    var nombreExpectation3Met = "glyphicon glyphicon-remove";

    var mailExpectation1Met = "glyphicon glyphicon-remove";
    var mailExpectation2Met = "glyphicon glyphicon-remove";

    var passwordExpectation1Met = "glyphicon glyphicon-remove";
    var passwordExpectation2Met = "glyphicon glyphicon-remove";

    var forNombre = { border: "1px solid red" };
    var forPassword = { border: "1px solid red" };
    var forMail = { border: "1px solid red" };

    if (this.state.nombreExpectation1) {
      nombreExpectation1Met = "glyphicon glyphicon-ok";
      estiloNom1 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (this.state.nombreExpectation2) {
      nombreExpectation2Met = "glyphicon glyphicon-ok";
      estiloNom2 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (this.state.nombreExpectation3) {
      nombreExpectation3Met = "glyphicon glyphicon-ok";
      estiloNom3 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (
      this.state.nombreExpectation3 &&
      this.state.nombreExpectation2 &&
      this.state.nombreExpectation1
    ) {
      forNombre = { border: "1.5px solid green" };
    }

    if (this.state.mailExpectation1) {
      mailExpectation1Met = "glyphicon glyphicon-ok";
      estiloMail1 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (this.state.mailExpectation2) {
      mailExpectation2Met = "glyphicon glyphicon-ok";
      estiloMail2 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (this.state.mailExpectation1 && this.state.mailExpectation2) {
      forMail = { border: "1.5px solid green" };
    }

    if (this.state.passwordExpectation1) {
      passwordExpectation1Met = "glyphicon glyphicon-ok";
      estiloPassword1 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (this.state.passwordExpectation2) {
      passwordExpectation2Met = "glyphicon glyphicon-ok";
      estiloPassword2 = { color: "green", marginTop: 0, marginBottom: 0 };
    }
    if (this.state.passwordExpectation1 && this.state.passwordExpectation2) {
      forPassword = { border: "1.5px solid green" };
    }

    //setting the news letter to yes or no

    var newsletter = "glyphicon glyphicon-ok text-center pull-right";
    if (!this.state.acepto) {
      newsletter = "glyphicon glyphicon-unchecked text-center pull-right";
    }
    var loginGIcon =
      "https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/login%20gplus.png?alt=media&token=3bb269b6-fae5-4c0f-99b0-666f4388e494";
    var loginFIcon =
      "https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/fb_icon_325x325.png?alt=media&token=f82e3369-9844-4929-a8f8-af1faa665624";

    return (
      <div style={style.modal.backdropStyle}>
        <div style={stiloModal}>
          <div>
            <button
              onClick={this.props.onClose}
              className="btn glyphicon glyphicon-remove pull-right"
              style={style.modal.btnClose}
            />
            <div
              className="col-xs-10 col-sm-8 col-md-8 col-lg-8"
              style={style.modal.formContainer}
            >
              <div className="container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg">
                <h6 className="text-center" style={{ fontWeight: "bold" }}>
                  {registrarseTitulo}
                </h6>
                <hr style={{ padding: 0, marginTop: 0, marginBottom: 2 }} />
              </div>
              <div className="container-fluid row hidden-xs">
                <h4 className="text-center">{registrarseTitulo}</h4>
                <hr style={{ padding: 0, marginTop: 5, marginBottom: 7 }} />
              </div>

              <div>
                <div>
                  <div className="form-group row">
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                      <p>nombre*</p>
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                      <input
                        type="text"
                        onFocus={this.handleFocus.bind(this)}
                        onChange={this.handleImputData.bind(this)}
                        className="form-control"
                        style={forNombre}
                        id="nombre"
                        placeholder="¿Cómo te llamas?"
                      />
                    </div>
                    {this.state.show === "nombre" && (
                      <div className="col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10">
                        <div className="col-xs-12 col-sm-12  col-md-12  col-lg-12">
                          <table
                            className="table-condensed table-responsive"
                            style={{ border: "none" }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6 style={estiloNom1}>
                                    por lo menos 3 letras o numeros{" "}
                                  </h6>
                                </td>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6
                                    className={nombreExpectation1Met}
                                    style={estiloNom1}
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6 style={estiloNom2}>
                                    sin espacios ni tildes, solo numeros y
                                    letras{" "}
                                  </h6>
                                </td>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6
                                    className={nombreExpectation2Met}
                                    style={estiloNom2}
                                  />
                                </td>
                              </tr>

                              <tr>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6 style={estiloNom3}>
                                    un nombre disponible{" "}
                                  </h6>
                                </td>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6
                                    className={nombreExpectation3Met}
                                    style={estiloNom3}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                      <p>e-mail*</p>
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                      <input
                        type="e-mail"
                        onFocus={this.handleFocus.bind(this)}
                        onChange={this.handleImputData.bind(this)}
                        className="form-control"
                        style={forMail}
                        id="contactMail"
                        placeholder="nuevo.amigo.de.mico@micomail.com"
                      />
                    </div>
                    {this.state.show === "contactMail" && (
                      <div className="col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10">
                        <div className="col-xs-12 col-sm-12  col-md-12  col-lg-12">
                          <table
                            className="table-condensed table-responsive"
                            style={{ border: "none", marginBottom: 2 }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6 style={estiloMail1}>email valido </h6>
                                </td>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6
                                    className={mailExpectation1Met}
                                    style={estiloMail1}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6 style={estiloMail2}>email disponible </h6>
                                </td>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6
                                    className={mailExpectation2Met}
                                    style={estiloMail2}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            className="table-condensed table-responsive"
                            style={{ border: "none" }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6
                                    style={{
                                      color: "black",
                                      marginTop: 0,
                                      marginBottom: 0
                                    }}
                                  >
                                    comprueba que lo has escrito correctamente
                                    porfavor{" "}
                                  </h6>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                      <p>contraseña*</p>
                    </div>
                    <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                      <input
                        type="password"
                        onFocus={this.handleFocus.bind(this)}
                        onChange={this.handleImputData.bind(this)}
                        className="form-control"
                        style={forPassword}
                        id="password"
                        placeholder="introduce al menos 6 caracteres"
                      />
                    </div>
                    {this.state.show === "password" && (
                      <div className="col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10">
                        <div className="col-xs-12 col-sm-12  col-md-12  col-lg-12">
                          <table
                            className="table-condensed table-responsive"
                            style={{ border: "none" }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6 style={estiloPassword1}>
                                    por lo menos 6 letras o numeros{" "}
                                  </h6>
                                </td>
                                <td style={{ paddingBottom: 0 }}>
                                  <h6
                                    className={passwordExpectation1Met}
                                    style={estiloPassword1}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6 style={estiloPassword2}>
                                    sin espacios ni tildes, solo numeros y
                                    letras{" "}
                                  </h6>
                                </td>
                                <td style={{ paddingTop: 0, paddingBottom: 0 }}>
                                  <h6
                                    className={passwordExpectation2Met}
                                    style={estiloPassword2}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="form-group row"
                    name="sino"
                    style={{ marginBottom: 2 }}
                  >
                    <div className="col-xs-3 col-sm-2 col-md-2 col-lg-2">
                      {this.state.acepto && (
                        <a
                          className={newsletter}
                          onClick={this.handleClick.bind(this)}
                          style={{
                            border: "2px solid green",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: "black",
                            textDecoration: "none",
                            paddingTop: 1
                          }}
                          id="acepto"
                        />
                      )}
                      {!this.state.acepto && (
                        <a
                          className={newsletter}
                          onClick={this.handleClick.bind(this)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            textDecoration: "none",
                            fontSize: "19px"
                          }}
                          id="acepto"
                        />
                      )}
                    </div>
                    <div
                      className="col-xs-9 col-sm-10 col-md-10 col-lg-10"
                      style={{ display: "inline-block", paddingLeft: 0 }}
                    >
                      <p style={{ display: "inline" }}>He leido y acepto la </p>
                      <p
                        style={{
                          display: "inline",
                          fontWeight: "bold",
                          cursor: "pointer"
                        }}
                        onClick={this.handleClick.bind(this)}
                        id="politica"
                      >
                        {" "}
                        política de privacidad
                      </p>
                    </div>
                  </div>
                  <div className="form-group row">
                    <button
                      onClick={this.handleRegistrarse.bind(this)}
                      className="btn text-center form-control "
                      style={style.modal.btnRegistrarse}
                    >
                      Registrarse
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 text-center">
                {registrarseInfo.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </div>

              <div className="col-sm-10 text-center container-fluid row">
                <div className="container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg">
                  <hr style={{ padding: 0, marginTop: 3, marginBottom: 2 }} />
                </div>
                <div className="container-fluid row hidden-xs">
                  <hr />
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  Tambien puedes entra con:
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <a
                    style={{
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "transparent",
                      textDecoration: "none",
                      padding: 0
                    }}
                  >
                    <img
                      id="entrarG"
                      src={loginGIcon}
                      alt="loginGoogle"
                      style={{ paddingBottom: 3, height: 55 }}
                      onClick={this.handleGLogin.bind(this)}
                    />
                  </a>
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                  <a
                    style={{
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "transparent",
                      textDecoration: "none",
                      padding: 0
                    }}
                  >
                    <img
                      id="entrarG"
                      src={loginFIcon}
                      alt="loginFacebook"
                      style={{ paddingBottom: 3, height: 55 }}
                      onClick={this.handleFLogin.bind(this)}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//I tihk I don't need this cos it's only to put children to it
/*Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}*/

export default ModalRegistrarse;
