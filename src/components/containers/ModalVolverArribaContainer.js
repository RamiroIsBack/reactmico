import React, {Component} from 'react'
import {connect} from 'react-redux'
import General_css from '../../utils/css'

class ModalVolverArribaContainer extends Component{
  moveUp(event){
    //make it start at the top of the page every time
    window.scrollTo(0, 0)
  }
  render(){
    let show =false
    let animation= {animationName: 'fadeIn'}
    if (this.props.navigation.sticky){
      show = true
    }
    if(!show){
      return null
    }

    return(
      <div className = 'volver__arriba__container' style={animation} >
        <div className='glyphicon glyphicon-chevron-up'
          onClick = {this.moveUp.bind(this)}>
        </div>
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

}

const stateToProps = (state) =>{
  return{
    navigation: state.navigation,
  }
}

export default connect (stateToProps, dispatchToProps)(ModalVolverArribaContainer)
