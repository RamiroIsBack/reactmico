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
  componentDidMount() {

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
      this.props.toggleModal('openRegistrarse')
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }
    //de los dropdown
    else if (event.target.id == 'creaciones'){

      this.props.toggleModal('openCreaciones')
      this.props.toggleModal('closeFerias')
      this.props.moveToCreacionesSection(event.target.name)
    }
    //
    // remember [else if] links them all and makes d last [else] apply to all
    // otherwise it would be d [else] of the las [if] ;)
    //
    else if (event.target.id == 'ferias'){
      this.props.toggleModal('openFerias')
      this.props.toggleModal('closeCreaciones')
      this.props.moveToFeriasSection(event.target.name)
    }
    //viene de otro lado as'i q cierra los 2
    else if(event.target.id== 'carro'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }
    else if(event.target.id== 'conocenos'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }
    else if(event.target.id== 'home'){
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }
    else{
      this.props.toggleModal('closeCreaciones')
      this.props.toggleModal('closeFerias')
    }


  }

  handleHoverOn(event){
    //console.log('im on ' + event.target.id)
    if(event.target.id == 'ferias'){
      this.props.toggleModal('openFerias')
      this.props.toggleModal('closeCreaciones')
    }else if (event.target.id == 'creaciones'){
      this.props.toggleModal('openCreaciones')
      this.props.toggleModal('closeFerias')
    }

  }

  render() {
    let registrarseShowing = this.props.storeModal.registrarseShowing
    let menuXsShowing = this.props.storeModal.menuXsShowing
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

    return (
      <nav className='navbar navbar-inverse navbar-fixed-top sticky' role='navigation' style= {navbarStilo}>




        <div className='container-fluid hidden-xs' style={{padding: 0}}>

          <ul className = 'nav nav-pills navbar-right fixed-top hide-while-loading' style = {style.navbar.comprarButtonContainer}>
            <li><a style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none'}} onClick = {this.gestionaColapso.bind(this)} id = 'registrarse'>
              Registrarse
            </a></li>
            <li><NavLink to='/Carro' type='button' className='btn btn-success navbar-btn' style = {style.navbar.comprarButtonStyle} onClick = {this.gestionaColapso.bind(this)} id='carro'>
              <span className='glyphicon glyphicon-shopping-cart'>
              </span>
              <span>({this.props.countCart.numProducts})</span>
            </NavLink></li>
          </ul>

          <div className='container-fluid' style={{padding: 0}}>
            <ul className='nav nav-pills navbar-left fixed-top hide-while-loading' style={{float:'left',display: 'block', marginLeft: '10px',}}>
              <li >
                <NavLink to='/' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <img id='home' src={logoMico}  style={{borderRadius: 15, paddingTop: 3, height:45}} onClick = {this.gestionaColapso.bind(this)}/>
                </NavLink>
              </li>
              <li id='creaciones' onMouseOver={this.handleHoverOn.bind(this)}>
                <NavLink  className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none'}}
                  onClick = {this.gestionaColapso.bind(this)} id='creaciones' name ='allCreaciones' to='/Diseños'>Diseños <span className='caret'></span></NavLink>

              </li>
              <li  id='ferias' onMouseOver={this.handleHoverOn.bind(this)} >
                <NavLink  className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none'}}
                  onClick = {this.gestionaColapso.bind(this)} id='ferias' name='allFerias' to='/Ferias'>Ferias <span className='caret'></span></NavLink>

              </li>

              <li><NavLink to='/Conocenos' style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none'}} onClick = {this.gestionaColapso.bind(this)} id='conocenos'>Conocenos</NavLink></li>
            </ul>
          </div>
        </div>


        <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg' id = 'xs' >
          <ul className = 'nav nav-pills navbar-right fixed-top hide-while-loading' style = {style.navbar.comprarButtonContainer}>
            <li><a style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none'}} onClick = {this.gestionaColapso.bind(this)} id = 'registrarse'>
              Registrarse
            </a></li>
            <li><NavLink to='/Carro' type='button' className='btn btn-success navbar-btn' style = {style.navbar.comprarButtonStyle} onClick = {this.gestionaColapso.bind(this)} id='carro'>
              <span className='glyphicon glyphicon-shopping-cart'>
              </span>
              <span>({this.props.countCart.numProducts})</span>
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
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName))
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

    storeModal:state.modal,
  }
}
//                                   ****
export default connect (stateToProps,dispatchToProps)(NavbarMicoFront)
