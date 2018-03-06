
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Foto } from '../presentational'
import actions from '../../actions'
import { connect } from 'react-redux'
import history from '../../utils/history'
import styles from './styles'
import {FotoGrid_css} from '../../utils'

class FotoContainer extends React.Component {

  //componentDidMount is executed once after the initial rendering.
  componentDidMount() {
    if (this.props.firebaseCreaciones.creacionesLoaded === false){
      //en la accion ya lo pone a true
      this.props.getCreaciones()
    }

    //dont worry cuando le llegue 'all' se focalizar'a arriba
    if (this.props.firebaseCreaciones.tipoSectionSelected && this.props.firebaseCreaciones.tipoSectionSelected !== 'allCreaciones'){
      setTimeout(() => {
        this.focusDiv(this.props.firebaseCreaciones.tipoSectionSelected)
      }, 200)
    }else if(this.props.firebaseCreaciones.tipoSectionSelected === 'allCreaciones'){
      //make it start at the top of the page
      window.scrollTo(0, 0)
    }
  }

  componentDidUpdate(){
    if (this.props.firebaseCreaciones.tipoSectionSelected !== 'allCreaciones'){
      setTimeout(() => {
        this.focusDiv(this.props.firebaseCreaciones.tipoSectionSelected)
      }, 200)
    }
  }

  focusDiv(tipo){

    let creacionList = this.props.firebaseCreaciones.listaCreaciones
    //he metido como ref el id del primer elemento de cada tipo
    let ref = creacionList[tipo][0].id
    var theDiv = this[ref]

    if(theDiv){
      theDiv.scrollIntoView({block: 'start', behavior: 'smooth'})
    }
    this.props.moveToCreacionesSection('allCreaciones')//lo pongo a allCreaciones xq si no me va a la seccion cada vez q hay un update
  }

  selectFoto(foto){
    //console.log ('caca '+ JSON.stringify(foto))
    //this fires an action down below in this
    this.props.selectFoto(foto)
    window.scrollTo(0, 0)
    //routing programatically, now i can prevent if there is an error
    history.push('/Productos')

  }
  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')
  }

  render() {
    let creacionesContenido = {}
    if(this.props.storeContenidos.listaContenidos.length !== 0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id === 'creaciones'){
          creacionesContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
    }
    let g = 0
    let h = 1000
    var listItem ={}
    var totalList = []

    if(this.props.firebaseCreaciones.listaCreaciones!=={} &&
      this.props.storeContenidos.listaContenidos.length !== 0 ){
      var sorted =this.props.firebaseCreaciones.listaCreaciones
      for (var tipo in sorted) {
        if (sorted.hasOwnProperty(tipo)) {

          listItem = sorted[tipo].map((foto,i)=>{
            return(
              <div className= 'container' style= {{maxWidth: 300}} key ={foto.id}>
                <Foto creacion ={foto} whenClicked={this.selectFoto.bind(this)}/>
              </div>
            )
          })
        }
        if (tipo === 'undefined'){ tipo = 'varios'}
        let ele = sorted[tipo][0].id
        //console.log ('la ref '+ele)
        //saco el contenido de cada tipo de lo que hay en la DB
        let tipoObj= creacionesContenido.tipo[tipo.toString()]
        totalList.push (
          <div className = 'container-fluid' key = {g} ref={(el) => this[ele] = el} >
            {g!==0 && <hr/>}
            <div className = 'container-fluid row' id ={tipo} style={{marginTop:40}}>

              <div className = ' text-center col-xs-12 col-sm-4 col-md-3 col-lg-3'>
                <h2 style ={{fontWeight: 'bolder'}}> {tipo}</h2>
              </div>
              { tipoObj &&
                <div className = 'container col-xs-12 col-sm-6 col-md-7 col-lg-7 text-center'>
                  {tipoObj.descripcionTipo.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>})}
                </div>
              }
            </div>
            <br/>
          </div>
        )
        totalList.push(
          <div className= 'foto__container' key = {h}>
            {listItem}
          </div>
        )
        g++
        h++
        totalList.push (
          <div className = 'container ' key = {g} style= {{padding: 0 }}><br/></div>
        )
        //console.log ('caca '+ g +JSON.stringify(key))
        g++
      }
    }


    let paddingTop = {}
    if(this.props.navigation){
      if(this.props.navigation.sticky){
        paddingTop = this.props.navigation.paddingTop4navbar
      }else{
        paddingTop = {paddingTop:0}
      }
    }

    return (
      <div className= 'container' onClick = {this.cierraDialogosNavbar.bind(this)} style={paddingTop}>
        <div className='clearfix visible-sm-block visible-md-block' style={{padding: 0}}></div>

        {totalList}
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{

    selectFoto: (foto) =>dispatch(actions.selectedFoto(foto)),
    getCreaciones:()=>dispatch(actions.getCreaciones()),
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    moveToCreacionesSection:(creacionTipo)=>dispatch(actions.moveToCreacionesSection(creacionTipo)),
  }
}
const stateToProps = (state) => {
  return{
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    firebaseCreaciones:state.creacion,
    storeContenidos: state.contenidos,
    navigation: state.navigation,
  }
}
//it would be null at d first argument cos i was not registering
//for listening d store, only dispatching actions but NOW I DO to get the
//creaciones from firebase data base
export default connect (stateToProps,dispatchToProps)(FotoContainer)
