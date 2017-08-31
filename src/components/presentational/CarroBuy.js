
import React, { Component } from 'react'
import style from './styles'
export default class CarroBuy extends Component {
  render() {
    console.log ('subtotal: '+this.props.subTotal)
    return (
      <div className ='row container-fluid' style={{padding :4, marginRight:10,top: 0, bottom:142, position:'fixed',overflowY:'auto', overflowX:'hidden' }}>
        <div className ='row container-fluid' style={{marginTop:'60px'}}>
          <div className='container-fluid col-xs-12 col-sm-12 col-md-12 col-lg-6' >
            <div className ='row '>
              <div className='container-fluid col-xs-7 col-sm-6 col-md-6 col-lg-8' style= {style.foto.container}>

                <h5>elementos: </h5>
                <h5>envio: </h5>
                <h5>Total: </h5>
              </div>
              <div className='container-fluid col-xs-5 col-sm-6 col-md-6 col-lg-4' style= {style.foto.container}>

                <h5>{this.props.carroPropiedades.numProducts}</h5>
                <h5 className = 'text-muted'>gratis</h5>
                <h5 style = {style.carroProduct.texto}>{this.props.carroPropiedades.precioSubTotal} €</h5>
              </div>
              <a className= 'btn btn-success col-xs-10 col-sm-12 col-md-12 col-lg-12' style= {style.carroProduct.btnPedido} onClick = {this.props.comprar}> REALIZAR PEDIDO <h4  className = 'glyphicon glyphicon-ok-circle'></h4>
              </a>
            </div>
          </div>
          <br/>
          <div className=' clear-fix container-fluid col-xs-12 col-sm-12 col-md-12 col-lg-6' style={{paddingLeft: 0}} >

            <h4 style = {{whiteSpace: 'initial',paddingLeft: 0}}>{this.props.pedidoContenido.descripcion.pedidoTitulo}</h4>

            <br/>


            {this.props.pedidoContenido.descripcion.pedidoInfo.split('\n').map((item, key) => {
              return <span style = {{whiteSpace: 'initial',paddingLeft: 0}} key={key}>{item}<br/></span>})}

          </div>
        </div>
      </div>
    )
  }
}


