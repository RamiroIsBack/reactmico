import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./styles";
export default class CarroProduct extends Component {
  constructor() {
    super();
    this.state = {
      showDescripcion: false
    };
  }

  handleClick() {
    //aqui hay una inconsistencia xq va a la pagina desde el
    //navlink pero es atraves de una acci'on x lo que llegan
    //los datos al componente de destino, si x una razon no
    //llegan esos datos se renderizaria con null?
    this.props.whenClicked(this.props.propiedades);
  }
  handleErase() {
    this.props.whenErase(this.props.indice);
  }
  //el event se pasa siempre como ultimo arg
  handleqtty(qtty, event) {
    console.log("event del qtty " + qtty);
    /*var qtty = 1
    if (event.target.id == '-'){
      qtty = 0
    }*/
    this.props.changeQtty(this.props.indice, qtty);
  }
  toogleDescripcion(e) {
    this.setState({ showDescripcion: !this.state.showDescripcion });
  }
  //<small>(x{this.props.propiedades.unidades})</small>
  render() {
    let name = this.props.propiedades.nombre;
    let descripcion = this.props.propiedades.descripcion;
    let precio = this.props.propiedades.precio;

    if (this.props.lengua === "ga") {
      name = this.props.propiedades.nombreGalego
        ? this.props.propiedades.nombreGalego
        : this.props.propiedades.nombre;
      descripcion = this.props.propiedades.descripcionGalego
        ? this.props.propiedades.descripcionGalego
        : this.props.propiedades.descripcion;
    }
    let url = this.props.propiedades.pic;
    return (
      <div
        className="container-fluid"
        style={{
          display: "inline-block",
          padding: "0px",
          border: "1px solid #2C6549",
          borderRadius: "10px",
          width: "98%"
        }}
      >
        <div
          className="container-fluid col-xs-12 col-sm-6 col-md-5 col-lg-5"
          style={style.foto.container}
        >
          <NavLink to="/Productos" onClick={this.handleClick.bind(this)}>
            <img
              role="presentation"
              alt="imagen de producto"
              src={url}
              className="img-rounded"
              style={{ maxWidth: "100%", maxHeight: "125px" }}
            />
          </NavLink>
        </div>
        <div
          className="container-fluid col-xs-12 col-sm-6 col-md-7 col-lg-7"
          style={style.foto.container}
        >
          <table
            className="table-condensed table-responsive"
            style={{ width: "100%", border: "none", marginBottom: 0 }}
          >
            <tbody>
              <tr>
                <th>{name}</th>
                <th>
                  <btn
                    className="btn glyphicon glyphicon-remove pull-right"
                    style={style.foto.container}
                    onClick={this.handleErase.bind(this)}
                  />
                </th>
              </tr>
            </tbody>
          </table>
          <table
            className="table-condensed table-responsive"
            style={{ width: "100%", border: "none", marginBottom: 0 }}
          >
            <tbody>
              {!this.state.showDescripcion && (
                <tr>
                  <td role="button" onClick={this.toogleDescripcion.bind(this)}>
                    mostrar descripcion:
                  </td>
                  <td>
                    <small
                      className="glyphicon glyphicon-chevron-down"
                      role="button"
                      onClick={this.toogleDescripcion.bind(this)}
                    />
                  </td>
                </tr>
              )}
              {this.state.showDescripcion && (
                <tr>
                  <td role="button" onClick={this.toogleDescripcion.bind(this)}>
                    {descripcion}
                  </td>
                  <td
                    className="glyphicon glyphicon-chevron-up"
                    role="button"
                    onClick={this.toogleDescripcion.bind(this)}
                  />
                </tr>
              )}
              <tr>
                <td>precio:</td>
                {!this.props.propiedades.precioRebajado && (
                  <td>
                    <h5>{precio}€</h5>
                  </td>
                )}
                {this.props.propiedades.precioRebajado && (
                  <td>
                    <h6
                      className="text-muted "
                      style={{
                        textDecoration: "line-through",
                        marginTop: "1px",
                        marginBottom: "1px"
                      }}
                    >
                      {precio}€
                    </h6>
                    <h5 style={{ marginTop: "1px" }}>
                      {this.props.propiedades.precioRebajado}€
                    </h5>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
