
import React, { Component } from 'react'
import {ModalDatosEnvio,ModalFormaDePago, ModalCompraRealizada} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'



class ModalRealizarCompraContainer extends Component {

  constructor() {
    super()
    this.state = {
      show: 'no',
      datosEnvio:true,
      formaDePago: false,
      compraRealizada: false,
      pagoPedido:{},
      carroPedido:{},

    }
  }
  componentDidMount() {


  }
  irAformaDePago(){
    this.setState({formaDePago:true, datosEnvio:false})

  }

  irAcompraRealizada(){
    this.setState({formaDePago:false,compraRealizada:true})
  }
  guardarDatosPedido (data ){
    this.props.guardarDatosPedido(this.props.carro,data)
    //this.props.blockElementos(this.props.carro.cartList)   pone en opacity:60% y cartel de vendido durante 15 dias
    //                                                       las creaciones vendidas ade+ guardar una lista de ellos para que todo //                                                       el q tenga esos elementos en el carro,
    //                                                       al cargarlo de la DB, se le borren
    // tb hay q mandar mail de confirmacion y otro a alba
    // con backend: https://stackoverflow.com/questions/40298207/sending-email-to-user-upon-registration-in-react
    // sin backend: https://github.com/dwyl/html-form-send-email-via-google-script-without-server
    // LO MEJOR X AHORA CLOUD FUNCTIONS https://firebase.google.com/products/functions/?authuser=0

    this.setState({pagoPedido: data, carroPedido:this.props.carro})
    this.props.vaciarCarro() //de la DB tb claro
    this.irAcompraRealizada()
  }

  toggleModal(whereTo){
    window.scrollTo(0, 0)
    if(whereTo){
      if(whereTo === 'datos'){
        this.props.navActive(whereTo, 'amigoNav')
        this.props.navActive('currentUser', 'navbarMicoFront')
        history.push('/Amigo/Datos')
      }else if(whereTo === 'pedidos'){
        this.props.navActive(whereTo, 'amigoNav')
        this.props.navActive('currentUser', 'navbarMicoFront')
        history.push('/Amigo/Pedidos')
      }else if(whereTo === 'carro'){
        this.props.navActive(whereTo, 'navbarMicoFront')
        history.push('/Carro')
      }

    }
    //para q al volver a abrir empieze por datos envio
    this.setState({formaDePago:false,compraRealizada:false,datosEnvio:true})
    this.props.toggleModal('closeRealizarCompra')
  }



  render(){
    var realizarCompraShowing = false
    var registrarseContenidos = {}

    if (this.props.storeModal){
      realizarCompraShowing = this.props.storeModal.realizarCompraShowing
    }
    // Render nothing if the "show" prop is false
    if (!realizarCompraShowing){
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
        { this.state.datosEnvio &&
          <ModalDatosEnvio
            carro ={this.props.carro}
            contenido = {registrarseContenidos}
            currentUser = {this.props.users.currentUser}
            show={realizarCompraShowing}
            onClose={this.toggleModal.bind(this)}
            irAcompraRealizada = {this.irAcompraRealizada.bind(this)}
            irAformaDePago = {this.irAformaDePago.bind(this)}
          >
          </ModalDatosEnvio>
        }
        { this.state.formaDePago &&
          <ModalFormaDePago
            carro ={this.props.carro}
            contenido = {registrarseContenidos}
            currentUser = {this.props.users.currentUser}
            show={realizarCompraShowing}
            onClose={this.toggleModal.bind(this)}
            irAcompraRealizada = {this.irAcompraRealizada.bind(this)}
            guardarDatosPedido = {this.guardarDatosPedido.bind(this)}
          >
          </ModalFormaDePago>
        }
        { this.state.compraRealizada &&
          <ModalCompraRealizada
            contenido = {registrarseContenidos}
            currentUser = {this.props.users.currentUser}
            show={realizarCompraShowing}
            onClose={this.toggleModal.bind(this)}
            pagoPedido={this.state.pagoPedido}
            carroPedido={this.state.carroPedido}
          >
          </ModalCompraRealizada>
        }

      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{


    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout: (modalName) =>dispatch(actions.showNotificationWithTimeout(modalName)),
    userCreated:(user) => dispatch(actions.userCreated(user)),
    loginGoogle:() =>dispatch(actions.loginGoogle()),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
    guardarDatosPedido:(carro,paymentData) =>dispatch(actions.guardarDatosPedido(carro,paymentData)),
    vaciarCarro:() => dispatch(actions.vaciarCarro()),

  }
}


const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,
    storeModal:state.modal,
    users: state.user,
    carro:state.carro


  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(ModalRealizarCompraContainer)
