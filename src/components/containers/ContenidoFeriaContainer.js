import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import {FeriasMapContainer} from './'
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
      <div style ={{padding:0, margin:0}}>
        {/*esto es visible-XS*/}
        <div className = 'container-fluid row visible-xs-block hidden-sm hidden-md hidden-lg '
          style ={{
            paddingTop: 50, paddingBottom: 50,
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2Fferia1.png?alt=media&token=996633e2-ad62-42b0-b395-c197b78becbe)',
            backgroundPosition: 'right bottom', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
            overflow: 'auto', maxWidth:'100%',
            margin:0,
          }}>

        </div>

        {/*esto es visible-SM MD LG*/}
        <div className = 'container-fluid row hidden-xs '
          style ={{
            paddingTop: 80,paddingBottom: 80,
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/mico-62a9a.appspot.com/o/contenidos%2Fferia1.png?alt=media&token=996633e2-ad62-42b0-b395-c197b78becbe)',
            backgroundPosition: 'right bottom', backgroundSize: 'cover',backgroundRepeat: 'no-repeat',
            overflow: 'auto',
            maxWidth:'100%',
            margin:0,
          }}>

        </div>

        {feriasContenido.descripcion &&
          <div>
            <div className = 'container-fluid row col-xs-11 visible-xs-block hidden-sm hidden-md hidden-lg ' style = {{marginLeft:5, padding:3}} >
              {feriasContenido.descripcion.descripcionFerias.split('\n').map((item, key) => {
                return <span key={key} >{item}<br/></span>})}

            </div>
            <div className = 'container-fluid row hidden-xs col-sm-10 col-md-10 col-lg-10' style = {{marginLeft:35, padding:3}} >
              {feriasContenido.descripcion.descripcionFerias.split('\n').map((item, key) => {
                return <span key={key} >{item}<br/></span>})}

            </div>
          </div>
        }
        <div className='container row clearfix'><br/><br/></div>
        <hr/>

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









