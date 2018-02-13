import React from 'react'
import style from './styles'
export default class Feria extends React.Component {
  constructor(args) {
    super()
  // code
  }

  // methods
  handleClick(event){

    if (event.target.id == 'pic'){
      this.props.whenClicked(this.props.feria.urlFeria)
    }
  }

  render(){

    let mapsImg ='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/mapsPointer.jpeg?alt=media&token=4d2aee6c-56fb-466c-9285-0a49b5abc5fc'
    return(
      <div >
        <div className='container-fluid row' style = {{marginLeft:5}}>
          <div className = 'container col-xs-12 col-sm-4 col-md-4 col-lg-4' style = {{padding : 0}}>
            <h4 style = {{whiteSpace: 'initial'}}>
              {this.props.feria.nombre}
            </h4>
          </div>
          <div className = 'container col-xs-12 col-sm-8 col-md-8 col-lg-8' style = {{padding : 0}}>
            <div className = 'container col-xs-6 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
              <div className = 'container col-xs-12 col-sm-12 col-md-12 col-lg-6 ' style = {{padding : 0}}>
                <h5 className = 'text-muted' style = {{whiteSpace: 'initial', paddingLeft: 4,marginTop:2, marginBottom:0}}>
                   desde {this.props.feria.fecha}
                </h5>
              </div>
              <div className = 'container col-xs-12 col-sm-12 col-md-12 col-lg-6' style = {{padding : 0}}>
                <h5 className = 'text-muted' style = {{whiteSpace: 'initial', marginBottom:0,marginTop:2,paddingLeft: 4 }}>
                   hasta {this.props.feria.fechaFinal}
                </h5>
              </div>
            </div>
            <div className = 'container col-xs-6 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
              <h4 className = 'text-muted' style = {{whiteSpace: 'initial'}}>
                {this.props.feria.lugar}
              </h4>

            </div>
          </div>
        </div>
        <div className='container-fluid row'>
          <div className = 'container col-xs-12 col-sm-6 col-md-5 col-lg-5' >
            <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
              <img role='presentation' src={this.props.feria.pic} className ='img-rounded' alt='GMaps' id='pic' style = {{
                maxWidth: '100%'}} onClick={this.handleClick.bind(this)}>
              </img>
            </a>

          </div>
          <div className = 'container-fluid col-xs-12 col-sm-6 col-md-7 col-lg-7' style= {style.foto.container}>

            <div className='row container-fluid row col-xs-12 col-sm-12 col-md-12 col-lg-12' style ={style.feria.texto}>
              <p style = {{overflow: 'hidden'}}>{this.props.feria.descripcion}</p>
            </div>

          </div>
        </div>
      </div>
    )
  }

}
