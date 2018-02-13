
import React from 'react'
import style from './styles'
//I think I don't need this
//import PropTypes from 'prop-types'

class ModalDatosEnvio extends React.Component {

  constructor() {
    super()
    this.state = {
      show: 'no',

    }
  }
  irAformaDePago(){
    this.props.irAformaDePago()
  }
  corregirDatos(){
    this.props.onClose('datos')
  }
  cambiarCarro(){
    this.props.onClose('carro')
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

    const carroLista =
    this.props.carro.cartList.map((productInCart,i)=>{
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

    let progressI = 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/proceso%20de%20compra1.png?alt=media&token=75d910d4-75eb-4ce4-8d00-934acce712b3'

    return (
      <div style={style.modal.backdropStyle}>

        <div style={stiloModal}>

          <div >
            <button onClick={this.props.onClose} className = 'btn glyphicon glyphicon-remove pull-right'
              style= {style.modal.btnClose}></button>
            <div className = 'col-xs-10 col-sm-8 col-md-8 col-lg-8' style = {style.modal.formContainer}>
              <div style ={{minHeight: 122}}>
                <img id='foto' src={progressI}  style={{borderRadius : 10 ,paddingTop: 3 , width: '100%'}} />
              </div>

              {/*esto es visible-XS*/}
              <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg carousel-caption ' style = {{ color: 'black' ,padding: '0px', top: 5, bottom: 'auto', textShadow: 'none'}}>
                <h6 className='text-center' style={{fontWeight:'bold' ,padding:0 ,margin:0 ,paddingBottom:2}}>Datos para el envio</h6>
                <button id= 'datosEnvio' onClick = {this.irAformaDePago.bind(this)}
                  style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 2}}>
                  <span style= {{color : 'white' }} id='carro'>siguiente </span>
                  <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-arrow-right'>
                  </span>

                </button>
              </div>

              {/*esto es hidden-XS*/}
              <div className = 'container-fluid row hidden-xs carousel-caption' style = {{color: 'black' ,padding: '0px', top: 5 , bottom: 'auto', textShadow: 'none'}}>
                <h3 className='text-center'>Datos para el envio</h3>
                <button id= 'datosEnvio' onClick = {this.irAformaDePago.bind(this)}
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


              <div>
                <div className= 'hidden-xs col-sm-6 col-md-4  col-lg-4 ' style = {{paddingRight: 10}}>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.nombreCompletoEnvio} </p>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.calle} </p>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.localidad} </p>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.cp+' , '+this.props.currentUser.datosEnvio.provincia} </p>

                  <button className='btn text-center form-control ' id= 'datosEnvio' onClick = {this.corregirDatos.bind(this)}
                    style = {{cursor: 'pointer',border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',paddingLeft: 5}}>corregir datos
                  </button>
                </div>

                <div className= 'hidden-sm hidden-md hidden-lg visible-xs-block col-xs-12' style = {{paddingLeft: 0, paddingRight: 0, paddingBottom: 5}}>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.nombreCompletoEnvio} </p>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.calle} </p>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.localidad} </p>
                  <p style= {{marginBottom: 1}}> {this.props.currentUser.datosEnvio.cp+' , '+this.props.currentUser.datosEnvio.provincia} </p>


                  <button className='btn text-center form-control ' id= 'datosEnvio' onClick = {this.corregirDatos.bind(this)}
                    style = {{cursor: 'pointer',border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',paddingLeft: 5}}>corregir datos
                  </button>
                </div>


                <div className= 'col-xs-12 col-sm-6 col-md-8 col-lg-8' style = {{paddingRight: 0,paddingLeft:0}}>
                  <div style = {{backgroundColor:'#FAFAFA', paddingRight: 0,paddingLeft:0,border: '1px solid #2C6549', borderRadius:'4px'}} >

                    {/*AQUI EL CARRO */}
                    {carroLista}

                  </div>

                  <button className='btn text-center form-control ' id= 'datosEnvio' onClick = {this.cambiarCarro.bind(this)}
                    style = {{cursor: 'pointer',border: '1px solid',borderRadius: 4, backgroundColor: 'white',width: '95%',paddingLeft: 5,}}>corregir carro
                  </button>
                </div>
                <div className= 'col-xs-12 col-sm-12 col-md-12 col-lg-12' style = {{paddingRight: 0,paddingLeft:0,paddingBottom:5}}>
                  {/* ESTE SER'A EL BOTON DE PASAR AL SIGUIENTE PASO */}
                  <button id= 'datosEnvio' onClick = {this.irAformaDePago.bind(this)}
                    style = {{cursor: 'pointer',border: 'none',borderRadius: 4, backgroundColor: 'black',color:'white',width: '100%',paddingLeft: 5,marginTop: 5}}>
                    <span style= {{color : 'white' }} id='carro'>siguiente </span>
                    <span style= {{color : 'white' }} id='carro' className='glyphicon glyphicon-arrow-right'>
                    </span>
                  </button>
                </div>
                {/*comentario sin mas */}

              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ModalDatosEnvio
