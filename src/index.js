import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import history from './utils/history'
import {General_css} from './utils'
import store from './stores'
import { Provider } from 'react-redux'
//import {Home,Carro,Ferias,Conocenos,Productos, Amigo, Contacto, Taller} from './components/layout'
import {
  ModalWarningContainer,
  ModalMenuXsContainer,
  ModalRegistrarseContainer,
  ModalEntrarContainer ,
  NavbarMicoFront,
  OldFooterContainer,
  FooterContainer,
  ModalRealizarCompraContainer,
  ModalVolverArribaContainer,
  LogoContainer,
  CookiesAvisoContainer,
  ModalConsentimientoContainer,
  ModalPoliticaPrivacidadContainer,
} from './components/containers'

import 'bootstrap/dist/css/bootstrap.css'
import {
  Router as Router,
  Route,
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import {AsyncHome, AsyncDiseños, AsyncProductos, AsyncFerias ,AsyncContacto ,AsyncConocenos, AsyncTaller, AsyncCarro, AsyncAmigo, AsyncAmigoPedidosContainer, AsyncAmigoDatosContainer} from './components/AsyncComponentsReady'



class ReactMico extends Component {

  render(){

    let ready = true
    let picConstruccion = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/micEnConstruccion-mobile2.png?alt=media&token=4cba7d9f-8a8f-4cad-a379-1dbabcbfea0a'

    let settingMinHigthToScreen = {

      minHeight: window.innerHeight+20,
    }
    if(!ready){
      return(
        <Provider store={store.configure(null)}>
          <Router history={history}>
            <div>
              <div className='bell__container'>
                <img className="bellImg" src='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/mico%20poster%20bigger.png?alt=media&token=28883b94-a403-4a8d-87aa-07fe19a027eb'>
                </img>
              </div>
              <div className = 'crane__contanier' >
                <img id='foto' src={picConstruccion}  style={{height:420,width:300}} />
              </div>

              <div className = 'general__container' style = {settingMinHigthToScreen} >

                <div className = 'main__container visible-xs-block hidden-sm hidden-md hidden-lg' >
                  <div className = 'col-xs-12 col-sm-6 col-md-6 col-lg-4' style={{height:420,width:300}}>

                  </div>
                  <div className = 'col-xs-12 col-sm-6 col-md-6 col-lg-6' >
                    <h1>Hola!,</h1>
                    <h4>Estamos dando los últimos retoques a la pagina.</h4>
                    <h5>Dentro de muy poco tendrás una guía con todas las ferias para que puedas ir a verme y una tienda online donde podrás comprar mis productos desde casa si lo prefieres </h5>
                    <br/>

                    <h5>hasta entonces, sígueme en las redes sociales o contacta conmigo cuando quieras :) </h5>
                  </div>
                </div>
                <div className = 'main__container hidden-xs' >
                  <div className = 'col-xs-12 col-sm-6 col-md-6 col-lg-4'>

                  </div>
                  <div className = 'col-xs-12 col-sm-6 col-md-6 col-lg-6'>
                    <h1>Hola!,</h1>
                    <h2>Estamos dando los últimos retoques a la pagina.</h2>
                    <h3>Dentro de muy poco tendrás una guía con todas las ferias para que puedas ir a verme y una tienda online donde podrás comprar mis productos desde casa si lo prefieres </h3>
                    <br/>
                    <br/>
                    <h3>hasta entonces, sígueme en las redes sociales o contacta conmigo cuando quieras :) </h3>
                  </div>
                </div>
                <div className = 'footer__container'>
                  <OldFooterContainer/>
                </div>
              </div>
            </div>
          </Router>
        </Provider>
      )
    }
    return (

      <Provider store={store.configure(null)}>
        <Router history={history}>
          <div>
            <div className = 'general__container' style = {settingMinHigthToScreen}>
              <LogoContainer/>

              <NavbarMicoFront/>

              <ModalRealizarCompraContainer/>
              <ModalRegistrarseContainer/>
              <ModalMenuXsContainer/>
              <ModalWarningContainer/>
              <ModalEntrarContainer/>
              <ModalConsentimientoContainer/>
              <ModalPoliticaPrivacidadContainer/>

              <div className = 'main__container'  >
                <Route exact path='/' component={AsyncHome}/>
                <Route path='/Diseños' component={AsyncDiseños}/>
                <Route path='/Carro' component={AsyncCarro}/>
                <Route path='/Ferias' component={AsyncFerias}/>
                <Route path='/Conocenos' component={AsyncConocenos}/>
                <Route path='/Productos' component={AsyncProductos}/>
                <Route path='/Amigo' component = {AsyncAmigo}/>
                <Route path='/Amigo/Datos' component = {AsyncAmigoDatosContainer}/>
                <Route path='/Amigo/Pedidos' component = {AsyncAmigoPedidosContainer}/>
                <Route path='/Contacto' component = {AsyncContacto}/>
                <Route path='/Taller' component = {AsyncTaller}/>
                <ModalVolverArribaContainer/>

              </div>

              <div className = 'cookies__aviso__container'>
                <CookiesAvisoContainer>
                </CookiesAvisoContainer>
              </div>

              <div className = 'footer__container'>
                <FooterContainer/>
              </div>
            </div>
          </div>
        </Router>
      </Provider>

    )
  }
}

ReactDOM.render(<ReactMico/> , document.getElementById('root'))
registerServiceWorker()
