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
    var tipoList = this.props.creacionList.map((tipo,i)=>{
      let name = tipo.nombre
      let estilo ={fontWeight: 400, cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0 }

      if(this.props.lengua ==='ga'){
        name = tipo.nombreGalego
      }
      return(
        <div key = {i} style ={{padding:0}}>


          <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12 ' style ={{padding:1, paddingLeft:10}} >
            <NavLink id='creaciones' name= {tipo.nombre} onClick = {this.gestionaIrACreacion.bind(this)} to = '/Diseños' style ={estilo}>
              {name}
            </NavLink>
          </div>

        </div>
      )
    }
    )

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

        {tipoList}


      </div>
    )
  }
}
