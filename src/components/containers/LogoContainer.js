import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class ModalVolverArribaContainer extends Component{
  handleClick(event){
    this.props.toggleModal('closeCreaciones')
    this.props.navActive('', 'navbarMicoFront')//no hay tab activa
    window.scrollTo(0, 0)
    //routing programatically, now i can prevent if there is an error
    history.push('/')
  }
  render(){
    let paddingTop = {}
    if(this.props.navigation){
      if(this.props.navigation.sticky){
        paddingTop = {paddingTop:0}
      }else{
        paddingTop = this.props.navigation.paddingTop4navbar
      }
    }
    return(
      <div className ='logo__top__container' id='logoTopContainer' style = {paddingTop} >
        <img className ='logo__top__img' src= '/logoApaisado.png'
          onClick ={this.handleClick.bind(this)} ></img>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{
  return{
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    navActive:(activeTab,params) => dispatch(actions.navActive(activeTab,params)),
  }

}

const stateToProps = (state) =>{
  return{
    navigation: state.navigation,
  }
}

export default connect (stateToProps, dispatchToProps)(ModalVolverArribaContainer)
