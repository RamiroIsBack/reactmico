import React,{Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class CookiesAvisoContainer extends Component{
  handleClick(event){
    if(event.target.id === 'masInfo'){
      alert('ir a la pagina donde mostrar la informacion sobre cookies')
    }
    if (event.target.id === 'aceptar'){
      this.props.cierraCookiesAviso()
    }
  }
  render(){
    if (this.props.navigation){
      if (!this.props.navigation.showAvisoCookies){
        return null
      }
    }
    return(
      <div className = 'cookies__aviso'>
        <h6 style = {{display:'inline-block'}}>
          Utilizamos cookies propias y de terceros para obtener datos estadísticos de la navegación de nuestros usuarios y mejorar nuestros servicios. Si acepta o continúa navegando, consideramos que acepta su uso. Puede cambiar la configuración u obtener más información
          <h5
            id = 'masInfo'
            onClick = {this.handleClick.bind(this)} style = {{display:'inline', fontWeight: 'bold',cursor:'pointer'}}> aquí </h5>
          (enlace a página de cookies)
          <button
            id= 'aceptar'
            style = {{border: '1px solid white', display:'inline', backgroundColor:'black', marginLeft:'5px'}}
            onClick = {this.handleClick.bind(this)} >Aceptar</button>
        </h6>
      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

    cierraCookiesAviso:()=>dispatch(actions.cierraCookiesAviso()),
  }
}


const stateToProps = (state) => {
  return{

    navigation : state.navigation,


  }
}

export default connect (stateToProps,dispatchToProps)(CookiesAvisoContainer)
