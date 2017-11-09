import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalRegistrarse extends React.Component {

  constructor() {
    super()
    this.state = {
      show: 'no',
      nombreCorrect:false,
      emailCorrect:false,
      passwordCorrect:false,
      recibir: true,

      nombreExpectation1 : false,
      nombreExpectation2 : true,
      nombreExpectation3 : false,

      mailExpectation : false,

      passwordExpectation1 : false,
      passwordExpectation2 : false,
    }
  }

  handleClick(event){
    if(event.target.name === 'sino'){
      this.setState({recibir: !this.state.recibir})
    }
  }
  handleFocus(event){
    this.setState({show: event.target.id})
    console.log('show: '+ event.target.id)
  }
  isLetterOrNumber(str) {
    /*
    \w is a character class that represents exactly what you want: [A-Za-z0-9_]. If you want the empty string to return true, change the + to a *.
    */
    return /^\w+$/.test(str)
  }

  handleImputData(event){
    /*//create a copy from d state and then u update d state
    //never mutate d state!!!
    let copyToUpdate = Object.assign({},this.state)*/
    let value = event.target.value
    console.log ( value)
    if (event.target.id ==='nombre'){
      if(value.length >2 ){
        this.setState({nombreExpectation1 : true})
      }else{
        this.setState({nombreExpectation1 : false})
      }
      // si es diferente de letra o numero
      if (!this.isLetterOrNumber(value)) {
        this.setState({nombreExpectation2 : false})
      }else{
        this.setState({nombreExpectation2 : true})
      }

      //////////// llamada a la base de datos xa ver si ya existe ese nombre de usuario
      //          TEST THIS
      //llamada a la base de datos xa ver si ya existe ese nombre de usuario
      if (this.props.comprobarNombre(value)) {
        this.setState({nombreExpectation3 : false})
      }else{
        this.setState({nombreExpectation3 : true})
      }

    }else if (event.target.id ==='contactMail'){
      if(value.indexOf('@') > -1 && value.indexOf('.') >-1 && value.charAt(value.length-1)!= '.'){
        this.setState({mailExpectation : true})
      }else{
        this.setState({mailExpectation : false})
      }
    }else if ( event.target.id === 'password' ){
      if(value.length >5 ){
        this.setState({passwordExpectation1 : true})
      }else{
        this.setState({passwordExpectation1 : false})
      }
      // si es diferente de letra o numero (alphanumeric)
      if (!this.isLetterOrNumber(value)) {
        this.setState({passwordExpectation2 : false})
      }else{
        this.setState({passwordExpectation2 : true})
      }
    }

  }
  handleRegistrarse(event){
    let amigo = null
    if(this.state.nombreExpectation1 && this.state.nombreExpectation2 && this.state.nombreExpectation3 && this.state.mailExpectation && this.state.passwordExpectation1 && this.state.passwordExpectation2){
      amigo ={
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('contactMail').value,
        password: document.getElementById('password').value,
        newsletter: this.state.recibir,

      }
      this.props.subirNuevoAmigo(amigo)
    }else{

      // TODO: hacer bien esto diciendo exactamente cual es el fallo y con un dialogo con timeout
      alert ('porfavor comprueba el campo que este en rojo')
    }
  }
  handleGLogin(){
    this.props.entrarConGoogle()
  }
  handleFLogin(){
    this.props.entrarConFacebook()
  }
  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }
    let contenido = this.props.contenido
    var stiloModal ={
      position: 'absolute',
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',
      //borderRadius: 10,
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
    // setting all the styles when something changes on the form
    var estiloNom1 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloNom2 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloNom3 = {color: 'red', marginTop:0,marginBottom:0}

    var estiloMail = {color: 'red', marginTop:0,marginBottom:0}

    var estiloPassword1 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloPassword2 = {color: 'red', marginTop:0,marginBottom:0}

    var nombreExpectation1Met = 'glyphicon glyphicon-remove'
    var nombreExpectation2Met = 'glyphicon glyphicon-remove'
    var nombreExpectation3Met = 'glyphicon glyphicon-remove'

    var mailExpectationMet = 'glyphicon glyphicon-remove'

    var passwordExpectation1Met = 'glyphicon glyphicon-remove'
    var passwordExpectation2Met = 'glyphicon glyphicon-remove'

    var forNombre = {border: '1px solid red'}
    var forPassword = {border: '1px solid red'}
    var forMail = {border: '1px solid red'}

    if (this.state.nombreExpectation1){
      nombreExpectation1Met = 'glyphicon glyphicon-ok'
      estiloNom1 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if (this.state.nombreExpectation2){
      nombreExpectation2Met = 'glyphicon glyphicon-ok'
      estiloNom2 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if (this.state.nombreExpectation3){
      nombreExpectation3Met = 'glyphicon glyphicon-ok'
      estiloNom3 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if(this.state.nombreExpectation3 && this.state.nombreExpectation2 && this.state.nombreExpectation1){
      forNombre ={border: '1.5px solid green',}
    }

    if (this.state.mailExpectation){
      mailExpectationMet = 'glyphicon glyphicon-ok'
      estiloMail ={color: 'green', marginTop:0,marginBottom:0}
      forMail ={border: '1.5px solid green',}
    }

    if (this.state.passwordExpectation1){
      passwordExpectation1Met = 'glyphicon glyphicon-ok'
      estiloPassword1 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if (this.state.passwordExpectation2){
      passwordExpectation2Met = 'glyphicon glyphicon-ok'
      estiloPassword2 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if(this.state.passwordExpectation1 && this.state.passwordExpectation2){
      forPassword ={border: '1.5px solid green',}
    }

    //setting the news letter to yes or no

    var sino = 'Sí'
    var newsletter = 'glyphicon glyphicon-ok text-center pull-right'
    if (!this.state.recibir){
      newsletter = 'glyphicon glyphicon-remove text-center pull-right'
      sino = 'No'
    }
    var loginGIcon='https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2Flogin%20gplus.png?alt=media&token=2f31b4f0-43b9-4f46-b443-cfb93b448278'
    var loginFIcon='https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2Ffb_icon_325x325.png?alt=media&token=e7644d22-ab42-4ada-ae81-7754c0918553'
    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
              style= {style.modal.btnClose}></button>
            <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>

              <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                <h6 className='text-center' style={{fontWeight:'bold'}}>{contenido.descripcion.registrarseTitulo}</h6>
                <hr style={{padding:0,marginTop :0,marginBottom:2}}/>
              </div>
              <div className = 'container-fluid row hidden-xs'>
                <h3 className='text-center'>{contenido.descripcion.registrarseTitulo}</h3>
                <hr/>
              </div>

              <div >
                <div >
                  <div className='form-group row'>
                    <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                      <p>nombre*</p>
                    </div>
                    <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                      <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)}  className='form-control' style ={forNombre} id='nombre' placeholder='¿Cómo te llamas?' ></input>
                    </div>
                    { this.state.show === 'nombre' &&
                      <div className='col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>

                        <div className='col-xs-12 col-sm-12  col-md-12  col-lg-12' >
                          <table className='table-condensed table-responsive' style={{border: 'none'}}>
                            <tbody>
                              <tr>
                                <td style = {{ paddingBottom:0}}>
                                  <h6 style = {estiloNom1}>por lo menos 3 letras o numeros </h6>
                                </td>
                                <td style = {{ paddingBottom:0}}>
                                  <h6 className ={nombreExpectation1Met} style = {estiloNom1}></h6>
                                </td>
                              </tr>

                              <tr>
                                <td style = {{paddingTop: 0, paddingBottom:0}}>
                                  <h6 style = {estiloNom2}>sin espacios ni tildes, solo numeros y letras </h6>
                                </td>
                                <td style = {{paddingTop: 0, paddingBottom:0}}>
                                  <h6 className ={nombreExpectation2Met} style = {estiloNom2}></h6>
                                </td>
                              </tr>

                              <tr>
                                <td style = {{paddingTop: 0, paddingBottom:0}}>
                                  <h6 style = {estiloNom3}>un nombre disponible </h6>
                                </td>
                                <td style = {{paddingTop: 0, paddingBottom:0}}>
                                  <h6 className ={nombreExpectation3Met} style = {estiloNom3}></h6>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>
                    }

                  </div>
                  <div className='form-group row'>
                    <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                      <p>e-mail*</p>
                    </div>
                    <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                      <input type='e-mail' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)}  className='form-control' style ={forMail} id='contactMail' placeholder='nuevo.amigo.de.mico@micomail.com' ></input>
                    </div>
                    { this.state.show === 'contactMail' &&
                      <div className='col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>

                        <div className='col-xs-12 col-sm-12  col-md-12  col-lg-12'>
                          <table className="table-condensed table-responsive" style={{border: 'none', marginBottom: 2}} >
                            <tbody>
                              <tr>
                                <td style = {{ paddingBottom:0}}>
                                  <h6 style = {estiloMail}>email valido </h6>
                                </td>
                                <td style = {{ paddingBottom:0}}>
                                  <h6 className ={mailExpectationMet} style = {estiloMail}></h6>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table className="table-condensed table-responsive" style={{border: 'none'}} >
                            <tbody>
                              <tr>
                                <td style = {{ paddingTop:0, paddingBottom:0}}>
                                  <h6 style = {{color: 'black', marginTop:0,marginBottom:0}}>comprueba que lo has escrito correctamente porfavor </h6>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                      </div>
                    }
                  </div>
                  <div className ='form-group row' >
                    <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                      <p>contraseña*</p>
                    </div>
                    <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9' >
                      <input type='password' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)}  className='form-control' style ={forPassword} id ='password' placeholder='introduce al menos 6 caracteres'></input>
                    </div>
                    { this.state.show === 'password' &&
                      <div className='col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>

                        <div className='col-xs-12 col-sm-12  col-md-12  col-lg-12'>
                          <table className="table-condensed table-responsive"  style={{border: 'none'}}>
                            <tbody>
                              <tr>
                                <td style = {{ paddingBottom:0}}>
                                  <h6 style = {estiloPassword1}>por lo menos 6 letras o numeros </h6>
                                </td>
                                <td style = {{ paddingBottom:0}}>
                                  <h6 className ={passwordExpectation1Met} style = {estiloPassword1}></h6>
                                </td>
                              </tr>
                              <tr>
                                <td style = {{paddingTop: 0, paddingBottom:0}}>
                                  <h6 style = {estiloPassword2}>sin espacios ni tildes, solo numeros y letras </h6>
                                </td>
                                <td style = {{paddingTop: 0, paddingBottom:0}}>
                                  <h6 className ={passwordExpectation2Met} style = {estiloPassword2}></h6>
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </div>

                      </div>
                    }
                  </div>
                  <div className='form-group row' style={{marginBottom: 2}}>
                    <div className='col-xs-3 col-sm-2 col-md-2 col-lg-2'>
                      <a className ={newsletter} name ='sino' onClick={this.handleClick.bind(this)} style= {style.modal.btnNewsletter} id='newsletter'></a>
                    </div>
                    <div className='col-xs-9 col-sm-10 col-md-10 col-lg-10'>
                      <p>{sino} quiero recibir información por e-mail</p>
                    </div>
                  </div>
                  <p className= 'text-muted' style= {{padding: 0}}>(nunca mandamos spam ni publicidad ajena a Mico)</p>
                  <div className='form-group row'>
                    <button onClick={this.handleRegistrarse.bind(this)} className='btn text-center form-control ' style = {style.modal.btnRegistrarse} >Registrarse</button>
                  </div>
                </div>
              </div>
              <div className='hidden-xs col-sm-10 text-center'>
                {contenido.descripcion.registrarseInfo.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>})}
              </div>

              <div className ='col-sm-10 text-center container-fluid row'>
                <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
                  <hr style={{padding:0,marginTop :3,marginBottom:2}}/>
                </div>
                <div className = 'container-fluid row hidden-xs'>
                  <hr/>
                </div>
                <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
                  o tambien puedes entra con:
                </div>
                <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4' >
                  <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0, }}>
                    <img  id='entrarG' src={loginGIcon}  style={{paddingBottom: 3, height:55}} onClick = {this.handleGLogin.bind(this)}/>
                  </a>
                </div>
                <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4' >
                  <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0, }}>
                    <img  id='entrarG' src={loginFIcon}  style={{paddingBottom: 3, height:55}} onClick = {this.handleFLogin.bind(this)}/>
                  </a>
                </div>
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

export default ModalRegistrarse
