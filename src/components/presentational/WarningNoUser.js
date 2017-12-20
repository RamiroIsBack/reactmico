import React, { Component } from 'react'

class WarningNoUser extends Component {
  aCreaciones(){
    this.props.redirecciona('user')
  }
  render() {
    var loginIcon = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2FloginIcon.png?alt=media&token=c20aa5cb-4a39-4c17-b29c-f2b5c417d03d'
    return (
      <div>

        <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-12 '>

          <h4>Hola, </h4>
          <h4>Aún no te has registrado como amigo de Mico, solo será un momento y luego podrás proceder con la compra</h4>

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

export default WarningNoUser
