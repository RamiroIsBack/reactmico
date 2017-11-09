import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import style from './styles'
export default class CarroProduct extends Component {
  constructor(){
    super()
    this.state ={
      showDescripcion:false,
    }
  }

  handleClick(){
    //aqui hay una inconsistencia xq va a la pagina desde el
    //navlink pero es atraves de una acci'on x lo que llegan
    //los datos al componente de destino, si x una razon no
    //llegan esos datos se renderizaria con null?
    this.props.whenClicked(this.props.propiedades)
  }
  handleErase(){
    this.props.whenErase(this.props.indice)
  }
  //el event se pasa siempre como ultimo arg
  handleqtty(qtty ,event){
    console.log ('event del qtty ' + qtty)
    /*var qtty = 1
    if (event.target.id == '-'){
      qtty = 0
    }*/
    this.props.changeQtty(this.props.indice ,qtty)
  }
  toogleDescripcion(e){
    this.setState({showDescripcion: !this.state.showDescripcion})
  }
  //<small>(x{this.props.propiedades.unidades})</small>
  render() {
    let name = this.props.propiedades.nombre
    let url = this.props.propiedades.pic
    var precio = this.props.propiedades.precio * this.props.propiedades.unidades
    return (

      <div className = 'container-fluid' style= {{display : 'inline-block', padding: '0px', border: '1px solid #2C6549', borderRadius:'10px', width : '98%'}}>
        <div className = 'container-fluid col-xs-12 col-sm-6 col-md-5 col-lg-5' style= {style.foto.container}>
          <NavLink to='/Productos' onClick={this.handleClick.bind(this)}>
            <img role='presentation' src={url} className ='img-rounded' style= {{maxWidth:'100%', maxHeight: '125px'}}>
            </img>
          </NavLink>

        </div>
        <div className = 'container-fluid col-xs-12 col-sm-6 col-md-7 col-lg-7' style= {style.foto.container}>
          <table className="table-condensed table-responsive" style = {{width : '100%', border: 'none' ,marginBottom:0}}>
            <tbody>
              <tr>
                <th>{name}
                </th>
                <th>
                  <btn className = 'btn glyphicon glyphicon-remove pull-right' style= {style.foto.container} onClick = {this.handleErase.bind(this)}>
                  </btn>
                </th>
              </tr>

            </tbody>
          </table>
          <table className="table-condensed table-responsive" style = {{width : '100%', border: 'none' ,marginBottom:0}}>
            <tbody>
              {!this.state.showDescripcion &&
                <tr>
                  <td role='button' onClick = {this.toogleDescripcion.bind(this)}>mostrar descripcion:</td>
                  <td>
                    <small className = 'glyphicon glyphicon-chevron-down' role='button' onClick = {this.toogleDescripcion.bind(this)}>
                    </small>

                  </td>
                </tr>
              }
              {this.state.showDescripcion &&
                <tr>
                  <td role='button' onClick = {this.toogleDescripcion.bind(this)} >
                    {this.props.propiedades.descripcion}
                  </td>
                  <td className = 'glyphicon glyphicon-chevron-up' role='button' onClick = {this.toogleDescripcion.bind(this)}></td>
                </tr>
              }
              <tr>
                <td>precio:</td>
                <td className = 'pull-right' style = {style.carroProduct.texto}>{precio} €</td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

