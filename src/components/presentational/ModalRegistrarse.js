import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalRegistrarse extends React.Component {

  constructor() {
    super()
    this.state = {

      recibir: true,
    }
  }

  handleChange(event){
    this.setState({recibir: !this.state.recibir})
  }
  handleImputData(event){

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //TODO: hacer q meta bien los datos, no dejar pasar ni una!!
    //con acciones que lancen alerts con timeOut??
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    let amigo ={
      nombre: document.getElementById('nombre').value,
      mail: document.getElementById('contactMail').value,
      password: document.getElementById('password').value,
      newsletter: this.state.recibir
    }
    this.props.subirNuevoAmigo(amigo)
  }
  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }
    let contenido = this.props.contenido
    var stiloModal ={
      position: 'absolute',
      backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',
      //borderRadius: 10,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      maxWidth: 700,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '60px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      //border                     : '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    var sino = 'Sí'
    var newsletter = 'glyphicon glyphicon-ok text-center pull-right'
    if (!this.state.recibir){
      newsletter = 'glyphicon glyphicon-remove text-center pull-right'
      sino = 'No'
    }
    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
              style= {style.modal.btnClose}></button>
            <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>
              <div >
                <h3 className='text-center'>{contenido.descripcion.registrarseTitulo}</h3>
                <hr/>
              </div>
              <div >
                <div >
                  <div className='form-group row'>
                    <div className='col-sm-3'>
                      <p>nombre*</p>
                    </div>
                    <div className='col-sm-9'>
                      <textarea type='text' rows='1' className='form-control' id='nombre' placeholder='¿Cómo te llamas?' ></textarea>
                    </div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-sm-3'>
                      <p>e-mail*</p>
                    </div>
                    <div className='col-sm-9'>
                      <textarea type='e-mail' rows='1' className='form-control' id='contactMail' placeholder='nuevo.amigo.de.mico@micomail.com' ></textarea>
                    </div>
                  </div>
                  <div className ='form-group row' >
                    <div className='col-sm-3'>
                      <p>contraseña*</p>
                    </div>
                    <div className='col-sm-9' >
                      <textarea type='password' rows='1' className='form-control' id ='password' placeholder='introduce al menos 6 caracteres'></textarea>
                    </div>
                  </div>
                  <div className='form-group row'>
                    <div className='col-sm-2'>
                      <a className ={newsletter} id ='si' onClick={this.handleChange.bind(this)} style= {style.modal.btnNewsletter}></a>
                    </div>
                    <div className='col-sm-10'>
                      <p>{sino} quiero recibir información por e-mail</p>
                    </div>

                  </div>
                  <p className= 'text-muted'>(nunca mandamos spam ni publicidad)</p>
                  <div className='form-group row'>
                    <button onClick={this.handleImputData.bind(this)} className='btn btn-success text-center form-control ' style = {style.modal.btnRegistrarse} >Registrarse</button>
                  </div>
                </div>
              </div>
              <div className='col-sm-10 text-center'>
                {contenido.descripcion.registrarseInfo.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>})}
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

export default ModalRegistrarse
