import React from 'react'
import style from './styles'
export default class Feria extends React.Component {
  constructor() {
    super()
    this.state ={
      fotoLoaded:false,
    }
  }

  // methods
  handleClick(event){

    if (event.target.id === 'pic'){
      this.props.whenClicked(this.props.feria.urlFeria)
    }
  }
  handleFotoLoaded(){
    this.setState({fotoLoaded:true})
  }

  render(){

    let descripcion = this.props.feria.descripcion
    let direccion = this.props.feria.direccion

    if(this.props.lengua ==='ga'){
      direccion = (this.props.feria.direccionGalego)? this.props.feria.direccionGalego : this.props.feria.direccion
      descripcion = (this.props.feria.descripcionGalego)? this.props.feria.descripcionGalego : this.props.feria.descripcion
    }
    return(
      <div >
        <div className='row' style = {{paddingLeft:'5px'}}>
          <div className = ' col-xs-12 col-sm-4 col-md-4 col-lg-4' style = {{padding : 0}}>
            <h4 style = {{whiteSpace: 'initial'}}>
              {this.props.feria.nombre}
            </h4>
          </div>
          <div className = ' col-xs-12 col-sm-8 col-md-8 col-lg-8' style = {{padding : 0}}>
            <div className = ' col-xs-6 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
              <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-6 ' style = {{padding : 0}}>
                <h5 className = 'text-muted' style = {{whiteSpace: 'initial', paddingLeft: 4,marginTop:2, marginBottom:0}}>
                   desde {this.props.feria.fecha}
                </h5>
              </div>
              <div className = ' col-xs-12 col-sm-12 col-md-12 col-lg-6' style = {{padding : 0}}>
                <h5 className = 'text-muted' style = {{whiteSpace: 'initial', marginBottom:0, marginTop:2, }}>
                   hasta {this.props.feria.fechaFinal}
                </h5>
              </div>
            </div>
            <div className = ' col-xs-6 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
              <h4 className = 'text-muted' style = {{whiteSpace: 'initial'}}>
                {this.props.feria.lugar}
              </h4>

            </div>
          </div>
        </div>
        <div className ='row' style={{marginTop:'10px'}}>
          <div className = ' col-xs-12 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
            {!this.state.fotoLoaded &&
              <div className='loader'>Cargando...</div>
            }
            <img role='presentation' src={this.props.feria.pic} className ='img-rounded' alt='' id='pic' style = {{cursor:'pointer',maxWidth: '90%'}} onClick={this.handleClick.bind(this)}
              onLoad = {this.handleFotoLoaded.bind(this)}
            >
            </img>
          </div>
          <div className = ' col-xs-11 col-sm-5 col-md-5 col-lg-5' style = {{textAlign:'left',padding : 0,paddingLeft:'10px'}}>
            {descripcion.split('\n').map((item, key) => {
              return <span  key={key}>{item}<div><br/></div></span>})}

          </div>
        </div>
      </div>
    )
  }
  // <div className=' row'>
  //   <div className = ' col-xs-12 col-sm-6 col-md-5 col-lg-5' >
  //     <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
  //       <img role='presentation' src={this.props.feria.pic} className ='img-rounded' alt='' id='pic' style = {{
  //         maxWidth: '200px'}} onClick={this.handleClick.bind(this)}>
  //       </img>
  //     </a>
  //
  //   </div>
  //   <div className = 'container-fluid col-xs-12 col-sm-6 col-md-7 col-lg-7' style= {style.foto.container}>
  //
  //     <div className='row container-fluid row col-xs-12 col-sm-12 col-md-12 col-lg-12' style ={style.feria.texto}>
  //       <p style = {{overflow: 'hidden'}}>{this.props.feria.descripcion}</p>
  //     </div>
  //
  //   </div>
  // </div>

}
