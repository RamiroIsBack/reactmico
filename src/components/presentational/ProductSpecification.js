import React, { Component } from 'react'

export default class ProductSpecification extends Component {
  render() {

    return (
      <div className ='container-fluid' style={{padding: 0}}>
        <table className="table-condensed table-responsive">
          <tbody>
            <tr>
              <th>
                <h4 >{this.props.propiedades.nombre}</h4>
              </th>
            </tr>
            <tr>
              <td>

                <p >{this.props.propiedades.descripcion}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-condensed table-responsive">
          <tbody>
            <tr>
              <td>precio:</td>
              <td>{this.props.propiedades.precio} €</td>

            </tr>
            <tr>
              <td>Materiales: </td>
              <td>
                {(this.props.propiedades.materiales) ? this.props.propiedades.materiales : 'no especificado'}
              </td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <div className = 'container-fluid row col-xs-12 col-sm-12 col-md-12 col-lg-12'  >
          {this.props.contenido.headerFoto.relacionArtesania.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/><br/></span>})}

        </div>
        <div className='container col-xs-8 col-sm-12 col-md-12 col-lg-12'  >
          <img role='presentation' src={this.props.contenido.logo.urlLogoArtesania} className ='img-rounded' style={{maxWidth: '100%'}}>
          </img>
        </div>
      </div>
    )
  }
}

