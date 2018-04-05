import React,{Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class CookiesAvisoContainer extends Component{
  handleClick(event){
    if(event.target.id === 'masInfo'){
      this.props.toggleModal('openCookies')
      this.props.toggleModal('openPolitica')
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
        <h6 style = {{display:'inline'}}>
          Esta web usa cookies operativas propias que tienen una pura finalidad funcional y cookies de terceros (tipo analytics) que permiten conocer sus hábitos de navegación para dar mejores servicios de información. Si continuas navegando, aceptas su uso. Puedes cambiar la configuración, desactivarlas u obtener más información
        </h6>
        <h5
          id = 'masInfo'
          onClick = {this.handleClick.bind(this)} style = {{display:'inline', fontWeight: 'bold',cursor:'pointer'}}> aquí </h5>
        (enlace a política de cookies)
        <button
          id= 'aceptar'
          style = {{border: '1px solid white', display:'inline', backgroundColor:'black', marginLeft:'5px'}}
          onClick = {this.handleClick.bind(this)} >Aceptar</button>
      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    cierraCookiesAviso:()=>dispatch(actions.cierraCookiesAviso()),
  }
}


const stateToProps = (state) => {
  return{

    navigation : state.navigation,


  }
}

export default connect (stateToProps,dispatchToProps)(CookiesAvisoContainer)
