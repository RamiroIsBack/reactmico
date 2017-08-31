import React from 'react'
import style from './styles'
import { NavLink} from 'react-router-dom'


class ModalMenuXs extends React.Component {

  constructor() {
    super()
    this.state = {

      recibir: true,
    }
  }

  gestionaIrACreacion(event){
    if (event.target.name){
      this.props.onSelectCreaciones(event.target.name)
    }
    else {
      this.props.onSelectCreaciones('allCreaciones')
    }
  }
  gestionaIrAFeria(event){
    if(event.target.name){
      this.props.onSelectFerias(event.target.name)
    }
    else {
      this.props.onSelectFerias('allFerias')
    }
  }
  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }

    let creacionesContenidos = this.props.creacionesContenidos
    let feriasContenidos = this.props.feriasContenidos

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

    var tipoList = this.props.creacionList.map((tipo,i)=>{

      let estilo ={fontWeight: 400, cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0 }

      return(
        <div key = {i} style ={{padding:0}}>

          <div className= 'col-xs-3 col-sm-3 col-md-3 col-lg-3'  style ={{padding:1,textAlign:'center'}} >
            <NavLink id='creaciones' name= {tipo.nombre} onClick = {this.gestionaIrACreacion.bind(this)} to = '/Diseños' style ={estilo}>
              <img role='presentation' src={tipo.urlIcon} className ='img-rounded' style={{height:25}} name= {tipo.nombre}>
              </img>
            </NavLink>
          </div>
          <div className= 'col-xs-9 col-sm-9 col-md-9 col-lg-9 ' style ={{padding:1}} >
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

    var stiloModal ={
      position: 'absolute',
      backgroundColor: 'white',
      maxWidth: 700,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '40px',
      left: '2px',
      right: '10px',
      bottom: '40px',
      //border                     : '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }

    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <div className = 'col-xs-12 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>
              <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
                style= {style.modal.btnClose}></button>
              <div className='col-xs-offset-1 col-xs-8' >
                <NavLink id='creaciones' name= 'allCreaciones' onClick = {this.gestionaIrACreacion.bind(this)} to='/Diseños' style = {{cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <h5  id='creaciones' name= 'allCreaciones' className='glyphicon glyphicon-asterisk'> Diseños:</h5>
                </NavLink>
              </div>
              <div className='col-xs-10' >
                <hr style= {{padding: 0,margin :0 }}/>
              </div>
              <div >
                {tipoList}
              </div>
              <div className='col-xs-offset-1 col-xs-8' >
                <NavLink id='creaciones' name= 'allFerias' onClick = {this.gestionaIrAFeria.bind(this)} to = '/Ferias' style = {{cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <h5 name= 'allFerias' className='glyphicon glyphicon-asterisk'> Ferias:</h5>
                </NavLink>
              </div>
              <div className='col-xs-10' >
                <hr style= {{padding: 0,margin :0 }}/>
              </div>
              <div >
                {feriaList}
              </div>
              <div className='col-xs-offset-1 col-xs-8' >
                <NavLink to = '/Conocenos' style = {{cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0}} onClick={this.props.onClose}>
                  <h5 className='glyphicon glyphicon-asterisk'> Conocenos</h5>
                </NavLink>
              </div>
              <div className='col-xs-10' >
                <hr style= {{padding: 0,margin :0 }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//I tihk I don't need this cos it's only to put children to it
/*Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}*/

export default ModalMenuXs
