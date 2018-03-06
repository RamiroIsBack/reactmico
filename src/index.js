import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import history from './utils/history'
import {General_css} from './utils'
import store from './stores'
import { Provider } from 'react-redux'
import {Home,Carro,Diseños,Ferias,Conocenos,Productos, Amigo} from './components/layout'
import {AmigoPedidosContainer,
  AmigoDatosContainer,
  ModalLoginContainer,
  ModalWarningContainer,
  ModalMenuXsContainer,
  ModalCreacionesContainer,
  ModalFeriasContainer,
  ModalRegistrarseContainer,
  ModalEntrarContainer ,
  NavbarMicoFront,
  FooterContainer,
  ModalRealizarCompraContainer,
  ModalVolverArribaContainer,
} from './components/containers'

import 'bootstrap/dist/css/bootstrap.css'
import {
  Router as Router,
  Route,
  Link,
  NavLink,
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
/* The Elements components is a summary of basic presentation componets
 * available for use in this theme
 */

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
              <div className = 'general__container' style = {settingMinHigthToScreen} >

                <div className = 'main__container visible-xs-block hidden-sm hidden-md hidden-lg' >
                  <div className = 'col-xs-12' >
                    <img id='foto' src={picConstruccion}  style={{height:420,width:300}} />
                  </div>
                  <div className = 'col-xs-11'>
                    <h4>Hola!,</h4>
                    <h5>Estamos dando los últimos retoques a la pagina.</h5>
                    <p>Dentro de muy poco tendrás una guía con todas las ferias para que puedas ir a verme y una tienda online donde podrás comprar mis productos desde casa si lo prefieres </p>
                    <p>hasta entonces, sígueme en las redes sociales o contacta conmigo cuando quieras :) </p>
                  </div>
                </div>
                <div className = 'main__container hidden-xs' >
                  <div className = 'col-xs-12 col-sm-6 col-md-6 col-lg-4'>
                    <img id='foto' src={picConstruccion}  style={{height:420,width:300}} />
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
                  <FooterContainer/>
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
              <div className ='logo__top__container' id='logoTopContainer' >
                <NavLink to='/' >
                  <img className ='logo__top__img' src= '/mico_disegno_textil.jpg'></img>
                </NavLink>
              </div>

              <NavbarMicoFront/>

              <ModalRealizarCompraContainer/>
              <ModalRegistrarseContainer/>
              <ModalMenuXsContainer/>
              <ModalFeriasContainer/>
              <ModalWarningContainer/>
              <ModalLoginContainer/>
              <ModalEntrarContainer/>


              <div className = 'main__container'  >
                <Route exact path='/' component={Home}/>
                <Route path='/Diseños' component={Diseños}/>
                <Route path='/Carro' component={Carro}/>
                <Route path='/Ferias' component={Ferias}/>
                <Route path='/Conocenos' component={Conocenos}/>
                <Route path='/Productos' component={Productos}/>
                <Route path='/Amigo' component = {Amigo}/>
                <Route path='/Amigo/Datos' component = {AmigoDatosContainer}/>
                <Route path='/Amigo/Pedidos' component = {AmigoPedidosContainer}/>

                <ModalVolverArribaContainer/>

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
