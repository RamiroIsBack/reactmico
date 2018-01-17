
import React, { Component } from 'react'

class WarningBasicConfigurable extends Component {
  aCreaciones(){
    this.props.redirecciona('email')
  }
  render() {
    let message = ''
    if(this.props.submodalWarning === 'noPassword'){
      message = 'tienes que poner una contraseña correcta , sigue las instrucciones debajo de la zona de escribir, gracias'
    } else if(this.props.submodalWarning === 'noUserName'){
      message ='elige un nombre válido, tiene que cumplir las condiciones que aparecen debajo del espacio a rellenar'
    } else if(this.props.submodalWarning === 'faltanDatos'){
      message ='porfavor rellena todos los datos antes de continuar'
    } else if (this.props.submodalWarning === 'wrongEmail'){
      message ='el email tiene algún fallo, revisalo y escríbelo de nuevo, recuerda que este email será donde te lleguen las confirmaciones y toda la información sobre tus compras, tiene que ser válido y que puedas acceder a él :)'
    }

    return (
      <div>

        <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

          <h4>Hola {this.props.nombre}, </h4>
          <h4>{message} </h4>

        </div>

      </div>
    )
  }
}

export default WarningBasicConfigurable
