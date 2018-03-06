import React, { Component } from 'react'

class WarningNoVerifyedEmail extends Component {
  aCreaciones(){
    this.props.redirecciona('email')
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
          <h4>solo te queda verificar el email, en tu zona personal puedes cambiarlo o pedir que te mandemos otro email de confirmación al que debes responder, no olvides mirar en la carpeta de correo no deseado por si acaso ;) </h4>

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
            <img id='registrarse' src={loginIcon}  style={{borderRadius : 40, paddingTop: 3, height:45}} />
          </button>
        </div>
      </div>
    )
  }
}

export default WarningNoVerifyedEmail
