
import React, { Component } from 'react'
import style from './styles'
import { NavLink} from 'react-router-dom'

export default class Foto extends Component {
  constructor(args){
    super()
    this.state ={
      url2: false,
      timeToReact: false,
    }
  }
  onComponentDidMount(){
    this.setState ({url :this.props.propiedades.pic, name: this.props.propiedades.nombre})
  }
  handleClick(event){
    //console.log ('foto func')
    //paso la info de vuelta al container para que la use
    // en el onClick y hacer router al layout productos
    this.props.whenClicked(this.props.propiedades)
  }
  handlepic2(){
    this.setState ({url2 :true})

  }
  handlepic1(){
    this.setState ({url2 :false})

  }
  handleSwipe(){
    //necesitamos un timeout xq si no se cuelan 20 cambios x segundo y es un descontrol
    //asi va bien pero molaria q solo cambiase cuando se mueve horizontalmente
    if (!this.state.timeToReact){
      this.setState ({url2 : !this.state.url2, timeToReact : true})
      setTimeout(() => {
        this.setState ({timeToReact : false})
        console.log ('swiped')
      }, 600)
    }
  }

  //TODO read about image preloading
  render() {
    let url = this.props.propiedades.pic
    let numPic = '1/2'
    if(this.state.url2){
      url = this.props.propiedades.pic2
      numPic = '2/2'
    }

    let nombre = this.props.propiedades.nombre
    let precio =this.props.propiedades.precio
    //console.log ('caca '+ url)
    //pongo l'imites a las fotos x si se meten de diferente tama;no
    return (

      <div className = 'container col-xs-6 col-sm-6 col-md-4 col-lg-4' style= {{width: 300, height: 275, paddingRight: 0,paddingLeft: 10 }}>
        <div  className='btn btn-block' onClick = {this.handleClick.bind(this)} onTouchMove={this.handleSwipe.bind(this)} onMouseEnter={this.handlepic2.bind(this)} onMouseLeave={this.handlepic1.bind(this)} style= {style.foto.container}>
          <img src= {url} className="img-responsive img-rounded" style= {{maxWidth:'100%', maxHeight : '200px'}}  alt={nombre} draggable = 'false'>
          </img>
          <div className = 'col-xs-offset-10 col-xs-2 col-sm-offset-10 col-sm-2 col-md-offset-10 col-md-2 col-lg-offset-10 col-lg-2 carousel-caption ' style = {{width : 25, padding: '0px', top: 0, left: 10, right: 10}}>
            <h6  style = {{backgroundColor: 'rgba(0,0,0,0.50)' ,borderRadius:'25px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{numPic}</h6>
          </div>
        </div>
        <div className = 'row' style= {style.foto.container}>
          <div className = 'container-fluid col-xs-9 col-sm-9 col-md-9 col-lg-9'>
            <h5 className='text-muted' style= {style.foto.footName}>{nombre}</h5>
          </div>
          <div className = 'container-fluid col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <h6 className = 'text-muted pull-right' style= {style.foto.footPrice}>{precio}€</h6>
          </div>
        </div>
      </div>
    )
  }
}
