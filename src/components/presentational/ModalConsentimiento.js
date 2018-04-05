import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalConsentimiento extends React.Component {

  handleClick(){
    this.props.politica()
  }


  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }
    let contenido ={}
    let registrarseInfo =''

    if(this.props.contenido){
      contenido = this.props.contenido
      if (contenido.descripcion){
        registrarseInfo = contenido.descripcion.registrarseInfo
        if(this.props.lengua ==='ga' && contenido.descripcion.politicaPrivacidadTextoGalego){
          registrarseInfo = contenido.descripcion.politicaPrivacidadTextoGalego
        }
      }
    }
    var stiloModal ={
      position: 'absolute',
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',
      backgroundColor:'white',
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
      left: '20px',
      right: '20px',
      bottom: '20px',
      //border                     : '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    ///cos d background sometimes doesnt charge on time
    if (contenido.pic){
      stiloModal.backgroundImage ='url(' + contenido.pic.urlPicRegistrarse + ')'

    }else{
      stiloModal.backgroundColor = 'white'
    }

    return (
      <div style={style.modal.backdropStyle}>


        <div style={stiloModal}>


          <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>
            <div className='col-sm-12 '>
              <h4>Bienvenido!,</h4>
              <div >
                <p style={{marginBottom:2}}>al ser la primera vez que entras con esta cuenta de correo electrónico, debe quedar constancia de que aceptas la</p>
                <p style={{fontWeight:'bold',cursor:'pointer',marginBottom:2}}
                  onClick={this.handleClick.bind(this)}>  política de privacidad de datos</p>
                <p>porfavor despues de leerla, haz click en el botón que dice que sí acpetas y en un momento podrás realizar tus compras :) </p>
              </div>

              <hr style={{padding:0,marginTop :5,marginBottom:7}}/>
            </div>


            <div className='col-sm-12 form-group row' name ='sino' style={{textAlign:'center', marginTop: 2}}>

              <div className='col-xs-10 col-sm-9 col-md-9 col-lg-9' >
                <div onClick={this.props.consentimientoOk} style= {{borderRadius: '4px', textAlign:'center', cursor:'pointer',color:'white', backgroundColor:'black', textDecoration:'none', marginBottom: 10,padding:2}} > He leido y acepto la política de privacidad</div>


              </div>
              <div className='col-xs-4 col-sm-3 col-md-3 col-lg-3'>

                <div onClick={this.props.onClose} style= {{borderRadius: '4px', cursor:'pointer',textAlign:'center', color:'white', backgroundColor:'black', textDecoration:'none', marginBottom: 10, padding:2}} id='aceptando'> No acepto</div>
              </div>
            </div>

            <div className='col-sm-12 ' style={{ marginBottom: 10}}>
              {registrarseInfo.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>})}
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

export default ModalConsentimiento
