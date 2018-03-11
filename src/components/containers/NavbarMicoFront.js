import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'
import style from './styles'
import {ModalCreacionesContainer} from './'
import navbar_css from '../../utils/css'
class NavbarMicoFront extends Component {

  componentDidMount() {
    if (this.props.storeContenidos.ContenidosLoaded === false){
      //en la accion ya lo pone a true
      this.props.getContenidos()
    }
    this.handleWindowSizeChange()
    window.addEventListener('resize', this.handleWindowSizeChange.bind(this))
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
    window.removeEventListener('resize', this.handleWindowSizeChange.bind(this))
  }
  handleScroll(){
    var logoTopContainerEl = document.getElementById('logoTopContainer')
    //var navbarContainerEl = document.getElementById('navbarContainer')
    //var mainContainerEl = document.getElementById('mainContainer')
    let windowHight = window.innerHeight
    let scrollTopPosition = document.body.scrollTop
    this.checkElementIntoView(windowHight,logoTopContainerEl,scrollTopPosition)
    //this.checkElementIntoView(windowHight,navbarContainerEl,scrollTopPosition)
    //this.checkElementIntoView(windowHight,mainContainerEl,scrollTopPosition)

  }
  checkElementIntoView(windowHight,el,scrollTopPosition){
    let elementTop =el.offsetTop
    let elementBottom = elementTop + el.scrollHeight

    if(scrollTopPosition > elementBottom && !this.props.navigation.sticky){
      //make navbar position: fixed
      this.props.fixNavbar(true)
    }
    if(scrollTopPosition < elementBottom && this.props.navigation.sticky){
      this.props.fixNavbar(false)
    }
  }

  handleWindowSizeChange(){

    if(window.innerWidth < 705  && this.props.navigation.screenSize !== 'mobile' ){
      this.props.chageScreenWidth('mobile')
    }
    if(window.innerWidth > 705  && this.props.navigation.screenSize !== 'laptop' ){
      this.props.chageScreenWidth('laptop')
    }
  }


