import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class ContenidoFeriaContainer extends Component {

  componentWillMount(){
    if (this.props.storeContenidos.ContenidosLoaded == false){
      //en la accion ya lo pone a true
      this.props.getContenidos()
    }
  }

  render() {
    let feriasContenido = {}
    if (this.props.storeContenidos.listaContenidos.length !=0){
      for (let i = 0 ; i < this.props.storeContenidos.listaContenidos.length ; i++) {

        if (this.props.storeContenidos.listaContenidos[i].id == 'ferias'){
          feriasContenido = this.props.storeContenidos.listaContenidos[i]
          break
        }
      }
    }
    return (
      <div className='container'>
        {feriasContenido.descripcion &&
          <div className = 'container-fluid row col-xs-12 col-sm-10 col-md-10 col-lg-10' style = {{textAlign :'center'}} >
            {feriasContenido.descripcion.descripcionFerias.split('\n').map((item, key) => {
              return <span key={key} >{item}<br/></span>})}

          </div>
        }
        <br/>
        <div className='container row clearfix'><br/><br/></div>
      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    getContenidos:()=>dispatch(actions.getContenidos()),
    toggleModal: (modalName) =>dispatch(actions.toggleModal(modalName)),
  }
}

const stateToProps = (state) => {
  return{
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    storeContenidos: state.contenidos,
  }
}
//it would be null at d first argument cos i was not registering
//for listening d store, only dispatching actions but NOW I DO to get the
//creaciones from firebase data base
export default connect (stateToProps,dispatchToProps)(ContenidoFeriaContainer)









