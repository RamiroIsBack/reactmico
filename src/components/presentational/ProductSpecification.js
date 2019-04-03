import React, { Component } from "react";

export default class ProductSpecification extends Component {
  render() {
    let nombre = this.props.propiedades.nombre;
    let descripcion = this.props.propiedades.descripcion;
    let precio = this.props.propiedades.precio;
    let materiales = this.props.propiedades.materiales;
    if (this.props.lengua === "ga") {
      nombre = this.props.propiedades.nombreGalego
        ? this.props.propiedades.nombreGalego
        : this.props.propiedades.nombre;
      descripcion = this.props.propiedades.descripcionGalego
        ? this.props.propiedades.descripcionGalego
        : this.props.propiedades.descripcion;
      materiales = this.props.propiedades.materialesGalego
        ? this.props.propiedades.materialesGalego
        : this.props.propiedades.materiales;
    }
    return (
      <div className="container-fluid" style={{ padding: 0 }}>
        <table className="table-condensed table-responsive">
          <tbody>
            <tr>
              <th>
                <h4>{nombre}</h4>
              </th>
            </tr>
            <tr>
              <td>
                <p>{descripcion}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-condensed table-responsive">
          <tbody>
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
            <tr>
              <td>Materiales: </td>
              <td>
                {this.props.propiedades.materiales
                  ? materiales
                  : "no especificado"}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />

        <div className="container col-xs-8 col-sm-12 col-md-12 col-lg-12">
          <img
            role="presentation"
            alt="artesania de galicia"
            src={this.props.contenido.logo.urlLogoArtesania}
            className="img-rounded"
            style={{ maxWidth: "150px" }}
          />
        </div>
      </div>
    );
  }
}
