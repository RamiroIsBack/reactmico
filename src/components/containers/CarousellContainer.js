import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'
import history from '../../utils/history'

class CarousellContainer extends Component{
  handleClick(event){
    this.props.toggleModal('closeCreaciones')
    this.props.navActive('', 'navbarMicoFront')//no hay tab activa
    window.scrollTo(0, 0)
    //routing programatically, now i can prevent if there is an error
    history.push('/')
  }
  handleImageLoaded(){
    console.log(
      'image loaded?'
    )
    //this.setState({loading:false})
  }
  render(){

    return(
      <div className =''   >

        <div className='home__carousell__container' style={this.props.backgrounImageObject}
          onLoad= {this.handleImageLoaded.bind(this)}>

        </div>
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

export default connect (stateToProps, dispatchToProps)(CarousellContainer)
