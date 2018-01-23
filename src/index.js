
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import history from './utils/history'
import store from './stores'
import { Provider } from 'react-redux'
import {Home,Carro,Diseños,Ferias,Conocenos,Registrarse,Productos, Amigo} from './components/layout'
import {AmigoPedidosContainer, AmigoDatosContainer, ModalLoginContainer,ModalWarningContainer,ModalMenuXsContainer,ModalCreacionesContainer,ModalFeriasContainer,ModalRegistrarseContainer, ModalEntrarContainer , NavbarMicoFront,FooterContainer,
  ModalRealizarCompraContainer} from './components/containers'
import 'bootstrap/dist/css/bootstrap.css'
import {
  Router as Router,
  Route,
  Link,
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
/* The Elements components is a summary of basic presentation componets
 * available for use in this theme
 */

class ReactMico extends Component {


  render(){
    let ready = true
    let picConstruccionPortrait = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2FmicEnConstruccion-portrait.png?alt=media&token=29ad4eff-08f8-489c-a452-e36c755c9130'
    let picConstruccionDesktop = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2FmicEnConstruccion-desktop.png?alt=media&token=f5665630-d8bc-4c8f-8b58-9a29cdf4e256'
    if(!ready){
      return(
        <Provider store={store.configure(null)}>
          <Router history={history}>
            <div style={{height:'100%'}}>
              <div className = 'visible-xs-block hidden-sm hidden-md hidden-lg' style= {{width:'100%', minHeight :'100vh',paddingBottom : 180,display:'inline-block'}}>
                <img id='foto' src={picConstruccionPortrait}  style={{height:'100%',width:'100%'}} />
              </div>
              <div className = 'hidden-xs' style= {{width:'100%', minHeight :'100vh',paddingBottom : 180,display:'inline-block'}}>
                <img id='foto' src={picConstruccionDesktop}  style={{height:'100%',width:'100%'}} />
              </div>
              <FooterContainer/>
            </div>
          </Router>
        </Provider>
      )
    }
    return (

      <Provider store={store.configure(null)}>
        <Router history={history}>
          <div style={{height:'100%'}}>
            <ModalRealizarCompraContainer/>
            <ModalRegistrarseContainer/>
            <ModalMenuXsContainer/>
            <ModalCreacionesContainer/>
            <ModalFeriasContainer/>
            <ModalWarningContainer/>
            <ModalLoginContainer/>
            <ModalEntrarContainer/>
            <NavbarMicoFront/>
            <div  style={{width:'100%', minHeight :'100vh',paddingBottom : 180,display:'inline-block'}}>
              <Route exact path='/' component={Home}/>
              <Route path='/Diseños' component={Diseños}/>
              <Route path='/Registrarse' component={Registrarse}/>
              <Route path='/Carro' component={Carro}/>
              <Route path='/Ferias' component={Ferias}/>
              <Route path='/Conocenos' component={Conocenos}/>
              <Route path='/Productos' component={Productos}/>
              <Route path='/Amigo' component = {Amigo}/>
              <Route path='/Amigo/Datos' component = {AmigoDatosContainer}/>
              <Route path='/Amigo/Pedidos' component = {AmigoPedidosContainer}/>

            </div>
            <FooterContainer/>
          </div>
        </Router>
      </Provider>

    )
  }
}

ReactDOM.render(<ReactMico/> , document.getElementById('root'))
registerServiceWorker()
