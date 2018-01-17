import React, { Component } from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'
import {ModalEntrar} from '../presentational'


class ModalEntrarContainer extends Component {

  constructor(){
    super()
    this.state ={

    }
  }
  componentWillMount() {

  }
  changePassword(payload,params){
    alert('en breve recibirás un email con un enlace para cambiar tu contraseña')

    //hay q coger el email desde el nombre d usuario o desde el email q meta en lo de entrar antes de poder
    //mandar el cambio de contrase;a x email xq no sabemos a aquien mandarlo
    //sacar un popup dialog xa q est'e seguro de q ha puesto bien el mail o algo

    /*if(amigo.nombre.indexOf('@') > -1){
      //esta entrando con el mail
      if (amigo.nombre.indexOf('.') >-1 && amigo.nombre.charAt(amigo.nombre.length-1)!= '.'){
        //alert('parece un email valido, vamos a compararlo con los que tenemos')
        for (i =0; i < listaUsers.length; i++){
          if (listaUsers[i].datosPersonales.email === amigo.nombre){
            nombreOEmailValido = true
            alert('yes here you are' + listaUsers[i].datosPersonales.nombre)*/
    this.props.changePassword(payload,params)
  }

  isLetterOrNumber(str) {
    /*
    \w is a character class that represents exactly what you want: [A-Za-z0-9_]. If you want the empty string to return true, change the + to a *.
    */
    return /^\w+$/.test(str)
  }
  IrAregistrarse(){
    this.props.toggleModal('closeEntrar')
    this.props.toggleModal('openRegistrarse')
  }

  toggleModal(){
    this.props.toggleModal('closeEntrar')
  }


  gestionaLogin(event){
    if(event.target.id ==='entrar'){
      this.props.toggleModal('closeLogin')
      this.props.toggleModal('openEntrar')
    }
    else if(event.target.id ==='registrarse'){
      this.props.toggleModal('closeLogin')
      this.props.toggleModal('openRegistrarse')
    }
  }

  entrar(amigo){
    var listaUsers = []
    var nombreOEmailValido= false
    //var passwordValido = false
    var user = {}
    var i =0
    if (this.props.users){
      listaUsers = this.props.users.listaUsers
    }
    //comprobar que existe este user
    if(amigo.nombre.indexOf('@') > -1){
      //esta entrando con el mail
      if (amigo.nombre.indexOf('.') >-1 && amigo.nombre.charAt(amigo.nombre.length-1)!= '.'){
        //alert('parece un email valido, vamos a compararlo con los que tenemos')
        for (i =0; i < listaUsers.length; i++){
          if (listaUsers[i].datosPersonales.email === amigo.nombre){
            nombreOEmailValido = true
            user.email= amigo.nombre
            user.password= amigo.password
            break
          }
        }
      }
    }else{
      //entrando con el nombre
      if(this.isLetterOrNumber( amigo.nombre)){
        for (i =0; i < listaUsers.length; i++){
          if (listaUsers[i].datosPersonales.nombre === amigo.nombre){
            nombreOEmailValido = true
            user.email = listaUsers[i].datosPersonales.email
            user.password= amigo.password
            break
          }
        }
        //alert('parece un nombre valido, vamos a compararlo con los que tenemos')
      }
    }

    if (nombreOEmailValido){
      this.props.toggleModal('closeEntrar')
      //make it start at the top of the page every time
      window.scrollTo(0, 0)
      //routing programatically, now i can prevent if there is an error
      history.push('/Amigo/Datos')
      this.props.loginWithEmailAndPassword(user)
        .then(response => {
          this.toggleModalYrecargaCreacionesYgestionaCarroUser()
        })
        .catch(err => {
          console.log(err.message+ 'fallo al logearte con email y password')
        })

    }else if (!nombreOEmailValido){
      alert('el email o el nombre no se corresponde con ningun amigo de mico, comprueba que los has escrito bien porfavor y recuerda si pusiste alguna mayuscula que tambien cuenta ;)')

    }
  }


