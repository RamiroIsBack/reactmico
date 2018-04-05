import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalEntrar extends React.Component {

  constructor() {
    super()
    this.state ={
      entrarG: false,
      entrarM : false,
      entrarF: false,

    }
  }
  handleEleccion(event){
    if (event.target.id === 'entrarG' ){
      this.setState({entrarG:true, entrarM: false, entrarF: false})
      this.props.handleGLogin()//aqui es donde llamo a la acccion de lanzar el login
    }else if (event.target.id === 'entrarM'){
      this.setState({entrarM:true, entrarG: false ,entrarF: false})
    }else if (event.target.id === 'entrarF'){
      this.setState({entrarM:false, entrarG: false, entrarF: true})
      this.props.handleFLogin()//aqui es donde llamo a la acccion de lanzar el login
    }

  }


  handleEntrar(){
    let amigo = null
    amigo ={
      nombre: document.getElementById('nombre').value,
      password: document.getElementById('password').value,
    }
    this.props.entrar(amigo)

  }
  handleRegistrarse(){
    this.props.IrAregistrarse()
  }
  handlekeyPress(e){
    if(e.key === 'Enter'){
      this.handleEntrar()
    }
  }
  changePassword(){
    this.props.changePassword(document.getElementById('nombre').value,'forgot')
  }
  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }
    let contenido = this.props.contenido

    var stiloModal ={
      position: 'absolute',
      backgroundColor:'white',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      maxWidth: 700,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '60px',
      left: '20px',
      right: '20px',
      bottom: '20px',
      //border                     : '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    ///////     Tessting cos d background sometimes doesnt charge on time
    if (contenido.pic){
      stiloModal.backgroundImage ='url(' + contenido.pic.urlPicRegistrarse + ')'

    }else{
      stiloModal.backgroundColor = 'white'
    }

    var loginGIcon='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/login%20gplus.png?alt=media&token=3bb269b6-fae5-4c0f-99b0-666f4388e494'
    var loginFIcon='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/fb_icon_325x325.png?alt=media&token=f82e3369-9844-4929-a8f8-af1faa665624'
    var loginMIcon='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/login%20with%20password.png?alt=media&token=8b2ec7a9-c286-4c65-b720-93ed6aec4ab7'
    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
              style= {style.modal.btnClose}></button>
            <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>

              <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                <h6 className='text-center' style={{fontWeight:'bold'}}>Bienvenido</h6>
                <hr style={{padding:0,marginTop :0,marginBottom:2}}/>
              </div>
              <div className = 'container-fluid row hidden-xs'>
                <h3 className='text-center'>Bienvenido</h3>
                <hr/>
              </div>
              {!this.state.entrarM && !this.state.entrarG &&
                <div className = 'container-fluid row'>
                  <div className = 'col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                    <div className = ' text-center container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                      <h6 style={{fontWeight:'bold'}}>Entrar con contraseña</h6>
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img id='entrarM' src={loginMIcon}  style={{paddingTop: 3, height:96}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>

                    </div>
                    <div className = 'text-center container-fluid row hidden-xs'>
                      <h4 >Entrar con contraseña</h4>
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img id='entrarM' src={loginMIcon}  style={{paddingTop: 3, height:96}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>

                    </div>
                  </div>
                  <div className = 'col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                    <div className = 'text-center container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                      <h6 style={{fontWeight:'bold'}}>Entrar con tu cuenta de Google</h6>
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img id='entrarG' src={loginGIcon}  style={{borderRadius:'30px',marginTop: 12, paddingTop: 7, height:55}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>

                    </div>
                    <div className = 'text-center container-fluid row hidden-xs'>
                      <h4 >Entrar con tu cuenta de Google</h4>
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img  id='entrarG' src={loginGIcon}  style={{borderRadius:'30px', paddingTop: 7, height:55}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>

                    </div>
                  </div>
                  <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className = 'text-center container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                      <h6 style={{fontWeight:'bold'}}>Entrar con tu cuenta de Facebook</h6>
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img id='entrarF' src={loginFIcon}  style={{marginTop: 12, paddingTop: 7, height:55}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>

                    </div>
                    <div className = 'text-center container-fluid row hidden-xs'>
                      <h4 >Entrar con tu cuenta de Facebook</h4>
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img  id='entrarF' src={loginFIcon}  style={{paddingTop: 7, height:55}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>

                    </div>
                  </div>
                </div>

              }

              {this.state.entrarG &&
                <div className = 'container-fluid row'>
                  <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                    <h6 className='text-center' style={{fontWeight:'bold'}}>Estamos gestionando el registro con google</h6>
                  </div>
                  <div className = 'container-fluid row hidden-xs'>
                    <h4 className='text-center'>Estamos gestionando el registro con google...</h4>
                    <h6 className='text-center'>tiene que aparecer una ventana emergente [pop up], si no aparece, puede que lo tengas deshabilitado en tu navegador</h6>
                  </div>
                </div>
              }
              {this.state.entrarF &&
                <div className = 'container-fluid row'>
                  <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                    <h6 className='text-center' style={{fontWeight:'bold'}}>Estamos gestionando el registro con Facebook</h6>
                    <h6 className='text-center'>tiene que aparecer una ventana emergente [pop up], si no aparece, puede que lo tengas deshabilitado en tu navegador</h6>
                  </div>
                  <div className = 'container-fluid row hidden-xs'>
                    <h4 className='text-center'>Estamos gestionando el registro con Facebook...</h4>
                  </div>
                </div>
              }

              { this.state.entrarM &&
                <div  className= 'container-fluid'>
                  <div className= 'container-fluid row' >
                    <div className='form-group row'>
                      <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                        <p>nombre o email*</p>
                      </div>
                      <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                        <input type='text'  rows='1' className='form-control' id='nombre' placeholder='¿Cómo te llamas?' ></input>
                      </div>

                    </div>
                    <div className ='form-group row' >
                      <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                        <p>contraseña*</p>
                      </div>
                      <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9' >
                        <input type='password'  rows='1' className='form-control' id ='password' placeholder='introduce al menos 6 caracteres' onKeyPress ={this.handlekeyPress.bind(this)}></input>
                      </div>
                    </div>

                    <div className='form-group row'>
                      <button onClick={this.handleEntrar.bind(this)} className='btn text-center form-control ' style = {style.modal.btnRegistrarse} >Entrar</button>
                    </div>
                    <div className='form-group row'>
                      <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
                        <p>has olvidado tu contraseña?</p>
                      </div>
                      <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8' >
                        <button onClick={this.changePassword.bind(this)} className='btn text-center form-control ' style = {{fontSize: '16px',border: '1px solid',width: '90%',marginLeft: 8,}} >cambiar contraseña</button>
                      </div>
                    </div>
                  </div>

                  <div className ='container-fluid row'>
                    <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                      <hr style={{padding:0,marginTop :0,marginBottom:2}}/>
                    </div>
                    <div className = 'container-fluid row hidden-xs'>
                      <hr/>
                    </div>
                    <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
                      entra con:
                    </div>
                    <div className='col-xs-6 col-sm-4 col-md-4 col-lg-4' >
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img  id='entrarG' src={loginGIcon}  style={{paddingLeft:2, height:55}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>
                    </div>
                    <div className='col-xs-6 col-sm-4 col-md-4 col-lg-4' >
                      <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                        <img  id='entrarF' src={loginFIcon}  style={{paddingLeft:2, height:55}} onClick = {this.handleEleccion.bind(this)}/>
                      </a>
                    </div>
                  </div>
                </div>
              }
              <div>
                <hr/>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                Si todavia no tientes cuenta con nosotros, hazte una con tu email:
              </div>
              <div className='col-xs-12 col-sm-6 col-md-6 col-lg-6' >
                <button onClick={this.handleRegistrarse.bind(this)} className='btn text-center form-control ' style = {{fontSize: '16px',border: '2px solid',width: '90%',marginLeft: 8,}} >Registrate</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

//I tihk I don't need this cos it's only to put children to it
/*Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}*/

export default ModalEntrar
