import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../../actions'

class CarousellContainer extends Component{
  constructor(args){
    super()
    this.state ={
      movementObj:{
        minX :30,
        maxY :50,
        startX :0,
        startY :0,
        endX:0,
        endY:0,
      },
    }
  }
  handleClick(event){
    if(event.target.id ==='arrowLeft'){
      this.props.moveCarousell('atras')
    }
    if(event.target.id ==='arrowRight'){
      this.props.moveCarousell('alante')
    }
  }
  handleTouchStart(e){
    let newMovementObj = Object.assign({}, this.state.movementObj)
    let touch = e.touches[0]
    newMovementObj.startY = touch.screenY
    newMovementObj.startX = touch.screenX
    this.setState({movementObj : newMovementObj })
  }
  handleTouchMove(e){
    let newMovementObj = Object.assign({}, this.state.movementObj)
    let touch = e.touches[0]
    newMovementObj.endY = touch.screenY
    newMovementObj.endX = touch.screenX
    this.setState({movementObj : newMovementObj })
  }
  handleTouchEnd(){
    let xMove = this.state.movementObj.startX - this.state.movementObj.endX
    let yMove = this.state.movementObj.startY - this.state.movementObj.endY
    if(Math.abs(xMove) > this.state.movementObj.minX){
      if(Math.abs(yMove) < this.state.movementObj.maxY){
        if(xMove<0){
          this.props.moveCarousell('atras')
        }else{
          this.props.moveCarousell('alante')
        }

      }

    }
  }


  render(){

    return(
      <div className =''   >

        {!this.props.loading &&
          <div className='home__carousell__container' style={this.props.backgrounImageObject}
            onTouchStart={this.handleTouchStart.bind(this)}
            onTouchMove={this.handleTouchMove.bind(this)}
            onTouchEnd={this.handleTouchEnd.bind(this)}
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
