import React from 'react'
import style from './styles'
export default class Feria extends React.Component {
  constructor(args) {
    super()
  // code
  }

  // methods
  handleClick(event){
    if (event.target.id == 'mapsLink'){
      this.props.whenClicked(this.props.propiedades.mapsLink)

    }
    if (event.target.id == 'info'){
      this.props.whenClicked(this.props.propiedades.urlFeria)
    }
  }
  // my first and painfull conditional rendering!!
  condiInfo () {
    if (this.props.propiedades.urlFeria != 'desconocida') {
      return(
        <a onClick={this.handleClick.bind(this)} type='button' id='info' className='btn btn-success list-inline' style= {style.feria.btnlink} >
          <li className='glyphicon glyphicon-info-sign' id='info'>
          </li>
          <li ><h5 id='info'>Descubre mas sobre la feria</h5></li>
        </a>
      )
    }else {
      return
    }
  }


  render(){
    let url = this.props.propiedades.pic
    let mapsImg ='https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/ferias%2F1c9e15bc48db729a509c1c4d9382d180.jpeg?alt=media&token=1d8d39af-4e91-433b-a9db-3978624beb78'
    return(
      <div >
        <div className='container-fluid row' style = {style.feria.headlineContainer}>
          <div className = 'container col-xs-12 col-sm-4 col-md-4 col-lg-4' style = {{padding : 0}}>
            <h4 style = {{whiteSpace: 'initial'}}>
              {this.props.propiedades.nombre}
            </h4>
          </div>
          <div className = 'container col-xs-12 col-sm-8 col-md-8 col-lg-8' style = {{padding : 0}}>
            <div className = 'container col-xs-6 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
              <h4 className = 'text-muted' style = {{whiteSpace: 'initial'}}>
                {this.props.propiedades.fecha} ({this.props.propiedades.duracion} días)
              </h4>
            </div>
            <div className = 'container col-xs-6 col-sm-6 col-md-6 col-lg-6' style = {{padding : 0}}>
              <h4 className = 'text-muted' style = {{whiteSpace: 'initial'}}>
                {this.props.propiedades.lugar}
              </h4>

            </div>
          </div>
        </div>
        <div className='container-fluid row'>
          <div className = 'container col-xs-12 col-sm-6 col-md-5 col-lg-5' >

            <img role='presentation' src={url} className ='img-rounded' style= {{maxWidth: '100%'}}>
            </img>

            <div className='container-fluid'>

              {this.condiInfo()}

            </div>
          </div>
          <div className = 'container-fluid col-xs-12 col-sm-6 col-md-7 col-lg-7' style= {style.foto.container}>
            <div className ='row btn' onClick={this.handleClick.bind(this)} type='button' id='mapsLink'
              style={{width : '100%',borderStyle:'dashed', borderTop:0, borderWidth : '5px'}}>

              <div className='container-fluid col-xs-4 col-sm-5 col-md-4 col-lg-3'>
                <img role='presentation' src={mapsImg} className ='img-rounded' alt='GMaps' id='mapsLink' style = {style.feria.mapsLink}>
                </img>
              </div>
              <div className='container-fluid col-xs-8 col-sm-7 col-md-8 col-lg-9'  >
                <p id='mapsLink' style = {{whiteSpace: 'initial',paddingTop:10, fontSize: 15}}>{this.props.propiedades.direccion}</p>
              </div>

            </div>
            <hr></hr>

            <div className='row container-fluid row col-xs-12 col-sm-12 col-md-12 col-lg-12' style ={style.feria.texto}>
              <p style = {{overflow: 'hidden'}}>{this.props.propiedades.descripcion}</p>
            </div>

          </div>
        </div>
      </div>
    )
  }

}



