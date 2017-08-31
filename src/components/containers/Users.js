import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Users extends Component {
  constructor(){
    super()
    this.state = {
      error: null,
      user: {
        username: ''
      }
    }
  }

  componentDidMount(){
    this.props.fetchUsers({})
      .then(response => {
        return this.props.currentUser() // get the logged-in user, if any
      })
      .then(response => {

      })
      .catch(err => {
        console.log('ERROR: '+err.message)
      })
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

  submitUser(event){
    if (event)
      event.preventDefault()

    if (this.state.user.username.length == 0){
      alert('Please Enter a Username')
      return
    }

    this.props.addUser(this.state.user)
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

  render(){
    const usersList = this.props.users.all || []

    const joinTurbo = (
      <div>
        <a target="_blank" href="https://www.velocity360.io/turbo">Join Turbo!</a>

      </div>
    )

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="topmargin-sm nobottommargin">Add User</h3>
            <input className="form-control" onChange={this.updateUser.bind(this, 'username')} type="text" placeholder="username" />
            <br />
            <input className="form-control" onChange={this.updateUser.bind(this, 'password')} type="password" placeholder="password" />
            <br />
            <button className="btn btn-info" onClick={this.submitUser.bind(this)}>Submit</button>
          </div>

          <div className="col-md-6">
            <h4 className="topmargin-sm nobottommargin">Current Users</h4>
            <ol style={{paddingLeft:16}}>
              { usersList.map((user, i) => {
                  return <li key={user.id}>{user.username}</li>
                })
              }
            </ol>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h3 className="topmargin-sm nobottommargin">Login User</h3>
            <input className="form-control" onChange={this.updateUser.bind(this, 'username')} type="text" placeholder="username" />
            <br />
            <input className="form-control" onChange={this.updateUser.bind(this, 'password')} type="password" placeholder="password" />
            <br />
            <button className="btn btn-info" onClick={this.loginUser.bind(this)}>Log In</button>
          </div>

          { (this.props.users.currentUser == null) ? null : (
            <div className="col-md-6">
              <h4 className="topmargin-sm">Currently Logged In As: {this.props.users.currentUser.username}</h4>
              <button className="btn btn-info">Log Out</button>
            </div>
          )
          }

        </div>

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
    fetchUsers: (params) => dispatch(actions.fetchUsers(params)),
    addUser: (params) => dispatch(actions.addUser(params)),
    loginUser: (credentials) => dispatch(actions.loginUser(credentials)),
    currentUser: () => dispatch(actions.currentUser())
  }
}

export default connect(stateToProps, dispatchToProps)(Users)
