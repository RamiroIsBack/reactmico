import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import {Feria} from '../presentational'
import style from './styles'
import { NavLink} from 'react-router-dom'

class FeriaContainer extends Component {
  constructor(){
    super()
  }
  //componentWillMount is executed once before the initial rendering occurs.

  componentDidMount() {
    if (this.props.ferias.feriasLoaded === false){
      //en el reducer ya lo pone a true
      this.props.getFerias()
    }


  }
  
  selectFeria(urlFeria){
    window.open(urlFeria,'_blank')
  }

  cierraDialogosNavbar(event){
    this.props.toggleModal('closeDropdowns')
  }
  eligeFeria(){
    let feria = null
    for (let i =0 ;i<this.props.ferias.listaFerias.length;i++){
      if(this.props.ferias.idFeriaShowing === this.props.ferias.listaFerias[i].id){
        feria = this.props.ferias.listaFerias[i]
        return feria
      }
    }
    return null
  }

  render() {
    let feria =this.eligeFeria()
    if(feria===null){
      return (
        <div style= {{marginLeft:10}}>
          <h4>Selecciona una feria de la lista o del mapa para ver los detalles</h4>
        </div>
      )
    }



    return (
      <div  onClick = {this.cierraDialogosNavbar.bind(this)} >

        <Feria
          feria ={feria}
          whenClicked={this.selectFeria.bind(this)}
          lengua = {this.props.navigation.lengua}
        />

      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{

    getFerias:()=>dispatch(actions.getFerias()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
  }
}
const stateToProps = (state) => {
  return{
    navigation:state.navigation,
    ferias:state.feria,
  }
}
//it would be null at d first argument cos i was not registering
//for listening d store, only dispatching actions but NOW I DO to get the
//creaciones from firebase data base
export default connect (stateToProps,dispatchToProps)(FeriaContainer)
