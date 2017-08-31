import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'

export default class ModalFerias extends Component {
  gestionaIrAFeria(event){
    this.props.onSelect(event.target.name)
  }
  render() {
    if(!this.props.show){
      return null
    }
    let feriaDB=this.props.feriaDB
    var feriaList = feriaDB.map((feria,i)=>{
      let estilo = {}
      if (feria.enCurso){
        estilo = {fontWeight: 600, cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0 , paddingLeft : 5}
      }else{

        estilo ={fontWeight: 400, cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0 , paddingLeft : 5}

      }
      if(!feria.caducada){
        return(
          <div key = {i} style ={{padding:0}}>

            <div className= 'col-xs-9 col-sm-9 col-md-9 col-lg-9 ' style ={{padding:1}} >
              <NavLink id='ferias' name= {feria.nombre} onClick = {this.gestionaIrAFeria.bind(this)} to ='/Ferias' style ={estilo}>
                {feria.nombre}
              </NavLink>
            </div>
            <div className= 'col-xs-3 col-sm-3 col-md-3 col-lg-3'  style ={{padding:1,textAlign:'center'}} >
              <NavLink id='ferias' name= {feria.nombre} onClick = {this.gestionaIrAFeria.bind(this)} to ='/Ferias' style ={estilo}>
                {feria.fecha}
              </NavLink>
            </div>
            <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12'  style ={{padding:1,textAlign:'center'}} >
              <hr style= {{padding: 0,margin :0 }}></hr>
            </div>
          </div>
        )
      }
    })
    var estiloModal ={
      position: 'fixed',
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',

      //backgroundPosition: 'center',
      //backgroundSize: 'cover',
      //backgroundRepeat: 'no-repeat',
      backgroundColor:'#FAFAFA',
      minWidth: 350,
      maxWidth: 600,
      minHeight: 100,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 3333,
      top: '38px',
      left: '200px',
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

        {feriaList}

      </div>
    )
  }
}

