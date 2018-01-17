import React, { Component } from 'react'

class WarningTienesVendidos extends Component {
  aCreaciones(){
    this.props.redirecciona('datos')
  }
  render() {

    let listaDescartados = this.props.listaDescartados.map((nombre,i)=>{
      return(
        <div key ={i}>
          <h4 style = {{fontWeight: 'bold'}}>{nombre} </h4>
        </div>
      )
    })
    return (
      <div>

        <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

          <h4>Hola {this.props.nombre}, </h4>
          <h4>lo siento pero los elementos: </h4>
          {listaDescartados}
          <h4>han sido eliminados de tu carro porque fueron vendidos</h4>


        </div>

      </div>
    )
  }
}

export default WarningTienesVendidos
