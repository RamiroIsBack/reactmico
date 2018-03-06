
import React, { Component } from 'react'
import {ModalDatosEnvio,ModalFormaDePago,ModalConfirmacionDatosEnvio, ModalCompraRealizada} from '../presentational'

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
      confirmacionDatosEnvio:false,
      paypalEnvio:{},
      dbEnvio:{},
      data:{},//will have all data from pedido pagado
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
  irAconfirmacionDatosEnvio(){

  }

  irAcompraRealizada(){
    this.setState({formaDePago:false,compraRealizada:true})
  }
  guardarDatosPedido (data ){
    // le pongo la fecha para q alba sepa cuando se hizo el pedido
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth()+1 //January is 0!
    var yyyy = today.getFullYear()

    if(dd<10) {
      dd = '0'+dd
    }

    if(mm<10) {
      mm = '0'+mm
    }

    today = dd + '/' + mm + '/' + yyyy
    data.fechaPedido = today

    let dbEnvio = this.props.users.currentUser.datosEnvio

    let paypalEnvio = {
      calle : data.paypalAddress.line1
        +''+(data.paypalAddress.line2!==undefined ||data.paypalAddress.line2!==null ? data.paypalAddress.line2 :'' ),
      cp: data.paypalAddress.postal_code,
      localidad:data.paypalAddress.city,
      newsletter:dbEnvio.newsletter,
      nombreCompletoEnvio:data.paypalAddress.recipient_name,
      provincia:data.paypalAddress.state,
    }
    data.payerEmail = this.props.users.currentUser.datosPersonales.email
    data.uid = this.props.users.currentUser.datosPersonales.uid
    data.envioDefinitivo = paypalEnvio
    if (dbEnvio.hayDatos){
      this.setState({
        confirmacionDatosEnvio: true,
        formaDePago:false,
        paypalEnvio:paypalEnvio,
        dbEnvio:dbEnvio,
        data:data,
      })

    }else{
      this.wrapPedido(data)
    }

  }

  wrapPedido(data){
    
    this.props.guardarDatosPedido(data.envioDefinitivo ,this.props.carro,data)
      .then(response =>{

        this.props.getUsers()//para q est'e incluido el nuevo pedido
      })
      .catch(err=>{
        console.log(err.message+ 'fallo al guardarDatosPedido')
      })

    this.setState({confirmacionDatosEnvio: false, pagoPedido: data, carroPedido:this.props.carro})
    for(let i=0 ; i<this.props.carro.cartList.length ; i++){
      let id = this.props.carro.cartList[i].id
      this.props.elementoVendido(id)
    }
    this.props.getCreaciones()
      .then(response=>{
        this.props.vaciarCarro()
          .then(response =>{
            this.irAcompraRealizada()
          })
          .catch(err=>{
            console.log(err.message+ 'fallo al vaciar el carro')
          })
      })
      .catch(err=>{
        console.log(err.message+ 'fallo al cargar las creaciones')
      })

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
    for (let i = 0 ;  i < this.props.storeContenidos.listaContenidos.length ;  i++) {

      if (this.props.storeContenidos.listaContenidos[i].id === 'registrarse'){
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
            guardarDatosPedido = {this.guardarDatosPedido.bind(this)}
          >
          </ModalFormaDePago>
        }
        {this.state.confirmacionDatosEnvio &&
          <ModalConfirmacionDatosEnvio
            contenido = {registrarseContenidos}
            data ={this.state.data}
            show={realizarCompraShowing}
            paypalEnvio={this.state.paypalEnvio}
            dbEnvio={this.state.dbEnvio}
            wrapPedido = {this.wrapPedido.bind(this)}
          />
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

    getUsers: () => dispatch(actions.getUsers()),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    showNotificationWithTimeout: (modalName) =>dispatch(actions.showNotificationWithTimeout(modalName)),
    userCreated:(user) => dispatch(actions.userCreated(user)),
    loginGoogle:() =>dispatch(actions.loginGoogle()),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
    guardarDatosPedido:(datosEnvio,carro,paymentData) =>dispatch(actions.guardarDatosPedido(datosEnvio,carro,paymentData)),
    vaciarCarro:() => dispatch(actions.vaciarCarro()),
    elementoVendido:(id) => dispatch(actions.elementoVendido(id)),
    getCreaciones:()=> dispatch (actions.getCreaciones()),

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
