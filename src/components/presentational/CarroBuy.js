
import React, { Component } from 'react'
import style from './styles'
export default class CarroBuy extends Component {
  render() {
    let total = this.props.carroPropiedades.precioSubTotal + this.props.carroPropiedades.envio
    let pedidoTitulo = ''
    let pedidoInfo = ''
    let condicionesLink = 'Condiciones de venta y devoluciones'
    if(this.props.pedidoContenido.descripcion){
      if(this.props.lengua ==='ga'){
        pedidoTitulo =(this.props.pedidoContenido.descripcion.pedidoTituloGalego)?  this.props.pedidoContenido.descripcion.pedidoTituloGalego: this.props.pedidoContenido.descripcion.pedidoTitulo
        pedidoInfo =(this.props.pedidoContenido.descripcion.pedidoInfoGalego)? this.props.pedidoContenido.descripcion.pedidoInfoGalego: this.props.pedidoContenido.descripcion.pedidoInfo
      }else{
        pedidoTitulo = this.props.pedidoContenido.descripcion.pedidoTitulo
        pedidoInfo =this.props.pedidoContenido.descripcion.pedidoInfo
      }

    }
    return (
      <div className ='row ' style={this.props.stiloCarroBuy}>

        <div className=' col-xs-12 col-sm-12 col-md-12 col-lg-6' >
          <div className ='row '>
            <div className=' col-xs-7 col-sm-6 col-md-6 col-lg-8' >

              <h5>elementos: </h5>
              <h5>envio: </h5>
              <h5>Total: </h5>
            </div>
            <div className=' col-xs-5 col-sm-6 col-md-6 col-lg-4' >

              <h5>{this.props.carroPropiedades.numProducts}</h5>
              <h5 className = 'text-muted'>{this.props.carroPropiedades.envio} €</h5>
              <h5 style = {style.carroProduct.texto}>{total} €</h5>
            </div>
            <a className= 'btn col-xs-10 col-sm-11 col-md-11 col-lg-11' style= {style.carroProduct.btnPedido} onClick = {this.props.comprar}> REALIZAR PEDIDO <h4  className = 'glyphicon glyphicon-ok-circle'></h4>
            </a>
          </div>
          <div style= {{marginTop: 10 ,marginBottom: 10,}}>
            <a
              style= {{fontWeight: 'bold', color:'black',cursor:'pointer'}}
              onClick = {()=>{this.props.openCondicionesVenta}}>{condicionesLink}
            </a>
          </div>
        </div>


        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6' style={{paddingLeft: 0}} >
          <p style = {{whiteSpace: 'initial',paddingLeft: 0}}>{pedidoTitulo}</p>

          <br/>
          {this.props.screenSize !== 'mobile' &&
            <div>
              {pedidoInfo.split('\n').map((item, key) => {
                return <span style = {{whiteSpace: 'initial',paddingLeft: 0}} key={key}>{item}<br/></span>})}
            </div>

          }
        </div>

      </div>
    )
  }
}
