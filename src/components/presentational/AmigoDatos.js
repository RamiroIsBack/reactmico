import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class AmigoDatos extends React.Component {

  constructor() {
    super()
    this.state = {
      show: 'no',
      // asignados al usuario de Firebase (user properties)
      nombreCorrect:false,
      emailCorrect:false,
      passwordCorrect:false,
      tlfCorrect: false,

      nombreExpectation1 : false,
      nombreExpectation2 : true,
      nombreExpectation3 : false,

      mailExpectation1 : false,
      mailExpectation2 : false,

      passwordExpectation1 : false,
      passwordExpectation2 : false,

      //datos adicionales para el envio y requerimientos de mico
      nombreCompletoEnvioEditar: false,
      nombreEditar : false, //si es true sale un input, si no un texto y un boton q ponga cambiar
      emailEditar : false, //si es true sale un input, si no un texto y un boton q ponga cambiar
      recibir: true,

      quieroDatos: false,//si es true le mostramos el form

      showInfoVerified :false,

      nombreCompletoEnvio : '',//setting value of the input
      calle: '',
      localidad: '',
      provincia: '',
      cp :'',
      nombre: '',
      email: '',
      password:'',
    }
  }

  handleClick(event){
    if(event.target.name === 'sino'){
      this.setState({recibir: !this.state.recibir})
    }else if(event.target.name === 'verified'){
      this.setState({showInfoVerified: !this.state.showInfoVerified})
    }
  }
  handleFocus(event){
    this.setState({show: event.target.id})

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

    this.setState({[event.target.id]: event.target.value})

    let value = event.target.value

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

      //          TEST THIS
      //llamada a la base de datos xa ver si ya existe ese nombre de usuario
      if (this.props.comprobarNombre(value)) {
        this.setState({nombreExpectation3 : false})
      }else{
        this.setState({nombreExpectation3 : true})
      }

    }else if (event.target.id ==='email'){
      if(value.indexOf('@') > -1 && value.indexOf('.') >-1 && value.charAt(value.length-1)!== '.'){
        this.setState({mailExpectation1 : true})
      }else{
        this.setState({mailExpectation1 : false})
      }
      if (this.props.comprobarEmail(value)) {
        this.setState({mailExpectation2 : false})
      }else{
        this.setState({mailExpectation2 : true})
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

  handleGuardarCambios(event){

    let newCurrentUser = Object.assign({}, this.props.currentUser)

    if(event.target.id ==='datosEnvio'){

      // solo en el caso de modificar cosas de datos personales habr'a q utilizar las subdivisiones?

      let newDatosEnvio ={

        nombreCompletoEnvio: document.getElementById('nombreCompletoEnvio').value,
        calle: document.getElementById('calle').value,
        localidad: document.getElementById('localidad').value,
        provincia: document.getElementById('provincia').value,
        cp: document.getElementById('cp').value,
        hayDatos:true,
      }
      if (newDatosEnvio.nombreCompletoEnvio.length !== 0 && newDatosEnvio.calle.length !== 0 && newDatosEnvio.localidad.length !== 0 && newDatosEnvio.provincia.length !== 0 && newDatosEnvio.cp.length !== 0 ){

        newCurrentUser.datosEnvio=newDatosEnvio
        this.props.cambiarCurrentUserModificables('currentUserDatosEnvio', true)
        this.props.actualizarInfoUsuario(newCurrentUser,'envio')
      }else{
        this.props.showWarning('faltanDatos')
      }
    }else if(event.target.id === 'nombre'){

      if(this.state.nombreExpectation1 && this.state.nombreExpectation2 && this.state.nombreExpectation3){
        this.state.show = 'no' //para q no muestre los expectations
        newCurrentUser.datosPersonales.nombre = document.getElementById('nombre').value
        //al apretar el boton para cambiarlo, lo pongo a false
        this.props.cambiarCurrentUserModificables('currentUserNombre',true)
        //subir nombre a DB
        this.props.actualizarInfoUsuario(newCurrentUser,'nombre')

      }else{
        this.props.showWarning('noUserName')
      }

    }else if(event.target.id === 'password'){

      if(this.state.passwordExpectation1 && this.state.passwordExpectation2){
        this.state.show = 'no'

        this.props.cambiarCurrentUserModificables('currentUserPassword',true)

        this.props.changePassword(this.state.password,'change')

      }else{
        this.props.showWarning('noPassword')
      }

    }else if(event.target.id === 'email'){

      if(this.state.mailExpectation1 && this.state.mailExpectation2 ){
        this.state.show = 'no'
        newCurrentUser.datosPersonales.email = document.getElementById('email').value
        //al apretar el boton para cambiarlo, lo pongo a false
        this.props.cambiarCurrentUserModificables('currentUserEmail',true)
        //subir nombre a DB
        this.props.actualizarInfoUsuario(newCurrentUser,'email')

      }else{
        this.props.showWarning('wrongEmail')
      }

    } else if(event.target.id === 'foto'){

      var newFoto = document.querySelectorAll('input[type =file]')[0].files[0]
      if(newFoto){
        this.props.cambiarCurrentUserModificables('currentUserFoto', true)
        this.props.actualizarInfoUsuario(newCurrentUser,'foto',newFoto)
      }else{
        console.log('no hay archivo q subir'+ newFoto)
      }
    }


  }
  handleCurrentUserModificables(event){
    this.state.show = 'no'
    if(event.target.id ==='datosEnvio'){
      if (this.props.currentUser){
        if(this.props.currentUser.datosEnvio.cp){//setting value of the inputs if there is somethihng in the DB
          this.setState({
            nombreCompletoEnvio : this.props.currentUser.datosEnvio.nombreCompletoEnvio,
            calle: this.props.currentUser.datosEnvio.calle,
            localidad: this.props.currentUser.datosEnvio.localidad,
            provincia: this.props.currentUser.datosEnvio.provincia,
            cp :this.props.currentUser.datosEnvio.cp,
          })
        }
      }
      this.props.cambiarCurrentUserModificables('currentUserDatosEnvio', !this.props.currentUserDatos.currentUserDatosEnvio)
    }else if(event.target.id === 'foto'){

      this.props.cambiarCurrentUserModificables('currentUserFoto', !this.props.currentUserDatos.currentUserFoto)
    }else if(event.target.id === 'nombre'){

      if (this.props.currentUser){
        if(this.props.currentUser.datosPersonales.nombre){//setting value of the inputs if there is somethihng in the DB
          this.setState({
            nombre : this.props.currentUser.datosPersonales.nombre,
          })
        }
      }
      this.props.cambiarCurrentUserModificables('currentUserNombre',!this.props.currentUserDatos.currentUserNombre)
    }else if(event.target.id === 'email'){

      if(this.props.currentUser.datosPersonales.email){//setting value of the inputs if there is somethihng in the DB
        this.setState({
          email : this.props.currentUser.datosPersonales.email,
        })
      }
      this.props.cambiarCurrentUserModificables('currentUserEmail',!this.props.currentUserDatos.currentUserEmail)
    }else if (event.target.id === 'password'){
      //no tengo la password antigua no puedo ponerla
      this.props.cambiarCurrentUserModificables('currentUserPassword',!this.props.currentUserDatos.currentUserPassword)
    }

  }
  resendEmail(){
    this.props.resendEmail()
  }


  renderDatosPersonales(){
    var estiloNom1 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloNom2 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloNom3 = {color: 'red', marginTop:0,marginBottom:0}

    var estiloMail1 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloMail2 = {color: 'red', marginTop:0,marginBottom:0}

    var estiloPassword1 = {color: 'red', marginTop:0,marginBottom:0}
    var estiloPassword2 = {color: 'red', marginTop:0,marginBottom:0}

    var nombreExpectation1Met = 'glyphicon glyphicon-remove'
    var nombreExpectation2Met = 'glyphicon glyphicon-remove'
    var nombreExpectation3Met = 'glyphicon glyphicon-remove'

    var mailExpectation1Met = 'glyphicon glyphicon-remove'
    var mailExpectation2Met = 'glyphicon glyphicon-remove'

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

    if (this.state.mailExpectation1){
      mailExpectation1Met = 'glyphicon glyphicon-ok'
      estiloMail1 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if (this.state.mailExpectation2){
      mailExpectation2Met = 'glyphicon glyphicon-ok'
      estiloMail2 ={color: 'green', marginTop:0,marginBottom:0}
    }
    if(this.state.mailExpectation1 && this.state.mailExpectation2){
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

    var loginIcon = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/loginIcon.png?alt=media&token=9df1a1ea-8b37-482b-919e-b0fb3be6b273'
    if (this.props.currentUser !== null){
      if (this.props.currentUser.foto.photoURL){
        loginIcon = this.props.currentUser.foto.photoURL
      }
    }

    if(this.props.currentUser){

      return(
        <div>
          <div className='form-group row'>

            <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
              <p>foto de perfil :</p>
            </div>
            <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
              <label>
                <input type='file' onFocus={this.handleFocus.bind(this)} onChange ={this.handleGuardarCambios.bind(this)} className='form-control' id='foto' placeholder='elige la foto de tus archivos' style ={{display:'none'}} ></input>
                <img id='foto' src={loginIcon}  style={{cursor: 'pointer', borderRadius : 10 ,paddingTop: 3 , height:65}} />
              </label>
            </div>
          </div>

          <div className='form-group row'>
            {this.props.currentUserDatos.currentUserNombre &&
              <div>
                <div className= 'hidden-xs col-sm-6 offset-sm-2 col-md-5 offset-md-3 col-lg-5 offset-lg-3'>
                  <p> {this.props.currentUser.datosPersonales.nombre} </p>
                </div>
                <div className= 'hidden-sm hidden-md hidden-lg visible-xs-block col-xs-8'>
                  <p> {this.props.currentUser.datosPersonales.nombre} </p>
                </div>

                <div className= 'col-xs-4 col-sm-4 col-md-4 col-lg-4' style = {{paddingRight: 0,paddingLeft:0}}>
                  <button id= 'nombre' onClick = {this.handleCurrentUserModificables.bind(this)}
                    style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>cambiar nombre</button>
                </div>



              </div>
            }
            {!this.props.currentUserDatos.currentUserNombre &&
              <div>
                <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                  <p>nombre*</p>
                </div>
                <div className='col-xs-9 col-sm-9 col-md-6 col-lg-6'>
                  <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} rows='1' className='form-control' style ={forNombre} value = {this.state.nonbre}  id='nombre' placeholder='nuevo nombre' ></input>
                </div>
                <div className= 'col-xs-3 col-sm-3 col-md-3 col-lg-3' style = {{paddingRight: 0,paddingLeft:0}}>
                  <button id= 'nombre' onClick = {this.handleGuardarCambios.bind(this)}
                    style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>Guardar
                  </button>
                  <button id= 'nombre' onClick = {this.handleCurrentUserModificables.bind(this)}
                    style = {{border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',paddingLeft: 5,}}>cancelar
                  </button>
                </div>
              </div>
            }
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
          {this.props.currentUser.datosPersonales.providerId === 'firebase' &&
            <div>
              <div className='form-group row'>
                {this.props.currentUserDatos.currentUserEmail &&
                  <div>
                    <div className= 'hidden-xs col-sm-6 offset-sm-2 col-md-5 offset-md-3 col-lg-5 offset-lg-3'>
                      <p style={{marginBottom: 2}}> {this.props.currentUser.datosPersonales.email} </p>
                      {!this.props.currentUser.datosPersonales.emailVerified &&
                        <div>
                          <div className='form-group row' style={{marginBottom: 1}}>
                            <div className='col-xs-3 col-sm-2 col-md-2 col-lg-2' style={{paddingRight:0}}>
                              <a className ='glyphicon glyphicon-alert' name ='verified' onClick={this.handleClick.bind(this)}
                                style= {{cursor: 'pointer',textDecoration:'none',color:'gold'}}></a>
                            </div>
                            <div className='col-xs-9 col-sm-10 col-md-10 col-lg-10' style= {{paddingLeft:2}}>
                              <a style= {{cursor: 'pointer',textDecoration:'none', marginBottom:1 ,color:'goldenRod'}}
                                name ='verified' onClick={this.handleClick.bind(this)}>e-mail no verificado</a>
                            </div>

                          </div>
                        </div>
                      }
                    </div>
                    <div className= 'hidden-sm hidden-md hidden-lg visible-xs-block col-xs-8'>
                      <p> {this.props.currentUser.datosPersonales.email} </p>
                      {!this.props.currentUser.datosPersonales.emailVerified &&
                        <div>
                          <div className='form-group row' style={{marginBottom: 1}}>
                            <div className='col-xs-3 col-sm-2 col-md-2 col-lg-2' style={{paddingRight:0}}>
                              <a className ='glyphicon glyphicon-alert' name ='verified' onClick={this.handleClick.bind(this)}
                                style= {{cursor: 'pointer',textDecoration:'none',color:'gold'}}></a>
                            </div>
                            <div className='col-xs-9 col-sm-10 col-md-10 col-lg-10' style= {{paddingLeft:2}}>
                              <a style= {{cursor: 'pointer',textDecoration:'none', marginBottom:1 ,color:'goldenRod'}}
                                name ='verified' onClick={this.handleClick.bind(this)}>e-mail no verificado</a>
                            </div>

                          </div>
                        </div>
                      }
                    </div>
                    <div className= 'col-xs-4 col-sm-4 col-md-4 col-lg-4' style = {{paddingRight: 0,paddingLeft:0}}>
                      <button id= 'email' onClick = {this.handleCurrentUserModificables.bind(this)}
                        style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>cambiar email
                      </button>
                    </div>
                    { !this.props.currentUser.datosPersonales.emailVerified && this.state.showInfoVerified &&
                      <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                        <p style={{marginBottom: 2}} >porfavor verifica tu cuenta de correo haciendo click en el enlace del email que te llegó de Mico</p>
                        <p className= 'text-muted' style={{marginBottom: 2}}>si no lo encuentras, probablemente esté en correo no deseado </p>
                        <p>te lo volvemos a madnar pinchando <a style= {{border:'1px solid black',borderRadius:'2px',cursor: 'pointer',}} onClick = {this.resendEmail.bind(this)}>aqui</a></p>
                      </div>
                    }

                  </div>
                }
                {!this.props.currentUserDatos.currentUserEmail &&
                  <div>
                    <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                      <p>e-mail*</p>
                    </div>
                    <div className='col-xs-9 col-sm-9 col-md-6 col-lg-6'>
                      <input type='e-mail' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} className='form-control' style ={forMail} value = {this.state.email} id='email' placeholder='nuevo@email.com' ></input>
                    </div>
                    <div className= 'col-xs-3 col-sm-3 col-md-3 col-lg-3' style = {{paddingRight: 0,paddingLeft:0}}>
                      <button id= 'email' onClick = {this.handleGuardarCambios.bind(this)}
                        style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>Guardar
                      </button>
                      <button id= 'email' onClick = {this.handleCurrentUserModificables.bind(this)}
                        style = {{border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',paddingLeft: 5,}}>cancelar
                      </button>
                    </div>
                  </div>
                }
                { this.state.show === 'email' &&
                    <div className='col-xs-12 col-sm-offset-1 col-sm-11 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10'>

                      <div className='col-xs-12 col-sm-12  col-md-12  col-lg-12'>
                        <table className="table-condensed table-responsive" style={{border: 'none', marginBottom: 2}} >
                          <tbody>
                            <tr>
                              <td style = {{ paddingBottom:0}}>
                                <h6 style = {estiloMail1}>email valido </h6>
                              </td>
                              <td style = {{ paddingBottom:0}}>
                                <h6 className ={mailExpectation1Met} style = {estiloMail1}></h6>
                              </td>
                            </tr>
                            <tr>
                              <td style = {{ paddingBottom:0}}>
                                <h6 style = {estiloMail2}>email disponible </h6>
                              </td>
                              <td style = {{ paddingBottom:0}}>
                                <h6 className ={mailExpectation2Met} style = {estiloMail2}></h6>
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


                {this.props.currentUserDatos.currentUserPassword &&
                  <div>
                    <div className= 'hidden-xs col-sm-6 offset-sm-2 col-md-5 offset-md-3 col-lg-5 offset-lg-3'>
                      <p> ********************* </p>
                    </div>
                    <div className= 'hidden-sm hidden-md hidden-lg visible-xs-block col-xs-8'>
                      <p> ******** </p>
                    </div>
                    <div className= 'col-xs-4 col-sm-4 col-md-4 col-lg-4' style = {{paddingRight: 0,paddingLeft:0}}>
                      <button id= 'password' onClick = {this.handleCurrentUserModificables.bind(this)}
                        style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>cambiar contraseña
                      </button>
                    </div>

                  </div>
                }
                {!this.props.currentUserDatos.currentUserPassword &&
                  <div>
                    <div className='col-xs-12 col-sm-12 col-md-3 col-lg-3'>
                      <p>contraseña*</p>
                    </div>
                    <div className='col-xs-9 col-sm-9 col-md-6 col-lg-6'>
                      <input type='password' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} className='form-control' style ={forPassword} value = {this.state.password} id='password' placeholder='******' ></input>
                    </div>
                    <div className= 'col-xs-3 col-sm-3 col-md-3 col-lg-3' style = {{paddingRight: 0,paddingLeft:0}}>
                      <button id= 'password' onClick = {this.handleGuardarCambios.bind(this)}
                        style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>Guardar
                      </button>
                      <button id= 'password' onClick = {this.handleCurrentUserModificables.bind(this)}
                        style = {{border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',paddingLeft: 5,}}>cancelar
                      </button>
                    </div>
                  </div>
                }



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
            </div>
          }{/* final del bloke para que no se pueda cambiar email y password si entras con facebook o google */}
        </div>
      )
    }
  }

  renderDatosParaEnvio(){

    if(this.props.currentUser){
      if(this.props.currentUserDatos.currentUserDatosEnvio){ //mostrar los datos que hay
        return(
          <div>
            <div className= 'hidden-xs col-sm-6 offset-sm-2 col-md-5 offset-md-3 col-lg-5 offset-lg-3' style = {{paddingRight: 10}}>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.nombreCompletoEnvio} </p>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.calle} </p>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.localidad} </p>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.cp+' , '+this.props.currentUser.datosEnvio.provincia} </p>
            </div>

            <div className= 'hidden-sm hidden-md hidden-lg visible-xs-block col-xs-9' style = {{paddingLeft: 0, paddingRight: 0}}>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.nombreCompletoEnvio} </p>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.calle} </p>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.localidad} </p>
              <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.cp+' , '+this.props.currentUser.datosEnvio.provincia} </p>
            </div>


            <div className= 'col-xs-3 col-sm-4 col-md-4 col-lg-4' style = {{paddingRight: 0,paddingLeft:0}}>
              <button id= 'datosEnvio' onClick = {this.handleCurrentUserModificables.bind(this)}
                style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>cambiar datos</button>
            </div>

          </div>
        )
      }
      else{ //no hay datos en la BD o quiero modificarlos
        if(this.props.currentUser.datosEnvio.hayDatos || this.state.quieroDatos){//quiere modificarlos
          return(
            <div className='container'>
              <div className='form-group row'>
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                  <p>nombre completo* :</p>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9' >
                  <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} className='form-control' value = {this.state.nombreCompletoEnvio} id ='nombreCompletoEnvio' placeholder='nombre apellido-1 apellido-2'></input>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                  <p>calle*</p>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                  <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} className='form-control' value = {this.state.calle} id='calle' placeholder='calle del ejemplo 4' ></input>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                  <p>localidad*</p>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                  <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} rows='1' className='form-control' value = {this.state.localidad} id='localidad' placeholder='Vigo' ></input>
                </div>
              </div>

              <div className ='form-group row' >
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                  <p>provincia*</p>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9' >
                  <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} rows='1' className='form-control' id ='provincia' value={this.state.provincia} placeholder='Pontevedra'></input>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-xs-12 col-sm-3 col-md-3 col-lg-3'>
                  <p>código postal* :</p>
                </div>
                <div className='col-xs-12 col-sm-9 col-md-9 col-lg-9' >
                  <input type='text' onFocus={this.handleFocus.bind(this)} onChange ={this.handleImputData.bind(this)} rows='1' className='form-control' id ='cp' value = {this.state.cp} placeholder='36000'></input>
                </div>
              </div>

              <div className='form-group row'>
                <div className='col-xs-9 col-sm-10 col-md-10 col-lg-10' style = {{paddingRight: 0 }}>
                  <button id= 'datosEnvio' onClick={this.handleGuardarCambios.bind(this)} className='btn text-center form-control ' style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}} >Guardar cambios</button>
                </div>

                <div className='col-xs-3 col-sm-2 col-md-2 col-lg-2' style = {{paddingLeft: 0 ,paddingRight:0 }}>
                  <button className='btn text-center form-control ' id= 'datosEnvio' onClick={()=> this.setState({quieroDatos:false})}
                    style = {{paddingLeft: 5 ,paddingRight:0, border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',}}>cancelar
                  </button>
                </div>

              </div>

            </div>
          )
        }else{//no hay datos en DB
          return(
            <div>
              <div className= 'col-xs-7 col-sm-8 col-md-8 col-lg-8' style = {{paddingRight: 2,paddingLeft:0}}>
                No necesitas rellenar datos de envio porque se te preguntará en el proceso de pago con PayPal.
              </div>
              <div className= 'col-xs-5 col-sm-4 col-md-4 col-lg-4' style = {{paddingRight: 0,paddingLeft:0}}>
                <button id= 'datosEnvio' onClick={()=> this.setState({quieroDatos:true})}
                  style = {{border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '95%',paddingLeft: 5,}}>quiero guardar datos
                </button>
              </div>
              <div className= 'col-xs-12 col-sm-8 col-md-8 col-lg-8' style = {{paddingRight: 0,paddingLeft:0}}>
                De todas formas, si quieres tener una dirección predeterminada para Mico, puedes guardarla aquí y, a la hora de pagar, te daremos a elegir entre la que tengas guardada con nosotros y la que elijas en el proceso de pago de paypal.
              </div>
            </div>
          )
        }

      }
    }
  }

  render() {


    return (
      <div>
        <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12' style = {{paddingBottom:'40px'}}>
          <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg'>
            <h6 className='text-center' style={{fontWeight:'bold'}}>Datos personales</h6>
            <hr style={{padding:0,marginTop :0,marginBottom:2}}/>
          </div>
          <div className = 'container-fluid row hidden-xs'>
            <h3 className='text-center'>Datos personales</h3>
            <hr/>
          </div>
          <div className = 'col-xs-12 col-sm-10 col-md-10 col-lg-8'>
            <div >


              {this.renderDatosPersonales()}


            </div>
          </div>
        </div>
        <div>
          <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12' style = {{paddingRight: 0}}>

            <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg' style = {{paddingLeft: 0,paddingRight: 0}}>
              <h6 className='text-center' style={{fontWeight:'bold'}}>Datos para el envío</h6>
              <hr style={{padding:0,marginTop :0,marginBottom:2}}/>
            </div>
            <div className = 'container-fluid row hidden-xs'>
              <h3 className='text-center'>Datos para el envío</h3>
              <hr/>
            </div>
            <div className = 'col-xs-12 col-sm-10 col-md-10 col-lg-8' style = {{paddingLeft: 0,paddingRight: 0}}>
              <div >


                {this.renderDatosParaEnvio()}


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

export default AmigoDatos
