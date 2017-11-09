
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import history from './utils/history'
import store from './stores'
import { Provider } from 'react-redux'
import {Home,Contacto,Carro,Diseños,Ferias,Conocenos,Registrarse,Productos, Amigo} from './components/layout'
import {AmigoPedidosContainer, AmigoDatosContainer, ModalLoginContainer,ModalTrabajandoContainer,ModalMenuXsContainer,ModalCreacionesContainer,ModalFeriasContainer,ModalRegistrarseContainer, ModalEntrarContainer , NavbarMicoFront,FooterContainer, ModalRealizarCompraContainer} from './components/containers'
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

    return (

      <Provider store={store.configure(null)}>
        <Router history={history}>
          <div style={{height:'100%'}}>
            <ModalRealizarCompraContainer/>
            <ModalRegistrarseContainer/>
            <ModalMenuXsContainer/>
            <ModalCreacionesContainer/>
            <ModalFeriasContainer/>
            <ModalTrabajandoContainer/>
            <ModalLoginContainer/>
            <ModalEntrarContainer/>
            <NavbarMicoFront/>
            <div  style={{width:'100%', minHeight :'100vh',paddingBottom : 180,display:'inline-block'}}>
              <Route exact path='/' component={Home}/>
              <Route path='/Diseños' component={Diseños}/>
              <Route path='/Registrarse' component={Registrarse}/>
              <Route path='/Carro' component={Carro}/>
              <Route path='/Contacto' component={Contacto}/>
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
