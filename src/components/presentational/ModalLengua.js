import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'

export default class ModalLengua extends Component {

  changeLengua(event){
    this.props.cambiaLengua(event.target.id)
  }

  render() {
    if(!this.props.show){
      return null
    }


    var estiloModal ={
      position: 'absolute',
      textAlign:'left',
      backgroundColor:'white',
      display: 'inline-block',
      margin: '0 auto',
      zIndex: 3333,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '2px',
      outline: 'none',
    }
    return (
      <div style={estiloModal}>
        <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12 ' onClick = {this.changeLengua.bind(this)} id= 'es' style ={{cursor: 'pointer',padding:0,}}>
          es
        </div>
        <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12 '  onClick = {this.changeLengua.bind(this)} id= 'ga' style ={{cursor: 'pointer',padding:0,}}>
          ga
        </div>

      </div>
    )
  }
}


/*
var creacionList =[]
    //TODO:
    //si lista.length > 3 hacer 2 filas con el conditional rendering
    //valorar hacer 2 componentes presentational
    let a =0
    for (var tipo in creacionDB) {
      if (creacionDB.hasOwnProperty(tipo)) {
        creacionList.push (
          <li key ={a}><NavLink id = 'creaciones' name= {tipo} onClick = {this.gestionaColapso.bind(this)} to = '/Diseños'>{tipo}</NavLink></li>
        )
        a++
      }
*/
/*
<ul className= 'dropdown-menu' onMouseOut={this.handleHoverOff.bind(this)}>

  {creacionList}

</ul>*/
