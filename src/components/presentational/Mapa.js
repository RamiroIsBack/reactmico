import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker,  InfoWindow, } from 'react-google-maps'

class Mapa extends Component {
  constructor(){
    super()
    this.state={
      mapa: null
    }
  }

  makeMarkers(){
    let markers = []
    let mapsImg ='https://firebasestorage.googleapis.com/v0/b/micotextil-3f024.appspot.com/o/mapsPointer.jpeg?alt=media&token=4d2aee6c-56fb-466c-9285-0a49b5abc5fc'
    if(this.props.ferias.length === 0){
      return markers
    }
    let ferias = this.props.ferias
    for (let i = 0 ; i<ferias.length ; i++){
      if(!ferias[i].caducada|| ferias[i].mostrarCaducada){

        let latLong =  ferias[i].mapsLink.split('@')[1] //cojo todo desde la @
        let lat = latLong.slice(0,latLong.indexOf(',')) // y hasta la primera coma
        let long = latLong.split(',')[1] //elimino lo q ya tengo q es la lat y cojo hasta la coma siguiente
        if(!ferias[i].showInfo){
          ferias[i].showInfo = false //pongo todas a false x defecto si no hay
        }
        let direccion = ferias[i].direccion

        if(this.props.lengua ==='ga'){
          direccion = (ferias[i].direccionGalego)? ferias[i].direccionGalego : ferias[i].direccion
        }
        markers.push(
          <Marker
            key = {ferias[i].id}
            position={{
              lat: parseFloat(lat)
              ,
              lng: parseFloat(long)
            }}
            onClick={() => this.props.handleClick(ferias[i].id)}
          >
            {ferias[i].showInfo &&(
              <InfoWindow onCloseClick={() =>  this.props.handleClick(ferias[i].id)}>
                <div style = {{maxWidth: 200,padding : 0}}>
                  <div className='container-fluid col-xs-5 col-sm-5 col-md-5 col-lg-5' style = {{padding : 0}}>
                    <a  style = {{cursor: 'pointer', color:'white',backgroundColor:'transparent',textDecoration: 'none',padding: 0}}>
                      <img role='presentation' src={ferias[i].pic} className ='img-rounded' alt='GMaps' id='urlFeria' style = {{
                        opacity: 0.9, maxHeight: 50, maxWidth:60}} onClick={() => this.handleClick(ferias[i].urlFeria)}>
                      </img>
                    </a>
                  </div>
                  <div className='container-fluid col-xs-7 col-sm-7 col-md-7 col-lg-7' style = {{padding : 0}} >
                    <h5 style = {{marginTop : 2,marginBottom:0}}>{ferias[i].nombre}</h5>
                    <h6 style = {{marginTop : 2,marginBottom:2}}>{ferias[i].fecha}</h6>
                  </div>
                  <div className ='row btn' onClick={() => this.handleClick(ferias[i].mapsLink)} type='button' id='mapsLink'
                    style={{width : '100%',padding : 0}}>

                    <div className='container-fluid col-xs-3 col-sm-3 col-md-3 col-lg-3' style = {{padding : 0}}>
                      <img role='presentation' src={mapsImg} className ='img-rounded' alt='GMaps' id='mapsLink' style = {{
                        opacity: 0.9, width: 50,}}>
                      </img>
                    </div>
                    <div className='container-fluid col-xs-9 col-sm-9 col-md-9 col-lg-9' style = {{padding : 0}} >
                      <h6 id='mapsLink' style = {{whiteSpace: 'initial'}}>{direccion} </h6>
                    </div>

                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>

        )

      }
    }


    return markers
  }
  handleClick(urlToGo){
    window.open(urlToGo,'_blank')
  }


  render() {

    let markers = this.makeMarkers()
    return (

      <GoogleMap
        defaultOptions={{styles : [
          {
            'featureType': 'administrative',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'simplified'
              }
            ]
          },
          {
            'featureType': 'landscape',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'color': '#fcfcfc'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'color': '#fcfcfc'
              }
            ]
          },

          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'color': '#dddddd'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'color': '#dddddd'
              }
            ]
          },
          {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'color': '#eeeeee'
              }
            ]
          },

          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'visibility': 'simplified'
              },
              {
                'color': '#dddddd'
              }
            ]
          },

        ]
        }}
        defaultZoom={7}
        defaultCenter={{  lat: 43.0123411, lng: -7.5915196  }}
      >
        {markers}
      </GoogleMap>
    )
  }
}

export default withGoogleMap(Mapa)
