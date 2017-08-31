/*import React, { Component } from 'react'
import style from './styles'
import {RegistrarseContainer} from '../containers'
import {Modal} from '../presentational'

export default class Registrarse extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
  }
  toggleModal(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div class='container-fluid' id ='backgroundDiv'>
        <div class='container-fluid' id ='containerDiv' style ={style.universal.containerDiv}>
          <h1>wild Login!</h1>
          <button onClick={this.toggleModal.bind(this)}>
          Open the modal
          </button>

          <Modal show={this.state.isOpen}
            onClose={this.toggleModal.bind(this)}>
            Here's some content for the modal
          </Modal>
          <RegistrarseContainer/>
        </div>
      </div>
    )
  }
}*/
