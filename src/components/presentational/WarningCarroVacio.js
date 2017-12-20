import React, { Component } from 'react'

class WarningCarroVacio extends Component {
  aCreaciones(){
    this.props.redirecciona('Diseños')
  }
  render() {
    return (
      <div>

        <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

          <h4>Hola {this.props.nombre}, </h4>
          <h4>Antes de realizar el pedido tienes que tener algo en el carro :)</h4>

        </div>
        <div style= {{textAlign: 'center', padding: 5}}>
          <button onClick ={this.aCreaciones.bind(this)} className= 'btn center-block'
            style= {{textAlign: 'center',
              color:'black',
              border: '1px solid black',
              borderRadius:'5px',
              width : '50%',
              padding: 0,
              backgroundColor: 'transparent'
            }}
          > seguir comprando  <h4  className = 'glyphicon glyphicon-hand-left'></h4>
          </button>
        </div>
      </div>
    )
  }
}

export default WarningCarroVacio
