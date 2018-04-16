import React, { Component } from 'react'
import actions from '../../actions'
import {connect} from 'react-redux'
import {Conocenos} from '../presentational'


class ConocenosContainer extends Component {
  componentWillMount() {

    //make it start at the top of the page every time
    window.scrollTo(0, 0)

  }
  compomentDidUpdate(){
    //make it start at the top of the page every time
    window.scrollTo(0, 0)
  }

  goArtesania(){
    window.open('http://artesaniadegalicia.xunta.gal/es/fundacion/la-marca','_blank')
  }

  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')

  }

  render() {
    let conocenosContenido = {}
    if (this.props.storeContenidos.listaContenidos.length !==0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id === 'conocenos'){
          conocenosContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }

    }


    return (
      <div onClick = {this.cierraDialogosNavbar.bind(this)} >

        <Conocenos conocenosContenido = {conocenosContenido}
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
    navigation:state.navigation,
    storeContenidos: state.contenidos,


  }
}

export default connect (stateToProps,dispatchToProps)(ConocenosContainer)
