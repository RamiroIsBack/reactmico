import React, { Component } from 'react'

class WarningNoDatos extends Component {
  aCreaciones(){
    this.props.redirecciona('datos')
  }
  render() {
    var loginIcon = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/loginIcon.png?alt=media&token=9df1a1ea-8b37-482b-919e-b0fb3be6b273'
    if(this.props.photoURL !== ''){
      loginIcon = this.props.photoURL
    }
    return (
      <div>

        <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

          <h4>Hola {this.props.nombre}, </h4>
          <h4>No has incluido tus datos de envio donde quieres que te mandemos tu compra,</h4>
          <h4>ve a tu zona personal pinchando el siguiente botón o con la barra de navegación de arriba</h4>

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
          > Registrarse
            <img id='Zona personal' src={loginIcon}  style={{borderRadius : 40, paddingTop: 3, height:45}} />
          </button>
        </div>
      </div>
    )
  }
}

export default WarningNoDatos
