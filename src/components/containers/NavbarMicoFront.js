import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'
import style from './styles'

class NavbarMicoFront extends Component {
  constructor() {
    super()

  }
  componentWillMount() {
    if (this.props.storeContenidos.ContenidosLoaded == false){
      //en la accion ya lo pone a true
      this.props.getContenidos()
    }
  }


  //ya no colapso la navbar , solo los dialogos q hacen de dropdown
  gestionaColapso(event){
    console.log ('gestionaColapso: ' +JSON.stringify(event.target.id))
    //click en registrarse as'i q mostrar el dialogo modal xa registrarse
    if (event.target.id == 'xsMenu'){
      this.props.toggleModal('openMenuXs')
      // no hace nada con el resto xq los otros dialogos no pueden estar abiertos
    }
    //click en registrarse as'i q mostrar el dialogo modal xa registrarse
    if (event.target.id == 'registrarse'){
      this.props.toggleModal('openEntrar')
      this.props.toggleModal('closeRegistrarse')
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }
    else if(event.target.id === 'currentUser'){
      this.props.toggleModal('closeLogin')
      this.props.toggleModal('closeRegistrarse')
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
    //de los dropdown
    else if (event.target.id == 'creaciones'){

      this.props.toggleModal('openCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
      this.props.moveToCreacionesSection(event.target.name)
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
    //
    // remember [else if] links them all and makes d last [else] apply to all
    // otherwise it would be d [else] of the las [if] ;)
    //
    else if (event.target.id == 'ferias'){
      this.props.toggleModal('openFerias')
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeLogin')
      this.props.moveToFeriasSection(event.target.name)
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
    //viene de otro lado as'i q cierra los 2
    else if(event.target.id== 'carro'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
    else if(event.target.id== 'conocenos'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
    else if(event.target.id== 'home'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
      this.props.navActive('', 'navbarMicoFront')//no hay tab activa
    }
    else{
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
    }


  }

  handleHoverOn(event){
    //console.log('im on ' + event.target.id)
    if(event.target.id == 'ferias'){
      this.props.toggleModal('openFerias')
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeLogin')
    }else if (event.target.id == 'creaciones'){
      this.props.toggleModal('openCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')

    // no voy a sacar un dropdown para registrarse mejor
    }else if (event.target.id === 'x ahora nada'){
      this.props.toggleModal('openLogin')
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      //solo xa cerrar loss dropdowns de los otros al pasar por ellos
    }else if (event.target.id === 'conocenos'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }else if (event.target.id === 'home'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }

  }

  render() {
    let registrarseShowing = this.props.storeModal.registrarseShowing
    let menuXsShowing = this.props.storeModal.menuXsShowing
    let menuLoginShowing =this.props.storeModal.menuLoginShowing
    let creacionesShowing =this.props.storeModal.creacionesShowing
    let feriasShowing =this.props.storeModal.feriasShowing

    let logoMico = ''
    if (this.props.storeContenidos.listaContenidos.length !=0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id == 'mico'){

          logoMico = this.props.storeContenidos.listaContenidos[i].logo.urlLogoMico
          break
        }

      }
    }

    //           menuIcon en firebase
    var xsMenuIcon = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2FMenuIcon.png?alt=media&token=5f3feccd-02af-4045-ac0b-aeb9775a293d'

    var loginIcon = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2FloginIcon.png?alt=media&token=c20aa5cb-4a39-4c17-b29c-f2b5c417d03d'
    if (this.props.users.currentUser != null){
      if (this.props.users.currentUser.foto){
        if (this.props.users.currentUser.foto.photoURL){
          loginIcon = this.props.users.currentUser.foto.photoURL
        }
      }
    }
    //oscurecer un poco y no permitir clicks si se est'a mostrando el dialogo modal
    var noClicks ={
      pointerEvents:'none', //This makes it not clickable
      opacity:0.6,          //This grays it out to look disabled
      background: 'rgba(0,0,0,0.7)'
    }
    var navbarStilo
    if (!registrarseShowing || !menuXsShowing){
      navbarStilo = style.navbar.container
    }else {
      navbarStilo =noClicks
    }

    // donde ir dentro de currentUser segun la tab seleccionada
    let currentUserNavTab = '/Amigo/Datos'
    //para ver que pesta;a est'a activa
    let creacionesEstilo = {cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none'}
    let feriasEstilo = {cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',}
    let conocenosEstilo ={cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',}
    let comprarButtonEstilo ={textDecoration: 'none', backgroundColor: 'black', borderRadius:'15px', border : 'none', margin: 0, }
    let currentUserEstilo= { cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',}

    if (this.props.navigation.navbarMicoFrontActive.creaciones){
      creacionesEstilo = {
        cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none' ,borderBottom:'4px solid white'
      }
    }else if (this.props.navigation.navbarMicoFrontActive.ferias){
      feriasEstilo = {
        cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none', borderBottom:'4px solid white'
      }

    }else if (this.props.navigation.navbarMicoFrontActive.conocenos){
      conocenosEstilo ={
        cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none', borderBottom:'4px solid white'
      }
    }else if (this.props.navigation.navbarMicoFrontActive.carro){
      comprarButtonEstilo ={
        textDecoration: 'none', backgroundColor: 'black', borderRadius:'15px', border : 'none', margin: 0, borderBottom:'4px solid white'
      }

    }else if (this.props.navigation.navbarMicoFrontActive.currentUser){
      currentUserEstilo= {
        cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',  borderBottom:'4px solid white'
      }

    }
    //digo donde va el link al pinchar en current user, arriba lo tengo inicializado a datos, as'i q lo cambio si es pedidos
    if(this.props.navigation.amigoNavActive.pedidosActive){
      currentUserNavTab = '/Amigo/Pedidos'
    }

    return (
      <nav className='navbar navbar-inverse navbar-fixed-top sticky' role='navigation' style= {navbarStilo}>




        <div className='container-fluid hidden-xs' style={{padding: 0}}>

          <ul className = 'nav nav-pills navbar-right fixed-top hide-while-loading' style = {style.navbar.comprarButtonContainer}>
            {this.props.users.currentUser === null &&
              <li id='registrarse' onMouseOver={this.handleHoverOn.bind(this)}>
                <a style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <img id='registrarse' src={loginIcon}  style={{borderRadius : 40, paddingTop: 3, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </a>
              </li>
            }

            {this.props.users.currentUser != null && this.props.users.currentUser.datosPersonales &&
              <li id='currentUser'  onMouseOver={this.handleHoverOn.bind(this)} style= {{paddingRight:4}}>
                <NavLink to={currentUserNavTab} style = {currentUserEstilo} onClick = {this.gestionaColapso.bind(this)} id='currentUser'>{this.props.users.currentUser.datosPersonales.nombre}</NavLink>

              </li>
            }
            {this.props.users.currentUser != null &&
              <li id='currentUser' onMouseOver={this.handleHoverOn.bind(this)}>
                <NavLink to={currentUserNavTab} style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0,}}>
                  <img id='currentUser' src={loginIcon}  style={{ borderRadius : 30 ,paddingTop: 3 , height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </NavLink>
              </li>
            }
            <li style= {{marginTop: 4, }}><NavLink to='/Carro' type='button' className='btn navbar-btn' style = {comprarButtonEstilo} onClick = {this.gestionaColapso.bind(this)} id='carro'>
              <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-shopping-cart'>
              </span>
              <span style= {{color : 'white' }} id='carro'>({this.props.countCart.numProducts})</span>
            </NavLink></li>
          </ul>

          <div className='container-fluid' style={{padding: 0}}>
            <ul className='nav nav-pills navbar-left fixed-top hide-while-loading' style={{float:'left',display: 'block', marginLeft: '10px',}}>
              <li id='home' onMouseOver={this.handleHoverOn.bind(this)}>
                <NavLink to='/' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <img id='home' src={logoMico}  style={{borderRadius: 15, paddingTop: 3, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </NavLink>
              </li>
              <li id='creaciones' onMouseOver={this.handleHoverOn.bind(this)}>
                <NavLink  className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false' style = {creacionesEstilo}
                  onClick = {this.gestionaColapso.bind(this)} id='creaciones' name ='allCreaciones' to='/Diseños'>Diseños <span className='caret'></span></NavLink>

              </li>
              <li  id='ferias' onMouseOver={this.handleHoverOn.bind(this)} >
                <NavLink  className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false' style = {feriasEstilo}
                  onClick = {this.gestionaColapso.bind(this)} id='ferias' name='allFerias' to='/Ferias'>Ferias <span className='caret'></span></NavLink>

              </li>

              <li id='conocenos' onMouseOver={this.handleHoverOn.bind(this)}><NavLink to='/Conocenos' style = {conocenosEstilo} onClick = {this.gestionaColapso.bind(this)} id='conocenos' >Conocenos</NavLink></li>
            </ul>
          </div>
        </div>


        <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg' id = 'xs' >
          <ul className = 'nav nav-pills navbar-right fixed-top hide-while-loading' style = {style.navbar.comprarButtonContainer}>
            {this.props.users.currentUser === null &&
              <li id='registrarse' onMouseOver={this.handleHoverOn.bind(this)}>
                <a style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <img id='registrarse' src={loginIcon}  style={{paddingTop: 3, height:45, borderRadius : 30}} onClick = {this.gestionaColapso.bind(this)}/>
                </a>
              </li>
            }

            {this.props.users.currentUser != null && this.props.users.currentUser.datosPersonales &&
              <li id='currentUser' onMouseOver={this.handleHoverOn.bind(this)}>
                <h6 style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0, margin :0 ,marginTop: 2, marginBottom:1,}}>{this.props.users.currentUser.datosPersonales.nombre}</h6>
                <NavLink to='/Amigo/Datos' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0,}}>
                  <img id='currentUser' src={loginIcon}  style={{paddingTop: 3, height:30, borderRadius : 30}} onClick = {this.gestionaColapso.bind(this)}/>
                </NavLink>
              </li>
            }
            <li style ={{paddingTop:4}} ><NavLink to='/Carro' type='button' className='btn navbar-btn' style = {{textDecoration: 'none', backgroundColor: 'black', borderRadius:'15px', border : 'none', margin: 0, }} onClick = {this.gestionaColapso.bind(this)} id='carro'>
              <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-shopping-cart'>
              </span>
              <span style= {{color : 'white' }} id='carro'>({this.props.countCart.numProducts})</span>
            </NavLink></li>
          </ul>
          <div className='container-fluid' style={{padding: 0}}>
            <ul className='nav nav-pills navbar-left fixed-top hide-while-loading' style={{float:'left',display: 'block', marginLeft: '10px',}}>
              <li >
                <NavLink to='/' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <img id='xsMenu' src={xsMenuIcon}  style={{paddingTop: 3, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </NavLink>
              </li>
              <li >
                <NavLink to='/' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0 , paddingLeft : 10}}>
                  <img id='home' src={logoMico}  style={{borderRadius: 15, paddingTop: 3, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>


      </nav>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
    moveToFeriasSection: (feriaName)=>dispatch(actions.moveToFeriasSection(feriaName)),
    getContenidos:()=>dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
  }
}
const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    countCart:state.carro,
    storeContenidos: state.contenidos,
    users: state.user,
    storeModal:state.modal,
    navigation: state.navigation,
  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(NavbarMicoFront)
