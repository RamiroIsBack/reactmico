
import React from 'react'
import style from './styles'
import PayPalButton from './PayPalButton'
class ModalFormaDePago extends React.Component {

  constructor() {
    super()
    this.state = {
      show: 'no',

    }
  }
  irAcompraRealizada(){
    this.props.irAcompraRealizada()
  }
  corregirDatos(){
    this.props.onClose('datos')
  }
  cambiarCarro(){
    this.props.onClose('carro')
  }
  pagoHecho(data,actions){
    console.log('pagoHecho2'+data +', y ' + actions)
    this.props.guardarDatosPedido(data)
  }
  onCancel(data){
    console.log('accion de pago cancelada')
    this.props.onClose('carro')
  }
  onError(data){
    console.log('aalgun error en la accion de pago'+data)
  }
  render() {
    // Render nothing if the 'show' prop is false
    if(!this.props.show) {
      return null
    }
    let contenido = this.props.contenido
    var stiloModal ={
      position: 'absolute',
      //backgroundImage: 'url(' + contenido.pic.urlPicRegistrarse + ')',
      //borderRadius: 10,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      maxWidth: 900,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '40px',
      left: '5px',
      right: '5px',
      bottom: '5px',
      //border                     : '1px solid #ccc',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '5px',
      outline: 'none',
    }
    /////// if background doesn't charge on time
    if(contenido){
      if (contenido.pic){
        stiloModal.backgroundImage ='url(' + contenido.pic.urlPicRegistrarse + ')'

      }else{
        stiloModal.backgroundColor = 'white'
      }
    }else{
      stiloModal.backgroundColor = 'white'
    }

    let progressI = 'https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2Fproceso%20de%20compra2.png?alt=media&token=365b6908-89c1-4789-ace7-596448223b61'
    let productionID = 'AR2tH06OvYcokjrKYyGTaDyoR8n56QvhNH8bFQfqIaIls-tRWVGN0P1u9jWg_wUgNj8mTVmBTELvHgUu'
    let sandboxID='AUt-Juq7KaOA6IiUtQxPGjSAPvLapovYbVAaryh9BzuxLzCEdxV2YKPRq9uQuwPdeUnu2O63PbJZGnjQ'

    let precioTotal = this.props.carro.precioSubTotal + this.props.carro.envio
    let shipping= 1 //no shipping address
    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
              style= {style.modal.btnClose}></button>
            <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>
              <div  style ={{minHeight: 122}}>
                <img id='foto' src={progressI}  style={{ borderRadius : 10 ,paddingTop: 3 , width: '100%'}} />
              </div>

              {/*esto es visible-XS*/}
              <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg carousel-caption ' style = {{ color: 'black' ,padding: '0px', top: 5, bottom: 'auto', textShadow: 'none'}}>
                <h6 className='text-center' style={{fontWeight:'bold' ,padding:0 ,margin:0 ,paddingBottom:2}}>Forma de pago</h6>
                <button id= 'datosEnvio' onClick = {this.irAcompraRealizada.bind(this)}
                  style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 2}}>
                  <span style= {{color : 'white' }} id='carro'>siguiente </span>
                  <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-arrow-right'>
                  </span>

                </button>
              </div>

              {/*esto es hidden-XS*/}
              <div className = 'container-fluid row hidden-xs carousel-caption' style = {{color: 'black' ,padding: '0px', top: 5 , bottom: 'auto', textShadow: 'none'}}>
                <h3 className='text-center'>Forma de pago</h3>
                <button id= 'datosEnvio' onClick = {this.irAcompraRealizada.bind(this)}
                  style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 5}}>
                  <span style= {{color : 'white' }} id='carro'>siguiente </span>
                  <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-arrow-right'>
                  </span>

                </button>
              </div>
              <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg' style = {{padding: '0px', top: 5 , }}>
                <hr style={{padding:0,marginTop :0,marginBottom:2}}/>
              </div>
              <div className = 'container-fluid row hidden-xs' style = {{padding: '0px', top: 5 , }}>
                <hr/>
              </div>
              <div className='container-fluid col-xs-12 col-sm-12 col-md-12 col-lg-12' >
                <div className ='row '>
                  <div className='container-fluid col-xs-7 col-sm-6 col-md-6 col-lg-8' style= {style.foto.container}>

                    <h5>elementos: </h5>
                    <h5>envio: </h5>
                    <h5>Total: </h5>
                  </div>
                  <div className='container-fluid col-xs-5 col-sm-6 col-md-6 col-lg-4' style= {style.foto.container}>

                    <h5>{this.props.carro.numProducts}</h5>
                    <h5 className = 'text-muted'>{this.props.carro.envio} €</h5>
                    <h5 style = {style.carroProduct.texto}>{precioTotal} €</h5>
                  </div>

                </div>
              </div>
              <div>
                {/* docs
                https://www.npmjs.com/package/react-paypal-express-checkout*/}
                <PayPalButton
                  env='sandbox'
                  sandboxID={sandboxID}
                  amount={precioTotal}
                  currency='EUR'
                  shipping= {shipping}//1=no shipping address . I have it stored already, we dont wanna confuse nobody
                  commit={true}
                  pagoHecho = {this.pagoHecho.bind(this)}
                  onCancel = {this.onCancel.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ModalFormaDePago

