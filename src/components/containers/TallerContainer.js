import React, { Component } from 'react'
import actions from '../../actions'
import {connect} from 'react-redux'
import {Taller} from '../presentational'


class TallerContainer extends Component {
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

  cierraDialogosNavbar(){
    this.props.toggleModal('closeDropdowns')

  }

  render() {
    let tallerContenido = {}
    let artesaniaContenido = {}
    if (this.props.storeContenidos.listaContenidos.length !==0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id === 'taller'){
          tallerContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id === 'artesania'){
          artesaniaContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
    }


    return (
      <div onClick = {this.cierraDialogosNavbar.bind(this)} >
        <Taller
          tallerContenido = {tallerContenido}
          artesaniaContenido = {artesaniaContenido}
          whenClicked={this.goArtesania.bind(this)}/>

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
    // state is d store in this case for convenction
    // cojo el producto d state(store) y lo paso a props xa cogerlo
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,


  }
}

export default connect (stateToProps,dispatchToProps)(TallerContainer)
