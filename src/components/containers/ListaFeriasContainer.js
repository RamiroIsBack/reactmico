import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class ListaFeriasContainer extends Component {
  makeLista(){
    let listaYearsFerias = []
    if (!this.props.ferias){
      return listaYearsFerias
    }
    //hago una lista de objetos, cada objeto tiene el year y una lista de ferias
    let currentYear = ''
    let list = this.props.ferias.listaFerias
    let j = 0 //flag for the second key
    for (let i = 0; i < list.length; i++) {
      let date = list[i].fecha
      let parts = date.split('/')
      //   year        month         day
      //(parts[2], parts[1] - 1, parts[0])
      if(parts[2] !==currentYear){
        currentYear = parts[2]
        listaYearsFerias.push(
          <div key= {j}  style = {{textAlign:'left',cursor: 'pointer',textDecoration: 'none',padding: 0, marginTop:2, }}>
            <button type='button' className= 'btn btn-secondary' style= {{padding:2 ,textDecoration: 'none', marginLeft:'10px'}}>
              <h6 role='presentation' id={currentYear} style = {{
                opacity: 0.9, padding:1,margin:1}} onClick={this.handleClick.bind(this)}>
                {currentYear}
              </h6>
            </button>
          </div>
        )
        j++
        if(this.props.ferias.openYear ===currentYear && !list[i].showInfo){
          listaYearsFerias.push(

            <div key= {j} style = {{cursor: 'pointer',textDecoration: 'none',padding: 0}}>
              <h5 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].fecha}</h5>
              <h4 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].nombre}</h4>
              <hr/>
            </div>

          )
          j++
        }
        if(list[i].showInfo){ //si est'a seleccionado lo dejamos aunq no sea su a;o
          listaYearsFerias.push(

            <div key= {j} style = {{border:'1.5px solid black',cursor: 'pointer',textDecoration: 'none',padding: 0}}>
              <h5 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].fecha}</h5>
              <h4 style = {{}} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].nombre}</h4>
              <hr/>
            </div>

          )
          j++
        }

      }else{

        if(this.props.ferias.openYear ===currentYear && !list[i].showInfo){
          listaYearsFerias.push(

            <div key= {j} style = {{cursor: 'pointer',textDecoration: 'none',padding: 0}}>
              <h5 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].fecha}</h5>
              <h4 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].nombre}</h4>
              <hr/>
            </div>

          )
          j++
        }
        if(list[i].showInfo){//si est'a seleccionado lo dejamos aunq no sea su a;o
          listaYearsFerias.push(

            <div key= {j} style = {{border:'1.5px solid black',cursor: 'pointer',textDecoration: 'none',padding: 0}}>
              <h5 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].fecha}</h5>
              <h4 style = {{ }} id= {list[i].id} onClick={this.handleShow.bind(this)}>{list[i].nombre}</h4>
              <hr/>
            </div>

          )
          j++
        }
      }

    }
    return listaYearsFerias

  }
  handleClick(e){
    this.props.toggleYear(e.target.id)
  }
  handleShow(e){
    this.props.markerClicked(e.target.id)
  }
  render() {
    let listaYearsFerias =this.makeLista()
    return (
      <div>
        {listaYearsFerias}
      </div>
    )
  }
}
const dispatchToProps = (dispatch) =>{

  return{
    toggleYear: (year) =>dispatch(actions.toggleYear(year)),
    markerClicked:(markerId) =>dispatch(actions.markerClicked(markerId))
  }
}

const stateToProps = (state) => {
  return{
    //en state.blabla dices de que reducer quieres info
    //y tu le asignas una key q quieras
    ferias: state.feria,
  }
}
//it would be null at d first argument cos i was not registering
//for listening d store, only dispatching actions but NOW I DO to get the
//creaciones from firebase data base
export default connect (stateToProps,dispatchToProps)(ListaFeriasContainer)
