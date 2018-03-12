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
    if (event.target.id){
      this.props.onSelectCreaciones(event.target.id)
    }
    else {
      this.props.onSelectCreaciones('allCreaciones')
    }
  }
  gestionaIrAFeria(event){

    this.props.onSelectFerias('allFerias')

  }
  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }

    var tipoList = this.props.creacionList.map((tipo,i)=>{

      let estilo ={cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0 }

      return(
        <div key = {i} style ={{padding:0}}>

          <div className= 'col-xs-offset-3 col-xs-9'
            style ={{padding:1}} >
            <NavLink id='creaciones' id= {tipo.nombre} onClick = {this.gestionaIrACreacion.bind(this)} to = '/Diseños' style ={estilo}>
              <h4 id= {tipo.nombre}>{tipo.nombre}</h4>
            </NavLink>
          </div>

        </div>
      )
    }
    )

    var stiloModal ={
      position: 'absolute',
      backgroundColor: 'white',
      maxWidth: '100%',
      minHeight: 300,
      maxHeight: '100%',
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '20px',
      left: '2px',
      right: '70px',
      bottom:'40px',
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
                <NavLink id='allCreaciones' name= 'allCreaciones' onClick = {this.gestionaIrACreacion.bind(this)} to='/Diseños' style = {{cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <h3  id='allCreaciones' name= 'allCreaciones' > Diseños:</h3>
                </NavLink>
              </div>

              <div >
                {tipoList}
              </div>
              <div className='col-xs-offset-1 col-xs-8' >
                <NavLink id='creaciones' name= 'allFerias' onClick = {this.gestionaIrAFeria.bind(this)} to = '/Ferias' style = {{cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                  <h3 name= 'allFerias'> Ferias</h3>
                </NavLink>
              </div>


              <div className='col-xs-offset-1 col-xs-8' >
                <NavLink to = '/Conocenos' style = {{cursor: 'pointer', color:'black',backgroundColor:'transparent',textDecoration: 'none',padding: 0}} onClick={this.props.onClose}>
                  <h3> Conocenos</h3>
                </NavLink>
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
