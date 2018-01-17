import React, { Component } from 'react'
import style from './styles'

class Pedido extends Component {
  constructor(){
    super()
    this.state={
      showDireccion : false,
    }
  }
  trackOrder(){
    this.props.trackOrder(this.props.pedido.datosCompra.urlMensajeria)
  }
  toogleDireccion(){
    this.setState({showDireccion:!this.state.showDireccion})
  }
  render() {
    const carroLista =
    this.props.pedido.carro.cartList.map((productInCart,i)=>{
      return(
        <div key ={i} style= {{width : '100%',display : 'inline-block', padding: '0px', border: 'none',}}>
          <div className = 'container-fluid col-xs-5 col-sm-5 col-md-5 col-lg-5' style= {style.foto.container}>

            <img role='presentation' src={productInCart.pic} className ='img-rounded' style= {{maxWidth:'80px', maxHeight: '60px'}}>
            </img>

          </div>
          <div className = 'col-xs-7 col-sm-7 col-md-7 col-lg-7' style= {style.foto.container}>
            <table className="table-condensed table-responsive" style = {{width : '100%', border: 'none' ,marginBottom:0}}>
              <tbody>
                <tr>
                  <td>{productInCart.nombre}</td>

                </tr>
                <tr>
                  <td className = 'pull-right'>{productInCart.precio} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      )
    })

    let estado = 'preparando el envio'
    let progressI = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/ferias%2Fproceso%20de%20envio%201.png?alt=media&token=8ca492a7-d0c3-47b2-8a99-de76a34859d7'

    if (this.props.pedido.datosCompra.localizador){
      estado = 'en camino'
      progressI = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/ferias%2Fproceso%20de%20envio%202.png?alt=media&token=915fa9ef-ae9b-4dc3-a4fe-cf6c397908b2'
    }if(this.props.pedido.datosCompra.entregado){
      estado = 'entregado'
      progressI = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/ferias%2Fproceso%20de%20envio%203.png?alt=media&token=db6b630a-2b94-420e-a80c-54636c0ec80a'
    }

    let precioTotal = this.props.pedido.carro.precioSubTotal + this.props.pedido.carro.envio
    let id =this.props.id
    return (
      <div className = 'container'>
        <div className ='col-xs-12  col-sm-12 col-md-12 col-lg-12'>
          <h4>pedido con ID: <b> {id} </b></h4>
        </div>
        <div className ='col-xs-12 col-sm-12 col-md-4 col-lg-4'>
          {carroLista}

          <div className ='precio' style = {{paddingLeft :0, paddingRight: 0, marginBottom:10}}>
            <h6 style = {{marginBottom :0 , paddingBottom:0}}>precio total: <b> {precioTotal} € </b></h6>
          </div>
          {!this.state.showDireccion &&
            <div className ='direccion' style = {{paddingLeft :0, paddingRight: 0}}>
              <button id= 'seguimiento' onClick = {this.toogleDireccion.bind(this)}
                style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 2 }}>
                <span style= {{color : 'white' }} id='carro'>mostrar datos del envio </span>
                <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-chevron-down'>
                </span>
              </button>
            </div>
          }
          {this.state.showDireccion &&
            <div>
              <div className= 'hidden-xs ' style = {{paddingRight: 10, border: '1px solid black'}}>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.nombreCompletoEnvio} </p>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.calle} </p>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.localidad} </p>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.cp+' , '+this.props.pedido.datosEnvio.provincia} </p>

              </div>

              <div className= 'hidden-sm hidden-md hidden-lg visible-xs-block' style = {{paddingLeft: 0, paddingRight: 0, border: '1px solid black'}}>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.nombreCompletoEnvio} </p>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.calle} </p>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.localidad} </p>
                <p style= {{marginBottom: 1}}> {this.props.pedido.datosEnvio.cp+' , '+this.props.pedido.datosEnvio.provincia} </p>

              </div>


              <div className ='direccion' style = {{paddingLeft :0, paddingRight: 0}}>
                <button id= 'seguimiento' onClick = {this.toogleDireccion.bind(this)}
                  style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 2 }}>
                  <span style= {{color : 'white' }} id='carro'>ocultar datos de envio </span>
                  <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-chevron-up'>
                  </span>
                </button>
              </div>

            </div>

          }
        </div>
        <div className ='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
          <div style ={{minHeight: 122 ,textAlign: 'center' ,}}>
            <img id='foto' src={progressI}  style={{borderRadius : 10 ,paddingTop: 3,  width: '70%'}} />
          </div>
          {/*esto es visible-XS*/}
          <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg carousel-caption ' style = {{ color: 'black' ,padding: '0px', top: 5, bottom: 'auto', textShadow: 'none', display:'block', width:'90%' }}>

            <h6 style = {{marginBottom :0 , paddingBottom:0, marginTop :0 , paddingTop:0}}>estado: <b> {estado} </b></h6>
            {estado === 'en camino' &&
              <div>
                <div className ='col-xs-6' style = {{paddingLeft :0, paddingRight: 0}}>
                  <h6 style = {{marginBottom :0 , paddingBottom:0,textAlign: 'center'}}>localizador: <b> {this.props.pedido.datosCompra.localizador} </b></h6>
                </div>
                <div className ='col-xs-6' style = {{paddingLeft :0, paddingRight: 0,textAlign: 'center'}}>
                  <button id= 'seguimiento' onClick = {this.trackOrder.bind(this)}
                    style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 2 }}>
                    <span style= {{color : 'white' }} id='carro'>seguimiento </span>
                    <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-arrow-right'>
                    </span>
                  </button>
                </div>
              </div>
            }
          </div>
          {/*esto es hidden-XS*/}
          <div className = 'container-fluid row hidden-xs carousel-caption' style = {{color: 'black' ,padding: '0px', top: 5 , bottom: 'auto', textShadow: 'none'}}>
            <h4>estado: <b> {estado} </b></h4>
            {estado === 'en camino' &&
              <div>
                <div className ='col-xs-8' style = {{paddingLeft :0, paddingRight: 0}}>
                  <h4 >localizador: <b> {this.props.pedido.datosCompra.localizador} </b></h4>
                </div>
                <div className ='col-xs-4' style = {{paddingLeft :0, paddingRight: 0}}>
                  <button id= 'seguimiento' onClick = {this.trackOrder.bind(this)}
                    style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 5 }}>
                    <span style= {{color : 'white' }} id='carro'>seguimiento </span>
                    <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-arrow-right'>
                    </span>
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
        <hr
          style = {{display:'block', width: '96%'}}
        ></hr>

      </div>
    )
  }
}

export default Pedido
