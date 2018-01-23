import React, { Component } from 'react'
import style from './styles'
import { NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'


class HomeContainer extends Component {

  componentWillMount(){
    if (this.props.storeContenidos){
      if(!this.props.storeContenidos.stopHomeOpacity){
        this.props.incriseOpacityWithTimeOut(0)
      }

    }
    if (!this.props.creacion.creacionesLoaded){
      //en la accion ya lo pone a true
      this.props.getCreaciones()
        .then(response =>{
          this.props.startCarousellWithTimeOut(0,this.props.creacion.listaCreacionesSinOrdenar.length)
          console.log('starting carousell')
        })
        .catch(err=>{
          console.log(err.message+ 'fallo en getCreaciones()')
        })
    }else if(this.props.creacion.carousellItem.pic === ''){
      this.props.startCarousellWithTimeOut(0,this.props.creacion.listaCreacionesSinOrdenar.length)
    }
  }
  componentDidMount(){
    window.addEventListener('beforeunload', this.handleLeavingApp.bind(this))
    window.addEventListener('popstate',this.handleBackButton.bind(this))

  }
  handleLeavingApp(event){
    console.log('back button pressed')//this triggers in the browser just when leaving the page!!
  }
  handleBackButton(event){
    if (event){
      var isMobile = false
      if (/Mobile|mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        isMobile = true
      }

      if (isMobile){
        //doesnt work good cos triggers many times and ruins the backbutton functionality
        //window.scrollTo(0, 0)
        //history.push('/')
      }else{
        this.props.navActive('', 'navbarMicoFront') //only gets selected for desktop
      }
    }
  }

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
  handleClick(event){
    if (event.target.id ==='creaciones'){
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }else if (event.target.id ==='ferias'){
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }else if (event.target.id ==='conocenos'){
      this.props.navActive(event.target.id, 'navbarMicoFront')
    }
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

    let opacity=0
    let stiloOpacity = {}

    let carousellItem = {}

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

        opacity = this.props.storeContenidos.homeOpacity
        stiloOpacity = {
          opacity: opacity,

        }
      }
      //estiloYBackgroundConocenos = this.dameEstilo(conocenosContenido.headerFoto.urlPicConocenos)
    }
    carousellItem = this.props.creacion.carousellItem


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
        {this.props.storeContenidos.startHomeOpacity &&
        <div style= {stiloOpacity} >
          <div className = 'container-fluid visible-xs-block hidden-sm hidden-md hidden-lg btn-group btn btn-block'
            style={style.home.navlinkBtn}>
            <NavLink className ='btn-group btn btn-block' to='/Diseños' id= 'creaciones' onClick = {this.handleClick.bind(this)} style={style.home.navlinkBtn}>
              <div style= {{position: 'relative', top: 0, left: 0}}>
                <img role='presentation' src={urlPicCreaciones} id= 'creaciones' className ='img-rounded' style= {{maxWidth: '100%',minHeight : '200px',maxHeight : '300px', position: 'relative', top: 0, left: 0}}>
                </img>

                { this.props.creacion.carousellItem.pic != '' &&
                  <img src= {carousellItem.pic} className="img-responsive " alt='creacion' draggable = 'false'
                    style= {{maxWidth:'100%', maxHeight : '75px', position: 'absolute', bottom: 2, left: '35%', borderRadius:'50px'}}
                  />
                }

                <div className = 'carousel-caption' id= 'creaciones' style = {{padding: '0px', top: 0, left: 10, right: 10}}>
                  <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5,whiteSpace: 'initial'}}>{headerCreaciones}</h3>
                </div>
              </div>
            </NavLink>
          </div>
          <div className = 'container-fluid hidden-xs btn-group btn btn-block '  style={style.home.navlinkBtn} >
            <NavLink className ='btn-group btn btn-block' to='/Diseños' id= 'creaciones' onClick = {this.handleClick.bind(this)} style={style.home.navlinkBtn}>
              <div style= {{position: 'relative', top: 0, left: 0}}>
                <img role='presentation' src={urlPicCreaciones}  className ='img-rounded'  id= 'creaciones' style= {{maxWidth: '100%',minHeight : '200px', maxHeight : '300px', position: 'relative', top: 0, left: 0}}>
                </img>

                { this.props.creacion.carousellItem.pic != '' &&
                  <img src= {carousellItem.pic} className="img-responsive " alt='creacion' draggable = 'false'
                    style= {{maxWidth:'100%', maxHeight : '100px', position: 'absolute', bottom: 4, left: '44%', borderRadius:'50px'}}
                  />
                }

                <div className = 'carousel-caption' id= 'creaciones' style = {{padding: '0px', top: 0, left:'25%', right: '25%'}}>
                  <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5,whiteSpace: 'initial'}}>{headerCreaciones}</h3>
                </div>
              </div>
            </NavLink>
          </div>
          <hr/>
          <div className ='container-fluid btn-group  btn-block ' style={style.home.navlinkBtn}>
            <div className = 'container-fluid col-xs-12 col-sm-6 col-md-6 col-lg-6' style={style.home.navlinkBtn}>
              <NavLink className ='container-fluid btn btn-block ' to='/Ferias' id= 'ferias' onClick = {this.handleClick.bind(this)} style={style.home.navlinkBtn}>
                <img role='presentation' src={urlPicFerias}  className ='img-rounded' id= 'ferias' style= {{maxHeight : '300px', maxWidth: '100%'}}>
                </img>
                <div className = 'carousel-caption ' id= 'ferias' style = {{padding: '0px', top: 0, left: 10, right: 10}}>
                  <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{headerFerias}</h3>
                </div>
              </NavLink>
              <br/>
            </div>
            <div className = 'container-fluid col-xs-12 col-sm-6 col-md-6 col-lg-6'  >
              <NavLink className ='container-fluid btn btn-block' to='/Conocenos' id= 'conocenos' onClick = {this.handleClick.bind(this)} style={style.home.navlinkBtn}>
                <img role='presentation' src={urlPicConocenos} id= 'conocenos'  className ='img-rounded' style= {{maxHeight : '300px', maxWidth: '100%'}}>
                </img>
                <div className = 'carousel-caption ' id= 'conocenos' style = {{padding: '0px', top: 0, left: 10, right: 10}}>
                  <h3  style = {{backgroundColor: 'black' ,borderRadius:'4px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{headerConocenos}</h3>
                </div>
              </NavLink>
            </div>
          </div>
          <hr/>
        </div>
        }
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    getCreaciones:()=>dispatch (actions.getCreaciones()),
    getContenidos:()=>dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    incriseOpacityWithTimeOut:(num) => dispatch(actions.incriseOpacityWithTimeOut(num)),
    startCarousellWithTimeOut:(pic,length) => dispatch(actions.startCarousellWithTimeOut(pic,length)),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
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


  }
}
//                                   ****dispatchToProps
export default connect (stateToProps,dispatchToProps)(HomeContainer)

