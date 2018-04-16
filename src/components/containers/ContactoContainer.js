import React, { Component } from 'react'
import actions from '../../actions'
import {connect} from 'react-redux'
import {Contacto} from '../presentational'


class ContactoContainer extends Component {
  componentWillMount() {
    window.scrollTo(0, 0)

  }
  compomentDidUpdate(){
    window.scrollTo(0, 0)
  }

  goArtesania(){
    window.open('http://artesaniadegalicia.xunta.gal/es/fundacion/la-marca','_blank')
  }

  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')

  }

  render() {
    let contactoContenido = {}
    let contactoLinks = {}

    if (this.props.storeContenidos.listaContenidos.length !==0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id === 'contacto'){
          contactoContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
    }
    if (this.props.storeEnlaces.listaEnlaces.length !==0){
      for (let i = 0 ; i < this.props.storeEnlaces.listaEnlaces.length ; i++) {

        if (this.props.storeEnlaces.listaEnlaces[i].id === 'contact'){
          contactoLinks ={
            contactMail : this.props.storeEnlaces.listaEnlaces[i].contactMail,
            contactHours : this.props.storeEnlaces.listaEnlaces[i].contactHours,
            contactPhone : this.props.storeEnlaces.listaEnlaces[i].contactPhone,
            contactPost : this.props.storeEnlaces.listaEnlaces[i].contactPost,
          }
        }

      }
    }


    return (
      <div onClick = {this.cierraDialogosNavbar.bind(this)} >

        <Contacto contactoContenido = {contactoContenido}
          contactoLinks ={contactoLinks}
          whenClicked={this.goArtesania.bind(this)}
          lengua = {this.props.navigation.lengua}
        />
      </div>
    )
  }
}

const dispatchToProps = (dispatch) =>{

  return{
    getContenidos: () => dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
  }
}


const stateToProps = (state) => {
  return{
    storeEnlaces:state.enlaces,
    storeContenidos: state.contenidos,
    navigation:state.navigation,

  }
}

export default connect (stateToProps,dispatchToProps)(ContactoContainer)
