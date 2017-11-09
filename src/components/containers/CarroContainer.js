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
    if (this.props.productToCart){
      if(this.props.users.currentUser){ //si hay un usuario logeado
        if(this.state.oldCartListLength != this.props.productToCart.cartList.length){//si hay cambio en el carro
          this.props.loadCarro(this.props.productToCart.cartList,false )
          let newcount = this.props.productToCart.cartList.length
          this.setState({oldCartListLength: newcount})
        }
      }
    }
  }
  componentWillUpdate(){
    if (this.props.productToCart){
      if(this.props.users.currentUser){
        if(this.state.oldCartListLength != this.props.productToCart.cartList.length){
          this.props.loadCarro(this.props.productToCart.cartList,false )
          let newcount = this.props.productToCart.cartList.length
          this.setState({oldCartListLength: newcount})
        }
      }
    }
  }


  goToProduct(foto){
    this.props.selectFoto(foto)
    //make it start at the top of the page
    window.scrollTo(0, 0)
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
    if(this.props.productToCart.cartList.length!=0){
      tipo = this.props.productToCart.cartList[this.props.productToCart.cartList.length-1].tipo
    }
    if(tipo!=''){
      this.props.moveToCreacionesSection(tipo)
    }else{
      this.props.moveToCreacionesSection('allCreaciones')
    }
  }
  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')

  }
  comprar(){
    if(this.props.productToCart){//hay conexion con el carroReducer
      if(this.props.productToCart.cartList.length != 0){//hay algo en el carro
        if(this.props.users.currentUser){//hay user
          let currentUserBuying = this.props.users.currentUser
          if(currentUserBuying.datosEnvio.cp){//hay cp con lo q ha rellenado los datos
            if(currentUserBuying.datosPersonales.emailVerified || currentUserBuying.datosPersonales.providerId !='firebase'){
              //va todo, todo bien abrimos el dialogo de compra
              this.props.toggleModal('openRealizarCompra')

            }else{ //hay q sacar un mensaje
              //this.props.showNotificationWithTimeout('Trabajando')//cambiar trabajando por
              alert('el email no esta verificado, necesitas que te mandemos otro mail? (boton de reeenviar mail) necesitas cambiar la direccion de mail?(boton de link a cambiar mail)')
            }
          }else{//no hay datos de envio
            alert('rellena porfavor los datos de envio en tu perfil (boton a amigo/datos)')

          }
        }else{//no hay user
          //this.props.showNotificationWithTimeout('Trabajando')//cambiar trabajando por (no hay usuario)
          alert('no hay usuario, logeate antes de realizar la compra(boton abrir logearse)')
        }
      }else{
        alert('no hay nada en el carro (boton a seguir comprando)')
      }
    }
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
    this.props.productToCart.cartList.map((productInCart,i)=>{
      return(
        <div className ='container-fluid' style={{padding: 0}} key ={i}>
          <CarroProduct indice ={i} propiedades = {productInCart} whenClicked={this.goToProduct.bind(this)} whenErase={this.deleteProduct.bind(this)} changeQtty={this.QttyToggle.bind(this)} />
        </div>


      )
    })
    return (
      <div onClick = {this.cierraDialogosNavbar.bind(this)} style={{padding: 1}}>
        {pedidoContenido.descripcion&&
          <div style={{padding: 1}}>
            <div className='container-fluid col-xs-7 col-sm-8 col-md-7 col-lg-6' style={{padding: 0}}>
              <div className='visible-xs-block hidden-sm hidden-md hidden-lg' style={{padding :0 , borderRightStyle:'ridge',minHeight: 980}}>
                {this.props.productToCart.cartList.length == 0 &&
                  <h3>
                    No tienes nungun producto en el carro para comprar.
                  </h3>
                }
                {productList}

                <NavLink onClick ={this.goToCreaciones.bind(this)} to='/Diseños' className= 'btn center-block' style= {{textAlign: 'center',fontSize: '17px',border: 'none',color:'black'}}> seguir comprando  <h4  className = 'glyphicon glyphicon-hand-left'></h4>
                </NavLink>

              </div>
              <div className='hidden-xs' style={{padding :0 , borderRightStyle:'ridge',minHeight: 440}}>
                {this.props.productToCart.cartList.length == 0 &&
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
              <CarroBuy carroPropiedades = {this.props.productToCart} comprar= {this.comprar.bind(this)} postVentaContenido={postVentaContenido} pedidoContenido ={pedidoContenido}/>
            </div>
          </div>
        }
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    //TODO el pay, order, recoger en feria
    //pay: (cartList) =>dispatch(actions.pay(cartList))
    selectFoto: (foto) =>dispatch(actions.selectedFoto(foto)),
    eraseProduct: (indice) =>dispatch(actions.eraseProduct(indice)),
    changeQtty: (indice, qtty) =>dispatch(actions.changeQtty(indice,qtty)),
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    getContenidos:()=>dispatch(actions.getContenidos()),
    showNotificationWithTimeout:(modalName)=>dispatch(actions.showNotificationWithTimeout(modalName)),
    loadCarro:(carro,justLogedIn)=>dispatch(actions.loadCarro(carro,justLogedIn)),

  }
}


const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,
    productToCart:state.carro,
    users: state.user,
  }
}

export default connect (stateToProps,dispatchToProps)(CarroContainer)


