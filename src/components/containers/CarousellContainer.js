import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'

class CarousellContainer extends Component{
  handleClick(event){
    if(event.target.id ==='arrowLeft'){
      this.props.moveCarousell('atras')
    }
    if(event.target.id ==='arrowRight'){
      this.props.moveCarousell('alante')
    }
  }

  render(){

    return(
      <div className =''   >

        {!this.props.loading &&
          <div className='home__carousell__container' style={this.props.backgrounImageObject}
          >
            <div className = 'carousell__arrow__left glyphicon glyphicon-chevron-right'
              style = {{top:'50%'}}
              id = 'arrowRight'
              onClick = {this.handleClick.bind(this)}
            >

            </div>
            <div className = 'carousell__arrow__right glyphicon glyphicon-chevron-left'
              style = {{top:'50%'}}
              id = 'arrowLeft'
              onClick = {this.handleClick.bind(this)}
            >

            </div>

          </div>
        }
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{
  return{
    moveCarousell:(pic) => dispatch(actions.moveCarousell(pic)),
  }

}

const stateToProps = (state) =>{
  return{
    navigation: state.navigation,
  }
}

export default connect (stateToProps, dispatchToProps)(CarousellContainer)
