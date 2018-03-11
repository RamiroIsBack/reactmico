import React, { Component } from 'react'
import {FeriaContainer,ContenidoFeriaContainer, MapaContainer,ListaFeriasContainer} from '../containers'
import {Ferias_css} from '../../utils/css'
import { connect } from 'react-redux'

class Ferias extends Component {
  render() {
    let paddingTop = {}
    if(this.props.navigation){
      if(this.props.navigation.sticky){
        paddingTop = this.props.navigation.paddingTop4navbar
      }else{
        paddingTop = {paddingTop:0}
      }
    }
    return (
      <div className='feria__container' id ='backgroundDiv' style= {paddingTop} >

        <div className = 'feria__mapa__container' style = {{}}>

          <MapaContainer
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyClcb4B5oRktWDQWGU8Ev4hgYm5p_NXgL4&v=3.exp&libraries=geometry,drawing,places'
            loadingElement={<div style={{ height: '100%' }} />}
          />
        </div>

        <div className = 'feria__descripcion__container' style = {{}}>
          <FeriaContainer/>

        </div>

        <div className = 'feria__lista__container' style = {{ borderLeft:'0.25px solid grey'}}>
          <ListaFeriasContainer/>
        </div>

      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

  }
}
const stateToProps = (state) => {
  return{

    navigation: state.navigation,
  }
}
export default connect (stateToProps,dispatchToProps)(Ferias)
