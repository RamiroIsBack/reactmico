import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import style from './styles'

export default class Product extends Component {
  constructor(args){
    super()
    this.state ={
      url2: false,
      timeToReact: false,
    }
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
  handleClick(){
    this.props.whenClicked(this.props.propiedades)
  }

  mueve(event){
    console.log('mueve '+event)
    console.log(event.clientX)
    console.log(event.clientY)
  }
  render() {
    let url = this.props.propiedades.pic
    let numPic = '1/2'
    if(this.state.url2){
      url = this.props.propiedades.pic2
      numPic = '2/2'
    }

    return (
      <div className='card '>
        <NavLink to='/Carro' onClick={this.handleClick.bind(this)} onClick = {this.handleClick.bind(this)} onTouchMove={this.handleSwipe.bind(this)} onMouseEnter={this.handlepic2.bind(this)} onMouseLeave={this.handlepic1.bind(this)}>
          <img className='card-img-top img-rounded' src={url} alt='Card image cap' style={style.product} style= {{maxWidth:'100%'}} draggable = 'false' />
          <div className = 'col-xs-offset-10 col-xs-2 col-sm-offset-10 col-sm-2 col-md-offset-10 col-md-2 col-lg-offset-10 col-lg-2 carousel-caption ' style = {{width : 25, padding: '0px', top: 0, left: 10, right: 10}}>
            <h6  style = {{backgroundColor: 'rgba(0,0,0,0.50)' ,borderRadius:'25px', padding: '0px',marginTop : 5, overflow: 'hidden'}}>{numPic}</h6>
          </div>
        </NavLink>
        <div className='card-block'>
          <h4 className='card-title'>{this.props.propiedades.nombre}</h4>
          <p className='card-text'>{this.props.propiedades.descripcion}</p>
          <NavLink to='/Carro' type='button' className='btn btn-success list-inline' style= {style.carroProduct.btnPedido} onClick={this.handleClick.bind(this)} draggable = 'false'>
            <li className='glyphicon glyphicon-shopping-cart'>
            </li>
            <li><h4>Añadir al carro</h4></li>
          </NavLink>
        </div>
      </div>
    )
  }
}
