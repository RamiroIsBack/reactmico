import React, { Component } from 'react'
import {HomeContainer} from '../containers'
import style from './styles'
class Home extends Component {


  render() {


    return (
      <div style ={style.universal.containerDiv}>
        <HomeContainer />
      </div>
    )
  }
}

export default Home
