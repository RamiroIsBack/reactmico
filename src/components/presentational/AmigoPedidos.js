import React, { Component } from 'react'

class AmigoPedidos extends Component {
  render() {
    let nombre = ''
    if(this.props.currentUser)
      nombre =this.props.currentUser.datosPersonales.nombre
    return (
      <div>
        <h2>{nombre} tenemos tus pedidos</h2>
      </div>
    )
  }
}

export default AmigoPedidos
