import React, { Component } from 'react'
import style from './styles'

class Conocenos extends Component {
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
    if(this.props.conocenosContenido.headerFoto){
      urlPic = this.props.conocenosContenido.headerFoto.urlPicConocenos
    }
    if(this.props.conocenosContenido.descripcion){
      descripcionTexto = this.props.conocenosContenido.descripcion.descripcionConocenos
      if(this.props.lengua ==='ga'){
        descripcionTexto = (this.props.conocenosContenido.descripcion.descripcionConocenosGalego)? this.props.conocenosContenido.descripcion.descripcionConocenosGalego : this.props.conocenosContenido.descripcion.descripcionConocenos
      }
    }
    return (
      <div >

        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{textAlign: 'center', marginBottom:'15px'}} >
          {!this.state.fotoLoaded &&
            <div className='loader'>Cargando...</div>
          }
          <img role='presentation' src={urlPic} className ='img-rounded' style={{maxWidth :'100%'}} onLoad = {()=>{this.setState({fotoLoaded:true})}} >
          </img>
        </div>

        <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' >

          {descripcionTexto.split('\n').map((item, key) => {
            return <span  key={key}>{item}<div><br/></div></span>
          })}

        </div>

      </div>
    )
  }
}

export default Conocenos



/*
Para separar con los /n (linebreacks)
https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746


{this.props.text.split('\n').map(function(item, key) {
  return (
    <span key={key}>
      {item}
      <br/>
    </span>
  )
})}

Now we're wrapping each line-break in a span, and that works fine because span’s has display inline. Now we got a working nl2br line-break solution.
And ES6 version
{this.props.text.split('\n').map((item, key) => {
  return <span key={key}>{item}<br/></span>
})}*/