  //ya no colapso la navbar , solo los dialogos q hacen de dropdown
  gestionaColapso(event){
    console.log ('gestionaColapso: ' +JSON.stringify(event.target.id))
    //click en registrarse as'i q mostrar el dialogo modal xa registrarse
    if (event.target.id === 'xsMenu'){
      this.props.toggleModal('openMenuXs')
      // no hace nada con el resto xq los otros dialogos no pueden estar abiertos
    }
    //click en registrarse as'i q mostrar el dialogo modal xa registrarse
    if (event.target.id === 'registrarse'){
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
      this.props.navActive('datos', 'amigoNav')
    }
    //de los dropdown
    else if (event.target.id === 'creaciones'){

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
    else if (event.target.id === 'ferias'){
      //this.props.toggleModal('openFerias') //not using this now, client want it diferently
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeLogin')
      this.props.moveToFeriasSection(event.target.name)
      this.props.navActive(event.target.id, 'navbarMicoFront')
      window.scrollTo(0, 0)
    }
    //viene de otro lado as'i q cierra los 2
    else if(event.target.id=== 'carro'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
    else if(event.target.id=== 'conocenos'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }

    else{
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.toggleModal('closeLogin')
    }


  }

  handleHoverOn(event){
    //console.log('im on ' + event.target.id)
    if(event.target.id === 'ferias'){
      //this.props.toggleModal('openFerias') //not using this now, client want it diferently
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeLogin')
    }else if (event.target.id === 'creaciones'){
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
    }

  }

  render() {
    let registrarseShowing = this.props.storeModal.registrarseShowing
    let menuXsShowing = this.props.storeModal.menuXsShowing

    let navbarPosition = {padding: 0,width:'100%',position:'absolute'}
    if(this.props.navigation.screenSize ==='mobile'){
      navbarPosition = {padding: 0,width:'100%',position:'fixed'}
    }
    let navbarFadeIn = {animationName: 'fadeInNavbar2',}
    if(this.props.navigation){
      if (this.props.navigation.sticky){
        navbarPosition={
          padding: 0,
          position:'fixed',
          top : 0,
          width:'100%',
          backgroundColor:'white',
        }
        navbarFadeIn={
          animationName: 'fadeInNavbar',
        }
      }
    }

    //           menuIcon en firebase
    var xsMenuIcon = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/menu-alt-256.png?alt=media&token=2d9dfa45-f974-4d90-9431-ec7de99f7e9c'

    var loginIcon = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/loginIcon.png?alt=media&token=9df1a1ea-8b37-482b-919e-b0fb3be6b273'
    if (this.props.users.currentUser !== null){
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
    let creacionesEstilo = {cursor: 'pointer', fontSize:'18px',color:'black'}
    let feriasEstilo = {cursor: 'pointer',fontSize:'18px',color:'black'}
    let conocenosEstilo ={cursor: 'pointer', fontSize:'18px',color:'black'}
    let comprarButtonEstilo ={textDecoration: 'none',color:'black',fontSize:'19px' }
    let currentUserEstilo= { cursor: 'pointer' ,color:'black',textDecoration: 'none',}

    if (this.props.navigation.navbarMicoFrontActive.creaciones){
      creacionesEstilo = {
        cursor: 'pointer', color:'black',textDecoration: 'none' ,borderBottom:'1px solid',fontSize:'18px',
      }
    }else if (this.props.navigation.navbarMicoFrontActive.ferias){
      feriasEstilo = {
        cursor: 'pointer', color:'black',textDecoration: 'none', borderBottom:'1px solid',fontSize:'18px',
      }

    }else if (this.props.navigation.navbarMicoFrontActive.conocenos){
      conocenosEstilo ={
        cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none', borderBottom:'1px solid',fontSize:'18px',
      }
    }else if (this.props.navigation.navbarMicoFrontActive.carro){
      comprarButtonEstilo ={
        textDecoration: 'none',color: 'black', borderBottom:'1px solid',fontSize:'19px',
      }

    }else if (this.props.navigation.navbarMicoFrontActive.currentUser){
      currentUserEstilo= {
        cursor: 'pointer', color:'black',textDecoration: 'none',  borderBottom:'1px solid'
      }

    }
    //digo donde va el link al pinchar en current user, arriba lo tengo inicializado a datos, as'i q lo cambio si es pedidos
    if(this.props.navigation.amigoNavActive.pedidosActive){
      currentUserNavTab = '/Amigo/Pedidos'
    }
    let screenSize =this.props.navigation.screenSize

    return (
      <div className = 'sticky__navbar__contanier' id= 'navbarContainer' style={navbarPosition}>
        {screenSize ==='laptop' &&

          <div className='navbar__container' style={navbarFadeIn}>
            <div className = 'navbar__registrarse__container'>
              {this.props.users.currentUser === null &&
                <div id='registrarse' onMouseOver={this.handleHoverOn.bind(this)}>
                  <img id='registrarse' alt='Registrarse' src={loginIcon}  style={{borderRadius : 40, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </div>
              }

              {this.props.users.currentUser !== null && this.props.users.currentUser.datosPersonales &&
                <div id='currentUser'  onMouseOver={this.handleHoverOn.bind(this)} style= {{paddingRight:4}}>
                  <NavLink to={currentUserNavTab} style = {currentUserEstilo} onClick = {this.gestionaColapso.bind(this)} id='currentUser'>{this.props.users.currentUser.datosPersonales.nombre}</NavLink>

                </div>
              }
              {this.props.users.currentUser !== null &&
                <div id='currentUser' onMouseOver={this.handleHoverOn.bind(this)}>
                  <NavLink to={currentUserNavTab} style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0,}}>
                    <img id='currentUser' src={loginIcon}  style={{ borderRadius : 30 ,paddingTop: 3 , height:35}} onClick = {this.gestionaColapso.bind(this)}/>
                  </NavLink>
                </div>
              }
            </div>

            <div className = 'navbar__pagar__container'>
              <NavLink to='/Carro' type='button' className='aaaaa' style = {comprarButtonEstilo} onClick = {this.gestionaColapso.bind(this)} id='carro'>
                <span  id='carro' className='glyphicon glyphicon-shopping-cart'>
                </span>
                <span  id='carro'>({this.props.countCart.numProducts})
                </span>
              </NavLink>
            </div>

            <div id='creaciones' className = 'navbar__diseno__container' onMouseOver={this.handleHoverOn.bind(this)}>
              <NavLink  className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false' style = {creacionesEstilo}
                onClick = {this.gestionaColapso.bind(this)} id='creaciones' name ='allCreaciones' to='/Diseños'>Diseños
                <span className='caret'>
                </span>
              </NavLink>
              <div style={{overflow: 'auto'}}>
                <ModalCreacionesContainer/>
              </div>
            </div>

            <div className = 'navbar__feria__container' id='ferias' onMouseOver={this.handleHoverOn.bind(this)} >
              <NavLink style = {feriasEstilo} onClick = {this.gestionaColapso.bind(this)} id='ferias' name='allFerias' to='/Ferias'>Ferias
              </NavLink>
            </div>

            <div className = 'navbar__conocenos__container' id='conocenos' onMouseOver={this.handleHoverOn.bind(this)}>
              <NavLink to='/Conocenos' style = {conocenosEstilo} onClick = {this.gestionaColapso.bind(this)} id='conocenos' >Conocenos
              </NavLink>
            </div>
          </div>
        }


        {screenSize ==='mobile' &&
          <div className='navbar__container' >
            <div className = 'navbar__registrarse__container'>
              {this.props.users.currentUser === null &&
                <div id='registrarse' onMouseOver={this.handleHoverOn.bind(this)}>
                  <img id='registrarse' alt='Registrarse' src={loginIcon}  style={{borderRadius : 40, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </div>
              }

              {this.props.users.currentUser !== null && this.props.users.currentUser.datosPersonales &&
                <div id='currentUser'  onMouseOver={this.handleHoverOn.bind(this)} style= {{paddingRight:4}}>
                  <NavLink to={currentUserNavTab} style = {currentUserEstilo} onClick = {this.gestionaColapso.bind(this)} id='currentUser'>{this.props.users.currentUser.datosPersonales.nombre}</NavLink>

                </div>
              }
              {this.props.users.currentUser !== null &&
                <div id='currentUser' onMouseOver={this.handleHoverOn.bind(this)}>
                  <NavLink to={currentUserNavTab} style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0,}}>
                    <img id='currentUser' src={loginIcon}  style={{ borderRadius : 30 ,paddingTop: 3 , height:35}} onClick = {this.gestionaColapso.bind(this)}/>
                  </NavLink>
                </div>
              }
            </div>

            <div className = 'navbar__pagar__container'>
              <NavLink to='/Carro' type='button' className='aaaaa' style = {comprarButtonEstilo} onClick = {this.gestionaColapso.bind(this)} id='carro'>
                <span  id='carro' className='glyphicon glyphicon-shopping-cart'>
                </span>
                <span  id='carro'>({this.props.countCart.numProducts})
                </span>
              </NavLink>
            </div>
            <div className = 'navbar__menuXS__container' >
              <img id='xsMenu' src={xsMenuIcon}  style={{paddingTop: 3, height:45}} onClick = {this.gestionaColapso.bind(this)}/>

            </div>


          </div>
        }
      </div>
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
    chageScreenWidth:(screenSize) => dispatch(actions.chageScreenWidth(screenSize)),
    fixNavbar:(flag) =>dispatch(actions.fixNavbar(flag)),
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
