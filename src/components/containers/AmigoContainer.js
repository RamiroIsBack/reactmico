import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import {AmigoNavContainer} from './'
import history from '../../utils/history'
import {
  Router as Router,
  Route,
  Link,
} from 'react-router-dom'

class AmigoContainer extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      user: {
        username: ''
      }
    }
  }

  componentWillMount(){
    if (this.props.users.currentUser === null ){
      this.props.toggleModal('closeEntrar')
      //make it start at the top of the page every time
      window.scrollTo(0, 0)
      //routing programatically, now i can prevent if there is an error
      history.push('/')
    }else{
      //si tenemos currentUser y hay q volver a bajar la listaUsers xa q tenga el nuevo metido
      let enDB = false
      let i = 0
      let listaUsers= this.props.users.listaUsers
      let amigo = this.props.users.currentUser
      for (i =0; i < listaUsers.length; i++){
        if (listaUsers[i].id === amigo.datosPersonales.uid){
          enDB = true
          break
        }
      }
      if(!enDB){
        //not in DB
        if(amigo.datosPersonales.providerId === 'firebase'){
          //cos it's been created just now so we refresh listaUsers
          this.props.getUsers()
        }else{
          //it might be ther first time she contects from google or facebook so we better create a new one for that user
          this.props.currentUserToDB(amigo)
        }
      }
    }
  }


  componentDidUpdate() {
    if (this.props.users.usersLoaded === false){
      //en el reducer ya lo pone a true
      this.props.getUsers()
    }
  }

  updateUser(field, event){
    if (event)
      event.preventDefault()

    let updated = Object.assign({}, this.state.user)
    updated[field] = event.target.value
    this.setState({
      user: updated
    })
  }

  submitUserInfo(event){
    if (event)
      event.preventDefault()

    if (this.state.user.username.length == 0){
      alert('Please Enter a Username')
      return
    }

    this.props.addUserInfo(this.state.user)
      .then(response => {

      })
      .catch(err => {
        alert(err.message)
      })
  }

  loginUser(event){
    if (event)
      event.preventDefault()

    if (this.state.user.username.length == 0){
      alert('Please Enter a Username')
      return
    }

    if (this.state.user.password == null){
      alert('Please Enter a Password')
      return
    }

    this.props.loginUser(this.state.user)
      .then(response => {
        console.log('LOGIN: '+JSON.stringify(response))
      })
      .catch(err => {
        alert(err.message)
      })
  }

  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')
  }
  logout(){
    this.props.logout()
    //make it start at the top of the page every time
    window.scrollTo(0, 0)
    //routing programatically, now i can prevent if there is an error
    history.push('/')
  }

  render(){


    return (
      <div  onClick = {this.cierraDialogosNavbar.bind(this)} id= 'AmigoContainer' >
        <AmigoNavContainer logout={this.logout.bind(this)}/>

      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    users: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    getUsers: (params) => dispatch(actions.getUsers(params)),
    addUserInfo: (params) => dispatch(actions.addUserInfo(params)),
    loginUser: (credentials) => dispatch(actions.loginUser(credentials)),
    currentUser: () => dispatch(actions.currentUser()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
    logout: () =>dispatch(actions.logout()),
    currentUserToDB:(user) =>dispatch(actions.currentUserToDB(user)),

  }
}

export default connect(stateToProps, dispatchToProps)(AmigoContainer)
