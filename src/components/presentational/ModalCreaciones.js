import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'

export default class ModalCreaciones extends Component {

  gestionaIrACreacion(event){
    this.props.onSelect(event.target.name)
  }

  render() {
    if(!this.props.show){
      return null
    }
    this.props.feriaDB
    var tipoList = this.props.creacionList.map((tipo,i)=>{

      let estilo ={fontWeight: 400, cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0 }

      return(
        <div key = {i} style ={{padding:0}}>


          <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12 ' style ={{padding:1, paddingLeft:10}} >
            <NavLink id='creaciones' name= {tipo.nombre} onClick = {this.gestionaIrACreacion.bind(this)} to = '/Diseños' style ={estilo}>
              {tipo.nombre}
            </NavLink>
          </div>
          <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12'  style ={{padding:1,textAlign:'center'}} >
            <hr style= {{padding: 0,margin :0 }}></hr>
          </div>
        </div>
      )
    }
    )
    var estiloModal ={
      position: 'fixed',
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',

      //backgroundPosition: 'center',
      //backgroundSize: 'cover',
      //backgroundRepeat: 'no-repeat',
      backgroundColor:'#FAFAFA',
      minWidth: 200,
      maxWidth: 600,
      minHeight: 100,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 3333,
      top: '38px',
      left: '100px',
      //right: '40px',
      //bottom: '40px',
      border: '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    return (
      <div style={estiloModal}>

        {tipoList}


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



