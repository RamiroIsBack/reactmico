import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class LogoContainer extends Component{

  handleClick(event){
    this.props.toggleModal('closeCreaciones')
    this.props.navActive('', 'navbarMicoFront')//no hay tab activa
    window.scrollTo(0, 0)
    //routing programatically, now i can prevent if there is an error
    history.push('/')
  }
  onImgLoaded(){
  }
  render(){
    let paddingTop = {}
    if(this.props.navigation){
      if(this.props.navigation.sticky ||this.props.navigation.screenSize==='mobile'){
        paddingTop = this.props.navigation.paddingTop4navbar
      }else{
        let paddingNumber= this.props.navigation.paddingTop4navbar.paddingTop
        paddingTop = {paddingTop:paddingNumber}
      }
    }
    return(
      <div className ='logo__top__container' id='logoTopContainer' style = {paddingTop} >
        <img className ='logo__top__img' src= 'https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/logoApaisado.png?alt=media&token=34e5b690-df60-4234-bf66-d62346dfbb3e'
          onClick ={this.handleClick.bind(this)}
          onLoad = {this.onImgLoaded.bind(this)}
        ></img>
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

export default connect (stateToProps, dispatchToProps)(LogoContainer)
