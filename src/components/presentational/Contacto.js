import React, { Component } from 'react'
import style from './styles'

class Contacto extends Component {
  constructor() {
    super()
    this.state ={
      fotoLoaded:false,
    }
  }

  handleClick(event){
    this.props.whenClicked()
  }
  render() {

    let urlPic = ''
    let descripcionTexto = ''
    let contactoLinks= {
      contactMail : '',
      contactHours : '',
      contactPhone : '',
      contactPost : '',
    }

    if(this.props.contactoContenido.descripcion){
      descripcionTexto = this.props.contactoContenido.descripcion.descripcionContacto
      if(this.props.lengua ==='ga'){
        descripcionTexto = (this.props.contactoContenido.descripcion.descripcionContactoGalego)? this.props.contactoContenido.descripcion.descripcionContactoGalego : this.props.contactoContenido.descripcion.descripcionContacto
      }
    }

    if(this.props.contactoContenido.headerFoto){
      urlPic = this.props.contactoContenido.headerFoto.urlPicContacto
    }
    if(this.props.contactoLinks.contactMail){
      contactoLinks = this.props.contactoLinks
    }
    return (
      <div >

        <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8' style={{textAlign: 'center', marginBottom:'15px',float:'right'}} >
          {!this.state.fotoLoaded &&
            <div className='loader'>Cargando...</div>
          }
          <img role='presentation' src={urlPic} className ='img-rounded' style={{maxWidth :'100%'}}
            onLoad = {()=>{this.setState({fotoLoaded:true})}}
          >
          </img>
        </div>

        <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center' >
          {descripcionTexto.split('\n').map((item, key) => {
            return <span  key={key}>{item}<div><br/></div></span>
          })}


          <p >Contacta conmigo:</p>
          <div >
            <a href={'mailto:' + contactoLinks.contactMail} >{contactoLinks.contactMail}</a>
            <hr style={{padding: 0 ,marginRight:12,marginLeft: 12,marginTop: 0, marginBottom: 0}} />
          </div>
          { contactoLinks.contactPhone != 'no' &&
            <div >
              <a href={'tel:' + contactoLinks.contactPhone} >{contactoLinks.contactPhone}</a>
              <hr style={{padding: 0 ,marginRight:12,marginLeft: 12,marginTop: 0, marginBottom: 0}} />
            </div>
          }

          <p style={{textAlign:'center'}}>{contactoLinks.contactHours}</p>



        </div>

      </div>
    )
  }
}

export default Contacto
