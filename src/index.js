
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import history from './utils/history'
import {General_css} from './utils'
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
    let picConstruccionPortrait = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/micEnConstruccion-portrait.png?alt=media&token=6656adf4-73d9-49cf-830d-79871df530e4'
    let picConstruccionDesktop = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/micEnConstruccion-desktop.png?alt=media&token=5c91b69e-1be4-4314-bbf1-6539572cb884'
    if(!ready){
      return(
        <Provider store={store.configure(null)}>
          <Router history={history}>
            <div className = 'general__container' >
              <div className = 'main__container visible-xs-block hidden-sm hidden-md hidden-lg' >
                <img id='foto' src={picConstruccionPortrait}  style={{height:'100%',width:'100%'}} />
              </div>
              <div className = 'main__container hidden-xs' >
                <img id='foto' src={picConstruccionDesktop}  style={{height:'100%',width:'100%'}} />
              </div>
              <div className = 'footer__container'>
                <FooterContainer/>
              </div>
            </div>
          </Router>
        </Provider>
      )
    }
    let settingMinHigthToScreen = {

      minHeight: window.innerHeight+20,
    }
    return (

      <Provider store={store.configure(null)}>
        <Router history={history}>
          <div className = 'general__container' style = {settingMinHigthToScreen} >
            <ModalRealizarCompraContainer/>
            <ModalRegistrarseContainer/>
            <ModalMenuXsContainer/>
            <ModalCreacionesContainer/>
            <ModalFeriasContainer/>
            <ModalWarningContainer/>
            <ModalLoginContainer/>
            <ModalEntrarContainer/>

            <NavbarMicoFront/>

            <div className = 'main__container'  >
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
            <div className = 'footer__container'>
              <FooterContainer/>
            </div>
          </div>
        </Router>
      </Provider>

    )
  }
}

ReactDOM.render(<ReactMico/> , document.getElementById('root'))
registerServiceWorker()
