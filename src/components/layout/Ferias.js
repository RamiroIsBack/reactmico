import React, { Component } from 'react'
import style from './styles'
import {FeriaContainer,ContenidoFeriaContainer, MapaContainer,ListaFeriasContainer} from '../containers'
export default class Ferias extends Component {

  constructor(){
    super()

  }
  render() {
    return (
      <div className='container-fluid' id ='backgroundDiv' style ={style.universal.containerDiv} >

        <div className = 'container col-xs-12 col-sm-12 col-md-12 col-lg-12' style = {{}}>

          <MapaContainer
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyClcb4B5oRktWDQWGU8Ev4hgYm5p_NXgL4&v=3.exp&libraries=geometry,drawing,places'
            loadingElement={<div style={{ height: '100%' }} />}
          />
        </div>

        <div className = 'col-xs-8 col-sm-8 col-md-9 col-lg-9' style = {{padding:2,paddingTop:10}}>
          <FeriaContainer/>

        </div>

        <div className = 'col-xs-4 col-sm-4 col-md-3 col-lg-3' style = {{padding:2, borderLeft:'0.25px solid grey'}}>
          <ListaFeriasContainer/>
        </div>

      </div>
    )
  }
}
