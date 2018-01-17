import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import style from './styles'

export default class Product extends Component {
  constructor(args){
    super()
    this.state ={
      url2: false,
      movementObj:{
        minX :30,
        maxY :50,
        startX :0,
        startY :0,
        endX:0,
        endY:0,
      },
    }
  }
  handlepic2(){
    this.setState ({url2 :true})

  }
  handlepic1(){
    this.setState ({url2 :false})

  }
  handleTouchStart(e){
    let newMovementObj = Object.assign({}, this.state.movementObj)
    let touch = e.touches[0]
    newMovementObj.startY = touch.screenY
    newMovementObj.startX = touch.screenX
    this.setState({movementObj : newMovementObj })
  }
  handleTouchMove(e){
    let newMovementObj = Object.assign({}, this.state.movementObj)
    let touch = e.touches[0]
    newMovementObj.endY = touch.screenY
    newMovementObj.endX = touch.screenX
    this.setState({movementObj : newMovementObj })
  }
  handleTouchEnd(){
    let xMove = this.state.movementObj.startX - this.state.movementObj.endX
    let yMove = this.state.movementObj.startY - this.state.movementObj.endY
    if(Math.abs(xMove) > this.state.movementObj.minX){
      if(Math.abs(yMove) < this.state.movementObj.maxY){
        this.setState ({url2 : !this.state.url2})
      }

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
        <NavLink to='/Carro'
          onTouchStart={this.handleTouchStart.bind(this)}
          onTouchMove={this.handleTouchMove.bind(this)}
          onTouchEnd={this.handleTouchEnd.bind(this)}
          onClick={this.handleClick.bind(this)}
          onMouseEnter={this.handlepic2.bind(this)}
          onMouseLeave={this.handlepic1.bind(this)}>
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
