import React, { Component } from 'react'
import {ModalLengua} from '../presentational'

import {connect} from 'react-redux'
import actions from '../../actions'


class ModalLenguaContainer extends Component {


  cambiaLengua(lengua){
    this.props.cambiaLengua(lengua)
    this.props.toggleModal('closeLengua')
  }

  //onMouseOut() Rocks!!
  handleHoverOff(event){
    this.props.toggleModal('closeDropdowns')
  }

  render(){
    // Render nothing if the "show" prop is false
    if (this.props.modal){
      var lenguaShowing = this.props.modal.lenguaShowing
      if (!this.props.modal.lenguaShowing){
        return null
      }
    }

    return (

      <div onMouseLeave={this.handleHoverOff.bind(this)} >
        <ModalLengua show={lenguaShowing} cambiaLengua={this.cambiaLengua.bind(this)}>
        </ModalLengua>


      </div>



    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    cambiaLengua:(lengua)=>dispatch(actions.cambiaLengua(lengua)),
  }
}


const stateToProps = (state) => {
  return{
    modal:state.modal,
  }
}
export default connect (stateToProps,dispatchToProps)(ModalLenguaContainer)
