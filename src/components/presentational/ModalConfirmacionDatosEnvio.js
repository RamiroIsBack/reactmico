
import React from 'react'
import style from './styles'
class ModalCompraRealizada extends React.Component {

  constructor() {
    super()
    this.state = {
      show: 'no',

    }
  }
  irWrapPedido(event){
    let data = this.props.data
    if (event.target.id !=='paypalEnvio'){
      data.envioDefinitivo = this.props.dbEnvio
    }//ya tiene metido los datos de paypal en data.envioDefinitivo
    this.props.wrapPedido(data)
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
      maxWidth: 500,
      minHeight: 300,
      maxHeight: 700,
      margin: '0 auto',
      //To make sure that it is really on top of all other elements, we set z-index to a high value (by default all elements have a z-index value of 0).
      zIndex: 6668,
      top: '80px',
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


    return (
      <div style={style.modal.backdropStyle}>
        <div style={stiloModal}>

          <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>

            <h4 className='text-center' style={{fontWeight:'bold' ,padding:0,paddingTop:10 ,margin:0 ,paddingBottom:2}}>Ya casi lo tenemos! </h4>
            <h5 className='text-center'>A que dirección quieres que te llegue el pedido?</h5>
            <hr></hr>
            <div className = 'col-xs-6 col-sm-6 col-md-6 col-lg-6'>
              <button id= 'paypalEnvio' onClick = {this.irWrapPedido.bind(this)}
                style= {{cursor: 'pointer',backgroundColor: 'transparent' ,border:'1px solid black'}}
              >
                <h6 id= 'paypalEnvio'>el pedido se enviará a la siguiente direncción:</h6>
                <hr id= 'paypalEnvio' style={{padding:0,marginTop :0,marginBottom:2}}/>
                <p id= 'paypalEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.paypalEnvio.nombreCompletoEnvio} </p>
                <p id= 'paypalEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.paypalEnvio.calle} </p>
                <p id= 'paypalEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.paypalEnvio.localidad} </p>
                <p id= 'paypalEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.paypalEnvio.cp+' , '+this.props.paypalEnvio.provincia} </p>
              </button>
            </div>
            <div className = 'col-xs-6 col-sm-6 col-md-6 col-lg-6'>
              <button id= 'dbEnvio' onClick = {this.irWrapPedido.bind(this)}
                style = {{cursor: 'pointer',backgroundColor: 'transparent' ,border:'1px solid black' }}>
                <h6>el pedido se enviará a la siguiente direncción:</h6>
                <hr id= 'dbEnvio' style={{padding:0,marginTop :0,marginBottom:2}}/>
                <p id= 'dbEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.dbEnvio.nombreCompletoEnvio} </p>
                <p id= 'dbEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.dbEnvio.calle} </p>
                <p id= 'dbEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.dbEnvio.localidad} </p>
                <p id= 'dbEnvio' style= {{fontSize:11,marginBottom: 1}}> {this.props.dbEnvio.cp+' , '+this.props.dbEnvio.provincia} </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ModalCompraRealizada
