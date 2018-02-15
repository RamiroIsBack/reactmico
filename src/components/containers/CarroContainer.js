import React, { Component } from 'react'
import actions from '../../actions'
import {connect} from 'react-redux'
import {CarroBuy, CarroProduct} from '../presentational'
import style from './styles'
import { NavLink} from 'react-router-dom'


class CarroContainer extends Component {
  constructor(){
    super()
    this.state = {
      oldCartListLength: 0
    }
  }
  componentWillMount(){
    if (this.props.carro){
      if(this.props.users.currentUser){ //si hay un usuario logeado
        if(this.state.oldCartListLength != this.props.carro.cartList.length){//si hay cambio en el carro
          this.props.loadCarro(this.props.carro.cartList,false )
          let newcount = this.props.carro.cartList.length
          this.setState({oldCartListLength: newcount})
        }
      }
    }
  }
  componentWillUpdate(){
    if (this.props.carro){
      if(this.props.users.currentUser){
        if(this.state.oldCartListLength != this.props.carro.cartList.length){
          this.props.loadCarro(this.props.carro.cartList,false )
          let newcount = this.props.carro.cartList.length
          this.setState({oldCartListLength: newcount})
        }
      }
    }
  }


  goToProduct(foto){
    this.props.selectFoto(foto)
    //make it start at the top of the page
    window.scrollTo(0, 0)
    this.props.navActive('creaciones', 'navbarMicoFront')
  }
  deleteProduct(indice){
    this.props.eraseProduct(indice)
  }
  //no vamos a usar esto x ahora xq no se puede gestionar que pidan muchas unidades
  QttyToggle(indice,qtty){
    this.props.changeQtty(indice,qtty)
  }

