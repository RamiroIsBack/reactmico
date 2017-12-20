import React, { Component } from 'react'
import style from './styles'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'


class HomeContainer extends Component {


  dameEstilo( url){
    var estiloYBackgroundCreaciones = {
      padding: '0px',
      border: 'none',
      borderRadius:'10px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundImage: 'url(' + url + ')',
      height: '500px',

    }
    return estiloYBackgroundCreaciones
  }

  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')
  }

  render() {
    var conocenosContenido = {}
    let urlPicConocenos = ''
    let headerConocenos = ''

    var feriasContenido = {}
    let urlPicFerias = ''
    let headerFerias = ''

    var creacionesContenido = {}
    let urlPicCreaciones = ''
    let headerCreaciones = ''

    var micoContenido = {}
    let headlineMico = ''
    let desarrolloMico = ''


    if (this.props.storeContenidos.listaContenidos.length !=0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id == 'creaciones'){
          creacionesContenido = this.props.storeContenidos.listaContenidos[i]
          urlPicCreaciones = creacionesContenido.headerFoto.urlPicCreaciones
          headerCreaciones=creacionesContenido.headerFoto.headerCreaciones

        }
        if (this.props.storeContenidos.listaContenidos[i].id == 'ferias'){
          feriasContenido = this.props.storeContenidos.listaContenidos[i]
          urlPicFerias = feriasContenido.headerFoto.urlPicFerias
          headerFerias=feriasContenido.headerFoto.headerFerias

        }
        if (this.props.storeContenidos.listaContenidos[i].id == 'mico'){
          micoContenido = this.props.storeContenidos.listaContenidos[i]
          headlineMico = micoContenido.descripcion.headlineMico
          desarrolloMico=micoContenido.descripcion.desarrolloMico

        }
        if (this.props.storeContenidos.listaContenidos[i].id == 'conocenos'){
          conocenosContenido = this.props.storeContenidos.listaContenidos[i]
          urlPicConocenos = conocenosContenido.headerFoto.urlPicConocenos
          headerConocenos=conocenosContenido.headerFoto.headerConocenos

        }

      }
      //estiloYBackgroundConocenos = this.dameEstilo(conocenosContenido.headerFoto.urlPicConocenos)
    }


    return (
      <div className ='container-fluid' onClick = {this.cierraDialogosNavbar.bind(this)}>
        <div className ='container-fluid row'>
          <div className = 'container-fluid col-xs-12 col-sm-4 col-md-4' >
            <h1>Mico diseño textil</h1>
          </div>
          <div className = 'container-fluid col-xs-12 col-sm-8 col-md-8'>
            <h3>{headlineMico}</h3>
            <p>{desarrolloMico}</p>
          </div>
        </div>
        <hr/>
        <div className = 'container-fluid visible-xs-block hidden-sm hidden-md hidden-lg btn-group btn btn-block'
          style={style.home.navlinkBtn}>
          <NavLink className ='btn-group btn btn-block' to='/Diseños' style={style.home.navlinkBtn}>
            <div style= {{position: 'relative', top: 0, left: 0}}>
              <img role='presentation' src={urlPicCreaciones}  className ='img-rounded' style= {{maxWidth: '100%',maxHeight : '300px', position: 'relative', top: 0, left: 0}}>
              </img>

              <div className = 'carousel-caption' style = {{padding: '0px', top: 0, left: 10, right: 10}}>
                <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5,whiteSpace: 'initial'}}>{headerCreaciones}</h3>
              </div>
            </div>
          </NavLink>
        </div>
        <div className = 'container-fluid hidden-xs btn-group btn btn-block '  style={style.home.navlinkBtn} >
          <NavLink className ='btn-group btn btn-block' to='/Diseños' style={style.home.navlinkBtn}>
            <div style= {{position: 'relative', top: 0, left: 0}}>
              <img role='presentation' src={urlPicCreaciones}  className ='img-rounded' style= {{maxWidth: '60%',maxHeight : '300px', position: 'relative', top: 0, left: 0}}>
              </img>

              <div className = 'carousel-caption' style = {{padding: '0px', top: 0, left:'25%', right: '25%'}}>
                <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5,whiteSpace: 'initial'}}>{headerCreaciones}</h3>
              </div>
            </div>
          </NavLink>
        </div>
        <hr/>
        <div className ='container-fluid btn-group  btn-block ' style={style.home.navlinkBtn}>
          <div className = 'container-fluid col-xs-12 col-sm-6 col-md-6 col-lg-6' style={style.home.navlinkBtn}>
            <NavLink className ='container-fluid btn btn-block ' to='/Ferias' style={style.home.navlinkBtn}>
              <img role='presentation' src={urlPicFerias}  className ='img-rounded' style= {{maxWidth: '100%'}}>
              </img>
              <div className = 'carousel-caption ' style = {{padding: '0px', top: 0, left: 10, right: 10}}>
                <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{headerFerias}</h3>
              </div>
            </NavLink>
            <br/>
          </div>
          <div className = 'container-fluid col-xs-12 col-sm-6 col-md-6 col-lg-6'  >
            <NavLink className ='container-fluid btn btn-block' to='/Conocenos' style={style.home.navlinkBtn}>
              <img role='presentation' src={urlPicConocenos}  className ='img-rounded' style= {{maxWidth: '100%'}}>
              </img>
              <div className = 'carousel-caption ' style = {{padding: '0px', top: 0, left: 10, right: 10}}>
                <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{headerConocenos}</h3>
              </div>
            </NavLink>
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    getContenidos:()=>dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    spinCarousel:(numPicCarousel) => dispatch(actions.spinCarousel(numPicCarousel)),
  }
}

const stateToProps = (state) => {
  return{
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    creacion:state.creacion,
    storeContenidos:state.contenidos,
    carousel:state.carousel,
    // TODO::  aqui meter tb el storeModal

  }
}
//                                   ****dispatchToProps
export default connect (stateToProps,dispatchToProps)(HomeContainer)