  handleLoginGoogle(){
    this.props.loginGoogle()
      .then(response => {
        this.toggleModalYrecargaCreacionesYgestionaCarroUser()
      })
      .catch(err => {
        alert(err.message+ 'fallo al logearte con google, prueba otra vez en un par de minutos')
      })
    this.props.toggleModal('closeEntrar')

  }
  handleLoginFacebook(){
    this.props.loginFacebook()
      .then(response => {
        this.toggleModalYrecargaCreacionesYgestionaCarroUser()
      })
      .catch(err => {
        alert(err.message+ 'fallo al logearte con facebook, prueba en un par de minutos')
      })

  }
  toggleModalYrecargaCreacionesYgestionaCarroUser(){
    this.props.toggleModal('closeEntrar')
    //puede que haya algo en el carro d ates y habr'a q combinarlo x eso lo paso, digo q est'a recien logeado
    // y tb paso el uid de user para buscar en la base de ddatos
    this.props.getCreaciones()
      .then(creaciones=>{
        let justLogedIn =true
        this.props.loadCarro(this.props.carro.cartList,justLogedIn )
          .then(carro =>{
            let listaSinVendidos = []
            let listaDescartados= []
            let tienesVendidos = false

            for(let i=0 ; i<carro.length ; i++){
              let elementoEnCarro = carro[i]
              for (var key in creaciones) {
                if (creaciones.hasOwnProperty(key)) {
                  let elementoEnCreaciones = creaciones[key]
                  elementoEnCreaciones.id = key
                  if(elementoEnCarro.id === elementoEnCreaciones.id){
                    if(elementoEnCreaciones.vendido){
                      listaDescartados.push(elementoEnCreaciones.nombre)
                      tienesVendidos= true
                    }else{
                      listaSinVendidos.push(elementoEnCreaciones)
                    }
                    break
                  }
                }
              }
            }
            if(tienesVendidos){
              this.props.uploadCarro(listaSinVendidos)
              let objetosVendidos={
                listaDescartados :listaDescartados,
                nombre: 'tienesVendidos',
              }
              this.props.showNotificationWithTimeout('Warning',objetosVendidos)
            }

          })
          .catch(err=>{
            console.log(err.message+ 'fallo al cargar el carro')
          })
      })
      .catch(err=>{
        console.log(err.message+ 'fallo al cargar las creaciones')
      })
  }

  render(){
    var menuEntrarShowing = false
    var registrarseContenidos = {}

    if (this.props.storeModal){
      menuEntrarShowing = this.props.storeModal.menuEntrarShowing
    }
    // Render nothing if the 'show' prop is false
    if (!menuEntrarShowing){
      return null
    }

    for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

      if (this.props.storeContenidos.listaContenidos[i].id == 'registrarse'){
        registrarseContenidos = this.props.storeContenidos.listaContenidos[i]
        break
      }
    }

    return (

      <div>
        <ModalEntrar
          show={menuEntrarShowing}
          entrar={this.entrar.bind(this)}
          onClose={this.toggleModal.bind(this)}
          contenido = {registrarseContenidos}
          IrAregistrarse = {this.IrAregistrarse.bind(this)}
          handleGLogin = {this.handleLoginGoogle.bind(this)}
          handleFLogin = {this.handleLoginFacebook.bind(this) }
          changePassword = {this.changePassword.bind(this)}>
        </ModalEntrar>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    getContenidos: () => dispatch(actions.getContenidos()),
    getUsers: () => dispatch(actions.getUsers()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout:(modalName,submodalName)=>dispatch(actions.showNotificationWithTimeout(modalName,submodalName)),
    loginWithEmailAndPassword: (user) => dispatch(actions.loginWithEmailAndPassword(user)),
    loginGoogle:() =>dispatch(actions.loginGoogle()),
    loginFacebook: () =>dispatch (actions.loginFacebook()),
    changePassword:(newPassword,params) =>dispatch(actions.changePassword(newPassword,params)),
    getCreaciones:() =>dispatch(actions.getCreaciones()),
    loadCarro:(carro,justLogedIn)=>dispatch(actions.loadCarro(carro,justLogedIn)),
    uploadCarro:(carro)=>dispatch(actions.uploadCarro(carro)),
  }
}


const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    users: state.user,
    storeModal:state.modal,
    storeContenidos: state.contenidos,
    carro:state.carro,
    creacion:state.creacion

  }
}
export default connect (stateToProps,dispatchToProps)(ModalEntrarContainer)