  goToCreaciones(event){
    let tipo = ''
    // in case there is nothing in the cart
    if(this.props.carro.cartList.length!=0){
      tipo = this.props.carro.cartList[this.props.carro.cartList.length-1].tipo
    }
    if(tipo!=''){
      this.props.moveToCreacionesSection(tipo)
    }else{
      this.props.moveToCreacionesSection('allCreaciones')
    }
    this.props.navActive('creaciones', 'navbarMicoFront')
  }
  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')

  }
  comprar(){
    if(this.props.carro){//hay conexion con el carroReducer
      if(this.props.carro.cartList.length != 0){//hay algo en el carro
        if(this.props.users.currentUser){//hay user
          let currentUserBuying = this.props.users.currentUser
          if(currentUserBuying.datosEnvio.cp){//hay cp con lo q ha rellenado los datos
            if(currentUserBuying.datosPersonales.emailVerified || currentUserBuying.datosPersonales.providerId !='firebase'){

              this.gestionarSiTengoVendidosEnCarro()

            }else{
              this.props.showNotificationWithTimeout('Warning','noVerifyedEmail')
            }
          }else{
            this.props.showNotificationWithTimeout('Warning','noDatos')
          }
        }else{
          this.props.showNotificationWithTimeout('Warning','noUser')
        }
      }else{
        this.props.showNotificationWithTimeout('Warning','carroVacio')
      }
    }
  }
  gestionarSiTengoVendidosEnCarro(){

    this.props.getCreaciones()
      .then(creaciones=>{
        let justLogedIn =true
        this.props.loadCarro(this.props.carro.cartList,justLogedIn )
          .then(carro =>{
            //TODO ::: corregir el carro del user si hay algun elemento q haya sido vendido
            let listaSinVendidos = []
            let listaDescartados= []
            let tienesVendidos = false

            for(let i=0 ; i<carro.length ; i++){
              let elementoEnCarro = carro[i]
              if (creaciones[elementoEnCarro.id]){
                if(creaciones[elementoEnCarro.id].vendido){
                  listaDescartados.push(elementoEnCarro.nombre)
                  tienesVendidos= true
                }else{
                  listaSinVendidos.push(elementoEnCarro)
                }
              }else{//no existe esa creacion anymore
                listaDescartados.push(elementoEnCarro.nombre)
                tienesVendidos= true
              }

            }
            if(tienesVendidos){
              this.props.uploadCarro(listaSinVendidos)
              let objetosVendidos={
                listaDescartados :listaDescartados,
                nombre: 'tienesVendidos',
              }
              this.props.showNotificationWithTimeout('Warning',objetosVendidos)
            }else{
              this.props.toggleModal('openRealizarCompra')
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

  render() {
    //console.log ('carreta '+ JSON.stringify(this.state.cartList))
    let pedidoContenido = {}
    let postVentaContenido = {}
    if (this.props.storeContenidos.listaContenidos.length !=0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id == 'pedido'){
          pedidoContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id == 'postVenta'){
          postVentaContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
    }

    const productList =
    this.props.carro.cartList.map((productInCart,i)=>{
      return(
        <div className ='container-fluid' style={{padding: 0}} key ={i}>
          <CarroProduct indice ={i} propiedades = {productInCart} whenClicked={this.goToProduct.bind(this)} whenErase={this.deleteProduct.bind(this)} changeQtty={this.QttyToggle.bind(this)} />
        </div>


      )
    })
    return (
      <div onClick = {this.cierraDialogosNavbar.bind(this)} >

        <div >
          <div className='container-fluid col-xs-7 col-sm-8 col-md-7 col-lg-6' style={{padding: 0}}>
            <div className='visible-xs-block hidden-sm hidden-md hidden-lg' style={{padding :0 , borderRightStyle:'ridge',minHeight: window.innerHeight}}>
              {this.props.carro.cartList.length == 0 &&
                <h3>
                  No tienes nungun producto en el carro para comprar.
                </h3>
              }
              {productList}

              <NavLink onClick ={this.goToCreaciones.bind(this)} to='/Diseños' className= 'btn center-block' style= {{textAlign: 'center',fontSize: '17px',border: 'none',color:'black'}}> seguir comprando  <h4  className = 'glyphicon glyphicon-hand-left'></h4>
              </NavLink>

            </div>
            <div className='hidden-xs' style={{padding :0 , borderRightStyle:'ridge',minHeight: window.innerHeight}}>
              {this.props.carro.cartList.length == 0 &&
                <h2>
                  No tienes nungun producto en el carro para comprar.
                </h2>
              }
              {productList}

              <NavLink onClick ={this.goToCreaciones.bind(this)} to='/Diseños' className= 'btn center-block' style= {style.carroContainer.btnSeguirComprando}> seguir comprando  <h4  className = 'glyphicon glyphicon-hand-left'></h4>
              </NavLink>

            </div>
          </div>
          <div className=' col-xs-5 col-sm-4 col-md-5 col-lg-6'>
            <CarroBuy carroPropiedades = {this.props.carro} comprar= {this.comprar.bind(this)} postVentaContenido={postVentaContenido} pedidoContenido ={pedidoContenido}/>
          </div>
        </div>

      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    selectFoto: (foto) =>dispatch(actions.selectedFoto(foto)),
    eraseProduct: (indice) =>dispatch(actions.eraseProduct(indice)),
    changeQtty: (indice, qtty) =>dispatch(actions.changeQtty(indice,qtty)),
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    getContenidos:()=>dispatch(actions.getContenidos()),
    showNotificationWithTimeout:(modalName,submodalName)=>dispatch(actions.showNotificationWithTimeout(modalName,submodalName)),
    loadCarro:(carro,justLogedIn)=>dispatch(actions.loadCarro(carro,justLogedIn)),
    uploadCarro:(carro)=>dispatch(actions.uploadCarro(carro)),
    getCreaciones:() =>dispatch(actions.getCreaciones()),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
  }
}


const stateToProps = (state) => {
  return{

    storeContenidos: state.contenidos,
    carro:state.carro,
    users: state.user,
    creacion:state.creacion
  }
}

export default connect (stateToProps,dispatchToProps)(CarroContainer)
